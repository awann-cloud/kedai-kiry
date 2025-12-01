# Common Import Errors - Quick Fix Guide

## 🚨 Error 1: PinFrameBackground

### Error Message:
```
Failed to resolve import "./imports/PinFrameBackground"
```

### ❌ Wrong Code:
```typescript
import { imgGroup } from "./imports/PinFrameBackground";
```

### ✅ Correct Code:
```typescript
import { imgGroup } from "./imports/PlaceholderSquare";
```

### Files Affected:
- PinEntryChecker.tsx
- PinEntryBar.tsx
- PinEntryMakanan.tsx
- PinEntrySnack.tsx

---

## 🚨 Error 2: Frame9

### Error Message:
```
Failed to resolve import "./imports/Frame9"
```

### ❌ Wrong Code:
```typescript
import Frame9 from "./imports/Frame9";
```

### ✅ Fix:
**Delete the entire import line** - Frame9 doesn't exist and isn't needed.

### Files Affected:
- PinEntryChecker.tsx (previously)
- PinEntryMakanan.tsx (previously)

---

## 🚨 Error 3: SparkleIcon

### Error Message:
```
Failed to resolve import "../imports/SparkleIcon"
```

### ❌ Wrong Code:
```typescript
import { imgGroup as sparkleImgGroup } from "../imports/SparkleIcon";
```

### ✅ Correct Code:
```typescript
import { imgGroup as sparkleImgGroup } from "../imports/SparkleIconMask";
```

### Files Affected:
- MenuReview.tsx
- CookingAnalytics.tsx
- AdminSettings.tsx
- AdminMenuManagement.tsx
- AdminRawDatabase.tsx
- AdminStaffManagement.tsx
- CheckerHome.tsx

---

## 📋 Complete List of Renamed/Non-Existent Files

| ❌ Old/Wrong Name | ✅ Correct Name | Purpose |
|------------------|-----------------|---------|
| `PinFrameBackground.tsx` | `PlaceholderSquare.tsx` | imgGroup for PIN entry backgrounds |
| `SparkleIcon.tsx` | `SparkleIconMask.tsx` | Sparkle decoration mask |
| `Frame9.tsx` | *Does not exist* | Remove import entirely |
| `Frame31.tsx` | *Does not exist* | Legacy unused |
| `Staff.tsx` | *Does not exist* | Old unused component |
| `OnTheirWay.tsx` | *Does not exist* | Legacy component |

---

## 🔍 How to Find and Fix These Errors

### Step 1: Search for Bad Imports
```bash
# In your terminal/command prompt:
cd src/

# Search for PinFrameBackground
grep -r "PinFrameBackground" .

# Search for Frame9
grep -r "Frame9" .

# Search for old SparkleIcon (not SparkleIconMask)
grep -r 'from.*SparkleIcon"' .
```

### Step 2: Apply Fixes
For each file found:
1. Open the file
2. Find the wrong import line
3. Replace with correct import (see examples above)
4. Save file

### Step 3: Verify Fix
```bash
# Should return 0 results:
grep -r "PinFrameBackground" src/
grep -r "Frame9" src/
grep -r 'from.*SparkleIcon"' src/
```

---

## ✅ Correct Import Patterns

### For PIN Entry Pages:
```typescript
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import { imgGroup } from "./imports/PlaceholderSquare";  // ⭐
import BackButton from "./imports/BackButton";
```

### For Admin/Analytics Pages:
```typescript
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIconMask";  // ⭐
```

### For Order/Receipt Pages:
```typescript
import StatusCirclesPaths from "./imports/StatusCirclesPaths";
import { imgGroup } from "./imports/PlaceholderSquare";  // ⭐
```

---

## 🛠️ Prevention Tips

1. **Always check `/imports` directory** before importing
2. **Use the correct import guides:**
   - PIN_ENTRY_CORRECT_IMPORTS.md
   - ASSET_IMPORT_SUMMARY.md
3. **Run verification before committing code**
4. **If unsure, search existing files** for similar imports

---

## 📅 Last Updated
- **Date:** November 29, 2024
- **Fixes Applied:** 
  - ✅ All PIN entry files (PinFrameBackground → PlaceholderSquare)
  - ✅ MenuReview.tsx (SparkleIcon → SparkleIconMask)
- **Status:** All import errors resolved ✅
