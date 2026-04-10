# Visual Guide: Timezone Selector with Abbreviation

## Exact Visual Appearance

### Default State (Winter - Paris)
```
┌─────────────┐
│ 🌐 CET      │
└─────────────┘
 ↑   ↑
 │   └─ Abbreviation (10px monospace, 85% opacity)
 └───── Icon (14px, subtle gray filter)

Dimensions:
- Width: ~80px
- Height: ~28px
- Padding: 4px 8px
- Border: 1px solid #0066cc
- Border radius: 50px (pill shape)
```

### Default State (Summer - Paris)
```
┌─────────────┐
│ 🌐 CEST     │
└─────────────┘
 ↑   ↑
 │   └─ Abbreviation automatically updates for DST
 └───── Icon

Note: Same dimensions, only text changes
```

### Hover State (Expanded)
```
┌──────────────────┐
│ 🌐 CEST Paris    │
└──────────────────┘
 ↑   ↑    ↑
 │   │    └─ Full name (14px, fades in)
 │   └────── Abbreviation (10px, 100% opacity)
 └────────── Icon (14px, full color, brighter)

Dimensions:
- Width: Expands to ~160px
- Height: ~28px
- Padding: 4px 12px
- Background: #0066cc (blue)
- Text color: white
```

### UTC Timezone
```
┌─────────────┐
│ 🌐 UTC      │
└─────────────┘

Note: UTC never changes (no DST)
```

### All Timezones at a Glance

**Winter (January):**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🌐 UTC      │    │ 🌐 GMT      │    │ 🌐 GMT      │
└─────────────┘    └─────────────┘    └─────────────┘
    UTC                London             Dublin

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🌐 CET      │    │ 🌐 EET      │    │ 🌐 WET      │
└─────────────┘    └─────────────┘    └─────────────┘
    Paris              Bucharest          Porto

┌─────────────┐
│ 🌐 EST      │
└─────────────┘
   New York
```

**Summer (July):**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🌐 UTC      │    │ 🌐 BST      │    │ 🌐 IST      │
└─────────────┘    └─────────────┘    └─────────────┘
    UTC                London             Dublin

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🌐 CEST     │    │ 🌐 EEST     │    │ 🌐 WEST     │
└─────────────┘    └─────────────┘    └─────────────┘
    Paris              Bucharest          Porto

┌─────────────┐
│ 🌐 EDT      │
└─────────────┘
   New York
```

## In Context: Full Date Picker

### Single Date Picker
```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │ 🌐 CEST     │  │ 2026-04-11T00:15        │   │
│  └─────────────┘  └─────────────────────────┘   │
│   80px width       250px width                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Date Range Picker
```
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐    ┌──────────────┐          │
│  │ 🌐 CEST     │  │ 2026-04-11   │ to │ 2026-04-12   │          │
│  └─────────────┘  └──────────────┘    └──────────────┘          │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Time Bound Activation
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────┐  ┌─────────┐  ┌──────────┐    ┌──────────┐  [×] │
│  │ 🌐 CEST     │  │ Include │  │ 04/11    │ to │ 04/12    │      │
│  └─────────────┘  └─────────┘  └──────────┘    └──────────┘      │
│                                                                     │
│  [+ Add Range]                                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Color Specifications

### Default State
```
┌─────────────┐
│ 🌐 CET      │
└─────────────┘

Icon (🌐):
  - Size: 14px
  - Filter: grayscale(30%)
  - Color: Slightly muted

Abbreviation (CET):
  - Color: #0066cc (blue)
  - Opacity: 0.85 (slightly transparent)
  - Font: Courier New
  - Size: 10px
  - Weight: 600 (semi-bold)

Border:
  - Color: #0066cc (blue)
  - Width: 1px
  - Style: solid

Background:
  - Color: transparent
```

### Hover State
```
┌──────────────────┐
│ 🌐 CEST Paris    │
└──────────────────┘

Icon (🌐):
  - Size: 14px
  - Filter: grayscale(0%) brightness(120%)
  - Color: Full color, brighter

Abbreviation (CEST):
  - Color: white
  - Opacity: 1.0 (fully opaque)
  - Font: Courier New
  - Size: 10px
  - Weight: 600

Full Name (Paris):
  - Color: white
  - Opacity: 1.0
  - Font: System default
  - Size: 14px
  - Weight: 400

Border:
  - Color: #0066cc (blue)
  - Width: 1px
  - Style: solid

Background:
  - Color: #0066cc (blue)
```

### Focus State (Keyboard Navigation)
```
┌─────────────┐
│ 🌐 CET      │ ← Blue outline
└─────────────┘

Additional:
  - Box shadow: 0 0 0 3px rgba(0, 102, 204, 0.1)
  - Outline: none (using box-shadow instead)
```

## Animation Timeline

### Hover In (0ms → 300ms)
```
0ms:    ┌─────────────┐
        │ 🌐 CET      │
        └─────────────┘
        Width: 80px, Opacity: 0.85

100ms:  ┌──────────────┐
        │ 🌐 CET Pa    │
        └──────────────┘
        Width: 120px, Opacity: 0.9, Text fading in

200ms:  ┌────────────────┐
        │ 🌐 CEST Pari   │
        └────────────────┘
        Width: 150px, Opacity: 0.95

300ms:  ┌──────────────────┐
        │ 🌐 CEST Paris    │
        └──────────────────┘
        Width: 160px, Opacity: 1.0, Full background
```

### Hover Out (0ms → 300ms)
```
0ms:    ┌──────────────────┐
        │ 🌐 CEST Paris    │
        └──────────────────┘
        Fully expanded

300ms:  ┌─────────────┐
        │ 🌐 CEST     │
        └─────────────┘
        Back to compact
```

## Responsive Behavior

### Desktop (>1200px)
```
┌─────────────┐  ┌─────────────────────────┐
│ 🌐 CEST     │  │ 2026-04-11T00:15        │
└─────────────┘  └─────────────────────────┘
  Full size        Full width input
```

### Tablet (768px - 1200px)
```
┌─────────────┐  ┌──────────────────┐
│ 🌐 CEST     │  │ 2026-04-11       │
└─────────────┘  └──────────────────┘
  Same size        Slightly narrower
```

### Mobile (<768px)
```
┌─────────────────────────────┐
│ 🌐 CEST                     │
└─────────────────────────────┘
  Full width on tap

┌─────────────────────────────┐
│ 2026-04-11T00:15            │
└─────────────────────────────┘
  Full width input
```

## Typography Comparison

### Icon vs Abbreviation Size
```
┌─────────────┐
│ 🌐 CEST     │
└─────────────┘
  ↑   ↑
  14px 10px

Visual balance:
- Icon slightly larger draws attention
- Abbreviation smaller, more discrete
- Total height remains consistent
```

### Font Family Comparison

**With Monospace (Selected):**
```
┌─────────────┐
│ 🌐 CEST     │  ← Consistent character width
└─────────────┘

┌─────────────┐
│ 🌐 EST      │  ← Same visual width
└─────────────┘
```

**Without Monospace (Alternative):**
```
┌─────────────┐
│ 🌐 CEST     │  ← Variable width
└─────────────┘

┌───────────┐
│ 🌐 EST    │  ← Narrower, inconsistent
└───────────┘
```

## Character Width Analysis

### 3-Letter Abbreviations (Most Common)
```
GMT  ███
BST  ███
IST  ███
CET  ███
WET  ███
EST  ███
UTC  ███

All same width in monospace
```

### 4-Letter Abbreviations
```
CEST ████
EEST ████
WEST ████
```

### Edge Cases
```
+01:00  (When abbreviation unavailable)
GMT+1   (Alternative format)
```

## Accessibility Labels

### Screen Reader Announcement
```
Default:  "Timezone selector, current timezone CEST"
Hover:    "Timezone selector, current timezone CEST Paris, button"
Focused:  "Timezone selector, current timezone CEST Paris, button, press Enter to expand"
Expanded: "Timezone selector menu, 7 items, Paris selected, use arrow keys to navigate"
```

### Suggested ARIA Implementation
```html
<span 
    class="timezone-label"
    role="button"
    tabindex="0"
    aria-label="Timezone selector"
    aria-describedby="tz-current"
    aria-expanded="false"
    aria-haspopup="listbox">
    <span class="timezone-icon" aria-hidden="true">🌐</span>
    <span class="timezone-abbr" id="tz-current">CEST</span>
    <span class="timezone-text" aria-hidden="true">Paris</span>
</span>
```

## Print Stylesheet Considerations

When printing, consider:
```css
@media print {
    .timezone-label {
        max-width: none;
        padding: 0.25rem 0.5rem;
    }
    
    .timezone-text {
        opacity: 1;
        max-width: none;
    }
    
    .timezone-icon {
        display: none; /* Remove emoji for printing */
    }
    
    .timezone-label::before {
        content: "TZ: ";
        font-weight: 600;
    }
}

Result: "TZ: CEST Paris" in print
```

## Dark Mode Variant (Future)

```
Light Mode (Current):
┌─────────────┐
│ 🌐 CEST     │
└─────────────┘
Border: #0066cc (blue)
Text: #0066cc (blue)
Background: transparent

Dark Mode (Suggested):
┌─────────────┐
│ 🌐 CEST     │
└─────────────┘
Border: #4d9fff (lighter blue)
Text: #4d9fff (lighter blue)
Background: transparent

Dark Mode Hover:
┌──────────────────┐
│ 🌐 CEST Paris    │
└──────────────────┘
Background: #4d9fff (lighter blue)
Text: #1a1a1a (dark)
```

## Summary

The timezone selector now displays:

1. **🌐 Icon** (14px) - Visual indicator
2. **CEST** (10px monospace) - Current timezone abbreviation
3. **Paris** (14px, hover) - Full timezone name

This provides immediate context about the selected timezone while maintaining a compact, discrete appearance. The abbreviation automatically updates with DST changes, ensuring accurate information at all times.

**Width:** ~80px (compared to 150px+ for full label)
**Height:** 28px
**Space Savings:** 47% compared to full label
**Information:** 100% - users always know current timezone
