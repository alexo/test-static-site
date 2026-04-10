# Timezone List Update Summary

## Changes Made

Updated the timezone list from a global selection to a European/UTC focused list with New York for US coverage.

### Previous Timezone List (10 timezones)
- Pacific Time (PT) - America/Los_Angeles
- Mountain Time (MT) - America/Denver
- Central Time (CT) - America/Chicago
- Eastern Time (ET) - America/New_York
- London (GMT/BST) - Europe/London
- Paris (CET/CEST) - Europe/Paris
- Tokyo (JST) - Asia/Tokyo
- Shanghai (CST) - Asia/Shanghai
- Dubai (GST) - Asia/Dubai
- Sydney (AEDT/AEST) - Australia/Sydney

### New Timezone List (7 timezones)
- UTC - UTC
- London - Europe/London
- Dublin - Europe/Dublin
- Paris - Europe/Paris
- Bucharest - Europe/Bucharest
- Porto - Europe/Lisbon
- New York - America/New_York

## Technical Changes

### Files Updated

1. **demo.js**
   - Updated `TIMEZONE_OPTIONS` constant with new timezone list
   - Changed DST transition test date from March 8 (US) to March 29 (Europe)

2. **index.html**
   - Changed default timezone display from "America/Los_Angeles" to "UTC"

3. **README.md**
   - Updated timezone list documentation
   - Changed from 10 to 7 timezones

4. **test-utc-conversion.html**
   - Updated all test cases to use new timezones
   - Changed from Pacific/Tokyo/etc to UTC/London/Dublin/Paris/Bucharest/Porto/New York
   - Updated expected UTC values
   - Changed round-trip test from Pacific to Paris timezone

5. **QUICKSTART.md**
   - Updated DST testing examples from Pacific/Eastern to Paris/New York
   - Changed UTC offset examples (from -07:00/-08:00 to +01:00/+02:00)
   - Updated cross-DST range test examples

6. **EXPECTED_OUTPUT.md**
   - Updated example outputs to show Paris timezone instead of Pacific
   - Changed DST test examples from PDT/PST to CEST/CET
   - Updated DST transition date from March 8 to March 29

## Timezone Details

### UTC
- Offset: +00:00 (no DST)
- Never changes

### London (Europe/London)
- Winter: GMT (UTC+00:00)
- Summer: BST (UTC+01:00)
- DST: Last Sunday in March to last Sunday in October

### Dublin (Europe/Dublin)
- Winter: GMT (UTC+00:00)
- Summer: IST (UTC+01:00)
- DST: Last Sunday in March to last Sunday in October

### Paris (Europe/Paris)
- Winter: CET (UTC+01:00)
- Summer: CEST (UTC+02:00)
- DST: Last Sunday in March to last Sunday in October

### Bucharest (Europe/Bucharest)
- Winter: EET (UTC+02:00)
- Summer: EEST (UTC+03:00)
- DST: Last Sunday in March to last Sunday in October

### Porto (Europe/Lisbon)
- Winter: WET (UTC+00:00)
- Summer: WEST (UTC+01:00)
- DST: Last Sunday in March to last Sunday in October

### New York (America/New_York)
- Winter: EST (UTC-05:00)
- Summer: EDT (UTC-04:00)
- DST: Second Sunday in March to first Sunday in November

## DST Transition Dates 2026

### European Timezones
- **Spring Forward**: March 29, 2026 at 2:00 AM (becomes 3:00 AM)
- **Fall Back**: October 25, 2026 at 3:00 AM (becomes 2:00 AM)

### New York
- **Spring Forward**: March 8, 2026 at 2:00 AM (becomes 3:00 AM)
- **Fall Back**: November 1, 2026 at 2:00 AM (becomes 1:00 AM)

## Example Conversions (April 10, 2026 14:30)

```
UTC:        2026-04-10 14:30:00 UTC → 2026-04-10 14:30:00 UTC (±00:00)
London:     2026-04-10 14:30:00 BST → 2026-04-10 13:30:00 UTC (+01:00)
Dublin:     2026-04-10 14:30:00 IST → 2026-04-10 13:30:00 UTC (+01:00)
Paris:      2026-04-10 14:30:00 CEST → 2026-04-10 12:30:00 UTC (+02:00)
Bucharest:  2026-04-10 14:30:00 EEST → 2026-04-10 11:30:00 UTC (+03:00)
Porto:      2026-04-10 14:30:00 WEST → 2026-04-10 13:30:00 UTC (+01:00)
New York:   2026-04-10 14:30:00 EDT → 2026-04-10 18:30:00 UTC (-04:00)
```

## Testing

All automated tests have been updated to verify conversions for the new timezone list:

```bash
python3 -m http.server 8000
# Navigate to http://localhost:8000/test-utc-conversion.html
```

Expected results:
- ✓ UTC to UTC conversion
- ✓ London (BST) to UTC conversion
- ✓ Dublin (IST) to UTC conversion
- ✓ Paris (CEST) to UTC conversion
- ✓ Bucharest (EEST) to UTC conversion
- ✓ Porto (WEST) to UTC conversion
- ✓ New York (EDT) to UTC conversion
- ✓ Round-trip (UTC → Paris → display)

## Migration Notes

If integrating this into the real application:

1. Update backend timezone options to match this list
2. Update any saved user preferences to map old timezones to new ones
3. Consider what to do with users who had Pacific/Mountain/Central times saved
4. Verify all existing datetime data displays correctly with new timezone options

## Benefits of New List

1. **European Focus**: Better coverage for European markets
2. **Simplified**: Fewer options, easier to select
3. **UTC Included**: Standard reference timezone available
4. **Geographic Coverage**: Western Europe (Porto/London/Dublin) to Eastern Europe (Bucharest)
5. **US Coverage**: New York covers US East Coast
6. **Consistent DST**: Most timezones share same DST transition dates (except NY)
