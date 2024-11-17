function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 5000);
}

function checkConnection() {
    if (navigator.connection) {
        const type = navigator.connection.type || navigator.connection.effectiveType;
        showPopup(`Connected via: ${type || 'unknown'}`);
    } else {
        showPopup('Connection type: Unknown');
    }
}

window.onload = checkConnection;
