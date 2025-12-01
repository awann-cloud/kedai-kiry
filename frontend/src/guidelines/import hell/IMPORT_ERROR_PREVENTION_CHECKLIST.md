# Import Error Prevention Checklist

## 🚨 Before Modifying PIN Entry Files

### Files Affected:
- `/PinEntryChecker.tsx`
- `/PinEntryBar.tsx`
- `/PinEntryMakanan.tsx`
- `/PinEntrySnack.tsx`

### Checklist:

#### ✅ 1. Verify Import Paths
```typescript
// ✅ CORRECT
import { imgGroup } from "./imports/PlaceholderSquare";

// ❌ WRONG - DO NOT USE
import { imgGroup } from "./imports/PinFrameBackground";  // File doesn't exist!
import Frame9 from "./imports/Frame9";                     // File doesn't exist!
```

#### ✅ 2. Standard PIN Entry Imports
Every PIN entry file should have:
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import { imgGroup } from "./imports/PlaceholderSquare";  // ⭐ KEY IMPORT
import BackButton from "./imports/BackButton";
import { getPinForDepartment } from './data/pinCodes';
// + Department-specific icon import
```

#### ✅ 3. Department-Specific Imports
- **Checker:** `import CheckerDepartmentIconPaths from "./imports/CheckerDepartmentIcon";`
- **Bar:** `import BarDepartmentIconPaths from "./imports/BarDepartmentIcon";`
- **Makanan:** `import CookChefIconPaths from "./imports/CookChefIcon";`
- **Snack:** `import SnackIconCircle from './imports/SnackIconCircle';`

#### ✅ 4. Files That DO NOT EXIST (Never Import These)
- ❌ `PinFrameBackground.tsx` → Use `PlaceholderSquare.tsx` for imgGroup
- ❌ `Frame9.tsx`
- ❌ `Frame31.tsx`
- ❌ `Staff.tsx`
- ❌ `OnTheirWay.tsx`
- ❌ `SparkleIcon.tsx` → Use `SparkleIconMask.tsx` instead

---

## 🛡️ Prevention Strategy

### Before Committing Code:
1. **Search for bad imports:**
   ```bash
   # Search for PinFrameBackground
   grep -r "PinFrameBackground" src/
   
   # Should return: 0 results
   ```

2. **Search for Frame9:**
   ```bash
   # Search for Frame9
   grep -r "Frame9" src/
   
   # Should return: 0 results
   ```

3. **Search for SparkleIcon (wrong):**
   ```bash
   # Search for old SparkleIcon imports
   grep -r 'from.*SparkleIcon"' src/
   
   # Should return: 0 results (should be SparkleIconMask)
   ```

4. **Verify PlaceholderSquare is used:**
   ```bash
   # All PIN files should import from PlaceholderSquare
   grep -r "PlaceholderSquare" src/PinEntry*.tsx
   
   # Should return: 4 results (one for each PIN file)
   ```

5. **Verify SparkleIconMask is used:**
   ```bash
   # All sparkle decorations should use SparkleIconMask
   grep -r "SparkleIconMask" src/
   
   # Should return: 7+ results
   ```

---

## 📚 Reference Documents
- See: `/guidelines/PIN_ENTRY_CORRECT_IMPORTS.md` for correct import templates
- See: `/guidelines/ASSET_IMPORT_SUMMARY.md` for all available imports
- See: `/guidelines/IMPORT_FOLDER_STATUS.md` for file status

---

## 🔧 If Import Error Occurs:

### Error Message:
```
Failed to resolve import "./imports/PinFrameBackground" from "src/PinEntry*.tsx"
```

### Solution:
1. Open the affected PIN entry file
2. Replace:
   ```typescript
   import { imgGroup } from "./imports/PinFrameBackground";
   ```
   With:
   ```typescript
   import { imgGroup } from "./imports/PlaceholderSquare";
   ```
3. Remove any `Frame9` imports if present
4. Save and restart dev server

---

## ✅ Last Verification
- **Date:** November 29, 2024
- **Status:** All 4 PIN entry files verified and corrected
- **Verified By:** Complete codebase scan
- **Result:** 0 bad imports found ✅
