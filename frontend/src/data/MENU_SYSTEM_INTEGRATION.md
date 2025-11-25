# Menu Management System Integration Guide

## 🎯 Overview

The menu management system now **dynamically discovers menu items** from your existing orders and cooking logs, and uses **EFFICIENCY_THRESHOLDS** as the foundation for all preset calculations.

## 📂 File Structure

### Core Data Files (in `/data` folder)

1. **`menuItemsUtils.ts`** - Menu Item Discovery
   - Automatically extracts menu items from orders and cooking logs
   - Sources: `makananOrders.ts`, `barOrders.ts`, `snackOrders.ts`, `cookingLogs.ts`
   - Returns: List of discovered items with department info

2. **`menuItemsConfig.ts`** - Configuration & Presets
   - Stores user customizations in localStorage
   - Uses `EFFICIENCY_THRESHOLDS` from `efficiency.ts` for all calculations
   - Provides helper functions for classification and timing

3. **`efficiency.ts`** - Master Efficiency System (unchanged)
   - Contains `EFFICIENCY_THRESHOLDS` that define all timing ratios
   - Foundation for the entire preset system

## 🔄 How It Works

### 1. Menu Item Discovery

```typescript
// Discovers all menu items from orders and logs
discoverAllMenuItems()
// Returns: [
//   { name: "Nasi Goreng", department: "kitchen", sources: ["orders", "cooking-logs"] },
//   { name: "Iced Coffee", department: "bar", sources: ["orders"] },
//   ...
// ]
```

**Sources Scanned:**
- Kitchen: `makananOrders.ts`
- Bar: `barOrders.ts`
- Snack: `snackOrders.ts`
- Historical: `cookingLogs.ts`

### 2. Preset Calculation

Based on `EFFICIENCY_THRESHOLDS`:

```typescript
{
  sangatCepat: { max: 0.5 },           // Very Fast: ≤ 50%
  cepat: { min: 0.5, max: 0.8 },       // Fast: 50-80%
  normal: { min: 0.8, max: 1.2 },      // Standard: 80-120%
  lambat: { min: 1.2, max: 2.0 },      // Slow: 120-200%
  sangatLambat: { min: 2.0 }           // Extremely Slow: ≥ 200%
}
```

**Example: Standard time = 10 minutes**

| Preset | Calculation | Result |
|--------|-------------|--------|
| ⚡ Very Fast | 10 × 0.5 | 5 min |
| 🚀 Fast | 10 × 0.65 (avg) | 6.5 min |
| 👍 Standard | 10 × 1.0 | 10 min |
| 🐢 Slow | 10 × 1.6 (avg) | 16 min |
| 🐌 Extremely Slow | 10 × 2.0 | 20 min |

### 3. Default Standard Times by Department

```typescript
Kitchen: 15 minutes  // Main dishes
Bar:      3 minutes  // Drinks
Snack:    8 minutes  // Appetizers/sides
```

## 🔗 Integration Points

### MenuManagement.tsx
- Uses `discoverAllMenuItems()` to populate item list
- Uses `calculateDefaultPresets()` for new items
- Saves customizations via `menuItemsConfig.ts`
- Shows "Custom" badge for modified items

### Efficiency Tracking (Future Integration)
```typescript
import { classifyByPresets, getEfficiencyPercentage } from './data/menuItemsConfig';

// When an item is finished cooking:
const config = getConfigForItem(itemName, department);
const classification = classifyByPresets(cookTimeSeconds, config);
const percentage = getEfficiencyPercentage(cookTimeSeconds, config);

// Returns: 'very-fast' | 'fast' | 'standard' | 'slow' | 'extremely-slow'
// And: percentage like 85% (meaning it took 85% of standard time)
```

### StaffContext.tsx Integration
```typescript
import { getConfigForItem } from './data/menuItemsConfig';

// In your efficiency calculation:
const config = getConfigForItem(log.menuName, log.department);
const standardTime = getStandardTimeForItem(config);
const efficiency = classifyByPresets(log.totalSeconds, config);
```

## 📊 Data Flow

```
Orders & Logs → menuItemsUtils.ts (Discovery)
                        ↓
                Discovered Items
                        ↓
           MenuManagement.tsx (UI)
                        ↓
         User Customizations → menuItemsConfig.ts (Storage)
                        ↓
                  localStorage
                        ↓
         ← menuItemsConfig.ts (Retrieval)
                        ↓
         Efficiency Tracking / Analytics
```

## 🎨 User Interface Features

### Auto-Discovery
- System scans orders/logs on load
- Displays count: "42 items discovered"
- Refresh button to rescan after adding new orders

### Configuration
- Select any discovered item
- Adjust 5 presets (Very Fast → Extremely Slow)
- "Custom" badge appears when modified
- Reset button returns to EFFICIENCY_THRESHOLDS calculation

### Templates
- Quick Service (3 min baseline)
- Fast Food (8 min baseline)
- Standard Main Course (15 min baseline)
- Complex Main Course (25 min baseline)
- Custom presets (5, 12 min)

## 🔧 Customization Examples

### Changing EFFICIENCY_THRESHOLDS

Edit `/data/efficiency.ts`:

```typescript
export const EFFICIENCY_THRESHOLDS = {
  sangatCepat: { max: 0.6 },        // Change from 0.5 to 0.6
  cepat: { min: 0.6, max: 0.9 },    // Adjust Fast range
  // ... etc
}
```

All presets recalculate automatically!

### Adding New Default Times

Edit `/data/menuItemsConfig.ts`:

```typescript
export function getDefaultStandardTime(department: 'kitchen' | 'bar' | 'snack'): number {
  switch (department) {
    case 'kitchen': return 20; // Change from 15 to 20 minutes
    case 'bar': return 2;      // Change from 3 to 2 minutes
    case 'snack': return 10;   // Change from 8 to 10 minutes
  }
}
```

## 📈 Analytics Integration (Ready to Use)

```typescript
// Example: Track if cook is meeting expected times
import { classifyByPresets, getConfigForItem } from './data/menuItemsConfig';

function analyzePerformance(cookName: string, itemName: string, cookTime: number) {
  const config = getConfigForItem(itemName, 'kitchen');
  const classification = classifyByPresets(cookTime, config);
  
  if (classification === 'very-fast' || classification === 'fast') {
    console.log(`${cookName} is exceeding expectations! 🌟`);
  } else if (classification === 'slow' || classification === 'extremely-slow') {
    console.log(`${cookName} needs support on ${itemName} ⚠️`);
  }
}
```

## 🎯 Key Benefits

1. **Dynamic Discovery** - No manual menu entry needed
2. **Single Source of Truth** - EFFICIENCY_THRESHOLDS controls everything
3. **Flexible** - Easy to adjust thresholds or default times
4. **Persistent** - User customizations saved across sessions
5. **Integrated** - Ready to connect with efficiency tracking
6. **Automatic** - New items in orders appear automatically

## 🚀 Next Steps for Integration

1. **Connect to StaffContext.tsx**
   - Use `getConfigForItem()` instead of hardcoded averages
   - Apply `classifyByPresets()` for efficiency classification

2. **Update CookingAnalytics**
   - Show expected time vs actual time
   - Color-code based on preset classification

3. **Real-time Warnings**
   - Alert when cooking exceeds "Slow" threshold
   - Show progress bars based on presets

4. **Performance Dashboard**
   - % of items completed within "Standard" preset
   - Trend analysis (getting faster/slower over time)
