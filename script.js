// -----------Start of sidebar function-------------- //
let sidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle nav item clicks
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add active class to clicked item
        item.classList.add('active');

        // Close sidebar after selection
        setTimeout(() => {
            toggleSidebar();
        }, 200);
    });
});

// Handle swipe gestures
let startX = 0;
let currentX = 0;
let isDragging = false;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;

    const diff = currentX - startX;

    // Swipe right to open sidebar (from left edge)
    if (diff > 50 && startX < 50 && !sidebarOpen) {
        toggleSidebar();
    }

    // Swipe left to close sidebar
    if (diff < -50 && sidebarOpen) {
        closeSidebar();
    }

    isDragging = false;
});

// Add haptic feedback for iOS devices
function addHapticFeedback() {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
    }
}

// Add haptic feedback to buttons
document.querySelectorAll('button, .nav-item').forEach(element => {
    element.addEventListener('touchstart', addHapticFeedback);
});

// -----------End of sidebar function-------------- //



// -----------Start of redirect to other page function-------------- //

// function to redirect user to other pages
function openDetail(type) {
    // Redirect to the detail page for the selected category
    window.location.href = `sorting-guide.html?type=${type}`;
}

// -----------End of redirect to other page function-------------- //

// -----------Start of redirect to changing language function-------------- //

// Language utility functions
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
}

function redirectToCorrectLanguage() {
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;
    
    // Check if we're in the correct language folder
    if (currentLang === 'en' && !currentPath.includes('/en/')) {
        // Redirect to English version
        const newPath = currentPath.replace('/ms/', '/en/');
        window.location.href = newPath;
    } else if (currentLang === 'ms' && !currentPath.includes('/ms/')) {
        // Redirect to Malay version
        const newPath = currentPath.replace('/en/', '/ms/');
        window.location.href = newPath;
    }
}

function switchLanguage(newLang) {
    setLanguage(newLang);
    const currentPath = window.location.pathname;
    let newPath;
    
    if (newLang === 'en') {
        newPath = currentPath.replace('/ms/', '/en/');
    } else {
        newPath = currentPath.replace('/en/', '/ms/');
    }
    
    window.location.href = newPath;
}

// Initialize language system on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-redirect to correct language if needed
    redirectToCorrectLanguage();
    
    // Initialize settings page if it exists
    initializeLanguageSettings();
});

// Settings page specific initialization
function initializeLanguageSettings() {
    const englishRadio = document.getElementById('english');
    const malayRadio = document.getElementById('malay');
    const currentSelection = document.getElementById('currentSelection');
    
    // Only run this if we're on the settings page
    if (!englishRadio || !malayRadio || !currentSelection) {
        return;
    }
    
    const currentLang = getCurrentLanguage();
    const currentPath = window.location.pathname;
    
    // Set the correct radio button and text based on current language
    if (currentLang === 'en') {
        englishRadio.checked = true;
        if (currentPath.includes('/en/')) {
            currentSelection.textContent = 'Selected: English';
        } else {
            currentSelection.textContent = 'Dipilih: English';
        }
    } else {
        malayRadio.checked = true;
        if (currentPath.includes('/en/')) {
            currentSelection.textContent = 'Selected: Bahasa Melayu';
        } else {
            currentSelection.textContent = 'Dipilih: Bahasa Melayu';
        }
    }
    
    // Handle language change
    const radios = document.querySelectorAll('input[name="language"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const selectedLang = this.id === 'english' ? 'en' : 'ms';
                const selectedText = this.nextElementSibling.querySelector('span').textContent;
                
                // Update display immediately with correct language
                if (currentPath.includes('/en/')) {
                    currentSelection.textContent = `Selected: ${selectedText}`;
                } else {
                    currentSelection.textContent = `Dipilih: ${selectedText}`;
                }
                
                // Switch language (will reload page in correct language folder)
                switchLanguage(selectedLang);
            }
        });
    });
}