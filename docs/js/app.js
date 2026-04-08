// ══════════════════════════════
//  STATE
// ══════════════════════════════
let map, myMarker, myLat, myLng;
let watchId = null;
let satellite = false;
let people = [];
let selectedPerson = null;
let tileLayer;

const SESSION_ID = Array.from(crypto.getRandomValues(new Uint8Array(6)), b => b.toString(36)).join('').substr(0, 9);
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost'
  : window.location.origin;

const GROUP_COLORS = {
  family: '#06d6a0',
  friends: '#f72585',
  business: '#fbbf24'
};
const GROUP_EMOJIS = { family: '🏠', friends: '🎉', business: '💼' };

// ══════════════════════════════
//  LANDING → APP
// ══════════════════════════════
function launchApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  initMap();
  startGPS();
  updateShareLink();
  setTimeout(seedDemoData, 1500);
}

// ══════════════════════════════
//  MAP INIT
// ══════════════════════════════
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false });

  tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  map.setView([37.7749, -122.4194], 12);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.control.attribution({ position: 'bottomright', prefix: '© OSM' }).addTo(map);
}

// ══════════════════════════════
//  GPS / GEOLOCATION
// ══════════════════════════════
function startGPS() {
  if (!navigator.geolocation) {
    document.getElementById('myCoords').textContent = 'GPS not supported';
    return;
  }

  const opts = {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 15000
  };

  navigator.geolocation.getCurrentPosition(onPosition, onGPSError, opts);
  watchId = navigator.geolocation.watchPosition(onPosition, onGPSError, opts);
}

function onPosition(pos) {
  myLat = pos.coords.latitude;
  myLng = pos.coords.longitude;
  const acc = Math.round(pos.coords.accuracy);

  document.getElementById('myCoords').textContent =
    `${myLat.toFixed(5)}, ${myLng.toFixed(5)}`;
  document.getElementById('myAccuracy').textContent =
    `±${acc}m accuracy · ${getSourceLabel(pos)}`;

  if (!myMarker) {
    myMarker = L.marker([myLat, myLng], { icon: createMyIcon() }).addTo(map);
    map.setView([myLat, myLng], 14);
  } else {
    myMarker.setLatLng([myLat, myLng]);
  }

  updateAllETAs();
}

function getSourceLabel(pos) {
  const acc = pos.coords.accuracy;
  if (acc < 20) return 'GPS';
  if (acc < 100) return 'GPS/WiFi';
  return 'WiFi/Cell';
}

function onGPSError(err) {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => {
      myLat = d.latitude; myLng = d.longitude;
      document.getElementById('myCoords').textContent = `${myLat.toFixed(4)}, ${myLng.toFixed(4)}`;
      document.getElementById('myAccuracy').textContent = 'IP Location (approx.)';
      if (!myMarker) {
        myMarker = L.marker([myLat, myLng], { icon: createMyIcon() }).addTo(map);
        map.setView([myLat, myLng], 12);
      }
      updateAllETAs();
    })
    .catch(() => {
      document.getElementById('myCoords').textContent = 'Location unavailable';
    });
}

// ══════════════════════════════
//  ICONS
// ══════════════════════════════
function createMyIcon() {
  return L.divIcon({
    html: `
      <div style="
        width:44px;height:44px;border-radius:50%;
        background:linear-gradient(135deg,#3b82f6,#06d6a0);
        display:grid;place-items:center;font-size:20px;
        border:3px solid #fff;box-shadow:0 0 20px rgba(59,130,246,0.5);
        animation:pulse 2s ease infinite;
      ">📍</div>
      <style>@keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.5);}50%{box-shadow:0 0 40px rgba(59,130,246,0.9);}}</style>`,
    iconSize: [44, 44], iconAnchor: [22, 22], className: ''
  });
}

function createPersonIcon(p) {
  const color = GROUP_COLORS[p.group];
  return L.divIcon({
    html: `<div style="
      width:40px;height:40px;border-radius:50%;
      background:${color}22;border:2.5px solid ${color};
      display:grid;place-items:center;font-size:18px;
      box-shadow:0 0 16px ${color}55;cursor:pointer;
      backdrop-filter:blur(4px);
    ">${p.emoji}</div>
    <div style="
      position:absolute;top:42px;left:50%;transform:translateX(-50%);
      background:rgba(8,12,20,0.9);border:1px solid ${color}66;
      border-radius:6px;padding:3px 8px;white-space:nowrap;
      font-size:0.7rem;color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;
    ">${p.name} ${p.etaLabel || ''}</div>`,
    iconSize: [40, 40], iconAnchor: [20, 20], className: ''
  });
}

// ══════════════════════════════
//  PEOPLE MANAGEMENT
// ══════════════════════════════
function openAddModal(group) {
  document.getElementById('addGroup').value = group;
  document.getElementById('addName').value = '';
  document.getElementById('addEmoji').value = group === 'family' ? '👤' : group === 'friends' ? '🙂' : '💼';
  document.getElementById('addModal').classList.add('open');
  setTimeout(() => document.getElementById('addName').focus(), 100);
}

function closeModal() {
  document.getElementById('addModal').classList.remove('open');
}

function confirmAdd() {
  const name = document.getElementById('addName').value.trim();
  const group = document.getElementById('addGroup').value;
  const emoji = document.getElementById('addEmoji').value.trim() || '👤';
  if (!name) { document.getElementById('addName').focus(); return; }

  const id = 'p_' + Math.random().toString(36).substr(2, 6);
  const baseLat = myLat || 37.7749;
  const baseLng = myLng || -122.4194;
  const lat = baseLat + (Math.random() - 0.5) * 0.08;
  const lng = baseLng + (Math.random() - 0.5) * 0.12;

  const person = { id, name, group, emoji, lat, lng, etaLabel: '' };
  person.marker = L.marker([lat, lng], { icon: createPersonIcon(person) })
    .addTo(map)
    .on('click', () => selectPerson(person));

  people.push(person);
  updateAllETAs();
  renderLists();
  closeModal();

  startSimulatedMovement(person);

  showToast(`✅ ${name} added! Link ready to share.`);
  map.flyTo([lat, lng], 13, { duration: 1.2 });
}

function selectPerson(p) {
  selectedPerson = p;
  document.querySelectorAll('.person-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById('card_' + p.id);
  if (card) card.classList.add('active');
  showArrivalBanner(p);
  map.flyTo([p.lat, p.lng], 14, { duration: 0.8 });
}

function showArrivalBanner(p) {
  const banner = document.getElementById('arrivalBanner');
  document.getElementById('bannerName').textContent = p.emoji + ' ' + p.name;
  document.getElementById('bannerEta').textContent = p.etaLabel || '—';
  document.getElementById('bannerSub').textContent = `${GROUP_EMOJIS[p.group]} ${p.group.charAt(0).toUpperCase() + p.group.slice(1)} · Tap map to dismiss`;
  banner.classList.add('visible');
}

map?.on('click', () => {
  document.getElementById('arrivalBanner').classList.remove('visible');
  selectedPerson = null;
});

// ══════════════════════════════
//  ETA CALCULATION
// ══════════════════════════════
function calcETA(p) {
  if (!myLat) return null;
  const dist = haversine(myLat, myLng, p.lat, p.lng);
  const speed = 40;
  const minutes = Math.round((dist / speed) * 60);
  return minutes;
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatETA(mins) {
  if (mins === null) return '—';
  if (mins < 1) return '🟢 Arrived';
  if (mins < 60) return `🕐 ${mins} min`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return `🕐 ${h}h ${m}m`;
}

function updateAllETAs() {
  people.forEach(p => {
    const mins = calcETA(p);
    p.etaMins = mins;
    p.etaLabel = formatETA(mins);
    if (p.marker) p.marker.setIcon(createPersonIcon(p));
  });
  renderLists();
  if (selectedPerson) showArrivalBanner(selectedPerson);
}

// ══════════════════════════════
//  SIMULATED MOVEMENT
// ══════════════════════════════
function startSimulatedMovement(p) {
  const destLat = myLat || 37.7749;
  const destLng = myLng || -122.4194;
  const steps = 120;
  let step = 0;
  const startLat = p.lat, startLng = p.lng;

  const interval = setInterval(() => {
    step++;
    const t = step / steps;
    const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    p.lat = startLat + (destLat - startLat) * ease + (Math.random()-0.5)*0.003;
    p.lng = startLng + (destLng - startLng) * ease + (Math.random()-0.5)*0.003;

    if (p.marker) p.marker.setLatLng([p.lat, p.lng]);
    updateAllETAs();

    if (step >= steps) {
      clearInterval(interval);
      p.lat = destLat; p.lng = destLng;
      if (p.marker) p.marker.setLatLng([p.lat, p.lng]);
      triggerArrivalNotification(p);
    }
  }, 3000);
}

function triggerArrivalNotification(p) {
  showToast(`🎉 ${p.name} has arrived!`);
  if (Notification.permission === 'granted') {
    new Notification(`ArriveTime: ${p.name} arrived!`, {
      body: 'They have reached your location.',
      icon: '📍'
    });
  }
  Notification.requestPermission?.();
}

// ══════════════════════════════
//  RENDER LISTS
// ══════════════════════════════
function renderLists() {
  ['family', 'friends', 'business'].forEach(g => {
    const list = document.getElementById(g + '-list');
    const grouped = people.filter(p => p.group === g);
    if (grouped.length === 0) {
      list.innerHTML = `<div style="font-size:0.8rem;color:var(--muted);padding:8px 0 4px;">No ${g} tracked yet.</div>`;
      return;
    }
    list.innerHTML = grouped.map(p => `
      <div class="person-card ${selectedPerson?.id === p.id ? 'active' : ''}" id="card_${p.id}" onclick="selectPersonById('${p.id}')">
        <div class="avatar" style="background:${GROUP_COLORS[p.group]}22;border-color:${GROUP_COLORS[p.group]}">${p.emoji}</div>
        <div class="person-info">
          <div class="person-name">${p.name}</div>
          <div class="person-eta">
            <span>${p.etaLabel}</span>
            ${p.etaMins !== null && p.etaMins < 5 ? '<span style="color:var(--accent2);font-size:0.7rem;margin-left:4px;">Almost here!</span>' : ''}
          </div>
        </div>
        <div class="status-dot" style="background:${p.etaMins !== null && p.etaMins < 1 ? 'var(--accent2)' : 'var(--accent)'}"></div>
      </div>
    `).join('');
  });
}

function selectPersonById(id) {
  const p = people.find(x => x.id === id);
  if (p) selectPerson(p);
}

// ══════════════════════════════
//  DEMO DATA
// ══════════════════════════════
function seedDemoData() {
  const demos = [
    { name: 'Mom', group: 'family', emoji: '👩' },
    { name: 'Jake', group: 'friends', emoji: '🧑' },
    { name: 'Dr. Smith', group: 'business', emoji: '💼' }
  ];
  demos.forEach(d => {
    document.getElementById('addName').value = d.name;
    document.getElementById('addGroup').value = d.group;
    document.getElementById('addEmoji').value = d.emoji;
    confirmAdd();
  });
  showToast('👋 Demo people added — they\'re heading your way!');
}

// ══════════════════════════════
//  MAP CONTROLS
// ══════════════════════════════
function centerOnMe() {
  if (myLat) map.flyTo([myLat, myLng], 15, { duration: 1 });
}

function fitAll() {
  const bounds = [];
  if (myLat) bounds.push([myLat, myLng]);
  people.forEach(p => bounds.push([p.lat, p.lng]));
  if (bounds.length > 0) map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
}

function toggleSatellite() {
  satellite = !satellite;
  const btn = document.getElementById('satBtn');
  if (satellite) {
    tileLayer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    map.getContainer().querySelectorAll('.leaflet-tile').forEach(t => t.style.filter = 'none');
    btn.textContent = '🗺';
  } else {
    tileLayer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.getContainer().querySelectorAll('.leaflet-tile').forEach(t => t.style.filter = '');
    btn.textContent = '🛰';
  }
}

// ══════════════════════════════
//  SHARE
// ══════════════════════════════
function updateShareLink() {
  const link = `${BASE_URL}/share/${SESSION_ID}`;
  document.getElementById('shareLinkText').textContent = link;
  document.getElementById('shareLinkBox').setAttribute('data-link', link);
}

function copyShareLink() {
  const link = document.getElementById('shareLinkBox').getAttribute('data-link')
    || document.getElementById('shareLinkText').textContent;
  navigator.clipboard.writeText(link).then(() => showToast('📋 Link copied! Send it to anyone.')).catch(() => {});
}

function shareVia(method) {
  const link = document.getElementById('shareLinkText').textContent;
  const text = `Track me live on ArriveTime: ${link}`;
  if (method === 'native' && navigator.share) {
    navigator.share({ title: 'ArriveTime', text, url: link });
  } else if (method === 'sms') {
    window.open(`sms:?body=${encodeURIComponent(text)}`);
  } else if (method === 'email') {
    window.open(`mailto:?subject=Track my arrival&body=${encodeURIComponent(text)}`);
  } else {
    navigator.clipboard.writeText(link).then(() => showToast('📋 Link copied!')).catch(() => {});
  }
}

// ══════════════════════════════
//  TOAST
// ══════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

window._mapClickHandler = () => {
  document.getElementById('arrivalBanner').classList.remove('visible');
};

setInterval(updateAllETAs, 30000);
