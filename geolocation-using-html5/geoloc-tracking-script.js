let options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 45000
};


if (navigator.geolocation) {
    const watchid = navigator.geolocation.watchPosition(successCallback, errorCallback, options);
} else {
    document.getElementById('log').innerHTML = 'Your browser does not natively support geolocation.';
}

// watch out spelling of locale
function successCallback(position) {
    let msg = `${position.coords.longitude.toFixed(7)} $
        ${position.coords.latitude.toFixed(7)} $
        ${position.coords.accuracy.toFixed(2)} $
        ${new Date(position.timestamp).toLocaleString()} $
        ${position.coords.altitude ? position.coords.altitude.toFixed(2) : ''} $
        ${position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy : ''} $
        ${position.coords.heading ? position.coords.heading : ''} $
        ${position.coords.speed ? position.coords.speed : ''} <br/>`;
    document.getElementById("log").innerHTML += msg;
}

function errorCallback(error) {
    const msgs = { 
        [error.PERMISSION_DENIED]: 'Permission denied',
        [error.POSITION_UNAVAILABLE]: 'Position unavailable',
        [error.TIMEOUT]: 'Request timeout',
        [error.UNKNOWN_ERROR]: 'Unknown error'
    };
    document.getElementById("log").innerHTML = `Error: ${msgs[error.code]}`;
}

// Stop watching
// navigator.geolocation.clearWatch(watchid);
