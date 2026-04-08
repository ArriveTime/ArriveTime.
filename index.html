<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>ArriveTime — Know Before They Arrive</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
  :root {
    --bg: #080c14;
    --surface: #0f1724;
    --surface2: #161f30;
    --border: rgba(99,179,255,0.12);
    --accent: #3b82f6;
    --accent2: #06d6a0;
    --accent3: #f72585;
    --text: #e8f0ff;
    --muted: #6b7fa3;
    --card: rgba(15,23,36,0.85);
    --glow: rgba(59,130,246,0.25);
    --family: #06d6a0;
    --friends: #f72585;
    --business: #fbbf24;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ─── ANIMATED BG GRID ─── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none; z-index: 0;
    animation: gridShift 20s linear infinite;
  }
  @keyframes gridShift { from { background-position: 0 0; } to { background-position: 48px 48px; } }

  /* ─── HERO / LANDING ─── */
  #landing {
    position: relative; z-index: 1;
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 20px;
    text-align: center;
  }

  .logo-wrap {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 28px;
    animation: fadeDown 0.7s ease both;
  }
  .logo-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 16px;
    display: grid; place-items: center;
    font-size: 26px;
    box-shadow: 0 0 32px var(--glow);
  }
  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 2rem; font-weight: 800;
    background: linear-gradient(90deg, #fff, var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
  }

  .hero-tag {
    font-size: 0.78rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    color: var(--accent2); margin-bottom: 20px;
    animation: fadeDown 0.7s 0.1s ease both;
  }
  h1 {
    font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 7vw, 4.5rem);
    font-weight: 800; line-height: 1.05;
    max-width: 760px;
    background: linear-gradient(135deg, #fff 40%, rgba(99,179,255,0.7));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: fadeDown 0.7s 0.15s ease both;
    margin-bottom: 20px;
  }
  .hero-sub {
    color: var(--muted); font-size: 1.1rem; max-width: 540px;
    line-height: 1.7; margin-bottom: 40px;
    animation: fadeDown 0.7s 0.25s ease both;
  }

  /* ─── STEPS STRIP ─── */
  .steps-strip {
    display: flex; gap: 0; margin-bottom: 44px;
    border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
    background: var(--surface);
    animation: fadeDown 0.7s 0.35s ease both;
  }
  .step-item {
    padding: 18px 28px; display: flex; align-items: center; gap: 12px;
    flex: 1; position: relative;
  }
  .step-item:not(:last-child)::after {
    content: '→'; position: absolute; right: -10px;
    color: var(--accent); font-size: 1.1rem; z-index: 2;
  }
  .step-item:not(:last-child) { border-right: 1px solid var(--border); }
  .step-num {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: grid; place-items: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem;
    flex-shrink: 0; color: #fff;
  }
  .step-info { text-align: left; }
  .step-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
  .step-desc { font-size: 0.9rem; font-weight: 500; color: var(--text); }

  /* ─── CATEGORY CARDS ─── */
  .category-cards {
    display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
    animation: fadeDown 0.7s 0.45s ease both;
    margin-bottom: 36px;
  }
  .cat-card {
    padding: 16px 22px; border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer; transition: all 0.2s ease;
    display: flex; align-items: center; gap: 10px;
    font-weight: 500; font-size: 0.95rem;
  }
  .cat-card:hover { transform: translateY(-3px); }
  .cat-card.family { border-color: var(--family); box-shadow: 0 0 20px rgba(6,214,160,0.15); }
  .cat-card.friends { border-color: var(--friends); box-shadow: 0 0 20px rgba(247,37,133,0.15); }
  .cat-card.business { border-color: var(--business); box-shadow: 0 0 20px rgba(251,191,36,0.15); }
  .cat-dot { width: 10px; height: 10px; border-radius: 50%; }

  /* ─── CTA ─── */
  .cta-btn {
    padding: 18px 44px; border-radius: 50px;
    background: linear-gradient(135deg, var(--accent), #1d4ed8);
    color: #fff; font-family: 'Syne', sans-serif;
    font-size: 1.05rem; font-weight: 700;
    border: none; cursor: pointer;
    box-shadow: 0 0 40px var(--glow);
    transition: all 0.2s ease;
    animation: fadeDown 0.7s 0.5s ease both;
    letter-spacing: 0.3px;
  }
  .cta-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 60px var(--glow); }

  .no-reg { font-size: 0.78rem; color: var(--muted); margin-top: 14px;
    animation: fadeDown 0.7s 0.6s ease both; }

  /* ─── APP ─── */
  #app { display: none; position: relative; z-index: 1; min-height: 100vh; }

  /* ─── TOP NAV ─── */
  .app-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 24px;
    background: rgba(8,12,20,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem;
    background: linear-gradient(90deg, #fff, var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-pulse { display: flex; align-items: center; gap: 7px; font-size: 0.78rem; color: var(--accent2); font-weight: 500; }
  .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent2); animation: pulse 1.8s ease infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.4);} }

  /* ─── LAYOUT ─── */
  .app-body {
    display: flex; height: 100vh; padding-top: 60px;
  }

  /* ─── SIDEBAR ─── */
  .sidebar {
    width: 340px; flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    overflow-y: auto; display: flex; flex-direction: column;
    scrollbar-width: thin; scrollbar-color: var(--border) transparent;
  }

  /* STEP 1 — SHARE LINK */
  .share-panel {
    padding: 20px;
    border-bottom: 1px solid var(--border);
  }
  .panel-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem;
    text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted);
    margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
  }
  .badge {
    background: var(--accent); color: #fff; border-radius: 50%;
    width: 20px; height: 20px; display: grid; place-items: center;
    font-size: 0.7rem; font-weight: 700;
  }

  .share-link-box {
    display: flex; gap: 8px; align-items: center;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 14px;
    font-size: 0.8rem; color: var(--muted);
    word-break: break-all; cursor: pointer;
    transition: border-color 0.2s;
  }
  .share-link-box:hover { border-color: var(--accent); }
  .share-link-box .link-text { flex: 1; color: var(--accent); font-weight: 500; }

  .share-btns { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
  .share-btn {
    flex: 1; min-width: 80px; padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--surface2);
    color: var(--text); font-size: 0.8rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .share-btn:hover { border-color: var(--accent); background: rgba(59,130,246,0.1); }

  /* GROUPS */
  .groups-panel { padding: 20px; flex: 1; }
  .group-section { margin-bottom: 24px; }
  .group-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .group-name {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem;
    display: flex; align-items: center; gap: 8px;
  }
  .group-color { width: 8px; height: 8px; border-radius: 50%; }
  .add-btn {
    font-size: 0.75rem; color: var(--accent); cursor: pointer; background: none; border: none;
    padding: 4px 8px; border-radius: 6px; transition: background 0.2s;
  }
  .add-btn:hover { background: rgba(59,130,246,0.1); }

  /* PERSON CARD */
  .person-card {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 12px; padding: 12px 14px;
    margin-bottom: 8px; cursor: pointer;
    transition: all 0.2s; display: flex; align-items: center; gap: 12px;
  }
  .person-card:hover { border-color: var(--accent); transform: translateX(2px); }
  .person-card.active { border-color: var(--accent); background: rgba(59,130,246,0.08); }
  .avatar {
    width: 38px; height: 38px; border-radius: 50%;
    display: grid; place-items: center; font-size: 1rem;
    flex-shrink: 0; border: 2px solid transparent;
  }
  .person-info { flex: 1; min-width: 0; }
  .person-name { font-weight: 600; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .person-eta { font-size: 0.78rem; color: var(--muted); display: flex; align-items: center; gap: 4px; }
  .eta-time { font-weight: 600; }
  .status-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    animation: pulse 2s ease infinite;
  }

  /* ADD PERSON MODAL */
  .modal-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.6); z-index: 9000;
    backdrop-filter: blur(8px);
    align-items: center; justify-content: center;
  }
  .modal-overlay.open { display: flex; }
  .modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 28px; width: 90%; max-width: 380px;
    animation: scaleIn 0.25s ease;
  }
  @keyframes scaleIn { from{transform:scale(0.92);opacity:0;} to{transform:scale(1);opacity:1;} }
  .modal-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem;
    margin-bottom: 20px;
  }
  .form-field { margin-bottom: 14px; }
  .form-label { font-size: 0.78rem; color: var(--muted); margin-bottom: 6px; display: block; text-transform: uppercase; letter-spacing: 0.8px; }
  .form-input {
    width: 100%; padding: 11px 14px; border-radius: 10px;
    border: 1px solid var(--border); background: var(--bg);
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-select { appearance: none; cursor: pointer; }
  .modal-btns { display: flex; gap: 10px; margin-top: 20px; }
  .btn-cancel {
    flex: 1; padding: 11px; border-radius: 10px; border: 1px solid var(--border);
    background: none; color: var(--muted); cursor: pointer; font-size: 0.9rem; transition: all 0.2s;
  }
  .btn-cancel:hover { border-color: var(--text); color: var(--text); }
  .btn-confirm {
    flex: 2; padding: 11px; border-radius: 10px; border: none;
    background: linear-gradient(135deg, var(--accent), #1d4ed8);
    color: #fff; font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.9rem; cursor: pointer; transition: all 0.2s;
  }
  .btn-confirm:hover { opacity: 0.9; }

  /* ─── MAP AREA ─── */
  .map-area { flex: 1; position: relative; }
  #map { width: 100%; height: 100%; }

  /* MAP OVERLAY TOP RIGHT */
  .map-controls {
    position: absolute; top: 16px; right: 16px; z-index: 500;
    display: flex; flex-direction: column; gap: 8px;
  }
  .map-ctrl-btn {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(15,23,36,0.92); border: 1px solid var(--border);
    color: var(--text); font-size: 1.1rem; cursor: pointer;
    display: grid; place-items: center; transition: all 0.2s;
    backdrop-filter: blur(12px);
  }
  .map-ctrl-btn:hover { border-color: var(--accent); background: rgba(59,130,246,0.15); }

  /* ARRIVAL BANNER */
  .arrival-banner {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
    z-index: 500; background: rgba(15,23,36,0.95);
    border: 1px solid var(--border); border-radius: 16px;
    padding: 16px 24px; backdrop-filter: blur(20px);
    min-width: 280px; text-align: center;
    display: none;
  }
  .arrival-banner.visible { display: block; animation: slideUp 0.4s ease; }
  @keyframes slideUp { from{transform:translateX(-50%) translateY(20px);opacity:0;} to{transform:translateX(-50%) translateY(0);opacity:1;} }
  .banner-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
  .banner-eta { font-size: 2rem; font-weight: 300; color: var(--accent2); font-family: 'Syne', sans-serif; }
  .banner-sub { font-size: 0.78rem; color: var(--muted); margin-top: 4px; }

  /* ─── MY LOCATION PANEL ─── */
  .my-location-panel {
    position: absolute; top: 16px; left: 16px; z-index: 500;
    background: rgba(15,23,36,0.92); border: 1px solid var(--border);
    border-radius: 14px; padding: 12px 16px;
    backdrop-filter: blur(12px); min-width: 200px;
  }
  .ml-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .ml-coords { font-size: 0.82rem; color: var(--accent); font-weight: 500; }
  .ml-accuracy { font-size: 0.72rem; color: var(--muted); margin-top: 2px; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 30px; right: 24px; z-index: 9999;
    background: var(--surface2); border: 1px solid var(--accent2);
    border-radius: 12px; padding: 14px 20px;
    font-size: 0.88rem; color: var(--text); font-weight: 500;
    display: none; animation: slideUp 0.3s ease;
    max-width: 280px; box-shadow: 0 0 30px rgba(6,214,160,0.2);
  }
  .toast.show { display: block; }

  /* ANIMATIONS */
  @keyframes fadeDown { from{transform:translateY(-20px);opacity:0;} to{transform:translateY(0);opacity:1;} }

  /* RESPONSIVE */
  @media (max-width: 700px) {
    .steps-strip { flex-direction: column; }
    .step-item:not(:last-child)::after { content: '↓'; right: auto; left: 50%; transform: translateX(-50%); bottom: -12px; top: auto; }
    .step-item:not(:last-child) { border-right: none; border-bottom: 1px solid var(--border); padding-bottom: 14px; margin-bottom: 12px; }
    .app-body { flex-direction: column; }
    .sidebar { width: 100%; height: 280px; border-right: none; border-bottom: 1px solid var(--border); }
    .map-area { flex: 1; min-height: 300px; }
    .my-location-panel { display: none; }
  }

  /* Leaflet dark overrides */
  .leaflet-tile { filter: invert(1) hue-rotate(190deg) brightness(0.85) saturate(1.3); }
  .leaflet-container { background: var(--bg); }
</style>
</head>
<body>

<!-- ══════════════════ LANDING ══════════════════ -->
<div id="landing">
  <div class="logo-wrap">
    <div class="logo-icon">📍</div>
    <div class="logo-text">ArriveTime</div>
  </div>

  <div class="hero-tag">Real-Time GPS · No Registration</div>
  <h1>Know Before<br>They Arrive</h1>
  <p class="hero-sub">Track family, friends & appointments on a live map. Share your link, see everyone moving in real time — no app download, no signup.</p>

  <div class="steps-strip">
    <div class="step-item">
      <div class="step-num">1</div>
      <div class="step-info">
        <div class="step-label">Share</div>
        <div class="step-desc">Send your link</div>
      </div>
    </div>
    <div class="step-item">
      <div class="step-num">2</div>
      <div class="step-info">
        <div class="step-label">Add</div>
        <div class="step-desc">Name your people</div>
      </div>
    </div>
    <div class="step-item">
      <div class="step-num">3</div>
      <div class="step-info">
        <div class="step-label">Watch</div>
        <div class="step-desc">See arrivals live</div>
      </div>
    </div>
  </div>

  <div class="category-cards">
    <div class="cat-card family">
      <div class="cat-dot" style="background:var(--family)"></div>
      🏠 Family
    </div>
    <div class="cat-card friends">
      <div class="cat-dot" style="background:var(--friends)"></div>
      🎉 Friends
    </div>
    <div class="cat-card business">
      <div class="cat-dot" style="background:var(--business)"></div>
      💼 Business
    </div>
  </div>

  <button class="cta-btn" onclick="launchApp()">📍 Start Tracking Now</button>
  <p class="no-reg">✓ No account &nbsp;·&nbsp; ✓ No app download &nbsp;·&nbsp; ✓ Free forever</p>
</div>

<!-- ══════════════════ APP ══════════════════ -->
<div id="app">
  <!-- NAV -->
  <nav class="app-nav">
    <div class="nav-logo">📍 ArriveTime</div>
    <div class="nav-pulse">
      <div class="pulse-dot"></div>
      Live Tracking
    </div>
    <button class="share-btn" onclick="copyShareLink()" style="width:auto;padding:7px 14px;border-radius:8px;font-size:0.8rem;">🔗 Share My Link</button>
  </nav>

  <div class="app-body">
    <!-- SIDEBAR -->
    <div class="sidebar">

      <!-- STEP 1: SHARE -->
      <div class="share-panel">
        <div class="panel-title"><span class="badge">1</span> Your Tracking Link</div>
        <div class="share-link-box" onclick="copyShareLink()" id="shareLinkBox">
          <span class="link-text" id="shareLinkText">arrivetime.com/track/...</span>
          <span>📋</span>
        </div>
        <div class="share-btns" style="margin-top:10px;">
          <button class="share-btn" onclick="shareVia('sms')">💬 Text</button>
          <button class="share-btn" onclick="shareVia('email')">📧 Email</button>
          <button class="share-btn" onclick="shareVia('copy')">📋 Copy</button>
          <button class="share-btn" onclick="shareVia('native')">⬆️ Share</button>
        </div>
      </div>

      <!-- STEP 2 & 3: GROUPS -->
      <div class="groups-panel">
        <div class="panel-title" style="margin-bottom:18px;"><span class="badge">2</span> Who Are You Tracking?</div>

        <!-- FAMILY -->
        <div class="group-section">
          <div class="group-header">
            <div class="group-name">
              <div class="group-color" style="background:var(--family)"></div>
              🏠 Family
            </div>
            <button class="add-btn" onclick="openAddModal('family')">+ Add</button>
          </div>
          <div id="family-list"></div>
        </div>

        <!-- FRIENDS -->
        <div class="group-section">
          <div class="group-header">
            <div class="group-name">
              <div class="group-color" style="background:var(--friends)"></div>
              🎉 Friends
            </div>
            <button class="add-btn" onclick="openAddModal('friends')">+ Add</button>
          </div>
          <div id="friends-list"></div>
        </div>

        <!-- BUSINESS -->
        <div class="group-section">
          <div class="group-header">
            <div class="group-name">
              <div class="group-color" style="background:var(--business)"></div>
              💼 Business
            </div>
            <button class="add-btn" onclick="openAddModal('business')">+ Add</button>
          </div>
          <div id="business-list"></div>
        </div>
      </div>
    </div>

    <!-- MAP -->
    <div class="map-area">
      <div id="map"></div>

      <!-- MY LOCATION -->
      <div class="my-location-panel">
        <div class="ml-label">📍 My Location</div>
        <div class="ml-coords" id="myCoords">Acquiring GPS...</div>
        <div class="ml-accuracy" id="myAccuracy"></div>
      </div>

      <!-- MAP CONTROLS -->
      <div class="map-controls">
        <button class="map-ctrl-btn" onclick="centerOnMe()" title="Center on me">🎯</button>
        <button class="map-ctrl-btn" onclick="fitAll()" title="Fit all">👁</button>
        <button class="map-ctrl-btn" onclick="toggleSatellite()" title="Toggle style" id="satBtn">🛰</button>
      </div>

      <!-- ARRIVAL BANNER -->
      <div class="arrival-banner" id="arrivalBanner">
        <div class="banner-name" id="bannerName">—</div>
        <div class="banner-eta" id="bannerEta">—</div>
        <div class="banner-sub" id="bannerSub">Estimated arrival time</div>
      </div>
    </div>
  </div>
</div>

<!-- ADD PERSON MODAL -->
<div class="modal-overlay" id="addModal">
  <div class="modal">
    <div class="modal-title">➕ Add Person</div>
    <div class="form-field">
      <label class="form-label">Name</label>
      <input class="form-input" id="addName" placeholder="e.g. Sarah, Dad, Dr. Kim" />
    </div>
    <div class="form-field">
      <label class="form-label">Group</label>
      <select class="form-input form-select" id="addGroup">
        <option value="family">🏠 Family</option>
        <option value="friends">🎉 Friends</option>
        <option value="business">💼 Business</option>
      </select>
    </div>
    <div class="form-field">
      <label class="form-label">Emoji / Icon</label>
      <input class="form-input" id="addEmoji" placeholder="e.g. 👩 👴 🚗" maxlength="4" value="👤" />
    </div>
    <div class="form-field">
      <label class="form-label" style="font-size:0.7rem;color:var(--muted)">
        Share their unique link so they can share location with you
      </label>
    </div>
    <div class="modal-btns">
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      <button class="btn-confirm" onclick="confirmAdd()">Add & Generate Link</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast">✅ Copied to clipboard!</div>

<script>
// ══════════════════════════════
//  STATE
// ══════════════════════════════
let map, myMarker, myLat, myLng;
let watchId = null;
let satellite = false;
let people = [];
let selectedPerson = null;
let tileLayer;

const SESSION_ID = Math.random().toString(36).substr(2, 9);
const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost'
  : 'https://arrivetime.com';

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

document.addEventListener('DOMContentLoaded', () => {});

window._mapClickHandler = () => {
  document.getElementById('arrivalBanner').classList.remove('visible');
};

setInterval(updateAllETAs, 30000);
</script>
</body>
</html>
