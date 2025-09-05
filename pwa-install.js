let deferredPrompt = null;

// Detect if mobile
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) 
         || window.innerWidth <= 768;
}

function updateUI() {
  const note = document.querySelector('.note');
  const installBtn = document.getElementById('installBtn');

  console.log('Mobile:', isMobileDevice(), 'DeferredPrompt:', !!deferredPrompt);

  if (!isMobileDevice()) {
    note.textContent = "Open this site on your mobile phone to install our PWA.";
    note.style.display = "block";
    installBtn.style.display = "none";
  } else {
    note.style.display = "none";
    if (deferredPrompt) {
      installBtn.style.display = "block";  
    } else {
      // Show button anyway with fallback message for testing
      installBtn.style.display = "block";
      installBtn.textContent = "Install PWA (waiting for prompt...)";
    }
  }
}

// Handle install button click
document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") {
    console.log("App installed!");
  }
  deferredPrompt = null;
  updateUI();
});

// Listen for prompt availability
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("Install prompt captured ✅");
  updateUI();
});

// Run on load
document.addEventListener("DOMContentLoaded", updateUI);