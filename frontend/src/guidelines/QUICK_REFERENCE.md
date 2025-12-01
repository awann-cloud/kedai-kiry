# 🚀 Quick Reference - Kitchen Order Management System

**Terakhir Diupdate:** 29 November 2025  
**Versi:** 3.0 (Staff Management + Quick Filters Update)

## 📋 Daftar Isi

1. [File Locations](#file-locations)
2. [localStorage Keys](#localstorage-keys)
3. [Context Hooks](#context-hooks)
4. [Department Mapping](#department-mapping)
5. [Staff ID Format](#staff-id-format)
6. [Status Flow](#status-flow)
7. [Timing Data](#timing-data)
8. [Quick Filters](#quick-filters)
9. [Efficiency Levels](#efficiency-levels)
10. [Common Functions](#common-functions)

---

## 📁 File Locations

### Core Files

```
/
├── App.tsx                           # Main router
├── contexts/
│   ├── OrderContext.tsx             # Order state management
│   ├── StaffContext.tsx             # Staff & analytics
│   └── WaiterContext.tsx            # Waiter assignment
├── data/
│   ├── orders.ts                    # Type definitions
│   ├── staff.ts                     # Staff types
│   ├── makananOrders.ts             # Kitchen menu items
│   ├── barOrders.ts                 # Bar menu items
│   └── snackOrders.ts               # Snack menu items
└── components/
    ├── SelectCookPanel.tsx          # Cook assignment panel
    ├── SelectWaiterPanel.tsx        # Waiter assignment panel
    ├── CookingAnalytics.tsx         # Efficiency analytics
    ├── MenuReview.tsx               # Menu performance
    └── SearchReceiptSidebar.tsx     # Search/filter sidebar
```

### Department Pages

```
/
├── OrdersKitchen.tsx                # Kitchen orders
├── OrdersBar.tsx                    # Bar orders
├── OrdersSnack.tsx                  # Snack orders
├── CheckerOrdersAll.tsx             # Checker: all departments
├── CheckerOrdersMakanan.tsx         # Checker: kitchen only
├── CheckerOrdersBar.tsx             # Checker: bar only
└── CheckerOrdersSnack.tsx           # Checker: snack only
```

### Admin Pages

```
/
├── AdminHome.tsx                    # Admin dashboard
├── AdminStaffManagement.tsx         # Staff CRUD
├── AdminMenuManagement.tsx          # Menu management
└── AdminRawDatabase.tsx             # Raw data view
```

---

## 📦 localStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `kitchenOrders` | `Order[]` | Kitchen department orders |
| `barOrders` | `Order[]` | Bar department orders |
| `snackOrders` | `Order[]` | Snack department orders |
| `cookingLogs` | `CookingLog[]` | Completed order analytics |
| `staffManagementList` | `StaffMember[]` | Staff database (Admin) |

---

## 🔌 Context Hooks

### OrderContext

```typescript
import { useOrders } from './contexts/OrderContext';

const {
  kitchenOrders,
  barOrders,
  snackOrders,
  getAllOrders,
  startItem,
  finishItem,
  completeOrder,
  assignWaiterToItem,
  markItemDelivered
} = useOrders();
```

### StaffContext

```typescript
import { useStaff } from './contexts/StaffContext';

const {
  getStaffByDepartment,
  cookingLogs,
  addCookingLog,
  getProcessedLogs,
  exportToCSV
} = useStaff();
```

### WaiterContext

```typescript
import { useWaiter } from './contexts/WaiterContext';

const {
  getItemWaiter,
  getOrderWaiter,
  isItemDelivered,
  isOrderFullyDelivered,
  assignWaiterToItem,
  markItemDelivered
} = useWaiter();
```

---

## 🗺️ Department Mapping

### Admin Staff Management (Capitalized)

```typescript
const departments = ['Kitchen', 'Bar', 'Snack', 'Checker'];
```

### Context & localStorage (Lowercase)

```typescript
const departments = ['kitchen', 'bar', 'snack', 'waitress'];
```

### Mapping Table

| Admin | Context | Menu Category | Description |
|-------|---------|---------------|-------------|
| Kitchen | kitchen | Makanan | Kitchen department |
| Bar | bar | Minuman | Bar department |
| Snack | snack | Snack | Snack department |
| Checker | waitress | - | Waiter/Waitress |

### Conversion Function

```typescript
const departmentMap: { [key: string]: string } = {
  'Kitchen': 'kitchen',
  'Bar': 'bar',
  'Snack': 'snack',
  'Checker': 'waitress'
};

// Admin → Context
const contextDept = departmentMap[adminDept]; // "Kitchen" → "kitchen"

// Context → Admin
const adminDept = Object.keys(departmentMap).find(
  key => departmentMap[key] === contextDept
); // "kitchen" → "Kitchen"
```

---

## 🆔 Staff ID Format

### Auto-Increment System

| Department | Prefix | Format | Example |
|-----------|--------|--------|---------|
| Kitchen | `k` | k{n} | k1, k2, k3, k4, ... |
| Bar | `b` | b{n} | b1, b2, b3, b4, ... |
| Snack | `s` | s{n} | s1, s2, s3, s4, ... |
| Checker | `w` | w{n} | w1, w2, w3, w4, ... |

### Generate Next ID

```typescript
const generateNextStaffId = (department: string, existingStaff: StaffMember[]) => {
  const prefixMap = {
    'Kitchen': 'k',
    'Bar': 'b',
    'Snack': 's',
    'Checker': 'w'
  };
  
  const prefix = prefixMap[department];
  const departmentStaff = existingStaff.filter(s => s.department === department);
  const existingIds = departmentStaff
    .map(s => parseInt(s.id.replace(prefix, '')))
    .filter(num => !isNaN(num));
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  return `${prefix}${maxId + 1}`;
};
```

---

## 🔄 Status Flow

### Item Status

```
not-started → on-going → finished
```

### Order Status (Conceptual)

```
All items not-started → Category 3 (NOT STARTED)
  ↓
Some items started → Category 2 (ONGOING)
  ↓
All items finished → Category 1 (FINISHED)
  ↓
Waiter assigned → Ready for delivery
  ↓
All items delivered → Complete
```

### Status Check Functions

```typescript
// Category 1: All items finished
const isFinished = (order: Order) => 
  order.items.every(item => item.status === 'finished');

// Category 2: Has progress but not all finished
const isOngoing = (order: Order) => 
  order.items.some(item => item.status === 'on-going' || item.status === 'finished') &&
  order.items.some(item => item.status === 'not-started');

// Category 3: All items not started
const isNotStarted = (order: Order) => 
  order.items.every(item => item.status === 'not-started');
```

---

## ⏱️ Timing Data

### Timestamp Fields

| Field | Type | When Set | Purpose |
|-------|------|----------|---------|
| `startedTime` | Date | Cook clicks "Start" | Menandai awal memasak |
| `finishedTime` | Date | Cook clicks "Finish" | Menandai selesai memasak |
| `elapsedTime` | number | Item finished | Durasi memasak (detik) |
| `frozenTime` | Date | Order completed | Snapshot untuk log |
| `deliveredTime` | Date | Waiter delivers | Track delivery time |

### Calculate Elapsed Time

```typescript
const calculateElapsedTime = (startedTime: Date, finishedTime: Date): number => {
  const diff = finishedTime.getTime() - startedTime.getTime();
  return Math.floor(diff / 1000); // Convert ms to seconds
};
```

### Format Time Display

```typescript
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Example: 330 seconds → "05:30"
```

---

## 🔍 Quick Filters

### Available Filters (Updated 29 Nov 2025)

| Filter | Range | Description |
|--------|-------|-------------|
| **Yesterday** | Previous day | 00:00:00 - 23:59:59 kemarin |
| **Today** | Current day | 00:00:00 - now hari ini |
| **This Week** | Sunday - now | Minggu ini dari hari Minggu |
| **This Month** | 1st - now | Bulan ini dari tanggal 1 |

### Implementation

```typescript
const handleQuickFilter = (period: 'yesterday' | 'today' | 'week' | 'month') => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate: Date;
  let endDate: Date = now;
  
  if (period === 'yesterday') {
    // Yesterday only
    startDate = new Date(today);
    startDate.setDate(today.getDate() - 1);
    endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === 'today') {
    // Today only
    startDate = today;
    endDate = now;
  } else if (period === 'week') {
    // Start of current week (Sunday)
    const day = now.getDay();
    startDate = new Date(today);
    startDate.setDate(today.getDate() - day);
  } else { // month
    // Start of current month
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  setFilters({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });
};
```

### Usage Locations

- ✅ `/components/CookingAnalytics.tsx` - Cooking Efficiency Analytics
- ✅ `/components/MenuReview.tsx` - Menu Performance Review
- ✅ `/AdminRawDatabase.tsx` - Raw Database View

---

## 📊 Efficiency Levels

### Classification

```typescript
function classifyEfficiency(seconds: number): EfficiencyLevel {
  if (seconds <= 120) return 'Very Fast';    // ≤ 2 min
  if (seconds <= 240) return 'Fast';         // 2-4 min
  if (seconds <= 360) return 'Normal';       // 4-6 min
  if (seconds <= 600) return 'Slow';         // 6-10 min
  return 'Very Slow';                        // > 10 min
}
```

### Color Coding

| Level | Color | Range | CSS Class |
|-------|-------|-------|-----------|
| Very Fast | Green | ≤ 120s | `text-green-500` |
| Fast | Light Green | 121-240s | `text-lime-500` |
| Normal | Blue | 241-360s | `text-blue-500` |
| Slow | Orange | 361-600s | `text-orange-500` |
| Very Slow | Red | > 600s | `text-red-500` |

---

## 🛠️ Common Functions

### Load Staff from localStorage

```typescript
const loadStaffFromLocalStorage = (department: string) => {
  const savedStaffList = localStorage.getItem('staffManagementList');
  if (!savedStaffList) return [];
  
  try {
    const staffList = JSON.parse(savedStaffList);
    
    const departmentMap: { [key: string]: string } = {
      'Kitchen': 'kitchen',
      'Bar': 'bar',
      'Snack': 'snack',
      'Checker': 'waitress'
    };
    
    return staffList
      .filter((s: any) => 
        departmentMap[s.department] === department && s.isActive
      )
      .map((s: any) => ({
        id: s.id,
        name: s.name,
        position: s.position || 'Staff',
        department: departmentMap[s.department],
        available: s.isActive
      }));
  } catch (error) {
    console.error('Failed to parse staff list:', error);
    return [];
  }
};
```

### Start Item

```typescript
const handleStartItem = (orderId: string, itemId: string, cookName: string) => {
  startItem('kitchen', orderId, itemId, cookName);
  // Item status: "not-started" → "on-going"
  // startedTime: Date.now()
};
```

### Finish Item

```typescript
const handleFinishItem = (orderId: string, itemId: string) => {
  finishItem('kitchen', orderId, itemId);
  // Item status: "on-going" → "finished"
  // finishedTime: Date.now()
  // elapsedTime: calculated
};
```

### Assign Waiter to Item

```typescript
const handleAssignWaiter = (orderId: string, itemId: string, waiterName: string) => {
  assignWaiterToItem('kitchen', orderId, itemId, waiterName);
  // item.waiter: waiterName
  // item.deliveryStartTime: Date.now()
};
```

### Mark Item Delivered

```typescript
const handleMarkDelivered = (orderId: string, itemId: string) => {
  markItemDelivered('kitchen', orderId, itemId);
  // item.deliveredTime: Date.now()
};
```

---

## 🔧 Utility Snippets

### Safe localStorage Parse

```typescript
const safeLocalStorageParse = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error);
    return defaultValue;
  }
};

// Usage:
const orders = safeLocalStorageParse<Order[]>('kitchenOrders', []);
```

### Date Formatting

```typescript
// Format date as YYYY-MM-DD
const formatDateYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date as DD/MM/YYYY
const formatDateDMY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Format time as HH:MM:SS
const formatTimeHMS = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
```

### FIFO Sorting

```typescript
// Sort orders by orderTime (FIFO - First In First Out)
const sortOrdersFIFO = (orders: Order[]): Order[] => {
  return [...orders].sort((a, b) => 
    new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime()
  );
};
```

### Category Sorting

```typescript
// Sort orders into 3 categories with FIFO within each
const categorizeAndSortOrders = (orders: Order[]) => {
  const finished = orders.filter(o => 
    o.items.every(i => i.status === 'finished')
  );
  
  const ongoing = orders.filter(o => 
    o.items.some(i => i.status === 'on-going' || i.status === 'finished') &&
    o.items.some(i => i.status === 'not-started')
  );
  
  const notStarted = orders.filter(o => 
    o.items.every(i => i.status === 'not-started')
  );
  
  return {
    finished: sortOrdersFIFO(finished),
    ongoing: sortOrdersFIFO(ongoing),
    notStarted: sortOrdersFIFO(notStarted)
  };
};
```

---

## 🎨 Styling Constants

### Color Palette

```typescript
// Primary colors
const colors = {
  primary: '#4D236E',           // Deep purple
  receiptCard: '#8b6dac',       // Light purple
  
  // Status colors
  notStarted: '#EF4444',        // Red
  ongoing: '#F59E0B',           // Orange
  finished: '#10B981',          // Green
  
  // Button colors
  assignButton: '#10B981',      // Green
  deliveredButton: '#3B82F6',  // Blue
  
  // Efficiency colors
  veryFast: '#10B981',          // Green
  fast: '#84CC16',              // Lime
  normal: '#3B82F6',            // Blue
  slow: '#F59E0B',              // Orange
  verySlow: '#EF4444',          // Red
};
```

### Common Tailwind Classes

```typescript
// Receipt card
className="bg-[#8b6dac] rounded-lg p-4"

// Status badge
className="px-3 py-1 rounded-full text-xs font-medium"

// Button primary
className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"

// Filter overlay
className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4"

// Sidebar
className="bg-[#3c044d] w-[544px] h-screen fixed right-0 top-0"
```

---

## 🚨 Common Issues & Solutions

### Issue: Staff tidak muncul di SelectPanel

**Solution:**
1. Check localStorage: `localStorage.getItem('staffManagementList')`
2. Verify staff.isActive = true
3. Check department mapping correct (case-sensitive)
4. Console.log filtered staff array

### Issue: Data tidak sync antar pages

**Solution:**
1. Verify same localStorage key used
2. Check Context Provider hierarchy
3. Ensure useEffect dependencies correct
4. Test localStorage.setItem() called

### Issue: Quick filter tidak bekerja

**Solution:**
1. Check date formatting (YYYY-MM-DD)
2. Verify filter state updated
3. Check data filtering logic
4. Console.log startDate and endDate

---

## 📚 References

- [OrderContext Documentation](./CODE_DOCUMENTATION.md#ordercontext)
- [Data System Guide](./DATA_SYSTEM_GUIDE.md)
- [Database SQL Format](./FORMAT_DATABASE_SQL.md)
- [Waiter Context Guide](./WAITER_CONTEXT_GUIDE.md)

---

**Quick Reference ini akan diupdate seiring perkembangan sistem.**

**Version:** 3.0  
**Last Updated:** 29 Nov 2025  
**Status:** ✅ Current
