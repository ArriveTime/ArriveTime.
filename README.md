# ArriveTime 📍

> **Know exactly when they arrive** — real-time GPS location tracking for family, friends & business. No sign-up. No app install. 3 steps.

## What is ArriveTime?

ArriveTime is a browser-based real-time arrival tracker. Think of Google Maps **in reverse**: instead of navigating *to* a destination, you stay put and watch the people coming *to you* appear on a live map — complete with estimated arrival times.

## Features

| Feature | Details |
|---|---|
| 🗺️ Live map | Dark-themed Leaflet.js map powered by OpenStreetMap / CartoDB (free, no API key) |
| 📡 GPS/Wi-Fi/Cell | Uses the browser Geolocation API — works on GPS, Wi-Fi positioning, and cellular triangulation |
| 🔗 Shareable links | One-click shareable URL + QR code; no app download needed |
| 🚀 P2P real-time | WebRTC via PeerJS — location data flows directly between devices, never stored on a server |
| 📊 ETA calculation | Haversine distance + 40 km/h average speed estimate |
| 👨‍👩‍👧 / 👥 / 💼 | Family, Friends, and Business tracking modes with distinct colour-coded markers |
| 🔒 Private | Zero backend, zero sign-up, zero registration |

## 3-Step Usage

### Person Waiting (Host)
1. Open **ArriveTime** → tap **"I'm Waiting"** → choose Family / Friends / Business
2. Tap **"Start Tracking Arrivals"** → allow location access
3. Share the generated link (or QR code) with the people you're waiting for

### Person Arriving (Tracker)
1. Open the link sent to you
2. Enter your name and tap **"Share My Location"**
3. Your live position streams to the host in real time

## Technology Stack

| Library | Purpose | Cost |
|---|---|---|
| [Leaflet.js](https://leafletjs.com) 1.9.4 | Interactive map rendering | Free / Open Source |
| [CartoDB Dark Matter](https://carto.com/basemaps/) | Dark map tiles | Free (OSM data) |
| [PeerJS](https://peerjs.com) 1.5.2 | WebRTC peer-to-peer location streaming | Free public servers |
| Browser Geolocation API | GPS / Wi-Fi / Cell positioning | Built-in (free) |
| [QR Server API](https://goqr.me/api/) | QR code generation for sharing | Free |

## Project Structure

```
index.html        ← single-page app (loading, welcome, map screens)
css/
  styles.css      ← dark navy theme with cyan/purple neon accents
js/
  app.js          ← location, PeerJS, map, UI logic
```

## Running Locally

Just open `index.html` in a modern browser. No build step required.

For HTTPS (required for Geolocation on mobile):

```bash
# Python 3
python -m http.server 8080
# then visit https://localhost:8080 or use a local HTTPS proxy
```

> **Note:** The Geolocation API requires HTTPS in production. When deployed to any HTTPS host (GitHub Pages, Netlify, Vercel, etc.) the app works out of the box.
