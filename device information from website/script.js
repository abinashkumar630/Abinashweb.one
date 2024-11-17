// Parse the user agent using UAParser.js
const parser = new UAParser();
const result = parser.getResult();

// Get platform information
const platform = result.os.name || "Unknown OS";
const browser = result.browser.name || "Unknown Browser";
const resolution = `${window.screen.width} x ${window.screen.height}`;
const deviceType = result.device.type
    ? result.device.type.charAt(0).toUpperCase() + result.device.type.slice(1)
    : "Desktop";

// Get device vendor and model, ensure proper formatting for mobile devices
let deviceModel = "Unknown Model";
if (result.device.vendor || result.device.model) {
    deviceModel = `${result.device.vendor || ""} ${result.device.model || ""}`.trim();
}

// Fallback to browser if no model/vendor information is available
if (!deviceModel || deviceModel === "Unknown Model") {
    deviceModel = `Browser: ${browser}`;
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? "Yes" : "No";

let batteryLevel = "";
let locationInfo = "Location not available";
let networkType = "Network information not supported";

// Battery Status API
function getBatteryStatus() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            batteryLevel = Math.round(battery.level * 100) + "%";
            console.log(`Battery Level: ${batteryLevel}, Charging: ${battery.charging ? "Yes" : "No"}`);
        });
    } else {
        console.log("Battery information not supported.");
    }
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;
            console.log(`Location: ${locationInfo}`);
        }, function () {
            console.log("Location permission denied or not supported.");
        });
    } else {
        console.log("Geolocation not supported.");
    }
}

// Display device information in the console
function displayDeviceInfo() {
    console.log("📱 Device Information:");
    console.log(`- Platform: ${platform}`);
    console.log(`- Browser: ${browser}`);
    console.log(`- Screen Resolution: ${resolution}`);
    console.log(`- Device Type: ${deviceType}`);
    console.log(`- Device Model: ${deviceModel}`);
    console.log(`- Touch Device: ${isTouchDevice}`);
    console.log(`- Network Type: ${navigator.connection ? navigator.connection.effectiveType || "Unknown" : "Not supported"}`);
}

// Start the process
getLocation();
getBatteryStatus();
displayDeviceInfo();
