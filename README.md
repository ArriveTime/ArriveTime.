<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArriveTime.com | Real-Time Arrival</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        body { margin: 0; background: #0A0A0A; color: white; font-family: sans-serif; }
        #map { height: 70vh; width: 100%; }
        .info-panel { 
            height: 30vh; padding: 20px; 
            background: rgba(255, 255, 255, 0.1); 
            backdrop-filter: blur(10px);
            border-top: 2px solid #2E5BFF;
            text-align: center;
        }
        .eta-text { font-size: 3rem; font-weight: bold; color: #00FFA3; }
        .btn-share { 
            background: #2E5BFF; border: none; padding: 15px 30px; 
            color: white; border-radius: 30px; font-weight: bold; cursor: pointer;
        }
    </style>
</head>
<body>

    <div id="map"></div>

    <div class="info-panel">
        <div id="status">Ready to Share</div>
        <div class="eta-text" id="eta">-- MIN</div>
        <button class="btn-share" onclick="startTracking()">Start ArriveTime</button>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        let map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        let marker;

        function startTracking() {
            if (navigator.geolocation) {
                // enableHighAccuracy uses GPS; otherwise uses Wi-Fi/Cell towers
                navigator.geolocation.watchPosition(updateLocation, handleError, {
                    enableHighAccuracy: true,
                    maximumAge: 1000
                });
            }
        }

        function updateLocation(position) {
            const { latitude, longitude } = position.coords;
            const latlng = [latitude, longitude];

            if (!marker) {
                marker = L.marker(latlng).addTo(map);
                map.setView(latlng, 15);
            } else {
                marker.setLatLng(latlng);
            }
            
            document.getElementById('status').innerText = "Live: Sharing Location";
            // In a full app, you would send 'latlng' to a server via WebSockets here
        }

        function handleError(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
    </script>
</body>
</html>
