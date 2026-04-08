# ArriveTime API

This directory is reserved for future serverless backend functions.

## Current State

ArriveTime is currently a fully static frontend app hosted on GitHub Pages. All location sharing is handled client-side via URL parameters and the browser's Geolocation API. No server is required to run the app.

## Future Backend Options

When real-time server-side features are needed (e.g., persistent sessions, server-side location relay), the following platforms can host serverless functions from this directory:

### Vercel
Add a `vercel.json` at the root and place function files here as `api/*.js`. Each file becomes a serverless endpoint automatically.

```json
{
  "functions": {
    "api/*.js": { "runtime": "nodejs18.x" }
  }
}
```

### Firebase Functions
Use `firebase init functions` to set up Cloud Functions in this directory.

### Netlify Functions
Netlify can serve functions from an `api/` or `netlify/functions/` directory.

## Planned Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/session` | POST | Create a new tracking session |
| `/api/session/:id` | GET | Fetch session data |
| `/api/location` | POST | Update a participant's location |
| `/api/location/:id` | GET | Retrieve a participant's last known location |

## Contributing

See the root [README](../README.md) for project-level contribution guidelines.
