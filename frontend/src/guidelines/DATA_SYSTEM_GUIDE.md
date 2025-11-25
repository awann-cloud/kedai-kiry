# Panduan Sistem Data - Cara Kerja Data yang Updateable

## 📍 Di Mana Data yang Updateable?

**Data yang updateable ada di: `/contexts/OrderContext.tsx` dan `/contexts/StaffContext.tsx`**

File-file ini berisi semua **live, real-time data** untuk sistem Kitchen Order Management dan Analytics.

---

## 🔄 Cara Kerjanya

### 1. Initial Data (Read-Only)

File-file ini berisi **data awal** saat aplikasi load:

***Order Data:***
- `/data/makananOrders.ts` - Kitchen initial orders
- `/data/barOrders.ts` - Bar initial orders  
- `/data/snackOrders.ts` - Snack initial orders

***Staff & Analytics Data:***
- `/data/staff.ts` - Database karyawan (Kitchen, Bar, Snack staff + Waiters/Waitresses)
- `/data/cookingLogs.ts` - Mock data cooking logs (35 records)
- `/data/pinCodes.ts` - PIN codes untuk semua departments

***Menu Configuration:***
- `/data/menuItemEfficiency.ts` - Sistem efficiency classification & preset configuration
- `/data/menuItemsConfig.ts` - Menu items configuration (DEPRECATED - sekarang dynamic)
- `/data/menuItemsUtils.ts` - Utilities untuk menu management

**File-file ini HANYA dibaca sekali saat startup.** Mereka tidak update selama runtime.

---

### 2. Live Data (Updateable)

***OrderContext (`/contexts/OrderContext.tsx`)***

Tempat magic order management terjadi:

```typescript
const [kitchenOrders, setKitchenOrders] = useState<Order[]>(initialMakananOrdersData);
const [barOrders, setBarOrders] = useState<Order[]>(initialBarOrdersData);
const [snackOrders, setSnackOrders] = useState<Order[]>(initialSnackOrdersData);
```

**Ini adalah LIVE state** - semua perubahan terjadi di sini!

***StaffContext (`/contexts/StaffContext.tsx`)***

Tempat analytics dan staff management terjadi:

```typescript
// Cooking Logs - Real-time tracking
const [cookingLogs, setCookingLogs] = useState<CookingLog[]>(initialCookingLogs);

// Mock/Real data toggle
const [useRealData, setUseRealData] = useState(false);

// Staff management
const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
```

**Features:**
- ✅ Automatic cooking log creation dari OrderContext
- ✅ Real-time efficiency classification
- ✅ Toggle antara mock/real data
- ✅ CSV export functionality
- ✅ Staff CRUD operations
- ✅ Schedule management

---

## 🎯 Cara Komponen Menggunakan Data

### Kitchen, Bar, Snack Department Pages

Setiap department page menggunakan hook `useOrders()`:

```typescript
import { useOrders } from './contexts/OrderContext';

export default function OrdersKitchen() {
  const { getOrders, startItem, finishItem, completeOrder } = useOrders();
  const orders = getOrders('kitchen'); // Get live kitchen orders
  
  // Saat klik START button:
  startItem('kitchen', orderId, itemId, staffName);
  // ✅ Data update di OrderContext
  // ✅ SEMUA komponen yang pakai data ini re-render otomatis
  // ✅ StaffContext detect dan create cooking log otomatis
  
  // Saat klik DONE button:
  finishItem('kitchen', orderId, itemId);
  // ✅ Data update di OrderContext
  // ✅ Changes sync ke semua tempat instantly
  // ✅ StaffContext finalize cooking log dengan efficiency calculation
}
```

---

### Admin Pages (Analytics & Management)

***Admin Dashboard (`/admin`)***

```typescript
import { useStaff } from './contexts/StaffContext';

export default function AdminHome() {
  const { 
    cookingLogs, 
    useRealData, 
    toggleDataSource,
    exportLogsToCSV 
  } = useStaff();
  
  // Toggle between mock and real data
  toggleDataSource();
  
  // Export filtered data
  exportLogsToCSV(filteredLogs);
  
  // Analytics components akan auto-update
}
```

***Admin Menu Management (`/admin` - Menu Management)***

```typescript
import { 
  getConfigForItem, 
  updateConfigForItem,
  calculateDefaultPresets 
} from './data/menuItemEfficiency';

// Get menu config dengan data-driven defaults
const config = getConfigForItem(menuName, department);

// Update preset times
updateConfigForItem({
  name: menuName,
  department: department,
  presets: updatedPresets
});

// Saved to localStorage - persists across sessions
```

***Admin Staff Management (`/admin` - Staff Management)***

```typescript
import { useStaff } from './contexts/StaffContext';

export default function AdminStaffManagement() {
  const { 
    staffList, 
    addStaff, 
    updateStaff, 
    deleteStaff,
    updateSchedule 
  } = useStaff();
  
  // CRUD operations
  addStaff(newStaffData);
  updateStaff(staffId, updatedData);
  deleteStaff(staffId);
  
  // Schedule management
  updateSchedule(staffId, weekSchedule);
}
```

---

### Checker Section (Special - Melihat Semua Departments)

Checker section punya multiple views:

**CheckerHome** - Department selection screen dengan statistics
- Menampilkan total receipts untuk setiap department (Kitchen, Bar, Snack)
- Navigate ke specific department views atau "All Orders" view

**Checker Department Pages** - Masing-masing bisa lihat dan update departments tertentu:
- **CheckerOrdersMakanan** - Kitchen orders only
- **CheckerOrdersBar** - Bar orders only
- **CheckerOrdersSnacktsx** - Snack orders only
- **CheckerOrdersAll** - Semua departments combined

```typescript
const { getAllOrders, getOrders } = useOrders();

// Untuk specific department:
const orders = getOrders('kitchen'); // Hanya kitchen

// Untuk semua departments:
const allDepartmentOrders = getAllOrders();
// Returns: [
//   { department: 'kitchen', orders: [...] },
//   { department: 'bar', orders: [...] },
//   { department: 'snack', orders: [...] }
// ]
```

---

## 🔧 Available Update Functions

### OrderContext Functions

***`startItem(department, orderId, itemId, staffName)`***
Mengubah item status dari "not-started" → "on-their-way"
- Set staff member (cook/bartender/snack staff)
- Mulai timer
- Catat startedTime
- **Sync di semua views** (department page + checker views)
- **Trigger:** StaffContext mulai tracking item ini

***`finishItem(department, orderId, itemId)`***
Mengubah item status dari "on-their-way" → "finished"
- Stop timer
- Catat finishedTime
- Calculate duration
- **Sync di semua views**
- **Trigger:** StaffContext create cooking log dengan efficiency classification

***`completeOrder(department, orderId)`***
Mark entire order sebagai complete (semua items finished)
- Freeze order timer
- Set completed flag
- Tampilkan "Assign" button di Checker views
- **Sync di semua views**

***`assignWaiter(department, orderId, waiterName)`***
Assign waiter/waitress ke completed order (Checker only)
- Set assigned waiter
- Ubah "Assign" button jadi "Delivered"
- **Sync di semua Checker views**

***`markDelivered(department, orderId)`***
Mark order sebagai delivered ke customer (Checker only)
- Set delivered flag
- Final step di order lifecycle
- **Sync di semua Checker views**

---

### StaffContext Functions

***`toggleDataSource()`***
Toggle antara mock data dan real data
- `false` = Show mock data (35 records dari cookingLogs.ts)
- `true` = Show real data only (dari actual cooking)

***`exportLogsToCSV(logs)`***
Export cooking logs ke CSV file
- Format: Cook Name, Menu Name, Time (MM:SS), Efficiency
- Download otomatis dengan timestamp

***`addStaff(staffData)`***
Tambah staff baru
```typescript
addStaff({
  id: 'generated-id',
  name: 'Nama Lengkap',
  role: 'kitchen', // 'kitchen' | 'bar' | 'snack' | 'waiter'
  pin: '1234',
  schedule: defaultSchedule
});
```

***`updateStaff(staffId, staffData)`***
Update existing staff data
```typescript
updateStaff('staff-1', {
  name: 'Updated Name',
  phone: '+628123456789',
  schedule: updatedSchedule
});
```

***`deleteStaff(staffId)`***
Hapus staff (soft delete)
```typescript
deleteStaff('staff-1'); // Mark as inactive
```

***`updateSchedule(staffId, weekSchedule)`***
Update weekly schedule untuk staff
```typescript
updateSchedule('staff-1', {
  monday: { isWorking: true, shift: 'morning' },
  tuesday: { isWorking: true, shift: 'afternoon' },
  // ... rest of week
});
```

---

## 📊 Real-Time Updates

### OrderContext Timer

Built-in timer yang running setiap detik:

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Update elapsedTime untuk semua "on-their-way" items
    // Ini bikin timers tick secara real-time
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### StaffContext Monitoring

Automatic detection finished items:

```typescript
useEffect(() => {
  // Monitor semua departments untuk finished items
  const allDepartments = getAllOrders();
  
  allDepartments.forEach(dept => {
    dept.orders.forEach(order => {
      order.items.forEach(item => {
        // Jika item baru finished dan belum tracked
        if (item.status === 'finished' && 
            item.startedTime && 
            item.finishedTime && 
            !trackedItems.has(item.id)) {
          
          // Create cooking log otomatis
          createCookingLog(item, order);
          
          // Prevent duplicate
          trackedItems.add(item.id);
        }
      });
    });
  });
}, [getAllOrders]);
```

---

## 🔗 Data Flow Diagram

### Order Management Flow

```
User klik START button (department atau checker page)
       ↓
OrdersKitchen.tsx / CheckerOrdersMakanan.tsx call startItem('kitchen', ...)
       ↓
OrderContext.tsx update kitchenOrders state
       ↓
React re-render SEMUA komponen yang pakai data ini:
  • OrdersKitchen.tsx (Kitchen department page - update immediately)
  • CheckerOrdersMakanan.tsx (Checker kitchen view - update immediately)
  • CheckerOrdersAll.tsx (Checker all orders view - update immediately)
  • CheckerHome.tsx (Statistics update immediately)
       ↓
StaffContext detect item started (via useEffect monitoring)
       ↓
Start tracking untuk cooking log creation
```

### Analytics Creation Flow

```
User klik DONE button (item selesai dimasak)
       ↓
OrderContext.tsx update item status → "finished"
       ↓
OrderContext.tsx record finishedTime
       ↓
StaffContext.tsx detect finished item (useEffect monitoring)
       ↓
Extract data: menuName, cookName, department, times
       ↓
Calculate duration_seconds = finishedTime - startedTime
       ↓
Get menu config untuk expected time
       ↓
Calculate efficiency_ratio = actual / expected
       ↓
Classify efficiency:
  • ≤50% = Sangat Cepat
  • 50-80% = Cepat
  • 80-120% = Normal
  • 120-200% = Lambat
  • ≥200% = Sangat Lambat
       ↓
Create cooking log object
       ↓
Add to cookingLogs array
       ↓
Update real-time di Admin Dashboard
       ↓
[FUTURE] Send to backend database
```

---

## 🎮 Complete Order Workflow

### Department Flow (Kitchen/Bar/Snack):

```
1. Item starts sebagai "not-started"
   ↓
2. Klik START → Select staff → Item jadi "on-their-way" (timer mulai)
   ↓ (StaffContext mulai tracking)
   ↓
3. Klik DONE → Item jadi "finished" (timer freeze)
   ↓ (StaffContext create cooking log otomatis)
   ↓
4. Semua items finished → Klik FINISHED → Order marked complete
```

### Checker Flow (Setelah Order Finished):

```
1. Order muncul sebagai "Finished" di Checker views
   ↓
2. "Assign" button muncul otomatis
   ↓
3. Klik Assign → Select waiter/waitress
   ↓
4. Button berubah jadi "Delivered"
   ↓
5. Klik Delivered → Order marked as delivered to customer
```

### Analytics Flow (Background - Automatic):

```
Saat item DONE di-klik:
   ↓
StaffContext detect finished item
   ↓
Calculate cooking time & efficiency
   ↓
Create cooking log automatically
   ↓
Update Admin Dashboard analytics real-time
   ↓
Data tersedia untuk:
  • Filter by cook
  • Filter by menu
  • Filter by efficiency level
  • Filter by date range
  • Export to CSV
```

---

## 💡 Menambahkan Data Baru

### Option 1: Tambah ke Initial Data (untuk orders baru)

Edit `/data/makananOrders.ts`, `/data/barOrders.ts`, atau `/data/snackOrders.ts`:

```typescript
export const initialMakananOrdersData: Order[] = [
  {
    id: "order-4",
    name: "Table 10",
    orderId: "POS-091125-10",
    priority: "NORMAL",
    items: [
      {
        id: "item-13",
        name: "Burger Special",
        quantity: 2,
        notes: "No onions",
        status: "not-started",
        elapsedTime: 0
      }
    ]
  }
];
```

Refresh app untuk lihat orders baru.

---

### Option 2: Tambah ke Staff Database

Edit `/data/staff.ts`:

```typescript
export const KITCHEN_STAFF: KitchenStaff[] = [
  new KitchenStaff("k1", "Chef Mario", "Head Chef", true),
  new KitchenStaff("k2", "Cook Luigi", "Line Cook", true),
  // Tambah kitchen staff baru di sini
];

export const WAITSTAFF: Waitress[] = [
  new Waitress("w1", "Sarah Johnson", "Senior Waitress", true),
  new Waitress("w2", "Emily Chen", "Waitress", true),
  // Tambah waitstaff baru di sini
];
```

---

### Option 3: Customize Menu Presets

Gunakan Menu Management page (`/admin` - Menu Management):

```
1. Select menu item dari sidebar
2. Adjust preset times:
   - Very Fast ⚡
   - Fast 🚀
   - Standard 👍
   - Slow 🐢
   - Extremely Slow 🐌
3. Unit conversion otomatis (minutes ⟺ seconds)
4. Validation: presets harus ascending order
5. Save changes (disimpan ke localStorage)
```

Atau programmatically:

```typescript
import { updateConfigForItem } from './data/menuItemEfficiency';

updateConfigForItem({
  name: 'Nasi Goreng',
  department: 'kitchen',
  presets: [
    { name: 'very-fast', label: '⚡ Very Fast', value: 3, unit: 'min' },
    { name: 'fast', label: '🚀 Fast', value: 5, unit: 'min' },
    { name: 'standard', label: '👍 Standard', value: 8, unit: 'min' },
    { name: 'slow', label: '🐢 Slow', value: 12, unit: 'min' },
    { name: 'extremely-slow', label: '🐌 Extremely Slow', value: 16, unit: 'min' }
  ]
});
```

---

### Option 4: Tambah Functions ke Context (untuk runtime features)

Jika perlu tambah functionality baru saat app running, tambah function ke Context:

***Contoh: Add New Order (OrderContext)***

```typescript
// Di OrderContext.tsx
const addNewOrder = (department: Department, newOrder: Order) => {
  switch (department) {
    case 'kitchen':
      setKitchenOrders(prev => [...prev, newOrder]);
      break;
    case 'bar':
      setBarOrders(prev => [...prev, newOrder]);
      break;
    case 'snack':
      setSnackOrders(prev => [...prev, newOrder]);
      break;
  }
};

// Tambah ke context value:
const value: OrderContextType = {
  getOrders,
  getAllOrders,
  startItem,
  finishItem,
  completeOrder,
  assignWaiter,
  markDelivered,
  addNewOrder // Function baru!
};
```

***Contoh: Filter Analytics (StaffContext)***

```typescript
// Di StaffContext.tsx
const filterLogsByDate = (
  logs: CookingLog[], 
  startDate: Date, 
  endDate: Date
): CookingLog[] => {
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    return logDate >= startDate && logDate <= endDate;
  });
};

// Add to context value
const value: StaffContextType = {
  // ... existing values
  filterLogsByDate // Function baru!
};
```

---

## 🗄️ Database Integration (Future)

Saat connect ke backend database, data flow akan jadi:

```
Frontend (React State)
       ↓
OrderContext.tsx / StaffContext.tsx
       ↓
API Call (POST /api/cooking-logs)
       ↓
Backend Server
       ↓
MySQL Database
       ↓
INSERT INTO cooking_logs (...)
```

**Tables yang perlu dibuat:** (Lihat FORMAT_DATABASE_SQL.md)
- `menu_items` - Menu data dengan timing presets
- `cooking_logs` - Histori memasak
- `staff` - Data karyawan
- `orders` - Header pesanan
- `order_items` - Detail items dalam order
- `schedules` - Jadwal shift karyawan

---

## 🎓 Summary

### Data Locations:

***Initial Data (Startup - Read-Only):***
- `/data/*.ts` - Initial data templates
- `/data/cookingLogs.ts` - Mock analytics data

***Live Runtime Data (Updateable):***
- `/contexts/OrderContext.tsx` - Order management
- `/contexts/StaffContext.tsx` - Analytics & staff management
- `localStorage` - Menu presets customization

***Persistence:***
- localStorage - Menu configs, user preferences
- [FUTURE] MySQL Database - All data untuk production

---

### Update Flow:

***Department Pages (Kitchen/Bar/Snack):***
- ✅ START items
- ✅ DONE items
- ✅ FINISHED orders
- ✅ Automatic cooking log creation

***Checker Pages:***
- ✅ Semua yang departments bisa
- ✅ ASSIGN waiters
- ✅ Mark DELIVERED

***Admin Pages:***
- ✅ View cooking analytics
- ✅ Filter & export data
- ✅ Manage staff (CRUD)
- ✅ Edit schedules
- ✅ Customize menu presets
- ✅ View raw database

---

## ✨ Key Benefits

### Single Source of Truth
- OrderContext - Order management
- StaffContext - Analytics & staff
- Semua data dari satu tempat

### Automatic Syncing
- Update sekali, reflect everywhere instantly
- No manual refresh needed
- Real-time updates

### Type Safety
- Full TypeScript support
- Compile-time error checking
- IntelliSense autocomplete

### Easy to Extend
- Tambah functions ke Context
- Update types di TypeScript
- Clean architecture

### Dual Workflow
- Departments prepare food
- Checkers handle delivery
- Analytics track performance

### Data-Driven Defaults
- Menu presets dari actual cooking data
- No hardcoded values
- Customizable per menu item

---

## 🔍 Troubleshooting

### Issue: Data tidak update

**Solusi:**
1. Check console untuk errors
2. Verify Context providers di App.tsx
3. Check useOrders() atau useStaff() hook dipanggil correctly
4. Verify state update functions dipanggil dengan benar

### Issue: Cooking logs tidak terbuat

**Solusi:**
1. Pastikan item punya startedTime DAN finishedTime
2. Pastikan item.staff ter-assign
3. Check StaffContext useEffect monitoring
4. Check trackedItems Set untuk duplicate prevention

### Issue: Menu presets tidak save

**Solusi:**
1. Check localStorage enabled di browser
2. Verify validation tidak prevent save
3. Check preset order (must be ascending)
4. Clear localStorage dan test lagi

---

## 📞 Need Help?

**Perlu ubah data?** → Edit `/contexts/OrderContext.tsx` atau `/contexts/StaffContext.tsx`  
**Perlu tambah initial orders?** → Edit `/data/makananOrders.ts` (atau barOrders.ts, snackOrders.ts)  
**Perlu tambah staff?** → Gunakan Admin Staff Management page atau edit `/data/staff.ts`  
**Perlu customize menu timing?** → Gunakan Admin Menu Management page  
**Perlu understand routes?** → Lihat QUICK_REFERENCE.md  
**Perlu database structure?** → Lihat FORMAT_DATABASE_SQL.md  
**Perlu analytics info?** → Lihat PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md

---

**Last Updated:** Current Session - Bahasa Indonesia Complete  
**Version:** 2.0 dengan Analytics Integration  
**Status:** ✅ Production Ready dengan Future Database Support
