# Visual Test Guide: Timezone Synchronization

## Quick Test Procedure

Follow these steps to verify timezone synchronization is working correctly.

## Test 1: Change Timezone from Single Date Picker

### Initial State
```
┌──────────────────────────────────────────┐
│ Single Date Picker                       │
│ [🌐 UTC] [2026-04-11T14:30]             │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Date Range Picker                        │
│ [🌐 UTC] [2026-04-11] to [2026-04-12]   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Time Bound Activation                    │
│ [🌐 UTC] [Include] [2026-04-11] to ...  │
└──────────────────────────────────────────┘

Current Selection Panel:
  Timezone: UTC
  Single Date: April 11, 2026 14:30 UTC
  UTC (Backend): 2026-04-11 14:30:00 UTC
```

### Action: Click timezone on Single Date Picker → Select "Paris"

### Expected Result: ALL selectors update
```
┌──────────────────────────────────────────┐
│ Single Date Picker                       │
│ [🌐 CEST] [2026-04-11T14:30]            │
│      ↑ Changed!                          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Date Range Picker                        │
│ [🌐 CEST] [2026-04-11] to [2026-04-12]  │
│      ↑ Also changed!                     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Time Bound Activation                    │
│ [🌐 CEST] [Include] [2026-04-11] to ... │
│      ↑ Also changed!                     │
└──────────────────────────────────────────┘

Current Selection Panel:
  Timezone: Paris ← Updated
  Single Date: April 11, 2026 14:30 CEST ← Updated
  UTC (Backend): 2026-04-11 12:30:00 UTC ← Updated (14:30-2h)
  UTC Offset: +02:00 (DST active) ← Updated
```

✅ **Pass Criteria:**
- All three selector icons show "🌐 CEST"
- Current Selection panel shows "Paris"
- UTC value changed from 14:30 to 12:30
- Offset shows +02:00

## Test 2: Change Timezone from Date Range Picker

### Initial State (After Test 1)
```
All selectors: 🌐 CEST (Paris)
```

### Action: Click timezone on Date Range Picker → Select "London"

### Expected Result: ALL selectors update to London
```
┌──────────────────────────────────────────┐
│ Single Date Picker                       │
│ [🌐 BST] [2026-04-11T14:30]             │
│     ↑ Changed from CEST!                 │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Date Range Picker                        │
│ [🌐 BST] [2026-04-11] to [2026-04-12]   │
│     ↑ Changed from CEST!                 │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Time Bound Activation                    │
│ [🌐 BST] [Include] [2026-04-11] to ...  │
│     ↑ Changed from CEST!                 │
└──────────────────────────────────────────┘

Current Selection Panel:
  Timezone: London ← Updated
  Single Date: April 11, 2026 14:30 BST ← Updated
  UTC (Backend): 2026-04-11 13:30:00 UTC ← Updated (14:30-1h)
  UTC Offset: +01:00 (DST active) ← Updated
```

✅ **Pass Criteria:**
- All three selector icons show "🌐 BST"
- Current Selection panel shows "London"
- UTC value changed from 12:30 (Paris) to 13:30 (London)
- Offset shows +01:00

## Test 3: Change Timezone from Time Bound Activation

### Initial State (After Test 2)
```
All selectors: 🌐 BST (London)
```

### Action: Click timezone on Time Bound Activation → Select "New York"

### Expected Result: ALL selectors update to New York
```
┌──────────────────────────────────────────┐
│ Single Date Picker                       │
│ [🌐 EDT] [2026-04-11T14:30]             │
│     ↑ Changed from BST!                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Date Range Picker                        │
│ [🌐 EDT] [2026-04-11] to [2026-04-12]   │
│     ↑ Changed from BST!                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Time Bound Activation                    │
│ [🌐 EDT] [Include] [2026-04-11] to ...  │
│     ↑ Changed from BST!                  │
└──────────────────────────────────────────┘

Current Selection Panel:
  Timezone: New York ← Updated
  Single Date: April 11, 2026 14:30 EDT ← Updated
  UTC (Backend): 2026-04-11 18:30:00 UTC ← Updated (14:30+4h)
  UTC Offset: -04:00 (DST active) ← Updated
```

✅ **Pass Criteria:**
- All three selector icons show "🌐 EDT"
- Current Selection panel shows "New York"
- UTC value changed from 13:30 (London) to 18:30 (New York)
- Offset shows -04:00

## Test 4: Verify Cookie Persistence

### Action: Refresh the page (F5)

### Expected Result: Last timezone is remembered
```
All selectors: 🌐 EDT (New York)
Current Selection Panel: New York
```

✅ **Pass Criteria:**
- All selectors show last selected timezone
- Cookie "pma_timezone" contains "America/New_York"

## Test 5: Winter vs Summer (DST Change)

### Setup: Select Paris, set date to January 15, 2026

### Expected Result: Shows CET (winter)
```
All selectors: 🌐 CET (not CEST)
UTC Offset: +01:00 (Standard time)
```

### Action: Change date to July 15, 2026

### Expected Result: Shows CEST (summer)
```
All selectors: 🌐 CEST (not CET)
UTC Offset: +02:00 (DST active)
```

✅ **Pass Criteria:**
- Abbreviation changes with season
- UTC offset changes (+01:00 → +02:00)
- DST status indicator updates

## Test 6: Add New Range in Time Bound Activation

### Setup: Have Paris selected

### Action: Click "+ Add Range" button

### Expected Result: New range has same timezone
```
┌──────────────────────────────────────────────┐
│ Time Bound Activation                        │
│ [🌐 CEST] [Include] [2026-04-11] to ... [×] │
│ [🌐 CEST] [Include] [2026-04-11] to ... [×] │
│           ↑ New range also shows CEST        │
│ [+ Add Range]                                │
└──────────────────────────────────────────────┘
```

### Action: Change timezone to London on ANY selector

### Expected Result: Both ranges update
```
┌──────────────────────────────────────────────┐
│ Time Bound Activation                        │
│ [🌐 BST] [Include] [2026-04-11] to ... [×]  │
│ [🌐 BST] [Include] [2026-04-11] to ... [×]  │
│          ↑ Both show BST                     │
│ [+ Add Range]                                │
└──────────────────────────────────────────────┘
```

✅ **Pass Criteria:**
- New ranges inherit current timezone
- All ranges update when timezone changes

## Test 7: Hover Behavior

### Setup: Paris selected

### Action: Hover over ANY timezone selector

### Expected Result: Shows full name
```
┌──────────────────┐
│ 🌐 CEST Paris   │  ← Expands on hover
└──────────────────┘
```

### Action: Hover over different selector

### Expected Result: Also shows Paris
```
┌──────────────────┐
│ 🌐 CEST Paris   │  ← All show same
└──────────────────┘
```

✅ **Pass Criteria:**
- All selectors show same full name on hover
- All selectors have same abbreviation

## Test 8: Dropdown Selection Indicator

### Setup: Paris selected

### Action: Open dropdown on ANY selector

### Expected Result: Paris is checked
```
┌──────────────────┐
│ ✓ Paris          │  ← Selected
│   London         │
│   Dublin         │
│   Bucharest      │
│   Porto          │
│   New York       │
│   UTC            │
└──────────────────┘
```

### Action: Open dropdown on DIFFERENT selector

### Expected Result: Still Paris is checked
```
┌──────────────────┐
│ ✓ Paris          │  ← Still selected
│   London         │
│   Dublin         │
│   Bucharest      │
│   Porto          │
│   New York       │
│   UTC            │
└──────────────────┘
```

✅ **Pass Criteria:**
- Same option selected in all dropdowns
- Checkmark appears in same position

## Common Issues and Solutions

### Issue: Selectors show different timezones
**Cause:** Synchronization not working
**Check:** 
- Console errors?
- displayUpdaters array populated?
- timezoneManager.subscribe() called?

### Issue: UTC values don't update
**Cause:** Update functions not registered
**Check:**
- displayUpdaters.push() called for each demo?
- Global subscription calls updaters?

### Issue: Abbreviation doesn't change
**Cause:** Selector not subscribed to changes
**Check:**
- TimezoneSelectorTooltip constructor subscribes?
- updateLabel() is called?

### Issue: Cookie not persisting
**Cause:** Cookie not saving properly
**Check:**
- Browser privacy settings
- timezoneManager.setTimezone() called?
- setCookie() function working?

## Summary Checklist

Test all of these to verify synchronization:

- [ ] Change timezone from Single Date Picker → All update
- [ ] Change timezone from Date Range Picker → All update
- [ ] Change timezone from Time Bound Activation → All update
- [ ] Refresh page → Timezone remembered
- [ ] Change date across DST boundary → Abbreviation updates
- [ ] Add new range → Inherits current timezone
- [ ] Hover on any selector → Shows same full name
- [ ] Open any dropdown → Same option checked
- [ ] Check Current Selection panel → Always matches selectors
- [ ] Check UTC values → Update correctly for all pickers

If all tests pass, timezone synchronization is working correctly! ✅
