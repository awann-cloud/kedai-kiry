# Kitchen Order Management System - Dokumentasi Kode

## Overview

Dokumen ini menyediakan penjelasan komprehensif tentang cara kerja kode di seluruh sistem, termasuk department pages, checker section, admin dashboard, dan sistem centralized data management.

---

## 📁 Struktur File

### `/App.tsx` - Main Router

**Tujuan**: Root component yang setup semua routing untuk aplikasi menggunakan OrderProvider dan StaffProvider wrappers.

**Routes**:

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

***Admin Section:*** ✨ BARU
- `/admin` - Admin dashboard dengan retractable sidebar
  - Default view: Cooking Analytics Dashboard
  - Staff Management page (via sidebar)
  - Menu Management page (via sidebar)
  - Raw Database page (via sidebar)

**Context Provider Wrappers:**

```typescript
<HashRouter>
  <OrderProvider>
    <StaffProvider>
      <Routes>
        {/* All routes here */}
      </Routes>
    </StaffProvider>
  </OrderProvider>
</HashRouter>
```

Semua routes di-wrap dalam:
1. **OrderProvider** - Menyediakan centralized order state management
2. **StaffProvider** - Menyediakan analytics & staff management

Ini memastikan semua order updates dan analytics tracking sync otomatis di semua pages.

---

## 🍳 Core Components - Order Management

### Order Management Pages (OrdersKitchen.tsx, OrdersBar.tsx, OrdersSnack.tsx)

Ketiga pages ini share struktur yang sama tapi bekerja dengan departments berbeda via OrderContext.

#### Data Access via OrderContext

**Menggunakan hook `useOrders()`:**

```typescript
import { useOrders } from './contexts/OrderContext';

export default function OrdersKitchen() {
  const { getOrders, startItem, finishItem, completeOrder } = useOrders();
  const orders = getOrders('kitchen'); // Gets live kitchen orders dari context
  
  // Semua updates melalui OrderContext functions
  // Ini memastikan changes sync di semua pages otomatis
}
```

#### State Management (Page-Level)

**`currentTime`** - Current time untuk header clock
- Update setiap detik via `setInterval`
- Formatted sebagai HH:MM untuk display

**`isSidebarOpen`** - Controls sidebar visibility ✨ BARU
- `true` = Sidebar terbuka
- `false` = Sidebar tertutup

**`selectCookPanel`** - Controls staff selection panel
- `isOpen`: Apakah panel visible
- `orderId`: Order mana yang berisi item yang di-start
- `itemId`: Item spesifik yang sedang di-start
- `itemName`: Nama item untuk display di panel

#### Key Functions

***`handleStartItem(orderId, itemId, cookName)`***
- Calls `startItem(department, orderId, itemId, cookName)` dari OrderContext
- OrderContext ubah item status dari "not-started" ke "on-their-way"
- OrderContext set staff member assigned ke item
- OrderContext record start time (timestamp)
- OrderContext initialize elapsed time counter
- **Semua pages yang pakai data ini re-render otomatis**
- **StaffContext mulai tracking item untuk cooking log**

***`handleDoneItem(orderId, itemId)`***
- Calls `finishItem(department, orderId, itemId)` dari OrderContext
- OrderContext ubah item status dari "on-their-way" ke "finished"
- OrderContext record finish time (timestamp)
- OrderContext stop elapsed time counter
- **Semua pages sync otomatis**
- **StaffContext create cooking log dengan efficiency calculation**

***`handleFinishOrder(orderId)`***
- Calls `completeOrder(department, orderId)` dari OrderContext
- OrderContext mark entire order sebagai completed
- OrderContext freeze order timer pada current value
- Dipanggil saat semua items dalam order finished
- **Bikin "Assign" button muncul di semua Checker views otomatis**

***`getItemCounts(items)`***
- Returns: `{ total, finished, toGo }`
- Digunakan untuk receipt statistics display

***`getOrderElapsedTime(items)`***
- Calculate total time sejak first item di-start
- Returns time dalam seconds
- Digunakan untuk order-level timer display

***`getTotalStats()`***
- Calculate header statistics di semua orders dalam department ini
- Returns: `{ onGoingCount, notStartedCount, longestTime }`

***`handleReceiptClick(orderId)`*** ✨ BARU
- Close sidebar
- Scroll smooth ke receipt card yang diklik
- Uses: `document.getElementById(`order-${orderId}`)?.scrollIntoView()`

#### Timer Effects

**Clock Effect** (runs setiap 1 detik):

```typescript
useEffect(() => {
  const clockInterval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);
  return () => clearInterval(clockInterval);
}, []);
```

- Update header clock display
- Cleanup function stop interval saat unmount

**Note**: Elapsed time untuk items sekarang di-manage oleh OrderContext's timer, bukan individual page timers. Ini memastikan consistency di semua views.

#### UI Structure

**Header Section**:
- Department icon (clickable untuk buka sidebar) ✨ UPDATED
- Section title ("Section Makanan", "Section Bar", "Section Snack")
- Statistics (# on-going, # not started)
- Live clock (format HH:MM)

**Receipt Cards** (horizontal scroll):

Setiap card menampilkan:

- **Top Header** (dark purple #3c044d):
  - Priority indicator (sparkle icon untuk PRIORITAS, circle untuk NORMAL)
  - Customer/location name
  - Order ID
  - Total order elapsed time
  
- **Receipt Statistics** (light gray #f7f7f9):
  - Total items count
  - Finished items count
  - Items to go count
  - Department-specific receipt icon
  
- **Scrollable Items Area**:
  Items di-group by status dan displayed dalam order:
  
  1. **Finished Items** (atas) - Gray background dengan green timer
     - Item name dan quantity
     - Notes
     - Staff member name
     - Started time
     - Finished time
     - Final elapsed time (frozen)
  
  2. **On-Their-Way Items** (tengah) - Light background dengan purple timer
     - Item name dan quantity
     - Notes
     - Staff member name
     - Live running timer (update setiap detik)
     - Yellow "DONE" button
  
  3. **Not-Started Items** (bawah) - Light background
     - Item name dan quantity
     - Notes
     - Red "START" button

- **Footer** (light gray):
  - "ON GOING" status text
  - Priority level (PRIORITAS/NORMAL)
  - "FINISHED" button (enabled saat semua items done)

**SearchReceiptSidebar** ✨ BARU:
- Slides in dari left saat department icon diklik
- Search functionality untuk menu items
- List semua receipts dengan status
- Expandable items saat searching
- Home button navigation
- Click receipt untuk scroll ke main view

#### Order Sorting

Orders di-display dalam priority ini:
1. PRIORITAS orders (by original order)
2. NORMAL orders (by original order - FIFO)

```typescript
.sort((a, b) => {
  if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
  if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
  return 0; // Maintain original order dalam setiap group (FIFO)
})
```

#### Color Indicators

**Order Priority Indicator** (pada setiap receipt card):
- Semua items finished: `#4caf50` (bright green)
- Semua items not started: `#ff4444` (bright red)
- Items in progress: `#FFEF63` (yellow)

---

## 👁️ Checker Section Pages

Checker section punya unique workflow dengan multiple specialized views.

### CheckerHome.tsx - Statistics Dashboard

**Tujuan**: Department selection screen dengan real-time statistics untuk semua departments.

**Features:**
- Menampilkan 4 department cards: ALL ORDERS, MAKANAN, BAR, SNACK
- Setiap card displays:
  - Department icon
  - Total receipts count
  - "On Going" count
  - "Finished" count (ready untuk waiter assignment)
- Live statistics update otomatis via OrderContext
- Sparkle decorations untuk visual polish
- BackButton untuk kembali ke main home

**Data Access:**

```typescript
const { getAllOrders } = useOrders();
const allDepartmentOrders = getAllOrders();

// Calculate statistics untuk setiap department
allDepartmentOrders.forEach(dept => {
  const totalReceipts = dept.orders.length;
  const onGoingReceipts = dept.orders.filter(o => !o.completed).length;
  const finishedReceipts = dept.orders.filter(o => o.completed).length;
});
```

**Navigation:**
- ALL ORDERS → `/checkerorders` (CheckerOrdersAll)
- MAKANAN → `/checkermakananorders` (CheckerOrdersMakanan)
- BAR → `/checkerbarorders` (CheckerOrdersBar)
- SNACK → `/checkersnackorders` (CheckerOrdersSnacktsx)

---

### Checker Order Pages (CheckerOrdersAll, CheckerOrdersMakanan, CheckerOrdersBar, CheckerOrdersSnacktsx)

**Tujuan**: View dan manage orders dengan waiter assignment capability.

**Key Differences dari Department Pages:**
1. Bisa view all departments atau specific department
2. Menampilkan Checker profile icon (bukan department icon)
3. Punya waiter assignment functionality
4. Menampilkan "Assign" button saat order completed
5. Menampilkan "Delivered" button setelah waiter assigned

**Additional State:**

**`selectWaiterPanel`** - Controls waiter selection panel (Checker-specific)
- `isOpen`: Apakah panel visible
- `orderId`: Order mana untuk assign waiter
- `department`: Department mana order tersebut belong

**Additional Functions:**

***`handleAssignWaiter(orderId, waiterName, department)`***
- Calls `assignWaiter(department, orderId, waiterName)` dari OrderContext
- OrderContext set assigned waiter untuk completed order
- Ubah "Assign" button jadi "Delivered" button
- **Sync di semua Checker views**

***`handleMarkDelivered(orderId, department)`***
- Calls `markDelivered(department, orderId)` dari OrderContext
- OrderContext mark order sebagai delivered ke customer
- Final step dalam order lifecycle
- **Sync di semua Checker views**

**Footer Buttons (Checker-specific):**
- **Sebelum completion**: "FINISHED" button (sama seperti department pages)
- **Setelah completion, sebelum assignment**: Green "Assign" button
- **Setelah assignment, sebelum delivery**: Blue "Delivered" button
- **Setelah delivery**: Green "Delivered" text (disabled state)

**CheckerOrdersAll Specific:**
- Gunakan `getAllOrders()` untuk get all departments
- Group orders by department
- Tampilkan department-specific receipt icons untuk setiap section

**CheckerOrdersMakanan/Bar/Snack Specific:**
- Gunakan `getOrders('kitchen'/'bar'/'snack')` untuk get specific department
- Identik dengan department pages tapi dengan Checker branding dan waiter features

---

## 🔐 PIN Entry Pages

PIN Entry Pages (PinEntryMakanan.tsx, PinEntryBar.tsx, PinEntrySnack.tsx, PinEntryChecker.tsx)

**Tujuan**: Authentication pages untuk setiap department menggunakan 4-digit PIN codes.

### Layout

- **Left Side** (46% width - Purple):
  - Frame9 decorative element di top (untuk Makanan dan Checker)
  - Department icon (CookChef/Bar/Snack/Checker)
  - "Masukkan Pin" text
  - PIN dots display (4 boxes)
  - "Lupa Pin?" text

- **Right Side** (54% width - White):
  - 3x4 grid keypad
  - Numbers 1-9
  - Bottom row: Backspace, 0, ENTER
  - BackButton component (z-50 untuk proper layering)

### State Management

**`pin`** - Array of 4 strings
- Setiap element represent satu digit dari PIN
- Empty string = unfilled
- Non-empty = filled dengan digit

**`error`** - Boolean
- `true` saat wrong PIN entered
- Trigger red error state pada PIN boxes
- Auto-reset setelah 1 detik

### PIN Entry Logic

**Number Click**:

```typescript
const handleNumberClick = (num: string) => {
  const firstEmpty = pin.findIndex(p => p === '');
  if (firstEmpty !== -1) {
    const newPin = [...pin];
    newPin[firstEmpty] = num;
    setPin(newPin);
    
    // Check jika PIN complete (semua 4 digits filled)
    if (firstEmpty === 3) {
      const enteredPin = newPin.join('');
      if (enteredPin === correctPin) {
        // Navigate ke appropriate page setelah short delay
        setTimeout(() => navigate('/destination-page'), 300);
      } else {
        // Show error dan reset
        setError(true);
        setTimeout(() => {
          setPin(['', '', '', '']);
          setError(false);
        }, 1000);
      }
    }
  }
};
```

**Backspace**:
- Find last filled digit
- Clear digit tersebut
- Move cursor back satu posisi

**Visual States**:
- Empty: Gray background (#624384)
- Filled (correct): White background dengan purple dot
- Filled (error): Red background dengan darker red dot

**Current PIN**: Semua pages gunakan `1111` untuk development

**Navigation Destinations:**
- PinEntryMakanan → `/makanan` (OrdersKitchen)
- PinEntryBar → `/barorders` (OrdersBar)
- PinEntrySnack → `/snackorders` (OrdersSnack)
- PinEntryChecker → `/checkerhome` (CheckerHome)

---

## 🔧 Admin Dashboard ✨ BARU

### Login.tsx - Mode Selection

**Tujuan**: Entry point untuk memilih Display mode atau Admin mode.

**Features:**
- Dual button selection
- DISPLAY MODE → `/home` (normal operations)
- ADMIN MODE → `/admin` (management dashboard)
- Clean purple gradient design
- Responsive layout

---

### AdminHome.tsx - Main Dashboard

**Tujuan**: Admin dashboard dengan retractable sidebar dan cooking analytics.

**Components:**
- **AdminRetractableSidebar** - Navigasi sidebar dengan icons
- **AdminHeaderGreeting** - Header dengan greeting message
- **CookingAnalytics** - Main analytics dashboard component

**Sidebar Navigation:**
1. **Home** - Cooking Analytics (default view)
2. **Staff Management** - Staff CRUD & schedules
3. **Menu Management** - Menu preset customization
4. **Raw Database** - Data viewer & export

**State Management:**

```typescript
const [currentPage, setCurrentPage] = useState<'home' | 'staff' | 'menu' | 'database'>('home');
```

**Page Rendering:**

```typescript
{currentPage === 'home' && <CookingAnalytics />}
{currentPage === 'staff' && <AdminStaffManagement />}
{currentPage === 'menu' && <AdminMenuManagement />}
{currentPage === 'database' && <AdminRawDatabase />}
```

---

### CookingAnalytics.tsx - Analytics Dashboard

**Tujuan**: Comprehensive cooking performance analytics dengan filtering dan visualization.

**Data Source:**

```typescript
import { useStaff } from './contexts/StaffContext';

const { 
  cookingLogs, 
  useRealData, 
  toggleDataSource,
  exportLogsToCSV 
} = useStaff();
```

**Features:**

***1. Data Source Toggle***
- Mock Data (35 records dari cookingLogs.ts)
- Real Data Only (dari actual cooking)
- Switch dengan toggle button

***2. Analytics Filters*** (`AnalyticsFilters.tsx`)
- **Filter by Cook**: Select specific cook atau "All Cooks"
- **Filter by Menu**: Select specific menu atau "All Menus"
- **Filter by Efficiency**: 
  - Sangat Cepat (≤50%)
  - Cepat (50-80%)
  - Normal (80-120%)
  - Lambat (120-200%)
  - Sangat Lambat (≥200%)
- **Filter by Date Range**: Start date sampai end date

***3. Summary Statistics***
- Total Records count
- Average Efficiency (dengan color indicator)
- Most Efficient Cook
- Most Cooked Menu

***4. Efficiency Chart*** (`EfficiencyChart.tsx`)
- Horizontal stacked bar chart (Recharts)
- Group by cook atau menu
- Color-coded efficiency levels:
  - Sangat Cepat: `#4ade80` (bright green)
  - Cepat: `#86efac` (light green)
  - Normal: `#60a5fa` (blue/cyan)
  - Lambat: `#fb923c` (orange)
  - Sangat Lambat: `#f87171` (red/pink)

***5. Menu Performance Chart*** (`MenuChart.tsx`)
- Bar chart showing counts per menu
- Shows how often each menu cooked
- Color gradient untuk visual appeal

***6. Detailed Data Table***
- Sortable columns
- Show: Cook Name, Menu Name, Time (MM:SS), Efficiency
- Color-coded efficiency badges
- Paginated results

***7. CSV Export***
- Export filtered data
- Format: Cook Name, Menu Name, Time, Efficiency
- Automatic download dengan timestamp filename

**Efficiency Calculation:**

```typescript
// Di StaffContext saat item finished
const duration_seconds = (finishedTime - startedTime) / 1000;
const config = getConfigForItem(menuName, department);
const expected_time = config.presets.find(p => p.name === 'standard')?.value || 300;
const efficiency_ratio = (duration_seconds / expected_time) * 100;

// Classification
if (efficiency_ratio <= 50) return 'Sangat Cepat';
if (efficiency_ratio <= 80) return 'Cepat';
if (efficiency_ratio <= 120) return 'Normal';
if (efficiency_ratio <= 200) return 'Lambat';
return 'Sangat Lambat';
```

---

### AdminStaffManagement.tsx - Staff CRUD

**Tujuan**: Full staff management dengan CRUD operations dan schedule editor.

**Data Access:**

```typescript
import { useStaff } from './contexts/StaffContext';

const { 
  staffList, 
  addStaff, 
  updateStaff, 
  deleteStaff,
  updateSchedule 
} = useStaff();
```

**Components:**
- **AddEditStaffModal** - Modal untuk create/update staff
- **StaffDetailView** - Expanded view dengan detail info
- **WeeklyScheduleEditor** - Edit weekly schedule per staff

**Features:**

***1. Staff List Display***
- Grid layout dengan cards
- Show: Photo, Name, Role, Phone, Status
- Search/filter functionality
- Add New Staff button

***2. CRUD Operations***

**Create Staff:**
```typescript
addStaff({
  id: generateId(),
  name: 'Nama Lengkap',
  role: 'kitchen', // 'kitchen' | 'bar' | 'snack' | 'waiter'
  pin: '1234',
  phone: '+628123456789',
  email: 'email@example.com',
  schedule: defaultSchedule,
  isActive: true
});
```

**Update Staff:**
```typescript
updateStaff('staff-id', {
  name: 'Updated Name',
  phone: '+628987654321',
  // ... other fields
});
```

**Delete Staff** (soft delete):
```typescript
deleteStaff('staff-id'); // Set isActive: false
```

***3. Weekly Schedule Editor***

```typescript
updateSchedule('staff-id', {
  monday: { isWorking: true, shift: 'morning', startTime: '08:00', endTime: '16:00' },
  tuesday: { isWorking: true, shift: 'afternoon', startTime: '14:00', endTime: '22:00' },
  wednesday: { isWorking: false },
  // ... rest of week
});
```

**Shift Types:**
- Morning: 08:00 - 16:00
- Afternoon: 14:00 - 22:00
- Night: 22:00 - 06:00
- Custom: User-defined times

***4. Staff Detail View***
- Full profile information
- Performance statistics (dari cooking logs)
- Schedule overview
- Edit button untuk each section

---

### AdminMenuManagement.tsx - Menu Customization ✨ BARU

**Tujuan**: Customize menu item timing presets dengan data-driven defaults.

**How It Works:**

***1. Dynamic Menu Discovery***
```typescript
// Discover menus dari cooking logs (bukan hardcoded!)
const discoverMenusFromLogs = (logs: CookingLog[]) => {
  const menuMap = new Map();
  logs.forEach(log => {
    const key = `${log.menu_name}_${log.department}`;
    if (!menuMap.has(key)) {
      menuMap.set(key, {
        name: log.menu_name,
        department: log.department
      });
    }
  });
  return Array.from(menuMap.values());
};
```

***2. Get Configuration dengan Data-Driven Defaults***
```typescript
import { getConfigForItem, calculateDefaultPresets } from './data/menuItemEfficiency';

// Get config (checks localStorage first)
const config = getConfigForItem(menuName, department);

// Jika tidak ada di localStorage, calculate dari actual data
if (!config.presets) {
  config.presets = calculateDefaultPresets(menuName, department, cookingLogs);
}
```

***3. Preset Configuration***

Setiap menu punya 5 timing presets:
- ⚡ Very Fast (≤50% dari standard)
- 🚀 Fast (50-80% dari standard)
- 👍 Standard (average dari data)
- 🐢 Slow (120-200% dari standard)
- 🐌 Extremely Slow (≥200% dari standard)

**Structure:**
```typescript
{
  name: 'very-fast',
  label: '⚡ Very Fast',
  value: 3,
  unit: 'min' // 'min' atau 'sec'
}
```

***4. Unit Conversion*** ✨ FEATURE

```typescript
// Otomatis convert saat switch unit
const convertUnit = (value: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === 'min' && toUnit === 'sec') {
    return value * 60; // 2 min → 120 sec
  }
  if (fromUnit === 'sec' && toUnit === 'min') {
    return Math.round((value / 60) * 100) / 100; // 120 sec → 2 min
  }
  return value;
};
```

***5. Validation***

- Presets harus ascending order (very-fast < fast < standard < slow < extremely-slow)
- Real-time validation saat edit
- Error messages jika order salah
- Prevent save jika validation failed

***6. Save to localStorage***

```typescript
import { updateConfigForItem } from './data/menuItemEfficiency';

updateConfigForItem({
  name: menuName,
  department: department,
  presets: updatedPresets
});

// Saved ke: localStorage['menu_item_configs']
```

***7. Reset to Defaults***

```typescript
// Clear localStorage untuk menu tersebut
// Next load akan recalculate dari cooking logs
localStorage.removeItem(`menu_config_${menuName}_${department}`);
```

**Components:**
- **MenuFilters** - Filter by department, search menus
- **MenuReview** - Preset cards dengan edit capability

**UI Features:**
- Sidebar menu list (filterable)
- Preset cards dengan color indicators
- Unit toggle (minutes/seconds)
- Save/Cancel/Reset buttons
- Data source indicator (localStorage vs calculated)
- Real-time validation feedback

---

### AdminRawDatabase.tsx - Data Viewer

**Tujuan**: View dan export all database tables.

**Tables Available:**
1. **Orders Table** (semua departments)
2. **Order Items Table** (detail items)
3. **Cooking Logs Table** (analytics data)
4. **Staff Table** (karyawan data)
5. **Menu Items Table** (menu config)

**Features:**

***1. Table Selection***
- Dropdown untuk select table
- Show row count
- Timestamp last update

***2. Data Display***
- Formatted table dengan scrolling
- Show all columns
- JSON-formatted complex data
- Color-coded status/efficiency

***3. Export to CSV***
- Export individual tables
- Export all tables (zip file future)
- Automatic filename dengan timestamp
- Proper CSV formatting

**Data Access:**

```typescript
const { getAllOrders } = useOrders();
const { cookingLogs, staffList } = useStaff();

// Format data untuk export
const formatOrdersForTable = (orders) => {
  return orders.flatMap(dept => 
    dept.orders.map(order => ({
      department: dept.department,
      orderId: order.orderId,
      customer: order.name,
      priority: order.priority,
      itemCount: order.items.length,
      status: order.completed ? 'Completed' : 'Ongoing',
      delivered: order.delivered ? 'Yes' : 'No'
    }))
  );
};
```

---

## 🧩 Component Library

### SelectCookPanel Component

**Tujuan**: Slide-in panel untuk assign department staff (cooks/bartenders/snack staff) ke menu items.

**Props:**
- `isOpen`: Controls visibility
- `onClose`: Callback untuk close panel
- `onSelectCook`: Callback dengan selected staff name
- `itemName`: Nama item yang sedang di-start
- `orderId`: Order containing the item
- `itemId`: Specific item ID
- `department`: Department mana staff untuk show ('kitchen'/'bar'/'snack')

**Features:**
- Slides in dari right side (544px width)
- Semi-transparent backdrop (#00000080)
- Menampilkan filtered staff by department menggunakan `getStaffByDepartment(department)`
- Displays availability status:
  - Green dot = Available
  - Red dot = Busy
- Disable selection dari busy staff
- Search bar (placeholder untuk future implementation)

**Staff Card Display:**

Setiap staff member shows:
- SVG avatar dengan department-specific icons
- Name
- Position/title
- Availability indicator dot
- "Available" atau "Busy" text

Saat clicked (jika available):
- Calls `onSelectCook(worker.name)`
- Parent component calls OrderContext's `startItem()`
- Panel close otomatis

---

### SelectWaiterPanel Component

**Tujuan**: Slide-in panel untuk assign waiters/waitresses ke completed orders (Checker-only).

**Props:**
- `isOpen`: Controls visibility
- `onClose`: Callback untuk close panel
- `onSelectWaiter`: Callback dengan selected waiter name
- `orderId`: Order untuk assign waiter
- `department`: Department mana order tersebut belong

**Features:**
- Slides in dari right side (544px width)
- Semi-transparent backdrop
- Menampilkan all waitstaff dari `WAITSTAFF` array
- Same availability system seperti SelectCookPanel
- Search bar (placeholder)

**Waiter Card Display:**

Setiap waiter shows:
- SVG avatar
- Name
- Position ("Senior Waitress", "Waitress", etc.)
- Availability indicator
- "Available" atau "Busy" text

Saat clicked (jika available):
- Calls `onSelectWaiter(worker.name)`
- Parent component calls OrderContext's `assignWaiter()`
- Panel close otomatis

---

### SearchReceiptSidebar Components ✨ BARU

**Three Variants:**
- `SearchReceiptSidebar.tsx` - Kitchen/Makanan
- `SearchReceiptSidebarBar.tsx` - Bar
- `SearchReceiptSidebarSnack.tsx` - Snack

**Tujuan**: Sliding sidebar untuk search dan navigate receipts.

**Props:**
- `isOpen`: Controls visibility
- `orders`: Array of orders untuk display
- `onClose`: Callback untuk close sidebar
- `onGoHome`: Callback untuk navigate home

**Features:**

***1. Slide Animation***
- Slides in dari left side
- Smooth transition (300ms)
- Semi-transparent backdrop
- Close on backdrop click

***2. Search Functionality***
- Search bar di top
- Real-time search saat typing
- Search by: Customer name, Order ID, Menu item names
- Clear search button

***3. Receipt List***
- Shows all orders
- Expandable when searching
- Click to scroll to receipt di main view
- Color-coded priority indicators

***4. Home Button***
- Navigate back to home page
- Uses HomeButton component
- Positioned di bottom

***5. Icons & Branding***
- Department-specific icons
- Priority stars (PRIORITAS orders)
- Food icons (Kitchen only)
- Expandable arrows

**Item Display (When Searching):**
```typescript
{searchQuery && (
  <div className="expanded-items">
    {order.items.map(item => (
      <div key={item.id} className="item-row">
        <span>{item.name}</span>
        <span>x{item.quantity}</span>
        <StatusBadge status={item.status} />
      </div>
    ))}
  </div>
)}
```

---

## 📊 Data Layer

### `/contexts/OrderContext.tsx` - Order Management

**Tujuan**: Single source of truth untuk all order data. Semua components access dan update data melalui context ini.

**State:**

```typescript
const [kitchenOrders, setKitchenOrders] = useState<Order[]>(initialMakananOrdersData);
const [barOrders, setBarOrders] = useState<Order[]>(initialBarOrdersData);
const [snackOrders, setSnackOrders] = useState<Order[]>(initialSnackOrdersData);
```

**Ini adalah LIVE, UPDATEABLE states!** Semua changes terjadi di sini dan sync everywhere.

**Context Functions:**

***`getOrders(department: Department)`***
- Returns orders untuk specific department
- Digunakan oleh department pages dan checker department-specific views

***`getAllOrders()`***
- Returns array semua departments dengan orders mereka
- Digunakan oleh CheckerHome dan CheckerOrdersAll
- Format: `[{ department: 'kitchen', orders: [...] }, ...]`

***`startItem(department, orderId, itemId, staffName)`***
- Update item status ke "on-their-way"
- Set staff member
- Record start timestamp
- Initialize elapsed time
- **Trigger re-render di semua components yang pakai data ini**
- **Notify StaffContext untuk mulai tracking**

***`finishItem(department, orderId, itemId)`***
- Update item status ke "finished"
- Record finish timestamp
- Freeze elapsed time
- **Sync di semua views**
- **Trigger StaffContext untuk create cooking log**

***`completeOrder(department, orderId)`***
- Mark order sebagai completed
- Freeze order timer
- Set `completed: true` flag
- **Bikin "Assign" button muncul di Checker views**

***`assignWaiter(department, orderId, waiterName)`***
- Set assigned waiter untuk completed order
- Hanya available di Checker section
- Ubah button dari "Assign" ke "Delivered"
- **Sync di semua Checker views**

***`markDelivered(department, orderId)`***
- Mark order sebagai delivered ke customer
- Set `delivered: true` flag
- Final step dalam order lifecycle
- **Sync di semua Checker views**

**Timer System:**

**Global Timer Effect** (runs setiap 1 detik):

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Update elapsed time untuk semua "on-their-way" items
    // dalam kitchenOrders, barOrders, dan snackOrders
    updateElapsedTimes();
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

Central timer ini memastikan:
- Semua pages show sama elapsed time
- Tidak ada duplicate timers running
- Consistent time tracking di app

---

### `/contexts/StaffContext.tsx` - Analytics & Staff Management ✨ BARU

**Tujuan**: Manage analytics tracking, staff data, dan automatic cooking log creation.

**State:**

```typescript
const [cookingLogs, setCookingLogs] = useState<CookingLog[]>(initialCookingLogs);
const [useRealData, setUseRealData] = useState(false);
const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
const [trackedItems, setTrackedItems] = useState<Set<string>>(new Set());
```

**Context Functions:**

***`toggleDataSource()`***
Toggle antara mock data dan real data
```typescript
setUseRealData(prev => !prev);
```

***`exportLogsToCSV(logs: CookingLog[])`***
Export cooking logs ke CSV file
```typescript
const csv = [
  'Cook Name,Menu Name,Time (MM:SS),Efficiency',
  ...logs.map(log => 
    `${log.cook_name},${log.menu_name},${formatTime(log.duration_seconds)},${log.efficiency_classification}`
  )
].join('\n');

const blob = new Blob([csv], { type: 'text/csv' });
downloadFile(blob, `cooking_logs_${Date.now()}.csv`);
```

***`addStaff(staffData: Staff)`***
Tambah staff baru
```typescript
const newStaff = {
  id: generateId(),
  ...staffData,
  isActive: true
};
setStaffList(prev => [...prev, newStaff]);
```

***`updateStaff(staffId: string, staffData: Partial<Staff>)`***
Update existing staff
```typescript
setStaffList(prev => 
  prev.map(staff => 
    staff.id === staffId 
      ? { ...staff, ...staffData }
      : staff
  )
);
```

***`deleteStaff(staffId: string)`***
Soft delete staff
```typescript
updateStaff(staffId, { isActive: false });
```

***`updateSchedule(staffId: string, schedule: WeekSchedule)`***
Update weekly schedule
```typescript
updateStaff(staffId, { schedule });
```

**Automatic Cooking Log Creation:**

```typescript
useEffect(() => {
  // Monitor semua departments untuk finished items
  const allDepartments = getAllOrders();
  
  allDepartments.forEach(dept => {
    dept.orders.forEach(order => {
      order.items.forEach(item => {
        // Jika item baru finished dan belum tracked
        if (
          item.status === 'finished' && 
          item.startedTime && 
          item.finishedTime && 
          item.staff &&
          !trackedItems.has(item.id)
        ) {
          // Create cooking log
          const duration = (item.finishedTime - item.startedTime) / 1000;
          const config = getConfigForItem(item.name, dept.department);
          const expected = config.presets.find(p => p.name === 'standard')?.value || 300;
          const ratio = (duration / expected) * 100;
          
          const newLog: CookingLog = {
            id: generateId(),
            cook_name: item.staff,
            menu_name: item.name,
            department: dept.department,
            duration_seconds: Math.floor(duration),
            expected_time_seconds: expected,
            efficiency_ratio: ratio,
            efficiency_classification: classifyEfficiency(ratio),
            timestamp: new Date().toISOString()
          };
          
          setCookingLogs(prev => [...prev, newLog]);
          setTrackedItems(prev => new Set(prev).add(item.id));
        }
      });
    });
  });
}, [getAllOrders]);
```

**Efficiency Classification:**

```typescript
const classifyEfficiency = (ratio: number): string => {
  if (ratio <= 50) return 'Sangat Cepat';
  if (ratio <= 80) return 'Cepat';
  if (ratio <= 120) return 'Normal';
  if (ratio <= 200) return 'Lambat';
  return 'Sangat Lambat';
};
```

---

### `/data/staff.ts`

**Worker Class Hierarchy:**
```
Worker (abstract base class)
├── KitchenStaff
├── BarStaff
├── SnackStaff
└── Waitress
```

**Worker Properties:**
- `id`: Unique identifier
- `name`: Staff member's name
- `position`: Job title
- `available`: Current availability status
- `department`: Section mana mereka kerja

**Staff Arrays:**
- `KITCHEN_STAFF`: Array of KitchenStaff objects
- `BAR_STAFF`: Array of BarStaff objects
- `SNACK_STAFF`: Array of SnackStaff objects
- `WAITSTAFF`: Array of Waitress objects

**Helper Function:**
```typescript
getStaffByDepartment(department: Department)
```
Returns appropriate staff array untuk given department.

---

### `/data/orders.ts`, `/data/barOrders.ts`, `/data/snackOrders.ts`

**MenuItem Interface:**
```typescript
{
  id: string;              // contoh: "item-1", "item-2"
  name: string;            // Item name
  quantity: number;        // Number of portions
  notes: string;           // Special instructions
  status: 'not-started' | 'on-their-way' | 'finished';
  staff?: string;          // Assigned staff member (saat started)
  startedTime?: number;    // Timestamp saat started
  finishedTime?: number;   // Timestamp saat finished
  elapsedTime: number;     // Running time dalam seconds
}
```

**Order Interface:**
```typescript
{
  id: string;              // Unique order ID
  name: string;            // Customer/location name  
  orderId: string;         // Display ID (contoh: "POS-091125-38")
  priority: string;        // "PRIORITAS" atau "NORMAL"
  items: MenuItem[];       // Array of menu items
  frozenTime?: number;     // Frozen time saat completed
  completed?: boolean;     // Apakah order done (semua items finished)
  assignedWaiter?: string; // Waiter assigned (Checker-only)
  delivered?: boolean;     // Apakah delivered ke customer (Checker-only)
}
```

**Data Files:**
- `makananOrders.ts`: Initial kitchen orders (read once di startup)
- `barOrders.ts`: Initial bar/beverage orders (read once di startup)
- `snackOrders.ts`: Initial snack orders (read once di startup)

**Ini adalah templates saja!** Actual live data ada di OrderContext.

---

### `/data/cookingLogs.ts` ✨ BARU

**CookingLog Interface:**
```typescript
{
  id: string;
  cook_name: string;
  menu_name: string;
  department: 'kitchen' | 'bar' | 'snack';
  duration_seconds: number;
  expected_time_seconds: number;
  efficiency_ratio: number;
  efficiency_classification: 'Sangat Cepat' | 'Cepat' | 'Normal' | 'Lambat' | 'Sangat Lambat';
  timestamp: string; // ISO format
}
```

**Mock Data:**
- 35 pre-generated cooking logs
- Mix dari different cooks, menus, dan efficiency levels
- Digunakan untuk demo purposes
- Bisa di-toggle dengan real data

---

### `/data/menuItemEfficiency.ts` ✨ BARU

**Tujuan**: Manage menu timing presets dengan data-driven defaults dan localStorage persistence.

**Key Functions:**

***`getConfigForItem(name: string, department: string)`***
```typescript
// Check localStorage first
const stored = localStorage.getItem(`menu_config_${name}_${department}`);
if (stored) return JSON.parse(stored);

// Calculate dari cooking logs
return calculateDefaultPresets(name, department, cookingLogs);
```

***`updateConfigForItem(config: MenuItemConfig)`***
```typescript
localStorage.setItem(
  `menu_config_${config.name}_${config.department}`,
  JSON.stringify(config)
);
```

***`calculateDefaultPresets(name: string, department: string, logs: CookingLog[])`***
```typescript
// Filter logs untuk menu ini
const relevantLogs = logs.filter(
  log => log.menu_name === name && log.department === department
);

if (relevantLogs.length === 0) {
  // Return default fallback
  return defaultPresets;
}

// Calculate average cooking time
const avgTime = relevantLogs.reduce((sum, log) => 
  sum + log.duration_seconds, 0
) / relevantLogs.length;

// Generate presets based on average
return [
  { name: 'very-fast', value: Math.round(avgTime * 0.4), unit: 'sec' },
  { name: 'fast', value: Math.round(avgTime * 0.7), unit: 'sec' },
  { name: 'standard', value: Math.round(avgTime), unit: 'sec' },
  { name: 'slow', value: Math.round(avgTime * 1.5), unit: 'sec' },
  { name: 'extremely-slow', value: Math.round(avgTime * 2.5), unit: 'sec' }
];
```

***`deleteConfigForItem(name: string, department: string)`***
```typescript
localStorage.removeItem(`menu_config_${name}_${department}`);
```

**Preset Structure:**
```typescript
{
  name: 'standard',
  label: '👍 Standard',
  value: 300,
  unit: 'sec' // 'min' atau 'sec'
}
```

---

## 🔄 Workflow Summary

### Department Flow: Starting a Menu Item

```
1. User klik red "START" button pada not-started item
   ↓
2. openSelectCookPanel() dipanggil dengan item details
   ↓
3. SelectCookPanel slide in dari right
   ↓
4. User select available staff member
   ↓
5. handleSelectCook(cookName) dipanggil
   ↓
6. startItem(department, orderId, itemId, cookName) update OrderContext:
   - Status: "not-started" → "on-their-way"
   - Set staff name
   - Record start time
   - Initialize elapsed time counter
   ↓
7. Panel close
   ↓
8. Semua pages re-render otomatis:
   - Department page show item dalam "on-their-way" section
   - Checker views show updated status
   - CheckerHome statistics update
   ↓
9. Timer mulai counting up otomatis (OrderContext timer)
   ↓
10. StaffContext detect dan mulai tracking item
```

### Department Flow: Completing a Menu Item

```
1. User klik yellow "DONE" button pada on-their-way item
   ↓
2. handleDoneItem(orderId, itemId) dipanggil
   ↓
3. finishItem(department, orderId, itemId) update OrderContext:
   - Status: "on-their-way" → "finished"
   - Record finish time
   - Stop timer updates (elapsed time frozen)
   ↓
4. Semua pages re-render otomatis:
   - Item move ke "finished" section di top
   - Timer show final completion time
   - Checker views update instantly
   ↓
5. StaffContext detect finished item
   ↓
6. Calculate cooking time & efficiency:
   - duration = finishedTime - startedTime
   - Get expected time dari menu config
   - ratio = (duration / expected) * 100
   - Classify efficiency level
   ↓
7. Create cooking log otomatis
   ↓
8. Admin Dashboard analytics update real-time
```

### Department Flow: Finishing an Order

```
1. Semua items dalam order reach "finished" status
   ↓
2. "FINISHED" button jadi enabled (purple)
   ↓
3. User klik "FINISHED" button
   ↓
4. handleFinishOrder(orderId) dipanggil
   ↓
5. completeOrder(department, orderId) update OrderContext:
   - Set frozenTime ke current order time
   - Set completed ke true
   - Stop all item timers
   ↓
6. Semua pages re-render otomatis:
   - Button text berubah jadi green "FINISHED"
   - Order marked as complete
   - Checker views show "Assign" button
```

### Checker Flow: Assigning Waiter

```
1. Order muncul sebagai "Finished" di Checker view
   ↓
2. Green "Assign" button muncul otomatis
   ↓
3. User klik "Assign" button
   ↓
4. SelectWaiterPanel slide in dari right
   ↓
5. User select available waiter/waitress
   ↓
6. handleAssignWaiter(orderId, waiterName, department) dipanggil
   ↓
7. assignWaiter(department, orderId, waiterName) update OrderContext:
   - Set assignedWaiter ke waiter name
   ↓
8. Panel close
   ↓
9. Semua Checker views re-render otomatis:
   - Button berubah jadi blue "Delivered"
   - Show assigned waiter name
```

### Checker Flow: Marking Delivered

```
1. Setelah waiter assigned, blue "Delivered" button visible
   ↓
2. User klik "Delivered" button
   ↓
3. handleMarkDelivered(orderId, department) dipanggil
   ↓
4. markDelivered(department, orderId) update OrderContext:
   - Set delivered ke true
   ↓
5. Semua Checker views re-render otomatis:
   - Button text berubah jadi green "Delivered" (disabled state)
   - Order lifecycle complete
```

### Admin Flow: Customizing Menu Presets ✨ BARU

```
1. Navigate ke Admin → Menu Management
   ↓
2. Discover menu items dari cooking logs (dynamic!)
   ↓
3. Select menu item dari sidebar
   ↓
4. System get config:
   - Check localStorage first
   - Jika tidak ada, calculate dari actual cooking data
   ↓
5. Display preset cards dengan current values
   ↓
6. User edit preset times:
   - Click value untuk edit
   - Switch unit (min ⟺ sec) dengan auto-conversion
   - Values validate real-time (must be ascending)
   ↓
7. User klik Save
   ↓
8. Validate all presets
   ↓
9. Save ke localStorage
   ↓
10. Presets tersimpan untuk efficiency calculations
```

---

## 🛠️ Technical Details

### Time Tracking

**Timestamps**: Disimpan sebagai milliseconds sejak epoch (`Date.now()`)

**Elapsed Time Calculation:**
```typescript
elapsedTime = Math.floor((Date.now() - startedTime) / 1000)
```
- Result dalam seconds
- `Math.floor` hapus decimal places
- Calculated di OrderContext's timer effect

**Time Formatting:**
```typescript
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
```
- Convert seconds ke MM:SS format
- `padStart(2, '0')` tambah leading zeros

---

### React Patterns Used

**Context Pattern**: Centralized state management

```typescript
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }) => {
  // State dan functions di sini
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
```

**State Updates**: Selalu gunakan functional updates saat new state depend on previous state

```typescript
setOrders(prevOrders => /* new state based on prevOrders */)
```

**Effect Cleanup**: Selalu return cleanup function untuk intervals/timers

```typescript
useEffect(() => {
  const interval = setInterval(/* ... */);
  return () => clearInterval(interval); // Cleanup
}, []);
```

**Conditional Rendering**: Show/hide elements based on state

```typescript
{isOpen && <div>Panel content</div>}
{order.completed && !order.assignedWaiter && <button>Assign</button>}
{order.assignedWaiter && !order.delivered && <button>Delivered</button>}
```

**Array Methods**: Gunakan `.map()`, `.filter()`, `.find()` untuk immutable updates

```typescript
items.map(item => item.id === targetId ? updatedItem : item)
```

---

### Asset Management

**Import Structure**: Semua assets ada di directory `/imports` (35 active files)

**Component Assets:**
- BackButton.tsx - Back navigation (z-50 untuk proper layering)
- Department icons (CookChefIcon, BarDepartmentIcon, CheckerDepartmentIcon)
- Profile icons (IconsProfileBar, IconsProfileChecker)
- Receipt icons (IconsReceiptBar, IconsReceiptMakanan, IconsReceiptSnack)
- Snack icons (HomeSnackIcon, SnackIconCircle, SnackIconSmall)
- Admin icons (AdminSidebarIconHome, AdminSidebarIconStaff, AdminSidebarIconDatabase)
- UI components (Frame9, SparkleIcon, SparkleDecoration, dll)

**SVG Files**: 9 renamed SVG files yang referenced oleh components

Lihat `/guidelines/ASSET_IMPORT_SUMMARY.md` untuk complete asset documentation.

---

## 🎨 Styling Notes

### Color Palette

**Main Colors:**
- Primary purple: `#4D236E`
- Card background: `#8b6dac`
- Dark header: `#3c044d`
- Button purple: `#61428C`
- Light gray: `#f7f7f9`
- Red (start): `#880608`
- Yellow (done): `#edbb0d`
- Green (finished): `#4caf50`

**Efficiency Colors:** ✨ BARU
- Sangat Cepat: `#4ade80` (bright green)
- Cepat: `#86efac` (light green)
- Normal: `#60a5fa` (blue/cyan)
- Lambat: `#fb923c` (orange)
- Sangat Lambat: `#f87171` (red/pink)

### Typography

- Primary font: Poppins
- Secondary font: Inter (untuk clock)
- Font sizes: Custom sizes defined di globals.css, tidak ada Tailwind font classes

### Layout

- Target device: Landscape tablet (1024px × 768px)
- Receipt card width: 391px
- Receipt card height: 633px
- Horizontal scroll: Semua orders dalam row
- Vertical scroll: Items dalam setiap card

---

## ❗ Common Issues & Solutions

### Timer Tidak Update

**Issue**: Elapsed time tidak increase  
**Solution**: Check bahwa OrderContext's timer effect running dan startedTime di-set

### Wrong Staff Displayed

**Issue**: Kitchen panel show bar staff  
**Solution**: Pastikan correct `department` prop passed ke SelectCookPanel

### Order Sorting Tidak Working

**Issue**: PRIORITAS orders tidak muncul first  
**Solution**: Check sort function dalam `.sort()` call

### PIN Tidak Reset

**Issue**: PIN tetap filled setelah error  
**Solution**: Pastikan `setPin(['', '', '', ''])` dipanggil dalam timeout

### Data Tidak Sync Across Pages

**Issue**: Update di Kitchen tidak show di Checker  
**Solution**: Pastikan OrderProvider wrap semua routes di App.tsx dan semua pages gunakan `useOrders()` hook

### Assign Button Tidak Muncul

**Issue**: Finished order tidak show Assign button di Checker  
**Solution**: Check bahwa `completed: true` di-set di OrderContext saat order finished

### Cooking Logs Tidak Terbuat ✨ BARU

**Issue**: Item finished tapi tidak ada cooking log  
**Solution**: 
- Check item punya startedTime DAN finishedTime
- Check item.staff ter-assign
- Check StaffContext useEffect monitoring
- Check trackedItems Set untuk duplicate prevention

### Menu Presets Tidak Save ✨ BARU

**Issue**: Customized presets hilang setelah refresh  
**Solution**:
- Check localStorage enabled di browser
- Verify validation tidak prevent save
- Check preset order (must be ascending)
- Clear localStorage dan test lagi

---

## 📚 Related Documentation

Dokumentasi ini cover main functionality dari Kitchen Order Management System dengan dual-workflow design (Department preparation + Checker delivery + Admin analytics).

**Untuk lebih detail, lihat:**
- **Initial data setup**: DATA_SYSTEM_GUIDE.md
- **Quick navigation**: QUICK_REFERENCE.md
- **Asset documentation**: ASSET_IMPORT_SUMMARY.md
- **Analytics integration**: PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md
- **Database structure**: FORMAT_DATABASE_SQL.md
- **Overview**: README_INDONESIA.md

---

**Last Updated:** Current Session - Bahasa Indonesia Complete  
**Version:** 2.0 dengan Full Analytics & Admin Features  
**Status:** ✅ Production Ready dengan Complete Documentation! 🎉
