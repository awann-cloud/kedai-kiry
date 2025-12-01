# Kitchen Order Management System - Dokumentasi Kode

**Terakhir Diupdate:** 29 November 2025  
**Versi Sistem:** 3.0 (Staff Management Integration)

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Struktur File](#struktur-file)
3. [Context Providers](#context-providers)
4. [Department Pages](#department-pages)
5. [Checker System](#checker-system)
6. [Admin Dashboard](#admin-dashboard)
7. [Staff Management System](#staff-management-system)
8. [Component Architecture](#component-architecture)

---

## Overview

Dokumen ini menyediakan penjelasan komprehensif tentang cara kerja kode di seluruh sistem, termasuk department pages, checker section, admin dashboard, staff management system, dan sistem centralized data management.

### Fitur Utama

- ✅ **Tiga Grup Status:** NOT STARTED → ON THEIR WAY → FINISHED
- ✅ **Tiga Departemen:** Kitchen, Bar, Snack (alur kerja terpisah)
- ✅ **Bagian Checker:** Monitoring semua pesanan + assignment waiter per-item
- ✅ **Admin Dashboard:** Analytics efisiensi, staff management, menu management, raw database
- ✅ **Staff Management:** CRUD operations dengan auto-increment ID per departemen
- ✅ **localStorage Integration:** Staff data tersinkronisasi dengan SelectCookPanel dan SelectWaiterPanel

---

## 📁 Struktur File

### `/App.tsx` - Main Router

**Tujuan**: Root component yang setup semua routing untuk aplikasi menggunakan OrderProvider, StaffProvider, dan WaiterProvider wrappers.

**Routes:**

***Login & Home:***
- `/` - Login page dengan Display/Admin mode selection
- `/home` - Home page dengan 4 department buttons (MAKANAN, BAR, SNACK, CHECKER)

***Kitchen Department:***
- `/pin` - Kitchen staff PIN entry (PinEntryMakanan)
- `/makanan` - Kitchen orders management (OrdersKitchen)

***Bar Department:***
- `/minuman` - Bar staff PIN entry (PinEntryBar)
- `/barorders` - Bar orders management (OrdersBar)

***Snack Department:***
- `/snack` - Snack staff PIN entry (PinEntrySnack)
- `/snackorders` - Snack orders management (OrdersSnack)

***Checker Section:***
- `/checker` - Checker PIN entry (PinEntryChecker)
- `/checkerhome` - Checker department selection + statistics dashboard (CheckerHome)
- `/checkerorders` - Checker view all departments (CheckerOrdersAll)
- `/checkermakananorders` - Checker view kitchen only (CheckerOrdersMakanan)
- `/checkerbarorders` - Checker view bar only (CheckerOrdersBar)
- `/checkersnackorders` - Checker view snack only (CheckerOrdersSnacktsx)

***Admin Section:***
- `/admin` - Admin dashboard dengan retractable sidebar
  - Default view: Cooking Analytics Dashboard
  - Staff Management page (via sidebar)
  - Menu Management page (via sidebar)
  - Raw Database page (via sidebar)

**Context Provider Wrappers:**

```typescript
<OrderProvider>
  <StaffProvider>
    <WaiterProvider>
      <RouterProvider router={router} />
    </WaiterProvider>
  </StaffProvider>
</OrderProvider>
```

**Urutan Provider Penting:**
1. `OrderProvider` - Outer layer (data pesanan)
2. `StaffProvider` - Middle layer (data staff dan analytics)
3. `WaiterProvider` - Inner layer (assignment waiter per-item)

---

## Context Providers

### 1. **OrderContext.tsx** - Central Order State Management

**Lokasi:** `/contexts/OrderContext.tsx`

**Tujuan:** Single source of truth untuk semua data pesanan di seluruh 3 departemen (Kitchen, Bar, Snack). Mengelola order flow dan timing data.

**State Structure:**

```typescript
interface OrderContextType {
  // Department-specific orders
  kitchenOrders: Order[];
  barOrders: Order[];
  snackOrders: Order[];
  
  // Combined view for Checker
  getAllOrders: () => OrderWithDepartment[];
  
  // Order mutations
  startItem: (department, orderId, itemId, cookName) => void;
  finishItem: (department, orderId, itemId) => void;
  completeOrder: (department, orderId) => void;
  
  // Waiter assignment (per-item level)
  assignWaiterToItem: (department, orderId, itemId, waiterName) => void;
  markItemDelivered: (department, orderId, itemId) => void;
  
  // Legacy waiter assignment (receipt level) - DEPRECATED
  assignWaiter: (department, orderId, waiterName) => void;
  markDelivered: (department, orderId) => void;
}
```

**Data Flow:**

```
Department Page (Kitchen/Bar/Snack)
  ↓
startItem() → Item status: "not-started" → "on-going"
  ↓
finishItem() → Item status: "on-going" → "finished"
  ↓
completeOrder() → All items finished, receipt ready for assignment
  ↓
Checker Page
  ↓
assignWaiterToItem() → Assign waiter to specific item
  ↓
markItemDelivered() → Mark item as delivered
```

**Timing Data Tracked:**

- `startedTime` - Ketika cook memulai item (Date)
- `finishedTime` - Ketika cook menyelesaikan item (Date)
- `elapsedTime` - Total durasi memasak dalam detik (number)
- `deliveredTime` - Ketika waiter deliver item (Date)
- `frozenTime` - Timestamp saat data disimpan ke log_memasak (Date)

**localStorage Keys:**

- `kitchenOrders` - Array Order untuk Kitchen department
- `barOrders` - Array Order untuk Bar department
- `snackOrders` - Array Order untuk Snack department

---

### 2. **StaffContext.tsx** - Staff Data & Analytics

**Lokasi:** `/contexts/StaffContext.tsx`

**Tujuan:** Mengelola data staff dan cooking analytics dari log_memasak. Provides data untuk Admin Dashboard.

**State Structure:**

```typescript
interface StaffContextType {
  // Staff data (legacy - dari data files)
  getStaffByDepartment: (dept: string) => Worker[];
  
  // Cooking logs from completed orders
  cookingLogs: CookingLog[];
  addCookingLog: (log: CookingLog) => void;
  
  // Analytics functions
  getProcessedLogs: (filters: FilterOptions) => ProcessedLog[];
  exportToCSV: () => void;
}
```

**Integration dengan OrderContext:**

Ketika `completeOrder()` dipanggil di OrderContext, sistem otomatis:
1. Extract timing data dari order
2. Create CookingLog entry
3. Call `addCookingLog()` di StaffContext
4. Save ke localStorage `cookingLogs`

**Data Flow Diagram:**

```
Order Completed (Department)
  ↓
OrderContext.completeOrder()
  ↓
Extract: {
  cookName,
  menuItem,
  elapsedTime,
  startedTime,
  finishedTime,
  department
}
  ↓
StaffContext.addCookingLog()
  ↓
localStorage "cookingLogs"
  ↓
Admin Analytics Dashboard
```

---

### 3. **WaiterContext.tsx** - Waiter Assignment System

**Lokasi:** `/contexts/WaiterContext.tsx`

**Tujuan:** Memisahkan logika waiter assignment dari OrderContext untuk modularitas kode. Mengelola assignment per-item dan tracking delivery.

**State Structure:**

```typescript
interface WaiterContextType {
  // Get assignment data
  getItemWaiter: (dept, orderId, itemId) => string | undefined;
  getOrderWaiter: (dept, orderId) => string | undefined;
  
  // Check delivery status
  isItemDelivered: (dept, orderId, itemId) => boolean;
  isOrderFullyDelivered: (dept, orderId) => boolean;
  
  // Waiter operations
  assignWaiterToItem: (dept, orderId, itemId, waiterName) => void;
  markItemDelivered: (dept, orderId, itemId) => void;
}
```

**Relasi dengan OrderContext:**

WaiterContext bekerja sebagai **wrapper** di atas OrderContext:
- Menerima data dari OrderContext
- Menyediakan abstraksi waiter-specific functions
- Update dilakukan via OrderContext methods

**Contoh Usage:**

```typescript
// Di Checker page
const { assignWaiterToItem, isItemDelivered } = useWaiter();
const { getAllOrders } = useOrders();

// Assign waiter ke item
assignWaiterToItem('kitchen', 'R001', 'item-1', 'Siti');

// Check delivery status
const delivered = isItemDelivered('kitchen', 'R001', 'item-1');
```

---

## Department Pages

### Komponen Department (Kitchen/Bar/Snack)

**Files:**
- `/OrdersKitchen.tsx` - Kitchen orders management
- `/OrdersBar.tsx` - Bar orders management  
- `/OrdersSnack.tsx` - Snack orders management

**Common Architecture:**

Semua department pages menggunakan struktur yang sama:

1. **Status Circles Row** - 3 status groups dengan count
2. **Receipt Cards** - Displays orders dalam kategori
3. **SelectCookPanel** - Slide-in panel untuk assign cook
4. **SearchReceiptSidebar** - Sidebar untuk search/filter

**3-Level Categorization Logic:**

```typescript
// Category 1: FINISHED (semua item selesai)
const finishedOrders = orders.filter(order => 
  order.items.every(item => item.status === 'finished')
);

// Category 2: ONGOING (ada progress, tapi belum semua selesai)
const ongoingOrders = orders.filter(order => 
  order.items.some(item => item.status === 'on-going' || item.status === 'finished') &&
  order.items.some(item => item.status === 'not-started')
);

// Category 3: NOT STARTED (semua item belum dimulai)
const notStartedOrders = orders.filter(order => 
  order.items.every(item => item.status === 'not-started')
);
```

**FIFO Ordering:**

Dalam setiap kategori, orders diurutkan berdasarkan `orderTime`:

```typescript
const sortedOrders = [...orders].sort((a, b) => 
  new Date(a.orderTime).getTime() - new Date(b.orderTime).getTime()
);
```

**Item State Management:**

```typescript
// Start item (assign cook)
startItem(department, orderId, itemId, cookName);
// → Item status: "not-started" → "on-going"
// → startedTime: Date.now()

// Finish item
finishItem(department, orderId, itemId);
// → Item status: "on-going" → "finished"
// → finishedTime: Date.now()
// → elapsedTime: calculated in seconds
```

---

## Checker System

### CheckerOrdersAll.tsx - Unified View

**Tujuan:** Menampilkan SEMUA orders dari SEMUA departemen (Kitchen + Bar + Snack) dalam satu tampilan terpadu.

**Key Features:**

1. **getAllOrders()** - Gabungkan orders dari 3 departemen
2. **Department Badges** - Color-coded labels (Makanan/Bar/Snack)
3. **Per-Item Waiter Assignment** - Assign waiter untuk setiap menu item
4. **SearchReceiptSidebar** - Filter by department, search by name/ID

**Assignment Workflow:**

```typescript
// 1. Order selesai di Department
// 2. Muncul "Assign" button hijau di Checker
// 3. Click "Assign" → SelectWaiterPanel slides in
// 4. Select waiter → assignWaiterToItem()
// 5. Button berubah "Delivered" biru
// 6. Click "Delivered" → markItemDelivered()
// 7. Item di-track sebagai delivered
```

**Department-Specific Checker Pages:**

- `CheckerOrdersMakanan.tsx` - Kitchen only
- `CheckerOrdersBar.tsx` - Bar only
- `CheckerOrdersSnack.tsx` - Snack only

Sama seperti CheckerOrdersAll tapi filtered untuk 1 departemen.

---

## Admin Dashboard

### AdminHome.tsx - Main Dashboard

**Tujuan:** Central hub untuk admin operations dengan retractable sidebar navigation.

**Sidebar Navigation:**

```typescript
const menuItems = [
  { icon: Home, label: 'Home', path: '/admin' },
  { icon: Users, label: 'Staff Management', path: '/admin/staff' },
  { icon: UtensilsCrossed, label: 'Menu Management', path: '/admin/menu' },
  { icon: Database, label: 'Raw Database', path: '/admin/database' }
];
```

**Default View:** Cooking Analytics Dashboard

---

### Admin Sub-Pages

#### 1. Cooking Analytics Dashboard (`/components/CookingAnalytics.tsx`)

**Fitur:**
- 📊 Efficiency classification (Very Fast, Fast, Normal, Slow, Very Slow)
- 🔍 5 filter capabilities (employee, menu, department, date range, efficiency level)
- 📈 Recharts visualization
- 💾 Export to CSV
- ⏱️ **Quick Filters:** Yesterday, Today, This Week, This Month

**Data Source:** `cookingLogs` dari StaffContext

**Filter System:**

```typescript
interface FilterOptions {
  employeeName: string;      // Filter by cook name
  menuItem: string;          // Filter by menu name
  department: string;        // "All" | "Kitchen" | "Bar" | "Snack"
  startDate: string;         // YYYY-MM-DD format
  endDate: string;           // YYYY-MM-DD format
  efficiencyLevel: string;   // "All" | "Very Fast" | "Fast" | "Normal" | "Slow" | "Very Slow"
}
```

**Efficiency Classification:**

```typescript
function classifyEfficiency(seconds: number): EfficiencyLevel {
  if (seconds <= 120) return 'Very Fast';      // ≤ 2 min - Green
  if (seconds <= 240) return 'Fast';           // ≤ 4 min - Light Green
  if (seconds <= 360) return 'Normal';         // ≤ 6 min - Blue
  if (seconds <= 600) return 'Slow';           // ≤ 10 min - Orange
  return 'Very Slow';                          // > 10 min - Red
}
```

**Quick Filter Implementation:**

```typescript
const handleQuickFilter = (period: 'yesterday' | 'today' | 'week' | 'month') => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startDate: Date;
  let endDate: Date = now;
  
  if (period === 'yesterday') {
    startDate = new Date(today);
    startDate.setDate(today.getDate() - 1);
    endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);
    endDate.setHours(23, 59, 59, 999);
  } else if (period === 'today') {
    startDate = today;
    endDate = now;
  } else if (period === 'week') {
    const day = now.getDay();
    startDate = new Date(today);
    startDate.setDate(today.getDate() - day);
  } else { // month
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  setFilters({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  });
};
```

---

#### 2. Menu Review (`/components/MenuReview.tsx`)

**Fitur:**
- 📋 Aggregated menu item statistics
- 🏆 Top performers by frequency
- ⏱️ Average cooking times per menu
- 📊 Recharts bar chart visualization
- 💾 Export to CSV
- 🔍 **Quick Filters:** Yesterday, Today, This Week, This Month

**Data Processing:**

```typescript
// Aggregate data by menu item
const menuStats = cookingLogs.reduce((acc, log) => {
  const key = log.menuItem;
  if (!acc[key]) {
    acc[key] = {
      menuItem: key,
      count: 0,
      totalTime: 0,
      avgTime: 0
    };
  }
  acc[key].count++;
  acc[key].totalTime += log.elapsedTime;
  acc[key].avgTime = acc[key].totalTime / acc[key].count;
  return acc;
}, {});
```

---

## Staff Management System

### AdminStaffManagement.tsx - Staff CRUD Operations

**Lokasi:** `/AdminStaffManagement.tsx`

**Tujuan:** Complete staff management dengan operasi CRUD (Create, Read, Update, Delete) dan sistem auto-increment ID per departemen.

### ⭐ Key Features

#### 1. **Auto-Increment ID System Per Departemen**

Setiap departemen memiliki prefix ID yang unik dengan counter independen:

| Department | Prefix | Contoh ID |
|-----------|--------|-----------|
| Kitchen   | `k`    | k1, k2, k3, ... |
| Bar       | `b`    | b1, b2, b3, ... |
| Snack     | `s`    | s1, s2, s3, ... |
| Checker   | `w`    | w1, w2, w3, ... |

**Implementation Logic:**

```typescript
const generateNextStaffId = (department: string, existingStaff: StaffMember[]) => {
  // Mapping department to prefix
  const prefixMap: { [key: string]: string } = {
    'Kitchen': 'k',
    'Bar': 'b',
    'Snack': 's',
    'Checker': 'w'
  };
  
  const prefix = prefixMap[department];
  
  // Filter staff by department
  const departmentStaff = existingStaff.filter(s => s.department === department);
  
  // Extract numeric IDs and find max
  const existingIds = departmentStaff
    .map(s => parseInt(s.id.replace(prefix, '')))
    .filter(num => !isNaN(num));
  
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  
  // Return next ID
  return `${prefix}${maxId + 1}`;
};
```

**Contoh:**
- Kitchen sudah punya: k1, k2, k3 → Next: **k4**
- Bar sudah punya: b1, b2 → Next: **b3**
- Checker sudah punya: w1 → Next: **w2**

#### 2. **localStorage Integration**

**Key:** `staffManagementList`

**Structure:**

```typescript
interface StaffMember {
  id: string;              // Auto-generated (k1, b2, s3, w1, etc.)
  name: string;            // Staff name
  position: string;        // Job title (Cook, Bartender, Waiter, etc.)
  department: string;      // "Kitchen" | "Bar" | "Snack" | "Checker"
  shift: string;           // "Pagi" | "Siang" | "Malam"
  phoneNumber: string;     // Contact number
  isActive: boolean;       // Active/Inactive status
}
```

**Data Flow:**

```
AdminStaffManagement.tsx
  ↓
localStorage "staffManagementList"
  ↓
SelectCookPanel.tsx (Kitchen/Bar/Snack)
SelectWaiterPanel.tsx (Checker)
```

#### 3. **CRUD Operations**

**CREATE - Tambah Staff Baru:**

```typescript
const handleSaveNewStaff = () => {
  // Generate next ID
  const newId = generateNextStaffId(newStaff.department, staffList);
  
  // Create new staff object
  const staffToAdd: StaffMember = {
    ...newStaff,
    id: newId,
    isActive: true
  };
  
  // Add to list
  const updatedList = [...staffList, staffToAdd];
  
  // Save to localStorage
  localStorage.setItem('staffManagementList', JSON.stringify(updatedList));
  
  // Update state
  setStaffList(updatedList);
};
```

**READ - Load Staff dari localStorage:**

```typescript
useEffect(() => {
  const savedStaff = localStorage.getItem('staffManagementList');
  if (savedStaff) {
    try {
      const staffData = JSON.parse(savedStaff);
      setStaffList(staffData);
    } catch (error) {
      console.error('Failed to parse staff data:', error);
    }
  }
}, []);
```

**UPDATE - Edit Staff:**

```typescript
const handleSaveEdit = () => {
  const updatedList = staffList.map(staff =>
    staff.id === editingStaff.id ? editingStaff : staff
  );
  
  localStorage.setItem('staffManagementList', JSON.stringify(updatedList));
  setStaffList(updatedList);
};
```

**DELETE - Hapus Staff:**

```typescript
const handleDeleteStaff = (id: string) => {
  const updatedList = staffList.filter(staff => staff.id !== id);
  localStorage.setItem('staffManagementList', JSON.stringify(updatedList));
  setStaffList(updatedList);
};
```

#### 4. **Active/Inactive Toggle**

Staff bisa di-set sebagai Active atau Inactive tanpa dihapus:

```typescript
const handleToggleActive = (id: string) => {
  const updatedList = staffList.map(staff =>
    staff.id === id ? { ...staff, isActive: !staff.isActive } : staff
  );
  
  localStorage.setItem('staffManagementList', JSON.stringify(updatedList));
  setStaffList(updatedList);
};
```

**Effect:** Inactive staff tidak muncul di SelectCookPanel/SelectWaiterPanel.

---

### SelectCookPanel.tsx - Cook Assignment

**Lokasi:** `/components/SelectCookPanel.tsx`

**Tujuan:** Slide-in panel untuk assign cook ke menu item di Department pages.

**Integration dengan localStorage:**

```typescript
export default function SelectCookPanel({ department, ... }) {
  const [staff, setStaff] = useState<Worker[]>([]);
  
  useEffect(() => {
    // Load staff from AdminStaffManagement localStorage
    const savedStaffList = localStorage.getItem('staffManagementList');
    if (savedStaffList) {
      const staffList = JSON.parse(savedStaffList);
      
      // Map department names
      const departmentMap: { [key: string]: string } = {
        'Kitchen': 'kitchen',
        'Bar': 'bar',
        'Snack': 'snack',
        'Checker': 'waitress'
      };
      
      // Filter by department and only active staff
      const filteredStaff = staffList
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
      
      setStaff(filteredStaff);
    }
  }, [department, isOpen]);
  
  // ... rest of component
}
```

**Key Points:**
- ✅ Loads from `staffManagementList` localStorage
- ✅ Filters by department (Kitchen/Bar/Snack)
- ✅ Only shows **active** staff (`isActive: true`)
- ✅ Converts department format: "Kitchen" → "kitchen"
- ✅ Auto-refreshes when panel opens

---

### SelectWaiterPanel.tsx - Waiter Assignment

**Lokasi:** `/components/SelectWaiterPanel.tsx`

**Tujuan:** Slide-in panel untuk assign waiter ke menu item di Checker pages.

**Integration dengan localStorage:**

```typescript
export default function SelectWaiterPanel({ ... }) {
  const [waitstaff, setWaitstaff] = useState<Worker[]>([]);
  
  useEffect(() => {
    // Load staff from AdminStaffManagement localStorage
    const savedStaffList = localStorage.getItem('staffManagementList');
    if (savedStaffList) {
      const staffList = JSON.parse(savedStaffList);
      
      // Filter by Checker department and only active staff
      const filteredStaff = staffList
        .filter((s: any) => s.department === 'Checker' && s.isActive)
        .map((s: any) => ({
          id: s.id,
          name: s.name,
          position: s.position || 'Waiter',
          department: 'waitress',
          available: s.isActive
        }));
      
      setWaitstaff(filteredStaff);
    }
  }, [isOpen]);
  
  // ... rest of component
}
```

**Key Points:**
- ✅ Loads from `staffManagementList` localStorage
- ✅ Filters by **Checker** department
- ✅ Only shows **active** staff (`isActive: true`)
- ✅ Uses waiter ID prefix: **w1, w2, w3**, etc.
- ✅ Auto-refreshes when panel opens

---

## Component Architecture

### Reusable Components

#### 1. **StatusCircles** - Status Group Headers

**Usage:** Menampilkan 3 status circles dengan count di semua department pages.

```tsx
<StatusCircles
  finishedCount={finishedOrders.length}
  ongoingCount={ongoingOrders.length}
  notStartedCount={notStartedOrders.length}
/>
```

#### 2. **SelectCookPanel** - Cook Assignment Panel

**Props:**
```typescript
interface SelectCookPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCook: (cookName: string) => void;
  itemName: string;
  orderId: string;
  itemId: string;
  department: 'kitchen' | 'bar' | 'snack';
}
```

**Features:**
- Slides in from right
- Loads staff dari localStorage
- Filters by department + active status
- Shows availability indicators

#### 3. **SelectWaiterPanel** - Waiter Assignment Panel

**Props:**
```typescript
interface SelectWaiterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWaiter: (waiterName: string) => void;
  orderName: string;
  orderId: string | null;
}
```

**Features:**
- Slides in from right
- Loads waitstaff dari localStorage (Checker department)
- Only shows active waiters
- Color-coded availability status

#### 4. **SearchReceiptSidebar** - Search & Filter Sidebar

**Features:**
- Search by order name or ID
- Filter by department (Checker pages)
- Eye icon toggle button
- Smooth slide-in animation

---

## Data Persistence

### localStorage Keys

| Key | Data Type | Purpose |
|-----|-----------|---------|
| `kitchenOrders` | `Order[]` | Kitchen department orders |
| `barOrders` | `Order[]` | Bar department orders |
| `snackOrders` | `Order[]` | Snack department orders |
| `cookingLogs` | `CookingLog[]` | Completed order analytics |
| `staffManagementList` | `StaffMember[]` | Staff database (Admin Management) |

### Data Synchronization Flow

```
User Action (Department/Checker/Admin)
  ↓
Context Update (OrderContext/StaffContext)
  ↓
localStorage Write
  ↓
Component Re-render
  ↓
UI Update
```

**Real-time Sync:**
- All pages using same Context akan auto-update
- Tidak perlu manual refresh
- Data persists across browser sessions

---

## Best Practices

### 1. **Context Usage**

```typescript
// ✅ CORRECT: Use specific context hooks
const { kitchenOrders, startItem } = useOrders();
const { cookingLogs } = useStaff();
const { assignWaiterToItem } = useWaiter();

// ❌ WRONG: Don't access context directly
import { OrderContext } from './contexts/OrderContext';
```

### 2. **Staff Data Loading**

```typescript
// ✅ CORRECT: Load from localStorage in useEffect
useEffect(() => {
  const savedStaff = localStorage.getItem('staffManagementList');
  if (savedStaff) {
    const staffList = JSON.parse(savedStaff);
    // Filter and process...
  }
}, [isOpen]); // Reload when panel opens

// ❌ WRONG: Load synchronously outside useEffect
const staffList = JSON.parse(localStorage.getItem('staffManagementList'));
```

### 3. **Department Name Mapping**

```typescript
// Admin uses: "Kitchen", "Bar", "Snack", "Checker"
// Context uses: "kitchen", "bar", "snack", "waitress"

const departmentMap = {
  'Kitchen': 'kitchen',
  'Bar': 'bar',
  'Snack': 'snack',
  'Checker': 'waitress'
};
```

### 4. **Filter Active Staff Only**

```typescript
// ✅ CORRECT: Always filter by isActive
const activeStaff = staffList.filter(s => s.isActive && s.department === dept);

// ❌ WRONG: Show all staff including inactive
const allStaff = staffList.filter(s => s.department === dept);
```

---

## Troubleshooting

### Issue: Staff tidak muncul di SelectCookPanel

**Solusi:**
1. Check localStorage key: `staffManagementList`
2. Verify staff.isActive = true
3. Check department mapping correct
4. Console.log filtered staff array

### Issue: Auto-increment ID tidak bekerja

**Solusi:**
1. Check prefix mapping correct
2. Verify existing IDs format (k1, b2, s3, w1)
3. Remove invalid IDs (NaN, "005", etc.)
4. Re-save staff list

### Issue: Data tidak sync antar pages

**Solusi:**
1. Verify same localStorage key used
2. Check Context Provider hierarchy correct
3. Ensure useEffect dependencies correct
4. Test localStorage.setItem() called

---

## Performance Considerations

### localStorage Size Limits

- Browser limit: ~5-10 MB
- Current usage: < 100 KB
- Safe untuk production use

### Optimization Tips

1. **Memoization:**
```typescript
const sortedOrders = useMemo(() => 
  [...orders].sort((a, b) => a.orderTime - b.orderTime),
  [orders]
);
```

2. **Lazy Loading:**
```typescript
// Load staff only when panel opens
useEffect(() => {
  if (isOpen) {
    loadStaffFromLocalStorage();
  }
}, [isOpen]);
```

3. **Debouncing Search:**
```typescript
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);
```

---

## Future Enhancements

### Planned Features

1. ✨ Backend API Integration
   - Replace localStorage dengan database calls
   - Real-time sync via WebSocket
   - Multi-device support

2. 📱 Mobile Responsive Design
   - Tablet portrait mode support
   - Phone screen optimization

3. 🔔 Notification System
   - Order ready notifications
   - Staff assignment alerts
   - Delivery confirmations

4. 📊 Advanced Analytics
   - Revenue tracking
   - Peak hours analysis
   - Staff performance metrics

---

**Dokumentasi ini akan diupdate seiring perkembangan sistem.**

**Kontak:** Tim Development  
**Repository:** [GitHub Repository URL]  
**Versi:** 3.0 - Staff Management Integration
