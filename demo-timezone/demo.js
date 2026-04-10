// Timezone configuration
const TIMEZONE_OPTIONS = [
    { value: 'UTC', label: 'UTC' },
    { value: 'Europe/London', label: 'London' },
    { value: 'Europe/Dublin', label: 'Dublin' },
    { value: 'Europe/Paris', label: 'Paris' },
    { value: 'Europe/Bucharest', label: 'Bucharest' },
    { value: 'Europe/Lisbon', label: 'Porto' },
    { value: 'America/New_York', label: 'New York' },
];

// Cookie management
const COOKIE_NAME = 'pma_timezone';
const COOKIE_EXPIRY_DAYS = 365;

function getCookie(name) {
    if (typeof Cookies !== 'undefined') {
        return Cookies.get(name);
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    if (typeof Cookies !== 'undefined') {
        Cookies.set(name, value, { expires: days });
    } else {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }
}

// Timezone hook simulation
class TimezoneManager {
    constructor() {
        this.listeners = [];
        this.currentTimezone = this.getInitialTimezone();
    }

    getInitialTimezone() {
        const savedTimezone = getCookie(COOKIE_NAME);
        if (savedTimezone && TIMEZONE_OPTIONS.find(opt => opt.value === savedTimezone)) {
            return savedTimezone;
        }
        return TIMEZONE_OPTIONS[0].value;
    }

    setTimezone(timezone) {
        this.currentTimezone = timezone;
        setCookie(COOKIE_NAME, timezone, COOKIE_EXPIRY_DAYS);
        this.notifyListeners();
    }

    getTimezone() {
        return this.currentTimezone;
    }

    getTimezoneLabel() {
        const option = TIMEZONE_OPTIONS.find(opt => opt.value === this.currentTimezone);
        return option ? option.label : this.currentTimezone;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.currentTimezone));
    }
}

const timezoneManager = new TimezoneManager();

// Timezone Selector Component
class TimezoneSelectorTooltip {
    constructor(container, onTimezoneChange) {
        this.container = container;
        this.onTimezoneChange = onTimezoneChange;
        this.dropdownVisible = false;
        this.hideTimeout = null;
        this.render();
        this.attachEventListeners();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'timezone-selector-wrapper';
        
        const label = document.createElement('span');
        label.className = 'timezone-label';
        label.textContent = timezoneManager.getTimezoneLabel();
        label.id = 'timezone-label';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'timezone-dropdown hidden';
        dropdown.id = 'timezone-dropdown';
        
        TIMEZONE_OPTIONS.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'timezone-option';
            if (option.value === timezoneManager.getTimezone()) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option.label;
            optionDiv.dataset.value = option.value;
            dropdown.appendChild(optionDiv);
        });
        
        wrapper.appendChild(label);
        wrapper.appendChild(dropdown);
        this.container.insertBefore(wrapper, this.container.firstChild);
        
        this.labelElement = label;
        this.dropdownElement = dropdown;
    }

    attachEventListeners() {
        this.labelElement.addEventListener('mouseenter', () => this.showDropdown());
        this.labelElement.addEventListener('mouseleave', () => this.scheduleHideDropdown());
        this.dropdownElement.addEventListener('mouseenter', () => this.cancelHideDropdown());
        this.dropdownElement.addEventListener('mouseleave', () => this.scheduleHideDropdown());
        
        this.dropdownElement.querySelectorAll('.timezone-option').forEach(option => {
            option.addEventListener('click', () => {
                const timezone = option.dataset.value;
                timezoneManager.setTimezone(timezone);
                this.updateLabel();
                this.updateSelectedOption();
                this.hideDropdown();
                if (this.onTimezoneChange) {
                    this.onTimezoneChange(timezone);
                }
            });
        });
    }

    showDropdown() {
        this.cancelHideDropdown();
        this.dropdownElement.classList.remove('hidden');
        this.dropdownVisible = true;
    }

    scheduleHideDropdown() {
        this.hideTimeout = setTimeout(() => this.hideDropdown(), 200);
    }

    cancelHideDropdown() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    hideDropdown() {
        this.dropdownElement.classList.add('hidden');
        this.dropdownVisible = false;
    }

    updateLabel() {
        this.labelElement.textContent = timezoneManager.getTimezoneLabel();
    }

    updateSelectedOption() {
        this.dropdownElement.querySelectorAll('.timezone-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.value === timezoneManager.getTimezone()) {
                option.classList.add('selected');
            }
        });
    }
}

// Demo implementations
function initSingleDateDemo() {
    const container = document.getElementById('single-date-demo');
    
    const inputWrapper = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'datetime-local';
    input.placeholder = 'Select date and time';
    input.id = 'single-date-input';
    
    // Set default value to now in current timezone
    const tz = timezoneManager.getTimezone();
    const now = moment().tz(tz);
    input.value = now.format('YYYY-MM-DDTHH:mm');
    
    inputWrapper.appendChild(input);
    container.appendChild(inputWrapper);
    
    function updateSingleDateDisplay() {
        const value = input.value;
        if (value) {
            const tz = timezoneManager.getTimezone();
            // Parse the datetime-local value as if it's in the selected timezone
            const localMoment = moment.tz(value, tz);
            const formatted = localMoment.format('MMMM D, YYYY HH:mm z');
            const utcFormatted = localMoment.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
            const offset = localMoment.format('Z');
            const isDST = localMoment.isDST();
            
            document.getElementById('single-value').textContent = formatted;
            document.getElementById('single-value-utc').textContent = utcFormatted;
            document.getElementById('single-value-offset').textContent = `${offset} ${isDST ? '(DST active)' : '(Standard time)'}`;
            
            // Update DST status
            updateDSTStatus(localMoment);
        }
    }
    
    new TimezoneSelectorTooltip(container, (timezone) => {
        updateCurrentTimezone();
        // Update the display with new timezone (keeping the same input value but reinterpreting it)
        updateSingleDateDisplay();
    });

    // Note: In a real implementation, this would use react-datepicker
    // For demo purposes, we're using a native input with enhancement
    input.addEventListener('change', updateSingleDateDisplay);
    
    // Initialize display
    updateSingleDateDisplay();
}

function initDateRangeDemo() {
    const container = document.getElementById('date-range-demo');
    
    const rangeWrapper = document.createElement('div');
    rangeWrapper.className = 'date-range-picker';
    
    const startInput = document.createElement('input');
    startInput.type = 'datetime-local';
    startInput.placeholder = 'Start date';
    startInput.id = 'range-start-input';
    
    // Set default value to now in current timezone
    const tz = timezoneManager.getTimezone();
    const now = moment().tz(tz);
    startInput.value = now.format('YYYY-MM-DDTHH:mm');
    
    const separator = document.createElement('span');
    separator.className = 'date-range-separator';
    separator.textContent = 'to';
    
    const endInput = document.createElement('input');
    endInput.type = 'datetime-local';
    endInput.placeholder = 'End date';
    endInput.id = 'range-end-input';
    
    // Set default value to now + 1 day in current timezone
    const tomorrow = moment().tz(tz).add(1, 'day');
    endInput.value = tomorrow.format('YYYY-MM-DDTHH:mm');
    
    rangeWrapper.appendChild(startInput);
    rangeWrapper.appendChild(separator);
    rangeWrapper.appendChild(endInput);
    container.appendChild(rangeWrapper);

    function updateRangeDisplay() {
        const start = startInput.value;
        const end = endInput.value;
        if (start && end) {
            const tz = timezoneManager.getTimezone();
            // Parse the datetime-local values as if they're in the selected timezone
            const startMoment = moment.tz(start, tz);
            const endMoment = moment.tz(end, tz);
            
            const formatted = `${startMoment.format('MMM D, YYYY HH:mm')} - ${endMoment.format('MMM D, YYYY HH:mm z')}`;
            document.getElementById('range-value').textContent = formatted;
            
            const startUtc = startMoment.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
            const endUtc = endMoment.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
            document.getElementById('range-start-utc').textContent = `Start: ${startUtc}`;
            document.getElementById('range-end-utc').textContent = `End: ${endUtc}`;
            
            const startOffset = startMoment.format('Z');
            const endOffset = endMoment.format('Z');
            const startDST = startMoment.isDST() ? 'DST' : 'STD';
            const endDST = endMoment.isDST() ? 'DST' : 'STD';
            document.getElementById('range-offsets').textContent = `Start: ${startOffset} (${startDST}), End: ${endOffset} (${endDST})`;
            
            // Update DST status
            updateDSTStatus(startMoment);
        }
    }
    
    new TimezoneSelectorTooltip(container, (timezone) => {
        updateCurrentTimezone();
        // Update the display with new timezone (keeping the same input values but reinterpreting them)
        updateRangeDisplay();
    });

    startInput.addEventListener('change', updateRangeDisplay);
    endInput.addEventListener('change', updateRangeDisplay);
    
    // Initialize display
    updateRangeDisplay();
}

function initTimeBoundDemo() {
    const container = document.getElementById('timebound-demo');
    
    const timeboundWrapper = document.createElement('div');
    timeboundWrapper.className = 'timebound-container';
    
    let rangeCounter = 0;
    
    function addRange() {
        rangeCounter++;
        const rangeDiv = document.createElement('div');
        rangeDiv.className = 'timebound-range';
        rangeDiv.id = `range-${rangeCounter}`;
        
        const operatorSelect = document.createElement('select');
        operatorSelect.className = 'operator-select';
        const includeOption = document.createElement('option');
        includeOption.value = 'include';
        includeOption.textContent = 'Include';
        const excludeOption = document.createElement('option');
        excludeOption.value = 'exclude';
        excludeOption.textContent = 'Exclude';
        operatorSelect.appendChild(includeOption);
        operatorSelect.appendChild(excludeOption);
        
        const startInput = document.createElement('input');
        startInput.type = 'datetime-local';
        startInput.placeholder = 'Start date';
        
        // Set default value to now in current timezone
        const tz = timezoneManager.getTimezone();
        const now = moment().tz(tz);
        startInput.value = now.format('YYYY-MM-DDTHH:mm');
        
        const separator = document.createElement('span');
        separator.className = 'date-range-separator';
        separator.textContent = 'to';
        
        const endInput = document.createElement('input');
        endInput.type = 'datetime-local';
        endInput.placeholder = 'End date';
        
        // Set default value to now + 1 day in current timezone
        const tomorrow = moment().tz(tz).add(1, 'day');
        endInput.value = tomorrow.format('YYYY-MM-DDTHH:mm');
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            rangeDiv.remove();
        });
        
        rangeDiv.appendChild(operatorSelect);
        rangeDiv.appendChild(startInput);
        rangeDiv.appendChild(separator);
        rangeDiv.appendChild(endInput);
        rangeDiv.appendChild(removeBtn);
        
        timeboundWrapper.appendChild(rangeDiv);
    }
    
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.textContent = '+ Add Range';
    addBtn.addEventListener('click', addRange);
    
    container.appendChild(timeboundWrapper);
    container.appendChild(addBtn);
    
    new TimezoneSelectorTooltip(container, (timezone) => {
        updateCurrentTimezone();
    });
    
    // Add initial range
    addRange();
}

function updateCurrentTimezone() {
    document.getElementById('current-timezone').textContent = timezoneManager.getTimezoneLabel();
}

function updateDSTStatus(momentObj) {
    const tz = timezoneManager.getTimezone();
    const isDST = momentObj.isDST();
    const abbr = momentObj.format('z');
    const offset = momentObj.format('Z');
    
    const statusText = isDST 
        ? `${abbr} - Daylight Saving Time active (${offset})`
        : `${abbr} - Standard Time (${offset})`;
    
    document.getElementById('dst-status').textContent = statusText;
}

function initDSTDemo() {
    const resultsDiv = document.getElementById('dst-test-results');
    
    // Test with summer date (PDT - Pacific Daylight Time)
    document.getElementById('dst-test-summer').addEventListener('click', () => {
        const summerDate = '2026-07-15 14:30';
        testDSTConversion(summerDate, resultsDiv);
    });
    
    // Test with winter date (PST - Pacific Standard Time)
    document.getElementById('dst-test-winter').addEventListener('click', () => {
        const winterDate = '2026-01-15 14:30';
        testDSTConversion(winterDate, resultsDiv);
    });
    
    // Test with DST transition date (Spring forward: 2AM becomes 3AM in Europe)
    document.getElementById('dst-test-transition').addEventListener('click', () => {
        const transitionDate = '2026-03-29 02:30';
        testDSTConversion(transitionDate, resultsDiv, true);
    });
}

function testDSTConversion(dateStr, resultsDiv, isTransition = false) {
    const tz = timezoneManager.getTimezone();
    const localMoment = moment.tz(dateStr, tz);
    const utcMoment = localMoment.clone().utc();
    
    let html = '<table>';
    html += '<tr><th>Property</th><th>Value</th></tr>';
    html += `<tr><td>Input Date</td><td><code>${dateStr}</code></td></tr>`;
    html += `<tr><td>Timezone</td><td><code>${tz}</code></td></tr>`;
    html += `<tr><td>Local Time</td><td><code>${localMoment.format('YYYY-MM-DD HH:mm:ss z')}</code></td></tr>`;
    html += `<tr><td>UTC Time (Backend)</td><td><code>${utcMoment.format('YYYY-MM-DD HH:mm:ss [UTC]')}</code></td></tr>`;
    html += `<tr><td>UTC Offset</td><td><code>${localMoment.format('Z')}</code></td></tr>`;
    html += `<tr><td>DST Active</td><td><code>${localMoment.isDST() ? 'Yes (Daylight Time)' : 'No (Standard Time)'}</code></td></tr>`;
    html += `<tr><td>Timezone Abbr</td><td><code>${localMoment.format('z')}</code></td></tr>`;
    
    if (isTransition) {
        html += '<tr><td colspan="2" style="background: #fff3cd; padding: 0.5rem;"><strong>Note:</strong> This date falls on a DST transition. The time 2:30 AM may not exist or be ambiguous during spring forward.</td></tr>';
    }
    
    html += '</table>';
    
    resultsDiv.innerHTML = html;
}

function populateTimezoneList() {
    const list = document.getElementById('timezone-list');
    TIMEZONE_OPTIONS.forEach(option => {
        const li = document.createElement('li');
        li.textContent = `${option.label} (${option.value})`;
        list.appendChild(li);
    });
}

// Initialize demos on page load
document.addEventListener('DOMContentLoaded', () => {
    initSingleDateDemo();
    initDateRangeDemo();
    initTimeBoundDemo();
    initDSTDemo();
    updateCurrentTimezone();
    populateTimezoneList();
    
    // Subscribe to timezone changes
    timezoneManager.subscribe((timezone) => {
        updateCurrentTimezone();
    });
});
