# PIN Entry Pages - Correct Import Reference

## ⚠️ CRITICAL: Common Import Mistakes

### ❌ WRONG - These files DO NOT EXIST:
```typescript
import { imgGroup } from "./imports/PinFrameBackground";  // ❌ DOES NOT EXIST
import Frame9 from "./imports/Frame9";                     // ❌ DOES NOT EXIST
```

### ✅ CORRECT - Use These Instead:
```typescript
import { imgGroup } from "./imports/PlaceholderSquare";    // ✅ CORRECT
```

---

## All 4 PIN Entry Files - Correct Imports

### 1. PinEntryChecker.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import CheckerDepartmentIconPaths from "./imports/CheckerDepartmentIcon";
import { imgGroup } from "./imports/PlaceholderSquare";  // ✅
import BackButton from "./imports/BackButton";
import { getPinForDepartment } from './data/pinCodes';
```

### 2. PinEntryBar.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import BarDepartmentIconPaths from "./imports/BarDepartmentIcon";
import { imgGroup } from "./imports/PlaceholderSquare";  // ✅
import BackButton from "./imports/BackButton";
import { getPinForDepartment } from './data/pinCodes';
```

### 3. PinEntryMakanan.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import CookChefIconPaths from "./imports/CookChefIcon";
import { imgGroup } from "./imports/PlaceholderSquare";  // ✅
import BackButton from "./imports/BackButton";
import { getPinForDepartment } from './data/pinCodes';
```

### 4. PinEntrySnack.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinPadBackgroundPaths from "./imports/PinPadBackground";
import { imgGroup } from "./imports/PlaceholderSquare";  // ✅
import BackButton from './imports/BackButton';
import SnackIconCircle from './imports/SnackIconCircle';
import { getPinForDepartment } from './data/pinCodes';
```

---

## Quick Reference: Where to Get imgGroup

**Always use:** `import { imgGroup } from "./imports/PlaceholderSquare";`

This is used consistently across:
- ✅ All 4 PIN Entry pages
- ✅ All Checker Order pages (CheckerOrdersAll, Bar, Makanan, Snack)
- ✅ All regular Order pages (OrdersKitchen, OrdersBar, OrdersSnack)
- ✅ All SearchReceiptSidebar components

---

## Last Updated
- **Date:** November 29, 2024
- **Fixed:** All 4 PIN entry files corrected from PinFrameBackground → PlaceholderSquare
- **Status:** ✅ All imports verified working
