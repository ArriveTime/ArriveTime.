# 📍 ArriveTime

> **Know Before They Arrive** — Real-time GPS tracking for family, friends & appointments. No app download, no signup, free forever.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-arrivetime.com-blue?style=for-the-badge)](https://arrivetime.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)
[![No Registration](https://img.shields.io/badge/No%20Registration-Required-brightgreen?style=for-the-badge)](#)

---

## 🌟 Overview

ArriveTime is a **single-page web application** that lets you track the live location of family members, friends, and business contacts on an interactive map — all without requiring anyone to download an app or create an account.

Simply open the page, share your unique tracking link, and watch people's locations update in real time as they head your way.

---

## ✨ Key Features

- 🗺️ **Live Map Tracking** — Interactive map powered by Leaflet.js with real-time location updates
- 📡 **Real-Time GPS** — Uses the browser's Geolocation API (falls back to IP location automatically)
- 🔗 **Instant Share Links** — Generate a unique session link and share it via SMS, email, or the native share menu
- 👥 **3 Tracking Groups** — Organise contacts into **Family** 🟢, **Friends** 🔴, and **Business** 🟡
- ⏱️ **ETA Calculation** — Haversine-based distance and estimated arrival time shown on the map and sidebar
- 🔔 **Arrival Notifications** — Browser push notifications when someone arrives
- 🛰️ **Satellite / Street Toggle** — Switch between OpenStreetMap street view and ArcGIS satellite imagery
- 📋 **No Registration** — Zero accounts, zero app downloads, completely free
- 📱 **Mobile-Friendly** — Responsive design that works on any screen size

---

## 🚀 Live Demo

👉 **[arrivetime.com](https://arrivetime.com)**

The demo auto-loads three sample contacts (Mom 👩, Jake 🧑, Dr. Smith 💼) who simulate moving toward your location so you can see every feature without needing real contacts.

---

## ⚡ Quick Start

Because ArriveTime is a static single-file web app, there is no build step:

### Option 1 — Open directly in your browser

```bash
# Clone the repo
git clone https://github.com/ArriveTime/ArriveTime..git
cd ArriveTime.

# Open the app
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

> **Note:** The Geolocation API requires a **secure origin** (HTTPS or `localhost`). Opening the file directly via `file://` may prevent GPS from working.

### Option 2 — Serve locally over HTTPS

```bash
# Using Python's built-in server (HTTP only — GPS may be blocked)
python3 -m http.server 8080
# Then visit http://localhost:8080

# Using the VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"
```

---

## 🗺️ How It Works

```
  ┌─────────────┐    ┌─────────────┐    ┌──────────────────┐
  │  1. SHARE   │ →  │   2. ADD    │ →  │    3. WATCH      │
  │             │    │             │    │                  │
  │ Copy your   │    │ Enter the   │    │ See everyone's   │
  │ unique link │    │ names &     │    │ live location    │
  │ & send it   │    │ groups of   │    │ & ETA on the     │
  │ to anyone   │    │ who to      │    │ interactive map  │
  │             │    │ track       │    │                  │
  └─────────────┘    └─────────────┘    └──────────────────┘
```

1. **Share** — Open ArriveTime and click **"🔗 Share My Link"** to copy your unique session URL. Send it via SMS, email, or any messaging app.
2. **Add** — Click **"+ Add"** under Family, Friends, or Business to add the people you're expecting.
3. **Watch** — The map updates in real time showing each person's position and estimated time of arrival.

---

## 🔍 Features Breakdown

### 📍 Location Tracking
- Uses `navigator.geolocation.watchPosition()` for continuous GPS updates
- Falls back to IP-based geolocation (`ipapi.co`) if GPS is unavailable or denied
- Displays coordinates and accuracy (GPS / GPS+WiFi / WiFi+Cell) in real time

### 👥 Group Categories
| Group    | Colour | Emoji | Use Case |
|----------|--------|-------|----------|
| Family   | 🟢 Green  | 🏠 | Track relatives heading home |
| Friends  | 🔴 Pink   | 🎉 | See when friends arrive at meetups |
| Business | 🟡 Amber  | 💼 | Monitor client or delivery ETA |

### ⏱️ ETA Calculation
- Distance is calculated using the **Haversine formula** (great-circle distance)
- Assumes average travel speed of 40 km/h
- ETA labels update automatically every 30 seconds and on every GPS position change

### 🔗 Share Options
- **💬 Text (SMS)** — Opens native SMS app with pre-filled message
- **📧 Email** — Opens email client with pre-filled subject and body
- **📋 Copy** — Copies link to clipboard
- **⬆️ Share** — Uses the Web Share API (mobile-native share sheet)

### 🛰️ Map Controls
- **📍 Center on Me** — Fly to your current location
- **📐 Fit All** — Zoom to show all tracked people at once
- **🛰 Satellite** — Toggle satellite imagery (ArcGIS World Imagery)
- Dark-themed map overlay using CSS `invert + hue-rotate` filter on OpenStreetMap tiles

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| [Leaflet.js](https://leafletjs.com) | 1.9.4 | Interactive maps & markers |
| [OpenStreetMap](https://www.openstreetmap.org) | — | Street map tiles (free, no API key) |
| [ArcGIS World Imagery](https://server.arcgisonline.com) | — | Satellite map tiles (free) |
| [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | Browser built-in | Real-time GPS tracking |
| [ipapi.co](https://ipapi.co) | — | IP-based location fallback |
| [Google Fonts](https://fonts.google.com) | — | Syne + DM Sans typefaces |
| Web Share API | Browser built-in | Native mobile share sheet |
| Notification API | Browser built-in | Arrival push notifications |

No build tools, no package manager, no server-side code required.

---

## 📁 File Structure

```
ArriveTime./
├── index.html      # Complete app — HTML, CSS & JavaScript in one file
└── README.md       # This documentation
```

The entire application is self-contained in `index.html`. Styles live in a `<style>` block and JavaScript in a `<script>` block within the same file.

---

## 🌐 Browser Support

ArriveTime requires a modern browser with support for:

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Geolocation API | ✅ 50+ | ✅ 55+ | ✅ 11+ | ✅ 79+ |
| Web Share API | ✅ 61+ | ⚠️ Limited | ✅ 12.1+ | ✅ 79+ |
| Notifications API | ✅ 22+ | ✅ 22+ | ✅ 16+ | ✅ 14+ |
| CSS Grid / Flexbox | ✅ | ✅ | ✅ | ✅ |

> **Important:** The Geolocation API only works on **HTTPS** or `localhost`. Serving over plain HTTP will cause GPS to fail silently in most modern browsers.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Make** your changes to `index.html`
4. **Test** in multiple browsers (especially on mobile for Geolocation)
5. **Commit** with a clear message: `git commit -m "feat: add your feature"`
6. **Push** and open a **Pull Request**

### Ideas for Contributions
- 🔒 Real peer-to-peer location sharing (WebRTC / PeerJS)
- 🗂️ Persistent sessions (localStorage or backend)
- 🌍 Multi-language support
- 📊 Journey history / route playback
- 🎨 Custom themes

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- **Bug reports & feature requests:** [Open an issue](https://github.com/ArriveTime/ArriveTime./issues)
- **Questions:** Start a [discussion](https://github.com/ArriveTime/ArriveTime./discussions)

---

<p align="center">Made with ❤️ — <strong>No account. No download. Just share and track.</strong></p>
