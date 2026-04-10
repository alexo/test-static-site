# Quick Start Guide

## Viewing the Demo

### Option 1: Python HTTP Server (Recommended)
```bash
cd /Users/objeleana/work/github/Flutter/CPP/pma/.claude/worktrees/feat+timezone-selector/demo
python3 -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Node.js HTTP Server
```bash
cd /Users/objeleana/work/github/Flutter/CPP/pma/.claude/worktrees/feat+timezone-selector/demo
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option 3: Direct File Open
Simply double-click `index.html` (may have CORS restrictions with CDN resources)

## What to Test

### 1. Timezone Selection
- Hover over the timezone label (e.g., "Pacific Time (PT)")
- A dropdown will appear with all available timezones
- Click to select a different timezone
- Notice the cookie is set (check browser DevTools > Application > Cookies)

### 2. Single Date Picker
- Notice the field is pre-populated with the current date and time
- Select a different date and time using the native datetime picker
- Observe the "Current Selection" panel on the right
- Note the **Local** time (in your selected timezone)
- Note the **UTC (Backend)** value that would be sent to the server
- Note the **UTC Offset** showing the timezone offset and DST status

### 3. Date Range Picker
- Both fields are pre-populated (now and now + 1 day)
- Select a start date and time
- Select an end date and time
- The panel shows both local and UTC values for both dates
- Note the UTC offsets for both start and end dates
- Change the timezone and see how the UTC values update dynamically

### 4. Time Bound Activation
- Click "+ Add Range" to add multiple date ranges
- Select "Include" or "Exclude" operators
- Add multiple ranges to simulate complex scheduling

### 5. DST Testing
- Click "Set Summer Date" to see DST active for European timezones
- Click "Set Winter Date" to see standard time
- Click "Set DST Transition" to see handling of spring forward dates
- Observe how the same local time converts to different UTC values based on DST

## Testing DST (Daylight Saving Time) Behavior

### Summer vs Winter Test
1. Change timezone to "Paris"
2. Click "Set Summer Date" - observe UTC offset is +02:00 (CEST)
3. Click "Set Winter Date" - observe UTC offset is +01:00 (CET)
4. Same local time (14:30) converts to different UTC times!

### Dynamic Timezone Change Test
1. Set single date picker to January 15, 2026 14:30
2. Note the UTC value with Paris selected
3. Change timezone to New York
4. Observe that the UTC value updates but represents the SAME absolute moment
5. The local display changes, but the backend UTC value adjusts correctly

### Cross-DST Range Test
1. In Date Range Picker, set:
   - Start: January 15, 2026 14:30 (Winter - CET)
   - End: July 15, 2026 14:30 (Summer - CEST)
2. Notice the UTC offsets are different: Start (+01:00), End (+02:00)
3. This demonstrates proper DST handling for ranges spanning DST transitions

## UTC Conversion Testing

Open `test-utc-conversion.html` to verify the conversion logic:
```bash
python3 -m http.server 8000
# Then navigate to: http://localhost:8000/test-utc-conversion.html
```

This page runs automated tests to ensure:
- UTC → UTC conversion is correct
- London → UTC conversion is correct
- Dublin → UTC conversion is correct
- Paris → UTC conversion is correct
- Bucharest → UTC conversion is correct
- Porto → UTC conversion is correct
- New York → UTC conversion is correct
- Round-trip (UTC → Local) conversion works

## Key Features to Demonstrate

1. **Default Values**: All date-time pickers are pre-populated with current time
2. **Timezone Persistence**: Close the browser and reopen - your timezone selection is remembered
3. **UTC Display**: Shows what will actually be stored in the database
4. **DST Awareness**: Automatically handles Daylight Saving Time transitions
5. **Dynamic Recalculation**: Change timezone, UTC values update immediately with correct DST offset
6. **Multiple Pickers**: All pickers respect the same timezone selection

## Understanding the UTC Display

Example:
```
User selects: April 10, 2026 14:30
Timezone: America/Los_Angeles (Pacific Time)

Display shows:
  Local: April 10, 2026 14:30 PDT
  UTC (Backend): 2026-04-10 21:30:00 UTC

This UTC value is what gets stored in the database.
```

When retrieving from the database:
```
Database has: 2026-04-10 21:30:00 UTC
User timezone: America/Los_Angeles

Display shows: April 10, 2026 14:30 PDT
```

## Browser Compatibility

Tested with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

**Issue**: Timezone dropdown doesn't appear
- **Solution**: Check that JavaScript is enabled and there are no console errors

**Issue**: UTC time seems incorrect
- **Solution**: Verify your system timezone settings and that moment-timezone loaded correctly

**Issue**: Cookie not persisting
- **Solution**: Check browser privacy settings allow cookies

## Next Steps

After reviewing the demo:
1. Check the code in `demo.js` to see the implementation
2. Review `styles.css` for styling patterns
3. Read the technical documentation in `README.md`
4. Examine the backend integration patterns in `index.html` footer section
