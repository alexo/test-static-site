# Timezone Synchronization Feature

## Overview

All timezone selectors on the page are now synchronized. When any timezone selector is changed, **all date pickers and displays update simultaneously** to reflect the new timezone.

## Implementation

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TimezoneManager                          │
│  - Stores current timezone                                  │
│  - Manages cookie persistence                               │
│  - Notifies all subscribers when timezone changes           │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Selector 1  │   │  Selector 2  │   │  Selector 3  │
│ Single Date  │   │ Date Range   │   │ Time Bound   │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ↓
                  ┌─────────────────────┐
                  │ Global Subscription │
                  │ Updates All Displays│
                  └─────────────────────┘
```

### Key Components

#### 1. TimezoneManager (Singleton)
```javascript
const timezoneManager = new TimezoneManager();
```

- **Single source of truth** for current timezone
- **Listener pattern** - allows multiple subscribers
- **Cookie persistence** - saves timezone for 365 days
- **Validation** - ensures timezone is in available options

#### 2. Display Updaters Registry
```javascript
const displayUpdaters = [];
```

- **Central registry** of all display update functions
- **Each demo section** registers its update function
- **Global subscription** calls all updaters when timezone changes

#### 3. TimezoneSelectorTooltip Components
```javascript
class TimezoneSelectorTooltip {
    constructor(container, onTimezoneChange) {
        // Subscribe to timezone changes from OTHER selectors
        this.unsubscribe = timezoneManager.subscribe((timezone) => {
            this.updateLabel();
            this.updateSelectedOption();
        });
    }
}
```

- **Self-updating** - each selector subscribes to changes
- **Label updates** - abbreviation and full name update automatically
- **Dropdown sync** - selected option updates across all selectors

## User Experience Flow

### Scenario: User Changes Timezone on Single Date Picker

**Step 1: User clicks timezone selector on Single Date Picker**
```
┌─────────────────────────────────────────┐
│ Single Date Picker                      │
│ [🌐 CEST] [2026-04-11T14:30]           │
│      ↑                                  │
│   User clicks here                      │
└─────────────────────────────────────────┘
```

**Step 2: Dropdown appears, user selects "London"**
```
┌─────────────────────────────────────────┐
│ [🌐 CEST ▼]                            │
│  ┌──────────────┐                      │
│  │ Paris     ✓  │                      │
│  │ London    ← (User clicks)           │
│  │ Dublin       │                      │
│  │ UTC          │                      │
│  └──────────────┘                      │
└─────────────────────────────────────────┘
```

**Step 3: ALL selectors update simultaneously**
```
┌─────────────────────────────────────────┐
│ Single Date Picker                      │
│ [🌐 BST] [2026-04-11T14:30]            │
│      ↓                                  │
│   Changed to BST                        │
│                                         │
│ Current Selection Panel:                │
│   Local: April 11, 2026 14:30 BST      │
│   UTC: 2026-04-11 13:30:00 UTC         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Date Range Picker                       │
│ [🌐 BST] [Start] to [End]              │
│      ↓                                  │
│   Also changed to BST                   │
│                                         │
│ Current Selection Panel:                │
│   Local: Apr 11, 2026 14:30 BST        │
│   UTC: 2026-04-11 13:30:00 UTC         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Time Bound Activation                   │
│ [🌐 BST] [Include] [Start] to [End]    │
│      ↓                                  │
│   Also changed to BST                   │
└─────────────────────────────────────────┘
```

## Technical Implementation

### Registration Pattern

Each demo section registers its update function:

```javascript
function initSingleDateDemo() {
    // ... setup code ...
    
    function updateSingleDateDisplay() {
        // Update display based on current timezone
        const tz = timezoneManager.getTimezone();
        const localMoment = moment.tz(value, tz);
        // ... update UI ...
    }
    
    // Register this updater ← KEY LINE
    displayUpdaters.push(updateSingleDateDisplay);
    
    // ... rest of setup ...
}
```

### Global Subscription

The global subscription ensures all displays update:

```javascript
timezoneManager.subscribe((timezone) => {
    updateCurrentTimezone();
    
    // Call all registered display updaters ← KEY PART
    displayUpdaters.forEach(updater => {
        try {
            updater();
        } catch (e) {
            console.error('Error updating display:', e);
        }
    });
});
```

### Selector Self-Update

Each timezone selector also updates itself:

```javascript
class TimezoneSelectorTooltip {
    constructor(container, onTimezoneChange) {
        // Subscribe to changes from OTHER selectors
        this.unsubscribe = timezoneManager.subscribe((timezone) => {
            this.updateLabel();           // Update abbreviation
            this.updateSelectedOption();  // Update dropdown
        });
    }
}
```

## Synchronization Guarantees

### 1. ✅ Single Source of Truth
- Only one `TimezoneManager` instance
- All selectors read from same source
- No possibility of drift between selectors

### 2. ✅ Immediate Updates
- Changes propagate instantly (synchronous)
- No delay between selectors updating
- No flicker or intermediate states

### 3. ✅ Complete Coverage
- All timezone selectors update
- All date displays update
- All UTC calculations update
- All DST status indicators update
- All abbreviations update

### 4. ✅ Error Isolation
- If one updater fails, others continue
- Try-catch prevents cascade failures
- Errors logged to console for debugging

## Behavior Examples

### Example 1: Change from Paris to New York

**Before:**
```
Selector 1: 🌐 CEST    Display: April 11, 2026 14:30 CEST → UTC: 12:30
Selector 2: 🌐 CEST    Display: Apr 11, 2026 14:30 CEST → UTC: 12:30
Selector 3: 🌐 CEST    Display: Apr 11, 2026 14:30 CEST → UTC: 12:30
```

**After (user clicks New York on ANY selector):**
```
Selector 1: 🌐 EDT     Display: April 11, 2026 14:30 EDT → UTC: 18:30
Selector 2: 🌐 EDT     Display: Apr 11, 2026 14:30 EDT → UTC: 18:30
Selector 3: 🌐 EDT     Display: Apr 11, 2026 14:30 EDT → UTC: 18:30
```

**Note:** 
- Same local time input (14:30)
- Different UTC output (12:30 → 18:30)
- All selectors synchronized

### Example 2: DST Transition with Timezone Change

**Before (Summer date in Paris):**
```
Date: July 15, 2026 14:30
Timezone: CEST (Paris Summer)
UTC: 2026-07-15 12:30:00 UTC
Offset: +02:00
```

**After (Switch to London):**
```
Date: July 15, 2026 14:30 (same input)
Timezone: BST (London Summer)
UTC: 2026-07-15 13:30:00 UTC
Offset: +01:00
```

**All displays update to show:**
- New abbreviation (CEST → BST)
- New UTC value (12:30 → 13:30)
- New offset (+02:00 → +01:00)
- Same local time (14:30)

## Testing

### Manual Test Steps

1. **Open the demo page**
2. **Set a date in Single Date Picker**: e.g., April 11, 2026 14:30
3. **Observe initial timezone**: Should be UTC (or saved preference)
4. **Click timezone on Single Date Picker**
5. **Select "Paris"**
6. **Verify all selectors change**: 
   - All should show "🌐 CEST"
   - All displays should update
7. **Click timezone on Date Range Picker**
8. **Select "London"**
9. **Verify all selectors change**: 
   - All should show "🌐 BST"
   - All displays should update
10. **Verify UTC values changed**:
    - Paris CEST: 14:30 → 12:30 UTC
    - London BST: 14:30 → 13:30 UTC

### Expected Results

✅ All three timezone selectors show same abbreviation
✅ All display panels show consistent timezone
✅ UTC values update correctly for all date pickers
✅ DST status updates for all displays
✅ Cookie saves last selected timezone
✅ Page reload uses saved timezone for all selectors

## Benefits

### 1. Consistent User Experience
- No confusion about which timezone is active
- All displays always in sync
- Single action updates everything

### 2. Prevents Errors
- Impossible to have mismatched timezones
- No need to update each selector manually
- Reduces user mistakes

### 3. Efficient Implementation
- Single timezone manager
- Shared state
- Minimal code duplication

### 4. Flexible Architecture
- Easy to add new pickers
- Easy to add new displays
- Easy to extend functionality

## Production Considerations

### 1. Performance
```javascript
// Current: O(n) where n = number of updaters
displayUpdaters.forEach(updater => updater());

// For many pickers (>100), consider debouncing:
const debouncedUpdate = debounce(() => {
    displayUpdaters.forEach(updater => updater());
}, 10);
```

### 2. Memory Management
```javascript
// Clean up when picker is removed
class TimezoneSelectorTooltip {
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe(); // Remove from listeners
        }
        // Remove from displayUpdaters if needed
    }
}
```

### 3. Error Handling
```javascript
// Already implemented with try-catch
displayUpdaters.forEach(updater => {
    try {
        updater();
    } catch (e) {
        console.error('Error updating display:', e);
        // Could add error reporting here
    }
});
```

### 4. Testing
```javascript
// Unit test example
it('should update all selectors when timezone changes', () => {
    const selector1 = new TimezoneSelectorTooltip(container1);
    const selector2 = new TimezoneSelectorTooltip(container2);
    
    timezoneManager.setTimezone('Europe/Paris');
    
    expect(selector1.getTimezoneAbbr()).toBe('CEST');
    expect(selector2.getTimezoneAbbr()).toBe('CEST');
});
```

## Migration from Non-Synchronized Version

If you had independent timezone selectors:

### Before (Not Synchronized)
```javascript
const selector1 = new TimezoneSelector(container1, 'Europe/Paris');
const selector2 = new TimezoneSelector(container2, 'America/New_York');
// Different timezones possible ❌
```

### After (Synchronized)
```javascript
const selector1 = new TimezoneSelectorTooltip(container1, updateDisplay1);
const selector2 = new TimezoneSelectorTooltip(container2, updateDisplay2);
// Always same timezone ✅
```

**Note:** All selectors now share the same timezone state through `TimezoneManager`.

## FAQ

**Q: What if I want different timezones for different pickers?**
A: This is not supported by design. The synchronization ensures consistency. If you need different timezones, you would need multiple `TimezoneManager` instances, but this defeats the purpose of the feature.

**Q: Does this work with dynamically added pickers?**
A: Yes, as long as new pickers:
1. Use the same `timezoneManager` instance
2. Register their update function in `displayUpdaters`
3. Subscribe to timezone changes

**Q: What happens if a picker is removed?**
A: The subscription remains in memory. For production, implement a `destroy()` method to clean up subscriptions.

**Q: Can I disable synchronization?**
A: Not recommended, but you could create separate `TimezoneManager` instances for independent pickers.

## Summary

The timezone synchronization feature ensures that:
- ✅ All timezone selectors stay in sync
- ✅ All date displays update together  
- ✅ Single action affects entire page
- ✅ Impossible to have mismatched timezones
- ✅ Consistent user experience
- ✅ Reduced potential for errors

This is the expected behavior for a professional datetime selector component.
