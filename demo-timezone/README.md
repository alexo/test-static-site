# Date-Time Widget with Timezone Selector Demo

This demo showcases the timezone-aware date picker components developed for the PMA application.

## Files

- **index.html** - Main demo page with three interactive examples
- **styles.css** - Custom styling for the timezone selector and date picker components
- **demo.js** - JavaScript implementation simulating the React components
- **screenshots/** - Visual examples of the components (optional)

## Features Demonstrated

### 1. Single Date Picker with Time
- Basic date and time selection
- Timezone selector tooltip
- Default value populated with current time
- Cookie-based timezone persistence
- **UTC conversion display for backend persistence**
- **DST status indicator and offset display**

### 2. Date Range Picker
- Start and end date selection
- Default values (now and now + 1 day)
- Synchronized timezone across both pickers
- Visual separator between dates
- **UTC conversion for both start and end dates**
- **Individual DST status for start and end dates**

### 3. Time Bound Activation
- Multiple date ranges
- Include/Exclude operators
- Add/Remove range functionality
- **Each new range pre-populated with now and now + 1 day**
- Complex scheduling scenarios

### 4. DST (Daylight Saving Time) Testing
- Interactive buttons to test DST scenarios
- Summer date test (DST active)
- Winter date test (Standard time)
- DST transition test (Spring forward)
- Displays UTC offset and DST status for each scenario

## Backend Integration

### UTC Conversion
All datetime values selected by users are displayed in both their local timezone and UTC format. The UTC values represent what will be persisted to the backend database.

**Example Flow:**
1. User selects: `April 10, 2026 14:30` in `America/Los_Angeles` (PDT)
2. Display shows: `April 10, 2026 14:30 PDT`
3. Backend receives: `2026-04-10 22:30:00 UTC`
4. Database stores: `2026-04-10 22:30:00` (UTC timestamp)

**Conversion Process:**
```javascript
// Frontend to Backend
const userDate = moment.tz('2026-04-10 14:30', 'America/Los_Angeles');
const utcDate = userDate.utc().format('YYYY-MM-DD HH:mm:ss');
// Result: '2026-04-10 22:30:00'

// Backend to Frontend
const dbDate = moment.utc('2026-04-10 22:30:00');
const localDate = dbDate.tz(userTimezone).format('MMMM D, YYYY HH:mm z');
// Result: 'April 10, 2026 14:30 PDT'
```

This ensures:
- Consistent storage regardless of user timezone
- Accurate datetime calculations across timezones
- Proper handling of daylight saving time transitions
- Easy querying and comparison in the database

### DST (Daylight Saving Time) Handling

The demo automatically handles DST transitions:

**Summer (DST Active):**
```
Input: July 15, 2026 14:30 (America/Los_Angeles)
Timezone: PDT (Pacific Daylight Time)
UTC Offset: -07:00
UTC Value: 2026-07-15 21:30:00
```

**Winter (Standard Time):**
```
Input: January 15, 2026 14:30 (America/Los_Angeles)
Timezone: PST (Pacific Standard Time)
UTC Offset: -08:00
UTC Value: 2026-01-15 22:30:00
```

**Dynamic Recalculation:**
When the user changes timezone selection, the UTC values are automatically recalculated based on the new timezone, taking into account whether DST is active for that specific date and time.

**Key Benefits:**
- No manual offset calculation needed
- Handles DST transitions automatically
- Correct conversion even for dates in the past or future
- Different UTC offsets for different dates in the same timezone

## Components

### TimezoneSelectorTooltip
A wrapper component that adds timezone selection capability to any date picker:
- Displays current timezone label
- Hover-activated dropdown menu
- Saves selection to cookies (365-day expiry)
- Validates timezone against available options

### useTimezone Hook (Simulated)
Manages timezone state with persistence:
- Reads from `pma_timezone` cookie
- Validates saved timezone
- Provides timezone label and options
- Handles timezone changes

## Technologies Used

- **react-datepicker** - Date picker component library
- **moment-timezone** - Timezone calculations and formatting
- **js-cookie** - Cookie management
- **Bootstrap 5** - UI framework for layout
- **React 18** - Component framework (in production)

## How to View

Simply open `index.html` in a web browser. No build process required.

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server

# Then navigate to http://localhost:8000
```

## Integration Pattern

```javascript
const { timezone, setTimezone, timezoneLabel, options } = 
    useTimezone(timezoneOptions);

<TimezoneSelectorTooltip
    timezone={timezone}
    timezoneLabel={timezoneLabel}
    options={options}
    onTimezoneChange={setTimezone}>
    <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy HH:mm"
    />
</TimezoneSelectorTooltip>
```

## Timezone Options

The demo includes 7 timezones:
- UTC
- London (Europe/London - GMT/BST)
- Dublin (Europe/Dublin - GMT/IST)
- Paris (Europe/Paris - CET/CEST)
- Bucharest (Europe/Bucharest - EET/EEST)
- Porto (Europe/Lisbon - WET/WEST)
- New York (America/New_York - EST/EDT)

## Cookie Storage

Selected timezone is persisted in the `pma_timezone` cookie with a 365-day expiration period.

## Future Enhancements

- Add screenshot automation
- Include mobile responsive examples
- Add accessibility features demonstration
- Show timezone conversion examples
- Add calendar view examples
