# Expected Demo Output Examples

This document shows what you should see when running the demo.

## Current Selection Panel Output

### Initial Load (Current Time)
```
Timezone: UTC
DST Status: UTC - No DST (UTC+00:00)

Single Date:
  Local: April 10, 2026 15:41 UTC
  UTC (Backend): 2026-04-10 15:41:00 UTC
  UTC Offset: +00:00 (Standard time)

Date Range:
  Local: Apr 10, 2026 15:41 - Apr 11, 2026 15:41 UTC
  UTC (Backend):
    Start: 2026-04-10 15:41:00 UTC
    End: 2026-04-11 15:41:00 UTC
  UTC Offsets: Start: +00:00 (STD), End: +00:00 (STD)
```

### After Changing to Paris
```
Timezone: Paris
DST Status: CEST - Daylight Saving Time active (+02:00)

Single Date:
  Local: April 10, 2026 15:41 CEST
  UTC (Backend): 2026-04-10 13:41:00 UTC
  UTC Offset: +02:00 (DST active)

Date Range:
  Local: Apr 10, 2026 15:41 - Apr 11, 2026 15:41 CEST
  UTC (Backend):
    Start: 2026-04-10 13:41:00 UTC
    End: 2026-04-11 13:41:00 UTC
  UTC Offsets: Start: +02:00 (DST), End: +02:00 (DST)
```

### After Changing to Eastern Time
```
Timezone: Eastern Time (ET)
DST Status: EDT - Daylight Saving Time active (-04:00)

Single Date:
  Local: April 10, 2026 15:41 EDT
  UTC (Backend): 2026-04-10 19:41:00 UTC
  UTC Offset: -04:00 (DST active)

Date Range:
  Local: Apr 10, 2026 15:41 - Apr 11, 2026 15:41 EDT
  UTC (Backend):
    Start: 2026-04-10 19:41:00 UTC
    End: 2026-04-11 19:41:00 UTC
  UTC Offsets: Start: -04:00 (DST), End: -04:00 (DST)
```

## DST Testing Output

### Summer Date Test (July 15, 2026 14:30)
```
┌──────────────────┬────────────────────────────────────┐
│ Property         │ Value                              │
├──────────────────┼────────────────────────────────────┤
│ Input Date       │ 2026-07-15 14:30                   │
│ Timezone         │ Europe/Paris                       │
│ Local Time       │ 2026-07-15 14:30:00 CEST           │
│ UTC Time         │ 2026-07-15 12:30:00 UTC            │
│ UTC Offset       │ +02:00                             │
│ DST Active       │ Yes (Daylight Time)                │
│ Timezone Abbr    │ CEST                               │
└──────────────────┴────────────────────────────────────┘
```

### Winter Date Test (January 15, 2026 14:30)
```
┌──────────────────┬────────────────────────────────────┐
│ Property         │ Value                              │
├──────────────────┼────────────────────────────────────┤
│ Input Date       │ 2026-01-15 14:30                   │
│ Timezone         │ Europe/Paris                       │
│ Local Time       │ 2026-01-15 14:30:00 CET            │
│ UTC Time         │ 2026-01-15 13:30:00 UTC            │
│ UTC Offset       │ +01:00                             │
│ DST Active       │ No (Standard Time)                 │
│ Timezone Abbr    │ CET                                │
└──────────────────┴────────────────────────────────────┘
```

### DST Transition Test (March 29, 2026 02:30)
```
┌──────────────────┬────────────────────────────────────┐
│ Property         │ Value                              │
├──────────────────┼────────────────────────────────────┤
│ Input Date       │ 2026-03-29 02:30                   │
│ Timezone         │ Europe/Paris                       │
│ Local Time       │ 2026-03-29 03:30:00 CEST           │
│ UTC Time         │ 2026-03-29 01:30:00 UTC            │
│ UTC Offset       │ +02:00                             │
│ DST Active       │ Yes (Daylight Time)                │
│ Timezone Abbr    │ CEST                               │
└──────────────────┴────────────────────────────────────┘
Note: This date falls on a DST transition. The time 2:30 AM 
may not exist or be ambiguous during spring forward.
```

## Key Observations

### Same Local Time, Different UTC Values
When DST is active vs inactive, the same local time converts to different UTC:

**Summer (DST Active):**
- Local: 14:30 PDT
- Offset: -07:00
- UTC: 21:30 (14:30 + 7 hours)

**Winter (Standard Time):**
- Local: 14:30 PST
- Offset: -08:00
- UTC: 22:30 (14:30 + 8 hours)

### Timezone Change Behavior
When you change timezone, the input value stays the same, but:
- The interpretation changes (same digits, different timezone)
- The UTC value recalculates
- The offset updates
- The DST status updates

**Example:**
- Input field shows: `2026-01-15T14:30`
- With Pacific: 14:30 PST → 22:30 UTC
- With Eastern: 14:30 EST → 19:30 UTC
- With Tokyo: 14:30 JST → 05:30 UTC (next day)

### Cross-DST Date Ranges
When a range spans DST transition:

**Start (Winter):**
- January 15, 2026 14:30 PST
- Offset: -08:00
- UTC: 2026-01-15 22:30:00

**End (Summer):**
- July 15, 2026 14:30 PDT
- Offset: -07:00
- UTC: 2026-07-15 21:30:00

Notice: Same local time (14:30), but 1-hour difference in UTC due to DST!

## Backend Integration Example

### What Gets Sent to Backend
```javascript
// POST request payload
{
  "start_date": "2026-01-15 22:30:00",  // UTC
  "end_date": "2026-07-15 21:30:00",    // UTC
  "timezone": "America/Los_Angeles"     // For reference only
}
```

### What Gets Stored in Database
```sql
INSERT INTO campaigns (start_date, end_date) 
VALUES (
  '2026-01-15 22:30:00',  -- UTC timestamp
  '2026-07-15 21:30:00'   -- UTC timestamp
);
```

### What Gets Retrieved and Displayed
```javascript
// Database returns UTC
const startUTC = '2026-01-15 22:30:00';
const endUTC = '2026-07-15 21:30:00';

// Convert to user's timezone
const userTz = getUserTimezone(); // 'America/Los_Angeles'
const startLocal = moment.utc(startUTC).tz(userTz);
const endLocal = moment.utc(endUTC).tz(userTz);

// Display
console.log(startLocal.format('MMMM D, YYYY HH:mm z'));
// → "January 15, 2026 14:30 PST"

console.log(endLocal.format('MMMM D, YYYY HH:mm z'));
// → "July 15, 2026 14:30 PDT"
```

## Verification Checklist

When testing the demo, verify:

✓ Date fields are pre-populated with current time
✓ UTC values are displayed next to local times
✓ DST status shows correct abbreviation (PDT/PST, EDT/EST, etc.)
✓ UTC offset matches DST status (-07:00 for PDT, -08:00 for PST)
✓ Changing timezone updates all UTC values instantly
✓ Summer date test shows DST active
✓ Winter date test shows standard time
✓ DST transition test shows spring forward behavior
✓ Range with different seasons shows different offsets
✓ Cookie persists timezone selection across page reloads
