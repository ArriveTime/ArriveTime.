/* ============================================================
   ArriveTime — app.js
   Real-time GPS location sharing via WebRTC (PeerJS)
   No backend · No registration · Works on GPS, WiFi & Cell
   ============================================================ */

'use strict';

(function () {

  /* ─────────────────────────────────────────────────────────
     CONSTANTS
  ───────────────────────────────────────────────────────── */
  var TOAST_DURATION_MS = 2800;
  var AVERAGE_SPEED_KMH = 40;   // urban/suburban average for ETA estimate

  /* ─────────────────────────────────────────────────────────
     STATE
  ───────────────────────────────────────────────────────── */
  const S = {
    mode:        null,   // 'host' | 'tracker'
    category:    'family',
    name:        'Anonymous',
    peer:        null,   // PeerJS instance
    map:         null,   // Leaflet map
    watchId:     null,   // geolocation watch handle
    ownPos:      null,   // latest GeolocationPosition
    shareUrl:    '',
    hostMarker:  null,
    trackers:    {},     // peerId → { conn, data, marker }
  };

  /* ─────────────────────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────────────────────── */
  function esc(s) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(String(s)));
    return d.innerHTML;
  }

  function $(id) { return document.getElementById(id); }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    const el = $(id);
    if (el) el.classList.add('active');
  }

  function toast(msg, ms) {
    ms = ms || TOAST_DURATION_MS;
    const prev = document.querySelector('.toast');
    if (prev) prev.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () {
      t.style.transition = 'opacity 0.3s';
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 300);
    }, ms);
  }

  function setStatus(live, txt) {
    const dot = $('status-dot');
    const lbl = $('status-lbl');
    if (dot) dot.className = 'status-dot' + (live === true ? ' live' : live === 'error' ? ' error' : '');
    if (lbl) lbl.textContent = txt || '';
  }

  function showError(msg) {
    const slot = $('error-slot');
    if (!slot) return;
    slot.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'error-msg';
    div.textContent = '⚠️ ' + msg;
    slot.appendChild(div);
  }

  function clearError() {
    const slot = $('error-slot');
    if (slot) slot.innerHTML = '';
  }

  /* ─────────────────────────────────────────────────────────
     GEOLOCATION
  ───────────────────────────────────────────────────────── */
  function getPosition() {
    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, function (err) {
        var msgs = {
          1: 'Location permission denied. Please allow location access in your browser settings and try again.',
          2: 'Location unavailable. Make sure GPS or Wi-Fi is enabled.',
          3: 'Location request timed out. Please try again.',
        };
        reject(new Error(msgs[err.code] || 'Could not get your location.'));
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
    });
  }

  /* ─────────────────────────────────────────────────────────
     DISTANCE / ETA  (Haversine formula)
  ───────────────────────────────────────────────────────── */
  function haversineKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function fmtDist(km) {
    if (km < 0.1)  return 'Here!';
    if (km < 1)    return Math.round(km * 1000) + ' m away';
    return km.toFixed(1) + ' km away';
  }

  function fmtETA(km) {
    var mins = Math.round(km / AVERAGE_SPEED_KMH * 60);
    if (mins < 1)  return 'Arriving now! 🎉';
    if (mins < 60) return '~' + mins + ' min away';
    var h = Math.floor(mins / 60), m = mins % 60;
    return '~' + h + 'h ' + (m > 0 ? m + 'm' : '') + ' away';
  }

  function isArrivingSoon(km) {
    return Math.round(km / AVERAGE_SPEED_KMH * 60) < 1;
  }

  /* ─────────────────────────────────────────────────────────
     MAP
  ───────────────────────────────────────────────────────── */
  function initMap(lat, lng) {
    if (S.map) { S.map.remove(); S.map = null; }

    S.map = L.map('map', {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
    });

    // Dark tile layer — CartoDB Dark Matter (free, no API key required)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(S.map);

    L.control.zoom({ position: 'bottomright' }).addTo(S.map);
  }

  function makeIcon(emoji, color, pulse) {
    var pulseHtml = pulse ? '<div class="marker-pulse"></div>' : '';
    return L.divIcon({
      html: '<div class="marker-wrap">' + pulseHtml + '<div class="marker-pin" style="background:' + color + '"><span>' + emoji + '</span></div></div>',
      className: '',
      iconSize: [44, 44],
      iconAnchor: [22, 44],
      popupAnchor: [0, -46],
    });
  }

  function placeOrMoveMarker(key, lat, lng, emoji, color, popupHtml, pulse) {
    var icon = makeIcon(emoji, color, pulse);
    if (S.trackers[key] && S.trackers[key].marker) {
      S.trackers[key].marker.setLatLng([lat, lng]).setIcon(icon);
    } else {
      var m = L.marker([lat, lng], { icon: icon })
               .addTo(S.map)
               .bindPopup(popupHtml);
      if (!S.trackers[key]) S.trackers[key] = {};
      S.trackers[key].marker = m;
    }
  }

  /* ─────────────────────────────────────────────────────────
     ARRIVALS PANEL  (host side)
  ───────────────────────────────────────────────────────── */
  var CAT_ICON  = { family: '👨‍👩‍👧', friends: '👥', business: '💼' };
  var CAT_COLOR = { family: '#ef4444', friends: '#10b981', business: '#7c3aed' };

  function renderArrivals() {
    var list  = $('arrivals-list');
    var count = $('arrivals-count');
    var inv   = $('invite-btn');
    if (!list) return;

    var active = Object.values(S.trackers).filter(function (t) { return t.data; });

    if (inv) inv.style.display = active.length ? 'block' : 'none';

    if (!active.length) {
      count.textContent = 'Waiting for arrivals…';
      list.innerHTML = '<p class="empty-hint">Share the invite link to start tracking.</p>';
      return;
    }

    count.textContent = active.length + (active.length === 1 ? ' person' : ' people') + ' on the way';

    list.innerHTML = active.map(function (t) {
      var d = t.data;
      var cat = d.category || 'family';
      var ico = CAT_ICON[cat] || '👤';
      var soon = typeof d.km === 'number' ? isArrivingSoon(d.km) : false;
      return '<div class="arrival-card">' +
        '<div class="arrival-avatar ' + esc(cat) + '">' + ico + '</div>' +
        '<div class="arrival-info">' +
          '<div class="arrival-name">' + esc(d.name || 'Traveler') + '</div>' +
          '<div class="arrival-eta' + (soon ? ' soon' : '') + '">' + esc(d.eta || 'Calculating…') + '</div>' +
        '</div>' +
        '<div class="arrival-dist">' + esc(d.dist || '') + '</div>' +
      '</div>';
    }).join('');
  }

  /* ─────────────────────────────────────────────────────────
     PEERJS
  ───────────────────────────────────────────────────────── */
  function createPeer() {
    return new Promise(function (resolve, reject) {
      var peer = new Peer({
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });
      peer.on('open', function () { resolve(peer); });
      peer.on('error', function (err) { reject(err); });
    });
  }

  /* ─────────────────────────────────────────────────────────
     HOST  MODE
  ───────────────────────────────────────────────────────── */
  function runHost(pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;

    // Destination marker with pulse
    if (S.hostMarker) S.map.removeLayer(S.hostMarker);
    S.hostMarker = L.marker([lat, lng], { icon: makeIcon('🏠', 'linear-gradient(135deg,#00d4ff,#7c3aed)', true) })
      .addTo(S.map)
      .bindPopup('<b>📍 Your location</b><br>People are coming to you')
      .openPopup();

    var catLabels = { family: '👨‍👩‍👧 Family', friends: '👥 Friends', business: '💼 Business' };
    $('topbar-title').textContent = (catLabels[S.category] || 'ArriveTime') + ' Tracker';

    setStatus(false, 'Starting…');

    createPeer().then(function (peer) {
      S.peer = peer;
      var shareUrl = location.origin + location.pathname + '?room=' + peer.id + '&cat=' + S.category;
      S.shareUrl = shareUrl;

      $('share-url').value = shareUrl;
      $('invite-btn').style.display = 'block';
      $('arrivals-panel').style.display = '';

      // QR code via free public API (no API key needed)
      var qrImg = $('qr-img');
      if (qrImg) {
        qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=' + encodeURIComponent(shareUrl);
        qrImg.onload = function () {
          var wrap = $('qr-wrap');
          if (wrap) wrap.style.display = 'block';
        };
      }

      if (navigator.share) {
        $('btn-native-share').style.display = 'block';
      }

      // Show share sheet immediately so host can share
      $('share-sheet').style.display = '';
      setStatus(true, 'Ready — waiting');
      toast('🎉 Ready! Share the link below.');

      // Listen for incoming tracker connections
      peer.on('connection', function (conn) {
        conn.on('data', function (data) {
          if (data.type !== 'location') return;
          handleTrackerData(conn.peer, data);
        });
        conn.on('close', function () {
          var t = S.trackers[conn.peer];
          if (t && t.marker) S.map.removeLayer(t.marker);
          delete S.trackers[conn.peer];
          renderArrivals();
          var n = Object.values(S.trackers).filter(function (x) { return x.data; }).length;
          setStatus(n > 0, n > 0 ? n + ' tracking' : 'Waiting…');
        });
      });

      peer.on('error', function (err) {
        console.error('PeerJS error:', err);
        setStatus('error', 'Error');
        toast('⚠️ Connection error. Try refreshing.');
      });

      // Keep updating own position so ETAs stay accurate
      S.watchId = navigator.geolocation.watchPosition(function (p) {
        S.ownPos = p;
        if (S.hostMarker) S.hostMarker.setLatLng([p.coords.latitude, p.coords.longitude]);
        // Recalculate ETAs
        Object.values(S.trackers).forEach(function (t) {
          if (t.data) {
            var km = haversineKm(t.data.lat, t.data.lng, p.coords.latitude, p.coords.longitude);
            t.data.eta  = fmtETA(km);
            t.data.dist = fmtDist(km);
          }
        });
        renderArrivals();
      }, null, { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });

    }).catch(function (err) {
      console.error('PeerJS setup failed:', err);
      setStatus('error', 'P2P error');
      toast('⚠️ Could not start real-time connection. Check your network.');
    });
  }

  function handleTrackerData(peerId, data) {
    var lat = data.lat, lng = data.lng;
    var name = data.name || 'Traveler';
    var cat  = data.category || 'family';

    var hLat = S.ownPos ? S.ownPos.coords.latitude  : (S.hostMarker ? S.hostMarker.getLatLng().lat : lat);
    var hLng = S.ownPos ? S.ownPos.coords.longitude : (S.hostMarker ? S.hostMarker.getLatLng().lng : lng);

    var km   = haversineKm(lat, lng, hLat, hLng);
    var eta  = fmtETA(km);
    var dist = fmtDist(km);

    var ico   = CAT_ICON[cat]  || '👤';
    var color = CAT_COLOR[cat] || '#00d4ff';
    var popup = '<b>' + esc(name) + '</b><br>' + esc(eta) + ' · ' + esc(dist);

    placeOrMoveMarker(peerId, lat, lng, ico, color, popup, false);

    if (!S.trackers[peerId]) S.trackers[peerId] = {};
    S.trackers[peerId].data = { lat: lat, lng: lng, name: name, category: cat, km: km, eta: eta, dist: dist };

    renderArrivals();

    var n = Object.values(S.trackers).filter(function (t) { return t.data; }).length;
    setStatus(true, n + (n === 1 ? ' tracking' : ' tracking'));
  }

  /* ─────────────────────────────────────────────────────────
     TRACKER  MODE
  ───────────────────────────────────────────────────────── */
  function runTracker(pos) {
    var params   = new URLSearchParams(location.search);
    var roomId   = params.get('room');
    var category = params.get('cat') || S.category;

    $('topbar-title').textContent = '📡 Live Location Sharing';
    $('arrivals-panel').style.display = 'none';
    $('tracker-bar').style.display = '';
    $('share-sheet').style.display = 'none';

    // Own marker — stored so watchPosition can move it
    var initialOwnMarker = L.marker([pos.coords.latitude, pos.coords.longitude], {
      icon: makeIcon('📍', '#10b981', false),
    }).addTo(S.map).bindPopup('<b>You — ' + esc(S.name) + '</b>').openPopup();

    if (!roomId) {
      $('tracker-status').textContent = 'No room found. Use a link shared with you.';
      setStatus('error', 'No room');
      return;
    }

    setStatus(false, 'Connecting…');
    $('tracker-status').textContent = 'Connecting to host…';

    createPeer().then(function (peer) {
      S.peer = peer;
      var conn = peer.connect(roomId, { reliable: true });

      function sendLoc(p) {
        if (conn.open) {
          conn.send({
            type:     'location',
            lat:      p.coords.latitude,
            lng:      p.coords.longitude,
            name:     S.name,
            category: category,
            accuracy: p.coords.accuracy,
            ts:       Date.now(),
          });
        }
      }

      var ownMarker = initialOwnMarker;

      conn.on('open', function () {
        setStatus(true, 'Live sharing');
        $('tracker-status').textContent = 'Sharing with host in real time';
        sendLoc(pos);
        toast('📡 Location sharing is live!');

        S.watchId = navigator.geolocation.watchPosition(function (p) {
          S.ownPos = p;
          sendLoc(p);
          if (ownMarker) {
            ownMarker.setLatLng([p.coords.latitude, p.coords.longitude]);
          }
        }, null, { enableHighAccuracy: true, maximumAge: 3000, timeout: 30000 });
      });

      conn.on('error', function (err) {
        console.error('Conn error:', err);
        setStatus('error', 'Error');
        $('tracker-status').textContent = 'Connection failed — is the link valid?';
      });

      conn.on('close', function () {
        setStatus('error', 'Disconnected');
        $('tracker-status').textContent = 'Disconnected from host';
        if (S.watchId !== null) navigator.geolocation.clearWatch(S.watchId);
      });

      peer.on('error', function (err) {
        console.error('Peer error:', err);
        setStatus('error', 'P2P error');
        $('tracker-status').textContent = 'Peer connection error';
      });

    }).catch(function (err) {
      console.error('createPeer failed:', err);
      setStatus('error', 'Failed');
      $('tracker-status').textContent = 'Could not establish connection';
    });
  }

  /* ─────────────────────────────────────────────────────────
     PUBLIC API  (window.App)
  ───────────────────────────────────────────────────────── */
  window.App = {

    selectMode: function (m) {
      S.mode = m;
      $('btn-host').classList.toggle('selected',    m === 'host');
      $('btn-tracker').classList.toggle('selected', m === 'tracker');

      $('field-category').style.display = m === 'host'    ? 'block' : 'none';
      $('field-name').style.display     = m === 'tracker' ? 'block' : 'none';
      $('cta-btn').style.display        = 'flex';

      if (m === 'host') {
        $('cta-icon').textContent = '📍';
        $('cta-text').textContent = 'Start Tracking Arrivals';
      } else {
        $('cta-icon').textContent = '🚗';
        $('cta-text').textContent = 'Share My Location';
      }
      clearError();
    },

    setCategory: function (cat) {
      S.category = cat;
      document.querySelectorAll('.cat-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.cat === cat);
      });
    },

    start: function () {
      if (!S.mode) { showError('Please choose your role above.'); return; }

      var btn = $('cta-btn');
      btn.disabled = true;
      $('cta-icon').textContent = '⏳';
      $('cta-text').textContent = 'Getting your location…';
      clearError();

      var nameEl = $('input-name');
      if (nameEl) S.name = nameEl.value.trim() || 'Anonymous';

      getPosition().then(function (pos) {
        S.ownPos = pos;
        showScreen('screen-map');
        initMap(pos.coords.latitude, pos.coords.longitude);

        if (S.mode === 'host') {
          runHost(pos);
        } else {
          runTracker(pos);
        }
      }).catch(function (err) {
        btn.disabled = false;
        $('cta-icon').textContent = S.mode === 'host' ? '📍' : '🚗';
        $('cta-text').textContent = S.mode === 'host' ? 'Start Tracking Arrivals' : 'Share My Location';
        showError(err.message);
      });
    },

    toggleShare: function (open) {
      var sheet = $('share-sheet');
      sheet.style.display = (open === undefined ? (sheet.style.display === 'none' ? '' : 'none') : (open ? '' : 'none'));
    },

    copyUrl: function () {
      var url = $('share-url').value;
      if (!url) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () { toast('✅ Link copied to clipboard!'); });
      } else {
        // Legacy fallback (execCommand is deprecated but still the only option on very old browsers)
        try {
          var inp = $('share-url');
          inp.select();
          document.execCommand('copy');
          toast('✅ Link copied!');
        } catch (e) {
          toast('⚠️ Could not copy — please copy the link manually.');
        }
      }
    },

    nativeShare: function () {
      if (!navigator.share) return;
      navigator.share({
        title: 'Track my arrival — ArriveTime',
        text: 'Tap this link to share your live location with me on ArriveTime!',
        url: S.shareUrl,
      }).catch(function () {});
    },

    goHome: function () {
      if (S.watchId !== null) { navigator.geolocation.clearWatch(S.watchId); S.watchId = null; }
      if (S.peer) { S.peer.destroy(); S.peer = null; }

      S.mode = null; S.trackers = {}; S.hostMarker = null; S.shareUrl = '';

      ['btn-host', 'btn-tracker'].forEach(function (id) {
        $(id).classList.remove('selected');
      });
      ['field-category', 'field-name'].forEach(function (id) {
        $(id).style.display = 'none';
      });
      $('cta-btn').style.display = 'none';
      $('tracker-bar').style.display = 'none';
      $('arrivals-panel').style.display = '';
      $('share-sheet').style.display = 'none';
      clearError();

      showScreen('screen-welcome');
    },
  };

  /* ─────────────────────────────────────────────────────────
     BOOT
  ───────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    showScreen('screen-loading');

    setTimeout(function () {
      showScreen('screen-welcome');

      // Auto-detect tracker mode when opened via share link
      var params = new URLSearchParams(location.search);
      if (params.get('room')) {
        App.selectMode('tracker');
        toast("👋 Someone's waiting for you — share your location!");
      }
    }, 1800);
  });

})();
