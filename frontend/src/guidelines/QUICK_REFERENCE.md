# 🚀 QUICK REFERENCE - Di Mana Semuanya Ada

## 📦 LOKASI DATA UPDATEABLE

```
/contexts/OrderContext.tsx   ← ⭐ ORDER DATA LIVE DI SINI! ⭐
/contexts/StaffContext.tsx   ← ⭐ ANALYTICS & STAFF DATA LIVE DI SINI! ⭐
```

### OrderContext berisi:
- ✅ Kitchen orders (updateable)
- ✅ Bar orders (updateable)  
- ✅ Snack orders (updateable)
- ✅ Functions untuk update (startItem, finishItem, completeOrder, assignWaiter, markDelivered)
- ✅ Real-time timer yang update setiap detik

### StaffContext berisi:
- ✅ Cooking logs (automatic creation dari order completion)
- ✅ Staff list dengan CRUD operations
- ✅ Schedule management
- ✅ Analytics filtering & export
- ✅ Mock/Real data toggle
- ✅ Efficiency classification system

---

## 📋 STRUKTUR FILE DIJELASKAN

```
├── contexts/
│   ├── OrderContext.tsx           ⭐ LIVE ORDER DATA - Updates sync everywhere!
│   └── StaffContext.tsx           ⭐ LIVE ANALYTICS DATA - Auto-tracking!
│
├── data/
│   ├── makananOrders.ts           📝 Initial kitchen orders (loaded at startup)
│   ├── barOrders.ts               📝 Initial bar orders (loaded at startup)
│   ├── snackOrders.ts             📝 Initial snack orders (loaded at startup)
│   ├── staff.ts                   📝 Staff database (Kitchen, Bar, Snack, Waiters)
│   ├── cookingLogs.ts             📝 Mock cooking logs (35 records)
│   ├── pinCodes.ts                📝 PIN codes untuk authentication
│   ├── menuItemEfficiency.ts      📊 Efficiency system & preset configuration
│   └── menuItemsUtils.ts          🛠️ Utilities untuk menu management
│
├── components/
│   ├── SelectCookPanel.tsx        🧑‍🍳 Staff selection panel (departments)
│   ├── SelectWaiterPanel.tsx      🧑‍💼 Waiter selection panel (checker only)
│   ├── CookingAnalytics.tsx       📊 Analytics dashboard component
│   ├── AnalyticsFilters.tsx       🔍 Filter UI untuk analytics
│   ├── EfficiencyChart.tsx        📈 Recharts visualization
│   ├── MenuChart.tsx              📊 Menu performance chart
│   ├── MenuFilters.tsx            🔍 Filter UI untuk menu management
│   ├── MenuReview.tsx             🎯 Preset editor cards
│   ├── AdminRetractableSidebar.tsx 🎨 Admin sidebar navigation
│   ├── AddEditStaffModal.tsx      ✏️ Staff CRUD modal
│   ├── StaffDetailView.tsx        👤 Staff detail view
│   ├── WeeklyScheduleEditor.tsx   📅 Schedule management
│   └── SearchReceiptSidebar*.tsx  🔍 Receipt search sidebars
│
├── imports/                       🎨 All SVG icons and UI components (35 files)
│   ├── BackButton.tsx
│   ├── HomeButton.tsx
│   ├── CookChefIcon.ts
│   ├── BarDepartmentIcon.ts
│   ├── CheckerDepartmentIcon.ts
│   ├── AdminSidebarIcon*.tsx
│   └── ... (see ASSET_IMPORT_SUMMARY.md)
│
├── OrdersKitchen.tsx              🍳 Kitchen orders page
├── OrdersBar.tsx                  🍹 Bar orders page
├── OrdersSnack.tsx                🍔 Snack orders page
│
├── CheckerHome.tsx                👁️  Checker department selection + statistics
├── CheckerOrdersAll.tsx           👁️  Checker - ALL departments view
├── CheckerOrdersMakanan.tsx       👁️  Checker - Kitchen orders only
├── CheckerOrdersBar.tsx           👁️  Checker - Bar orders only
├── CheckerOrdersSnacktsx.tsx      👁️  Checker - Snack orders only
│
├── AdminHome.tsx                  🔧 Admin dashboard dengan analytics
├── AdminStaffManagement.tsx       👥 Staff CRUD & scheduling
├── AdminMenuManagement.tsx        🍽️ Menu preset customization
├── AdminRawDatabase.tsx           🗄️ Raw data viewer dengan export
│
├── Login.tsx                      🔐 Login page (Display/Admin selection)
├── Home.tsx                       🏠 Main department selection (4 buttons)
├── PinEntryMakanan.tsx            🔐 Kitchen PIN entry
├── PinEntryBar.tsx                🔐 Bar PIN entry
├── PinEntrySnack.tsx              🔐 Snack PIN entry
├── PinEntryChecker.tsx            🔐 Checker PIN entry
│
└── App.tsx                        🔧 Main router + Context Providers
```

---

## 🎯 CARA UPDATE DATA

### Selama Development (Tambah Initial Data)

Edit file-file ini dan refresh app:
- `/data/makananOrders.ts` - Tambah kitchen orders
- `/data/barOrders.ts` - Tambah bar orders
- `/data/snackOrders.ts` - Tambah snack orders
- `/data/staff.ts` - Tambah kitchen/bar/snack staff atau waiters
- `/data/cookingLogs.ts` - Tambah mock analytics data

---

### Selama Runtime (App is Running)

Data update otomatis saat Anda:

***Department Pages (Kitchen/Bar/Snack):***
1. Klik **START** button → Select staff → calls `startItem()` di OrderContext
   - ✅ Timer mulai
   - ✅ StaffContext mulai tracking
2. Klik **DONE** button → calls `finishItem()` di OrderContext  
   - ✅ Timer stop
   - ✅ StaffContext create cooking log otomatis
   - ✅ Efficiency classification otomatis
3. Klik **FINISHED** button → calls `completeOrder()` di OrderContext
   - ✅ Order marked complete

***Checker Pages (All Checker Views):***
1. Bisa lakukan semua yang departments bisa (START, DONE, FINISHED)
2. Klik **ASSIGN** button (setelah order finished) → Select waiter → calls `assignWaiter()`
3. Klik **DELIVERED** button → calls `markDelivered()`

***Admin Pages:***
1. **Admin Dashboard** - View analytics, filter, export CSV
2. **Menu Management** - Edit presets, auto-converts units
3. **Staff Management** - CRUD staff, edit schedules
4. **Raw Database** - View all data, export tables

**Semua changes sync instantly di SEMUA pages!**

---

## 🔍 CONTOH: Complete Kitchen Order Flow

```
User klik START di OrdersKitchen.tsx
           ↓
handleStartItem() dipanggil
           ↓
SelectCookPanel terbuka → User select cook
           ↓
Calls: startItem('kitchen', orderId, itemId, cookName)
           ↓
OrderContext.tsx update: setKitchenOrders(...)
           ↓
StaffContext.tsx detect item started (monitoring)
           ↓
React otomatis re-render:
  • OrdersKitchen.tsx (lihat perubahan)
  • CheckerOrdersMakanan.tsx (lihat perubahan)
  • CheckerOrdersAll.tsx (lihat perubahan di Kitchen section)
  • CheckerHome.tsx (statistics update)
           ↓
Item status berubah: "not-started" → "on-their-way"
Timer mulai counting!
           ↓
User klik DONE → Item jadi "finished"
           ↓
StaffContext detect finished item
           ↓
Calculate cooking time & efficiency:
  • Duration = finishedTime - startedTime
  • Get expected time dari menu config
  • Calculate ratio = actual / expected
  • Classify: Sangat Cepat / Cepat / Normal / Lambat / Sangat Lambat
           ↓
Create cooking log otomatis
           ↓
Admin Dashboard analytics update real-time
           ↓
Semua items finished → User klik FINISHED
           ↓
Order marked complete
           ↓
Checker lihat "Assign" button muncul
           ↓
Checker klik Assign → Select waiter
           ↓
Button berubah jadi "Delivered"
           ↓
Checker klik Delivered → Order complete!
```

---

## 📊 DATA FLOWS

### Kitchen Department Page
```
OrdersKitchen.tsx
    ↓ useOrders()
OrderContext.tsx (kitchenOrders state)
    ↓ getOrders('kitchen')
Returns live kitchen orders
```

### Bar Department Page
```
OrdersBar.tsx
    ↓ useOrders()
OrderContext.tsx (barOrders state)
    ↓ getOrders('bar')
Returns live bar orders
```

### Snack Department Page
```
OrdersSnack.tsx
    ↓ useOrders()
OrderContext.tsx (snackOrders state)
    ↓ getOrders('snack')
Returns live snack orders
```

### Checker - Specific Department View
```
CheckerOrdersMakanan.tsx (atau Bar/Snack)
    ↓ useOrders()
OrderContext.tsx
    ↓ getOrders('kitchen') [atau 'bar'/'snack']
Returns live orders untuk department itu
```

### Checker - All Departments View
```
CheckerOrdersAll.tsx
    ↓ useOrders()
OrderContext.tsx (semua 3 states)
    ↓ getAllOrders()
Returns [
  { department: 'kitchen', orders: [...] },
  { department: 'bar', orders: [...] },
  { department: 'snack', orders: [...] }
]
```

### Checker Home - Statistics Dashboard
```
CheckerHome.tsx
    ↓ useOrders()
OrderContext.tsx (semua 3 states)
    ↓ getAllOrders()
Calculate statistics untuk setiap department:
  - Total receipts
  - Ongoing receipts
  - Finished receipts
```

### Admin Dashboard - Analytics
```
AdminHome.tsx
    ↓ useStaff()
StaffContext.tsx
    ↓ cookingLogs, useRealData
    ↓
CookingAnalytics component
    ↓
AnalyticsFilters (filter by cook, menu, efficiency, date)
    ↓
EfficiencyChart (Recharts visualization)
    ↓
MenuChart (performance per menu)
    ↓
Data table + CSV export
```

### Admin Menu Management
```
AdminMenuManagement.tsx
    ↓
Discover menu items dari cookingLogs
    ↓
Get config: getConfigForItem(name, dept)
    ↓ (checks localStorage first)
    ↓ (falls back to calculated defaults dari actual data)
    ↓
Display preset cards dengan validation
    ↓
User edit → Validate ascending order
    ↓
Save: updateConfigForItem(config)
    ↓ (saves to localStorage)
    ↓
Used for efficiency calculations
```

### Admin Staff Management
```
AdminStaffManagement.tsx
    ↓ useStaff()
StaffContext.tsx
    ↓
Display staff list dengan search/filter
    ↓
CRUD operations:
  - Add: addStaff(data)
  - Edit: updateStaff(id, data)
  - Delete: deleteStaff(id)
  - Schedule: updateSchedule(id, schedule)
    ↓
StaffDetailView component
    ↓
WeeklyScheduleEditor component
```

---

## 🎮 NAVIGATION FLOW

```
Login.tsx (Display/Admin selection)
    ├─→ DISPLAY MODE
    │       ↓
    │   Home.tsx (4 buttons)
    │       ├─→ MAKANAN → /pin → PinEntryMakanan.tsx → /makanan → OrdersKitchen.tsx
    │       ├─→ BAR → /minuman → PinEntryBar.tsx → /barorders → OrdersBar.tsx
    │       ├─→ SNACK → /snack → PinEntrySnack.tsx → /snackorders → OrdersSnack.tsx
    │       └─→ CHECKER → /checker → PinEntryChecker.tsx → /checkerhome → CheckerHome.tsx
    │               ↓
    │           CheckerHome.tsx (4 buttons)
    │               ├─→ ALL ORDERS → /checkerorders → CheckerOrdersAll.tsx
    │               ├─→ MAKANAN → /checkermakananorders → CheckerOrdersMakanan.tsx
    │               ├─→ BAR → /checkerbarorders → CheckerOrdersBar.tsx
    │               └─→ SNACK → /checkersnackorders → CheckerOrdersSnacktsx.tsx
    │
    └─→ ADMIN MODE
            ↓
        AdminHome.tsx (dengan retractable sidebar)
            ├─→ HOME (default) - Cooking Analytics Dashboard
            ├─→ STAFF MANAGEMENT - Staff CRUD + Schedules
            ├─→ MENU MANAGEMENT - Preset Customization
            └─→ RAW DATABASE - Data viewer + Export
```

---

## 💾 STATE MANAGEMENT SUMMARY

### Di Mana Live Data Ada:

***Order Management:***
- Kitchen orders di screen → `/contexts/OrderContext.tsx` (✅ updateable)
- Bar orders di screen → `/contexts/OrderContext.tsx` (✅ updateable)
- Snack orders di screen → `/contexts/OrderContext.tsx` (✅ updateable)
- Semua orders di Checker views → `/contexts/OrderContext.tsx` (✅ updateable)

***Analytics & Staff:***
- Cooking logs → `/contexts/StaffContext.tsx` (✅ updateable)
- Staff list → `/contexts/StaffContext.tsx` (✅ updateable)
- Staff schedules → `/contexts/StaffContext.tsx` (✅ updateable)

***Configuration:***
- Menu presets → `localStorage` (✅ updateable via Menu Management)
- User preferences → `localStorage` (✅ updateable)

***Initial Data (Templates):***
- Initial orders → `/data/*Orders.ts` (❌ read-only templates)
- Staff database → `/data/staff.ts` (❌ read-only templates)
- Mock analytics → `/data/cookingLogs.ts` (❌ read-only templates)

---

### Siapa Bisa Update Apa:

***Department Pages (Kitchen/Bar/Snack):***
- ✅ START items (assign staff, start timer)
- ✅ DONE items (finish cooking, auto-create log)
- ✅ FINISHED orders (complete order)

***Checker Pages:***
- ✅ Semua yang departments bisa lakukan
- ✅ ASSIGN waiters ke finished orders
- ✅ Mark orders sebagai DELIVERED

***Admin Pages:***
- ✅ View & filter cooking analytics
- ✅ Export data ke CSV
- ✅ CRUD staff operations
- ✅ Edit staff schedules
- ✅ Customize menu timing presets
- ✅ View raw database tables

---

## 🔥 CATATAN PENTING

### General:
1. **Assets Cleaned Up** - Removed obsolete files, sekarang 35 active assets (see ASSET_IMPORT_SUMMARY.md)
2. **All Data Syncs** - Ubah kitchen order di department page? Semua Checker views lihat instantly!
3. **Real-time Timers** - Setiap detik, OrderContext update elapsed times
4. **Pin Code** - Semua departments gunakan PIN: `1111` (development mode)

### Analytics:
5. **Automatic Tracking** - Cooking logs dibuat otomatis saat item DONE
6. **Data-Driven Defaults** - Menu presets calculated dari actual cooking data
7. **Efficiency Classification** - Otomatis classify: Sangat Cepat, Cepat, Normal, Lambat, Sangat Lambat
8. **Mock/Real Toggle** - Switch antara 35 mock records dan real cooking data
9. **CSV Export** - Export filtered analytics data

### Menu Management:
10. **Dynamic Discovery** - Menu items discovered dari cooking logs, bukan hardcoded
11. **Unit Conversion** - Otomatis convert minutes ⟺ seconds saat ganti unit
12. **Validation** - Presets must be ascending order (validated real-time)
13. **localStorage Persistence** - Customizations saved across sessions

### Staff Management:
14. **Full CRUD** - Create, Read, Update, Delete staff
15. **Weekly Schedules** - Edit jam kerja per hari
16. **Role Assignment** - Kitchen, Bar, Snack, Waiter roles

### Checker Special Features:
17. **See ALL Departments** - View semua atau filter specific department
18. **Assign Waiters** - Ke finished orders
19. **Mark Delivered** - Final step dalam order lifecycle
20. **Statistics Dashboard** - Real-time counts per department

---

## 🎨 FITUR SAAT INI

### Department Pages (Kitchen/Bar/Snack):
✅ PIN entry untuk setiap department  
✅ Order management dengan real-time timers  
✅ START button (select staff, start timer, auto-track)  
✅ DONE button (finish item, auto-create cooking log)  
✅ FINISHED button (complete entire order)  
✅ Priority sorting (PRIORITAS first, then NORMAL)  
✅ Staff selection panel (department-specific)  
✅ Receipt card layout dengan horizontal scrolling  
✅ Receipt statistics display  
✅ Sidebar navigation dengan search  

### Checker Section:
✅ Checker PIN entry  
✅ CheckerHome - Department selection dashboard dengan statistics  
✅ View semua departments combined ATAU specific department  
✅ Bisa perform semua department actions (START, DONE, FINISHED)  
✅ ASSIGN button (muncul saat order finished)  
✅ Waiter selection panel  
✅ DELIVERED button (final step)  
✅ Real-time sync dengan semua department pages  

### Admin Section: ✨ BARU
✅ Login page dengan Display/Admin mode selection  
✅ Retractable sidebar navigation (Home/Staff/Menu/Database)  
✅ **Cooking Analytics Dashboard:**
  - Horizontal stacked bar chart (Recharts)
  - Filter by: Cook, Menu, Efficiency, Date Range
  - Mock/Real data toggle
  - CSV export functionality
  - Summary statistics cards
  - Detailed data table
✅ **Staff Management:**
  - Staff list dengan search & filter
  - Add/Edit/Delete operations
  - Staff detail view
  - Weekly schedule editor (per day shifts)
  - Role management
✅ **Menu Management:**
  - Dynamic menu discovery dari cooking logs
  - 5 timing presets per menu item
  - Unit conversion (minutes ⟺ seconds)
  - Validation (ascending order)
  - Reset to defaults
  - Data source indicators
  - localStorage persistence
✅ **Raw Database Viewer:**
  - View all tables
  - Export individual tables to CSV
  - Real-time data display

### Shared Features:
✅ Centralized data (OrderContext & StaffContext - changes sync everywhere)  
✅ Real-time timers untuk in-progress items  
✅ Real-time analytics creation  
✅ BackButton component dengan proper z-index  
✅ Department-specific icons dan branding  
✅ Type-safe dengan full TypeScript  
✅ Responsive design (landscape tablet 1024×768)  

---

## 🎨 DESIGN SYSTEM

### Colors:
- Main background: `#4D236E` (dark purple)
- Receipt card background: `#8b6dac` (lighter purple)
- Card header: `#3c044d` (darkest purple)
- Button purple: `#61428C`
- Red (START): `#880608`
- Yellow (DONE): `#edbb0d`
- Green (FINISHED/Delivered): `#4caf50`

### Efficiency Colors:
- Sangat Cepat: `#4ade80` (bright green)
- Cepat: `#86efac` (light green)
- Normal: `#60a5fa` (blue/cyan)
- Lambat: `#fb923c` (orange)
- Sangat Lambat: `#f87171` (red/pink)

### Target Device:
- Landscape tablet: 1024px × 768px
- Receipt card: 391px × 633px
- Horizontal scroll untuk multiple orders
- Admin responsive layout

---

## 🗄️ DATABASE MAPPING (Future Backend)

Saat integrate dengan MySQL database:

### Frontend → Backend Mapping:

| Frontend State | Backend Table | Key Columns |
|----------------|---------------|-------------|
| `kitchenOrders` | `orders` + `order_items` | order_id, department='kitchen' |
| `barOrders` | `orders` + `order_items` | order_id, department='bar' |
| `snackOrders` | `orders` + `order_items` | order_id, department='snack' |
| `cookingLogs` | `cooking_logs` | log_id, staff_id, ID_Menu |
| `staffList` | `staff` | staff_id, nama_lengkap, department |
| Menu presets | `menu_items` | ID_Menu, Waktu_Cepat/Normal/Lama |

### API Endpoints Needed:

```typescript
// Orders
POST   /api/orders              - Create new order
GET    /api/orders/:dept        - Get orders by department
PUT    /api/orders/:id/items/:itemId/start   - Start item
PUT    /api/orders/:id/items/:itemId/finish  - Finish item
PUT    /api/orders/:id/complete - Complete order

// Cooking Logs (Auto-created)
GET    /api/cooking-logs        - Get all logs
GET    /api/cooking-logs?cook=X&menu=Y&date=Z  - Filtered logs
POST   /api/cooking-logs        - Create log (from finish trigger)

// Staff
GET    /api/staff               - Get all staff
POST   /api/staff               - Create staff
PUT    /api/staff/:id           - Update staff
DELETE /api/staff/:id           - Delete staff
PUT    /api/staff/:id/schedule  - Update schedule

// Menu
GET    /api/menu-items          - Get all menu items
PUT    /api/menu-items/:id      - Update menu presets
```

**Full database schema:** Lihat `/guidelines/FORMAT_DATABASE_SQL.md`

---

## 🚀 SIAP DIGUNAKAN!

Sistem Anda fully set up dengan:

### ✅ Core Features:
- Centralized, updateable data (OrderContext & StaffContext)
- Dual workflow (Departments cook, Checkers deliver)
- Real-time synchronization di semua pages
- Clean, optimized asset structure (35 active files)

### ✅ Analytics Features:
- Automatic cooking log creation
- Efficiency classification
- Real-time performance tracking
- Filter & export capabilities
- Mock/Real data toggle

### ✅ Management Features:
- Staff CRUD operations
- Weekly schedule management
- Menu preset customization
- Raw database viewer
- CSV export functionality

### ✅ Production Ready:
- Type-safe dengan TypeScript
- Responsive design
- Error handling
- Input validation
- localStorage persistence

---

## 📚 DOKUMENTASI LENGKAP

### Main Files:
- **Main data:** `/contexts/OrderContext.tsx`
- **Analytics data:** `/contexts/StaffContext.tsx`
- **Initial orders:** `/data/makananOrders.ts`, `/data/barOrders.ts`, `/data/snackOrders.ts`
- **Staff database:** `/data/staff.ts`
- **Menu system:** `/data/menuItemEfficiency.ts`

### Documentation:
- **Asset docs:** `/guidelines/ASSET_IMPORT_SUMMARY.md`
- **Code docs:** `/guidelines/CODE_DOCUMENTATION.md`
- **Data guide:** `/guidelines/DATA_SYSTEM_GUIDE.md` (file ini)
- **Quick ref:** `/guidelines/QUICK_REFERENCE.md` ⭐ (YOU ARE HERE)
- **Analytics:** `/guidelines/PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md`
- **Database:** `/guidelines/FORMAT_DATABASE_SQL.md`
- **Overview:** `/guidelines/README_INDONESIA.md`

---

## 💡 TIPS & TRICKS

### Development:
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing Analytics:
1. Go to Kitchen/Bar/Snack page
2. START item → assign staff
3. Wait beberapa detik
4. Click DONE
5. Go to Admin Dashboard
6. Toggle "Real Data Only"
7. ✅ Lihat cooking log ter-create otomatis!

### Customizing Menu:
1. Go to Admin → Menu Management
2. Select menu item
3. Edit preset times
4. Save changes
5. ✅ Presets tersimpan ke localStorage

### Managing Staff:
1. Go to Admin → Staff Management
2. Add/Edit/Delete staff
3. Click staff untuk edit schedule
4. ✅ Changes update immediately

---

**Last Updated:** Current Session - Bahasa Indonesia Complete  
**Version:** 2.0 dengan Full Analytics & Management  
**Status:** ✅ Production Ready! 🎉

**Selamat menggunakan sistem! Dokumentasi lengkap tersedia di folder `/guidelines`. 🚀**
