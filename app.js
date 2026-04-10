// Update current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = now.toLocaleString();
}

// Display user agent
function displayUserAgent() {
    const userAgentElement = document.getElementById('user-agent');
    userAgentElement.textContent = navigator.userAgent.substring(0, 80) + '...';
}

// Display screen resolution
function displayScreenResolution() {
    const screenResElement = document.getElementById('screen-res');
    screenResElement.textContent = `${window.screen.width} x ${window.screen.height}`;
}

// Calculate and display page load time
function displayLoadTime() {
    const loadTimeElement = document.getElementById('load-time');
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    loadTimeElement.textContent = `${loadTime}ms`;
}

// Counter functionality
let counter = 0;

function updateCounter() {
    document.getElementById('counter').textContent = counter;
    localStorage.setItem('clickCounter', counter);
}

function incrementCounter() {
    counter++;
    updateCounter();
}

function resetCounter() {
    counter = 0;
    updateCounter();
}

// Initialize the page
function init() {
    // Load counter from localStorage if it exists
    const savedCounter = localStorage.getItem('clickCounter');
    if (savedCounter !== null) {
        counter = parseInt(savedCounter, 10);
        updateCounter();
    }

    // Set up event listeners
    document.getElementById('increment-btn').addEventListener('click', incrementCounter);
    document.getElementById('reset-btn').addEventListener('click', resetCounter);

    // Display environment information
    displayUserAgent();
    displayScreenResolution();
    displayLoadTime();
    updateTime();

    // Update time every second
    setInterval(updateTime, 1000);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
