let options = {
    enableHighAccuracy: true,
    timeout: 45000
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
} else {
    alert('Your browser does not natively support geolocation.');
}

function successCallback(position) {
    let msg = `<strong>My location</strong><br/>
        Longitude: ${position.coords.longitude.toFixed(7)}&deg;<br/>
        Latitude: ${position.coords.latitude.toFixed(7)}&deg;<br/>
        Accuracy: ${position.coords.accuracy.toFixed(2)} meters<br/>
        Time: ${new Date(position.timestamp).toLocaleString()}<br/>` // watch out spelling of locale

    if (position.coords.altitude)
        msg += `Altitude: ${position.coords.altitude.toFixed(2)} meters<br/>`
    if (position.coords.altitudeAccuracy)
    	msg += `Altitude Accuracy: ${position.coords.altitudeAccuracy} meters<br/>`
    if (position.coords.heading)
    	msg += `Heading: ${position.coords.heading}&deg;<br/>`
    if (position.coords.speed) {
    	msg += `Speed: ${position.coords.speed} m/s`;
    }
    // document.getElementById("map").innerHTML = msg;
    
    // default starting point over Columbus Ohio (for zooming into geoloc point)
    const map = L.map('map', { 
        center: [39.95752211597193, -82.99707896399117],
        zoom: 12
    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);
    
    // Icon code from previous leaflet exercises
    function svgIcon(color) {
        return L.divIcon({
            className: 'poi-icon',
            html: `
                <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                        fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                    <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
                </svg>`,
            iconSize:    [25, 32],  // match SVG's width/height
            iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
            popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
        });
    }

    // color for icon with popup
    const GEOLOC_COLOR = "#1fbf78";
    
    // create popup
    L.marker([position.coords.latitude, position.coords.longitude], { icon: svgIcon(GEOLOC_COLOR) }).bindPopup(`${msg}`).addTo(map);

    // zoom into geolocated point from default point
    map.flyTo([position.coords.latitude, position.coords.longitude], 18);
}

function errorCallback(error) {
    const msgs = { 
        [error.PERMISSION_DENIED]: 'Permission denied',
        [error.POSITION_UNAVAILABLE]: 'Position unavailable',
        [error.TIMEOUT]: 'Request timeout',
        [error.UNKNOWN_ERROR]: 'Unknown error'
    };
    document.getElementById("map").innerHTML = `Error: ${msgs[error.code]}`;
}
