// PWA Installation Script
let deferredPrompt = null;

// Show/hide UI based on device type
function updateUI() {
    const noteText = document.querySelector('.note');
    const installButton = document.getElementById('installBtn');

    if (isMobileDevice()) {
        // On mobile → show install button
        noteText.style.display = 'none';
        installButton.style.display = 'block';
    } else {
        // On desktop → show message
        noteText.style.display = 'block';
        installButton.style.display = 'none';
    }
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
}

// Handle PWA installation
async function installPWA() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
        console.log('PWA installed successfully');
    } else {
        console.log('PWA installation dismissed');
    }

    deferredPrompt = null; // reset prompt
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('PWA Landing Page Loaded');
    updateUI();

    const installButton = document.getElementById('installBtn');
    if (installButton) {
        installButton.addEventListener('click', installPWA);
    }

    // Update UI when resizing (desktop ↔ mobile switch)
    window.addEventListener('resize', updateUI);
});

// Capture install prompt event
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA install prompt available');
    e.preventDefault();
    deferredPrompt = e;
    updateUI();
});

// Listen for successful install
window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
});
