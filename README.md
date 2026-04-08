# 📍 ArriveTime

> **Know Before They Arrive** — Real-time GPS location sharing with no app download and no signup.

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blue?logo=github)](https://arrivetime.github.io/ArriveTime./)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Overview

ArriveTime lets you track family, friends, and appointments on a live map. Share a link, add people to your tracking list, and watch everyone's location update in real time — no account, no download, completely free.

---

## 🚀 Features

- **Real-time GPS tracking** via the browser Geolocation API
- **Three group categories** — Family 🏠, Friends 🎉, Business 💼
- **Live map** powered by Leaflet.js and CartoDB Dark Matter tiles
- **ETA estimates** calculated from current positions
- **Share via SMS, Email, or native share sheet**
- **No registration required** — works instantly in any modern browser
- **Arrival notifications** with animated banners
- **Satellite / Standard map toggle**
- **Responsive design** — works on desktop and mobile

---

## 🌐 Live Demo

**[https://arrivetime.github.io/ArriveTime./](https://arrivetime.github.io/ArriveTime./)**

---

## 📁 Project Structure

```
/docs/                          # GitHub Pages root (static site)
  ├── index.html               # Main entry point
  ├── css/
  │   └── styles.css           # All styles
  └── js/
      └── app.js               # All application logic

/api/                           # Backend stub (for future serverless functions)
  └── README.md

/.github/workflows/
  └── deploy.yml               # Auto-deploy to GitHub Pages on push to main

/README.md                      # This file
/.gitignore
```

---

## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| [Leaflet.js 1.9.4](https://leafletjs.com/) | Interactive maps |
| [CartoDB Dark Matter](https://carto.com/basemaps/) | Map tiles (free, no API key) |
| Browser Geolocation API | GPS positioning |
| Vanilla HTML / CSS / JS | No framework, no build step |

---

## ⚡ Quick Start (Local)

1. Clone the repository:
   ```bash
   git clone https://github.com/ArriveTime/ArriveTime.
   cd ArriveTime.
   ```

2. Serve the `docs/` directory over HTTP (required for Geolocation API):
   ```bash
   # Python
   python3 -m http.server 8080 --directory docs

   # Node.js (npx)
   npx serve docs
   ```

3. Open [http://localhost:8080](http://localhost:8080) in your browser.

> ⚠️ The Geolocation API requires HTTPS in production. GitHub Pages provides HTTPS automatically.

---

## 🚢 Deployment (GitHub Pages)

The site deploys automatically on every push to `main` via the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable GitHub Pages manually:

1. Go to **Repository Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow handles the rest

The site will be live at:
```
https://arrivetime.github.io/ArriveTime./
```

---

## 🔮 Future Backend

The `/api/` directory is a placeholder for future serverless functions. See [`api/README.md`](api/README.md) for planned endpoints and deployment options (Vercel, Firebase, Netlify).

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT © ArriveTime
