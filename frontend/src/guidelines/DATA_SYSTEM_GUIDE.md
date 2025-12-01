# Panduan Sistem Data - Kitchen Order Management System

**Terakhir Diupdate:** 29 November 2025  
**Versi:** 3.0 (Staff Management + localStorage Integration)

## 📋 Daftar Isi

1. [Overview Sistem Data](#overview-sistem-data)
2. [Struktur Data Orders](#struktur-data-orders)
3. [Struktur Data Staff](#struktur-data-staff)
4. [localStorage Schema](#localstorage-schema)
5. [Data Flow Architecture](#data-flow-architecture)
6. [Timing Data System](#timing-data-system)
7. [Waiter Assignment System](#waiter-assignment-system)
8. [Staff Management System](#staff-management-system)

---

## Overview Sistem Data

### Data Storage Strategy

Sistem menggunakan **localStorage** sebagai temporary storage untuk:
1. ✅ Fast read/write operations
2. ✅ Offline capability
3. ✅ Zero latency data access
4. ✅ Browser-based persistence

### Future: Backend Integration

localStorage akan digantikan dengan **Backend API** untuk:
- 🔄 Multi-device sync
- 💾 Permanent storage
- 👥 Multi-user support
- 📊 Advanced analytics

**Status saat ini:** Sistem siap untuk migrasi ke backend dengan struktur data yang sama.

---

## Struktur Data Orders

### Order Interface

```typescript
interface Order {
  // Identifikasi
  id: string;                    // Unique order ID (R001, R002, dll)
  orderName: string;             // Nama pemesan
  orderTime: string;             // ISO timestamp order dibuat
  
  // Menu items
  items: MenuItem[];             // Array item yang dipesan
  
  // Waiter assignment (LEGACY - receipt level)
  assignedWaiter?: string;       // Nama waiter (deprecated)
  deliveredTime?: string;        // Timestamp delivered (deprecated)
}
```

### MenuItem Interface

```typescript
interface MenuItem {
  // Identifikasi
  id: string;                    // Unique item ID dalam order (item-1, item-2)
  name: string;                  // Nama menu
  quantity: number;              // Jumlah porsi
  notes: string;                 // Special instructions
  
  // Status workflow
  status: 'not-started' | 'on-their-way' | 'finished';
  
  // Cook/Staff assignment
  staff?: string;                // Nama cook/staff yang mengerjakan item ini
  
  // Cooking timing data
  startedTime?: number;          // Waktu mulai memasak (milliseconds since epoch)
  finishedTime?: number;         // Waktu selesai memasak (milliseconds since epoch)
  elapsedTime: number;           // Durasi memasak (detik, auto-update tiap detik)
  
  // Waiter assignment (PER-ITEM)
  waiter?: string;               // Nama waiter yang deliver item ini
  itemDelivered?: boolean;       // Apakah item sudah di-deliver
  
  // Delivery timing data
  deliveryStartTime?: number;    // Waktu waiter ditugaskan (milliseconds since epoch)
  deliveryFinishedTime?: number; // Waktu item di-deliver (milliseconds since epoch)
  deliveryElapsedTime?: number;  // Durasi delivery (detik, auto-update tiap detik)
}
```

### Contoh Data Order

```json
{
  "id": "R001",
  "orderName": "Budi",
  "orderTime": "2025-11-29T10:30:00.000Z",
  "items": [
    {
      "id": "item-1",
      "name": "Nasi Goreng Spesial",
      "quantity": 2,
      "status": "finished",
      "assignedCook": "Ahmad",
      "startedTime": "2025-11-29T10:31:00.000Z",
      "finishedTime": 1732878960000,
      "elapsedTime": 300,
      "staff": "Chef John",
      "waiter": "Siti",
      "itemDelivered": true,
      "deliveryStartTime": 1732878960000,
      "deliveryFinishedTime": 1732879080000,
      "deliveryElapsedTime": 120
    },
    {
      "id": "item-2",
      "name": "Es Teh Manis",
      "quantity": 2,
      "status": "finished",
      "assignedCook": "Rina",
      "startedTime": "2025-11-29T10:31:30.000Z",
      "finishedTime": 1732878780000,
      "elapsedTime": 90,
      "staff": "Chef John",
      "waiter": "Siti",
      "itemDelivered": true,
      "deliveryStartTime": 1732878780000,
      "deliveryFinishedTime": 1732879080000,
      "deliveryElapsedTime": 300
    }
  ]
}
```

---

## Struktur Data Staff

### StaffMember Interface (Admin Management)

```typescript
interface StaffMember {
  // Identifikasi
  id: string;              // Auto-generated ID (k1, b2, s3, w1)
  name: string;            // Nama lengkap staff
  
  // Role & Department
  position: string;        // Job title (Cook, Bartender, Waiter, dll)
  department: string;      // "Kitchen" | "Bar" | "Snack" | "Checker"
  
  // Schedule
  shift: string;           // "Pagi" | "Siang" | "Malam"
  
  // Contact
  phoneNumber: string;     // Nomor telepon
  
  // Status
  isActive: boolean;       // Active (true) atau Inactive (false)
}
```

### Auto-Increment ID System

Setiap departemen memiliki prefix unik dengan counter independen:

| Department | Prefix | Format | Contoh |
|-----------|--------|--------|--------|
| Kitchen   | `k`    | k{n}   | k1, k2, k3, ... |
| Bar       | `b`    | b{n}   | b1, b2, b3, ... |
| Snack     | `s`    | s{n}   | s1, s2, s3, ... |
| Checker   | `w`    | w{n}   | w1, w2, w3, ... |

**Logic:**
```typescript
// Kitchen: k1, k2 sudah ada → Next: k3
// Bar: b1, b2, b3 sudah ada → Next: b4
// Snack: s1 sudah ada → Next: s2
// Checker: w1, w2, w3, w4 sudah ada → Next: w5
```

### Contoh Data Staff

```json
[
  {
    "id": "k1",
    "name": "Ahmad Hidayat",
    "position": "Head Cook",
    "department": "Kitchen",
    "shift": "Pagi",
    "phoneNumber": "081234567890",
    "isActive": true
  },
  {
    "id": "k2",
    "name": "Rina Susanti",
    "position": "Cook",
    "department": "Kitchen",
    "shift": "Siang",
    "phoneNumber": "081234567891",
    "isActive": true
  },
  {
    "id": "b1",
    "name": "Dedi Prasetyo",
    "position": "Bartender",
    "department": "Bar",
    "shift": "Pagi",
    "phoneNumber": "081234567892",
    "isActive": true
  },
  {
    "id": "w1",
    "name": "Siti Nurhaliza",
    "position": "Waitress",
    "department": "Checker",
    "shift": "Pagi",
    "phoneNumber": "081234567893",
    "isActive": true
  },
  {
    "id": "k3",
    "name": "Budi Santoso",
    "position": "Cook",
    "department": "Kitchen",
    "shift": "Malam",
    "phoneNumber": "081234567894",
    "isActive": false
  }
]
```

### Worker Interface (Legacy Context Format)

```typescript
interface Worker {
  id: string;              // Staff ID (k1, b2, etc.)
  name: string;            // Nama staff
  position: string;        // Posisi/jabatan
  department: string;      // "kitchen" | "bar" | "snack" | "waitress"
  available: boolean;      // Sama dengan isActive
}
```

**Department Name Mapping:**

Admin menggunakan format capitalized, Context menggunakan lowercase:

```typescript
const departmentMap = {
  'Kitchen': 'kitchen',
  'Bar': 'bar',
  'Snack': 'snack',
  'Checker': 'waitress'
};
```

---

## localStorage Schema

### Storage Keys

| Key | Type | Size | Description |
|-----|------|------|-------------|
| `kitchenOrders` | `Order[]` | ~5 KB | Kitchen department orders |
| `barOrders` | `Order[]` | ~5 KB | Bar department orders |
| `snackOrders` | `Order[]` | ~5 KB | Snack department orders |
| `cookingLogs` | `CookingLog[]` | ~50 KB | Completed order analytics |
| `staffManagementList` | `StaffMember[]` | ~10 KB | Staff database |

**Total Storage:** ~75 KB (Browser limit: 5-10 MB)

### CookingLog Interface

```typescript
interface CookingLog {
  // Identifikasi
  logId: string;           // Auto-generated log ID
  
  // Menu & Cook info
  menuItem: string;        // Nama menu
  cookName: string;        // Nama cook
  department: string;      // Department asal
  
  // Timing data
  startedTime: Date;       // Waktu mulai
  finishedTime: Date;      // Waktu selesai
  elapsedTime: number;     // Durasi (detik)
  frozenTime: Date;        // Timestamp save ke log
  
  // Additional info
  orderId: string;         // Reference ke order ID
  quantity: number;        // Jumlah porsi
}
```

### Data Persistence Flow

```
1. User Action
   ↓
2. Context State Update (React State)
   ↓
3. localStorage Write
   JSON.stringify(data)
   localStorage.setItem(key, jsonString)
   ↓
4. Component Re-render
   ↓
5. UI Update
```

**Consistency:** Semua komponen menggunakan Context yang sama → Auto-sync tanpa manual refresh.

---

## Data Flow Architecture

### Order Lifecycle

```
1. NEW ORDER
   └─→ Department Orders Array (kitchenOrders/barOrders/snackOrders)
       status: ALL items "not-started"

2. START ITEM (Department Page)
   └─→ startItem(department, orderId, itemId, cookName)
       ├─ item.status: "not-started" → "on-going"
       ├─ item.assignedCook: cookName
       ├─ item.startedTime: Date.now()
       └─ Save to localStorage

3. FINISH ITEM (Department Page)
   └─→ finishItem(department, orderId, itemId)
       ├─ item.status: "on-going" → "finished"
       ├─ item.finishedTime: Date.now()
       ├─ item.elapsedTime: (finishedTime - startedTime) / 1000
       └─ Save to localStorage

4. COMPLETE ORDER (Department Page)
   └─→ completeOrder(department, orderId)
       ├─ Check: ALL items finished?
       ├─ Create CookingLog entries
       ├─ Save to cookingLogs
       └─ Order ready for waiter assignment

5. ASSIGN WAITER (Checker Page)
   └─→ assignWaiterToItem(department, orderId, itemId, waiterName)
       ├─ item.waiter: waiterName
       ├─ item.deliveryStartTime: Date.now()
       └─ Save to localStorage

6. MARK DELIVERED (Checker Page)
   └─→ markItemDelivered(department, orderId, itemId)
       ├─ item.deliveredTime: Date.now()
       └─ Save to localStorage

7. ALL ITEMS DELIVERED
   └─→ Order complete cycle finished
       └─ Data available for analytics
```

### Context Provider Hierarchy

```
<OrderProvider>                 ← Outer layer (Order data)
  <StaffProvider>               ← Middle layer (Staff & Analytics)
    <WaiterProvider>            ← Inner layer (Waiter assignment)
      <App />
    </WaiterProvider>
  </StaffProvider>
</OrderProvider>
```

**Dependency Flow:**
- WaiterProvider → depends on OrderProvider
- StaffProvider → depends on OrderProvider (for cookingLogs)
- OrderProvider → independent (root data source)

### Data Access Pattern

```typescript
// Component level
function DepartmentPage() {
  // Access order data
  const { kitchenOrders, startItem, finishItem } = useOrders();
  
  // Access staff data
  const { getStaffByDepartment } = useStaff();
  
  // Access waiter functions
  const { assignWaiterToItem } = useWaiter();
  
  // ... component logic
}
```

---

## Timing Data System

### Timestamp Tracking

Sistem melacak 4 jenis timestamp untuk setiap menu item:

| Timestamp | Type | When Recorded | Purpose |
|-----------|------|---------------|---------|
| `startedTime` | Date | Cook clicks "Start" | Menandai awal memasak |
| `finishedTime` | Date | Cook clicks "Finish" | Menandai selesai memasak |
| `frozenTime` | Date | Order completed | Snapshot untuk log_memasak |
| `deliveredTime` | Date | Waiter delivers item | Track delivery time |

### Elapsed Time Calculation

```typescript
// Calculate elapsed time in seconds
const calculateElapsedTime = (startedTime: Date, finishedTime: Date): number => {
  const diff = finishedTime.getTime() - startedTime.getTime();
  return Math.floor(diff / 1000); // Convert ms to seconds
};

// Example:
// startedTime: 10:30:00
// finishedTime: 10:35:30
// elapsedTime: 330 seconds (5 minutes 30 seconds)
```

### Efficiency Classification

Berdasarkan `elapsedTime`, sistem mengklasifikasikan efisiensi:

```typescript
function classifyEfficiency(seconds: number): string {
  if (seconds <= 120) return 'Very Fast';    // ≤ 2 menit - Hijau
  if (seconds <= 240) return 'Fast';         // ≤ 4 menit - Hijau Muda
  if (seconds <= 360) return 'Normal';       // ≤ 6 menit - Biru
  if (seconds <= 600) return 'Slow';         // ≤ 10 menit - Oranye
  return 'Very Slow';                        // > 10 menit - Merah
}
```

### Timing Data Flow

```
Department Page
  ↓
Cook clicks "Start Item"
  ↓
startedTime: Date.now()
  ↓
[Cook is working...]
  ↓
Cook clicks "Finish Item"
  ↓
finishedTime: Date.now()
elapsedTime: (finishedTime - startedTime) / 1000
  ↓
All items finished
  ↓
completeOrder()
  ↓
frozenTime: Date.now()
  ↓
Save to cookingLogs
  ↓
Checker Page
  ↓
Assign Waiter → deliveredTime: Date.now()
  ↓
Analytics Dashboard
```

---

## Waiter Assignment System

### Per-Item Assignment Architecture

**Sistem Lama (DEPRECATED):**
```typescript
// Assign waiter ke seluruh receipt
order.assignedWaiter = "Siti";
order.deliveredTime = Date.now();
```

**Sistem Baru (CURRENT):**
```typescript
// Assign waiter ke masing-masing item
item.waiter = "Siti";
item.deliveryStartTime = Date.now();
// Ketika di-deliver:
item.itemDelivered = true;
item.deliveryFinishedTime = Date.now();
```

### Assignment Logic

```typescript
// Assign waiter to specific item
assignWaiterToItem(department, orderId, itemId, waiterName) {
  // 1. Find order by ID
  const order = orders.find(o => o.id === orderId);
  
  // 2. Find item by ID
  const item = order.items.find(i => i.id === itemId);
  
  // 3. Assign waiter
  item.waiter = waiterName;
  item.deliveryStartTime = Date.now();
  
  // 4. Save to localStorage
  localStorage.setItem(`${department}Orders`, JSON.stringify(orders));
}

// Mark item as delivered
markItemDelivered(department, orderId, itemId) {
  // 1. Find item
  const item = findItem(department, orderId, itemId);
  
  // 2. Set delivered time
  item.deliveredTime = new Date();
  
  // 3. Save to localStorage
  saveOrders(department, orders);
}
```

### Button State Logic (Checker Pages)

```typescript
// Per-item button states
for each item in order.items:
  if (!item.waiter) {
    // Show "Assign" button (green)
    button: "Assign Waiter"
    color: green
    action: Open SelectWaiterPanel
  }
  else if (!item.deliveredTime) {
    // Show "Delivered" button (blue)
    button: "Mark Delivered"
    color: blue
    action: markItemDelivered()
  }
  else {
    // Show "Delivered" status (gray)
    display: "✓ Delivered"
    color: gray
    disabled: true
  }
```

### "Assign All" Button Logic

```typescript
// Check if "Assign All" button should show
const hasUnassignedItems = order.items.some(item => !item.waiter);
const allItemsFinished = order.items.every(item => item.status === 'finished');

if (hasUnassignedItems && allItemsFinished) {
  // Show "Assign All" button
  <button onClick={() => assignAllItems(waiterName)}>
    Assign All Items to {waiterName}
  </button>
}
```

**Auto-hide Logic:**
- ✅ Button muncul: Ada item yang belum di-assign waiter
- ❌ Button hilang: Semua item sudah di-assign waiter

---

## Staff Management System

### Admin Management → SelectPanel Flow

```
1. AdminStaffManagement.tsx
   ├─ Create staff: generateNextStaffId()
   ├─ Save to localStorage: "staffManagementList"
   └─ Format: { id: "k1", name: "Ahmad", department: "Kitchen", isActive: true }

2. SelectCookPanel.tsx (Kitchen/Bar/Snack)
   ├─ Load from localStorage: "staffManagementList"
   ├─ Filter: department === "Kitchen/Bar/Snack" && isActive === true
   ├─ Convert: "Kitchen" → "kitchen"
   └─ Display in panel

3. SelectWaiterPanel.tsx (Checker)
   ├─ Load from localStorage: "staffManagementList"
   ├─ Filter: department === "Checker" && isActive === true
   ├─ Convert: "Checker" → "waitress"
   └─ Display in panel
```

### Staff Filtering Logic

```typescript
// SelectCookPanel
const loadKitchenStaff = () => {
  const allStaff = JSON.parse(localStorage.getItem('staffManagementList') || '[]');
  
  const kitchenStaff = allStaff
    .filter(s => s.department === 'Kitchen' && s.isActive)
    .map(s => ({
      id: s.id,              // k1, k2, k3
      name: s.name,
      position: s.position,
      department: 'kitchen', // Lowercase conversion
      available: true
    }));
  
  return kitchenStaff;
};

// SelectWaiterPanel
const loadWaitstaff = () => {
  const allStaff = JSON.parse(localStorage.getItem('staffManagementList') || '[]');
  
  const waitstaff = allStaff
    .filter(s => s.department === 'Checker' && s.isActive)
    .map(s => ({
      id: s.id,                // w1, w2, w3
      name: s.name,
      position: s.position,
      department: 'waitress',  // Lowercase conversion
      available: true
    }));
  
  return waitstaff;
};
```

### Active/Inactive Staff

**Effect pada UI:**

| isActive | AdminStaffManagement | SelectCookPanel | SelectWaiterPanel |
|----------|---------------------|-----------------|-------------------|
| `true`   | ✅ Displayed (Active badge) | ✅ Displayed | ✅ Displayed |
| `false`  | ⚠️ Displayed (Inactive badge) | ❌ Hidden | ❌ Hidden |

**Use Case:**
- Staff cuti → Set `isActive: false`
- Staff tidak muncul di assignment panel
- Data staff tetap tersimpan (tidak dihapus)
- Bisa di-activate kembali kapan saja

---

## Database Migration Path

### Current: localStorage

```typescript
// Read
const orders = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');

// Write
localStorage.setItem('kitchenOrders', JSON.stringify(orders));
```

### Future: Backend API

```typescript
// Read
const orders = await fetch('/api/orders?department=kitchen').then(r => r.json());

// Write
await fetch('/api/orders', {
  method: 'POST',
  body: JSON.stringify(order)
});
```

### Migration Strategy

1. **Phase 1:** Implement API endpoints dengan struktur data yang sama
2. **Phase 2:** Create Context adapter layer
3. **Phase 3:** Switch storage backend (localStorage → API)
4. **Phase 4:** Add real-time sync (WebSocket)
5. **Phase 5:** Remove localStorage dependencies

**Struktur data TIDAK perlu berubah** → Seamless migration.

---

## Data Validation

### Order Validation

```typescript
const validateOrder = (order: Order): boolean => {
  // Check required fields
  if (!order.id || !order.orderName || !order.orderTime) return false;
  
  // Check items array
  if (!Array.isArray(order.items) || order.items.length === 0) return false;
  
  // Validate each item
  for (const item of order.items) {
    if (!item.id || !item.name || !item.quantity) return false;
    if (!['not-started', 'on-going', 'finished'].includes(item.status)) return false;
  }
  
  return true;
};
```

### Staff Validation

```typescript
const validateStaff = (staff: StaffMember): boolean => {
  // Check required fields
  if (!staff.id || !staff.name || !staff.department) return false;
  
  // Check department
  if (!['Kitchen', 'Bar', 'Snack', 'Checker'].includes(staff.department)) return false;
  
  // Check ID format
  const prefixMap = { 'Kitchen': 'k', 'Bar': 'b', 'Snack': 's', 'Checker': 'w' };
  const expectedPrefix = prefixMap[staff.department];
  if (!staff.id.startsWith(expectedPrefix)) return false;
  
  return true;
};
```

---

## Best Practices

### 1. Data Immutability

```typescript
// ✅ CORRECT: Create new array
const updatedOrders = orders.map(order =>
  order.id === orderId
    ? { ...order, items: updatedItems }
    : order
);

// ❌ WRONG: Mutate existing array
orders[0].items[0].status = 'finished';
```

### 2. Safe localStorage Access

```typescript
// ✅ CORRECT: Handle errors
try {
  const data = JSON.parse(localStorage.getItem('key') || '[]');
  return data;
} catch (error) {
  console.error('Failed to parse localStorage data:', error);
  return [];
}

// ❌ WRONG: No error handling
const data = JSON.parse(localStorage.getItem('key'));
```

### 3. Type Safety

```typescript
// ✅ CORRECT: Use TypeScript interfaces
const order: Order = {
  id: 'R001',
  orderName: 'Budi',
  orderTime: new Date().toISOString(),
  items: []
};

// ❌ WRONG: Untyped data
const order = {
  id: 'R001',
  name: 'Budi', // Should be "orderName"
  // Missing orderTime
};
```

### 4. Data Cleanup

```typescript
// Periodically clean up old data
const cleanupOldOrders = () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 30); // Keep last 30 days
  
  const recentOrders = orders.filter(order =>
    new Date(order.orderTime) > cutoffDate
  );
  
  localStorage.setItem('orders', JSON.stringify(recentOrders));
};
```

---

## Troubleshooting

### Issue: Data tidak sync

**Diagnosis:**
```typescript
// Check localStorage
console.log('kitchenOrders:', localStorage.getItem('kitchenOrders'));

// Check Context state
const { kitchenOrders } = useOrders();
console.log('Context orders:', kitchenOrders);
```

**Solusi:**
1. Verify localStorage key correct
2. Check Context Provider hierarchy
3. Ensure useEffect dependencies correct

### Issue: Staff tidak muncul

**Diagnosis:**
```typescript
// Check staff data
const staff = JSON.parse(localStorage.getItem('staffManagementList') || '[]');
console.log('All staff:', staff);

// Check filtered staff
const activeKitchenStaff = staff.filter(s => 
  s.department === 'Kitchen' && s.isActive
);
console.log('Active kitchen staff:', activeKitchenStaff);
```

**Solusi:**
1. Verify staff.isActive = true
2. Check department name correct (case-sensitive)
3. Remove invalid staff entries

---

## Performance Monitoring

### localStorage Size Check

```typescript
// Calculate total storage size
const calculateStorageSize = () => {
  let total = 0;
  
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  
  return (total / 1024).toFixed(2) + ' KB';
};

console.log('Total localStorage size:', calculateStorageSize());
```

### Data Statistics

```typescript
// Count total orders
const totalOrders = 
  kitchenOrders.length + 
  barOrders.length + 
  snackOrders.length;

// Count total items
const totalItems = 
  kitchenOrders.reduce((sum, order) => sum + order.items.length, 0) +
  barOrders.reduce((sum, order) => sum + order.items.length, 0) +
  snackOrders.reduce((sum, order) => sum + order.items.length, 0);

// Count total logs
const totalLogs = cookingLogs.length;

// Count total staff
const totalStaff = staffList.length;
const activeStaff = staffList.filter(s => s.isActive).length;
```

---

**Panduan ini mencakup semua aspek sistem data dan akan diupdate seiring perkembangan sistem.**

**Versi:** 3.0 - Staff Management + localStorage Integration  
**Status:** ✅ Production Ready (Frontend)  
**Next Step:** Backend API Integration
