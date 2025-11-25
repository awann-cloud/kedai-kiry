# 📚 Dokumentasi Sistem Kitchen Order Management

## 🌟 Selamat Datang!

Dokumentasi lengkap untuk Kitchen Order Management System dengan integrasi analytics efisiensi memasak.

---

## 📂 Struktur Folder Dokumentasi

```
/guidelines/
├── README_INDONESIA.md                          ⭐ MULAI DI SINI
├── PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md    📊 Panduan Analytics
├── FORMAT_DATABASE_SQL.md                       🗄️ Struktur Database
├── Guidelines.md                                📖 Panduan Umum
├── CODE_DOCUMENTATION.md                        💻 Dokumentasi Kode
├── DATA_SYSTEM_GUIDE.md                         📦 Sistem Data
├── QUICK_REFERENCE.md                           ⚡ Referensi Cepat
└── ASSET_IMPORT_SUMMARY.md                      🎨 Import Asset

/chart implementation hell fro kakak backend/
├── README_ANALYTICS_INTEGRATION.md              📊 Analytics (English)
├── IMPLEMENTATION_GUIDE_COOKING_ANALYTICS.md    🔨 Implementation
├── ORDERCONTEXT_INTEGRATION_SUMMARY.md          🔗 Integration
├── CHANGES_FOR_ORDERCONTEXT_INTEGRATION.md      📝 Changes
└── INTEGRATION_FLOW_DIAGRAM.md                  📈 Flow Diagram
```

---

## 🎯 Mulai Cepat

### Untuk Pengguna Baru:

***LANGKAH 1: Baca Panduan Utama***
1. Buka `PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md` ⭐
2. Pahami sistem analytics dan integrasinya
3. Lihat contoh SQL database format

***LANGKAH 2: Review Struktur Database***
1. Buka `FORMAT_DATABASE_SQL.md`
2. Pelajari semua tabel dan relasi
3. Review contoh queries

***LANGKAH 3: Explore Sistem***
1. Buka aplikasi di `/admin`
2. Test fitur analytics
3. Coba menu management di `/admin/menu`

### Untuk Developer:

***LANGKAH 1: Setup Environment***
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

***LANGKAH 2: Pahami Arsitektur***
1. Baca `CODE_DOCUMENTATION.md`
2. Review `DATA_SYSTEM_GUIDE.md`
3. Pelajari context structure

***LANGKAH 3: Review Implementation***
1. Check `/contexts/OrderContext.tsx`
2. Check `/contexts/StaffContext.tsx`
3. Check `/data/menuItemEfficiency.ts`

---

## 📊 Sistem Analytics

### Overview:

***Apa itu Sistem Analytics?***
Sistem yang secara otomatis melacak dan menganalisis performa karyawan saat memasak, memberikan insight tentang efisiensi dan kecepatan.

### Fitur Utama:

***1. Automatic Tracking***
- ✅ Deteksi otomatis saat item selesai dimasak
- ✅ Hitung waktu memasak secara otomatis
- ✅ Tidak perlu input manual

***2. Efficiency Classification***
- 🟢 Sangat Cepat (≤50% waktu standar)
- 🟢 Cepat (50-80% waktu standar)
- 🔵 Normal (80-120% waktu standar)
- 🟠 Lambat (120-200% waktu standar)
- 🔴 Sangat Lambat (≥200% waktu standar)

***3. Visualisasi Data***
- 📊 Horizontal stacked bar chart
- 📈 Summary statistics
- 📋 Detailed data table
- 💾 CSV export

***4. Filtering & Search***
- 👨‍🍳 Filter by karyawan
- 🍽️ Filter by menu item
- ⚡ Filter by efficiency level
- 📅 Filter by date range

---

## 🗄️ Database Structure

### Tabel Utama:

***1. menu_items***
```sql
-- Data menu dengan waktu memasak
ID_Menu         VARCHAR(10)     PRIMARY KEY
Nama_Menu       VARCHAR(100)    Nama menu
Kategori        VARCHAR(50)     Minuman/Makanan/Snack
Harga           DECIMAL(10,2)   Harga dalam Rupiah
Waktu_Cepat     INT            Waktu cepat (detik)
Waktu_Normal    INT            Waktu normal (detik)
Waktu_Lama      INT            Waktu lama (detik)
```

***2. cooking_logs***
```sql
-- Log histori memasak
log_id              BIGINT          AUTO_INCREMENT
ID_Menu             VARCHAR(10)     FK → menu_items
staff_id            INT             FK → staff
order_id            VARCHAR(50)     Order identifier
department          VARCHAR(20)     kitchen/bar/snack
start_time          TIMESTAMP       Waktu mulai
finish_time         TIMESTAMP       Waktu selesai
duration_seconds    INT             Durasi (GENERATED)
efficiency_category VARCHAR(20)     Kategori efisiensi
efficiency_ratio    DECIMAL(5,2)    Ratio efisiensi
```

***3. staff***
```sql
-- Data karyawan
staff_id        INT             AUTO_INCREMENT
nama_lengkap    VARCHAR(100)    Nama karyawan
department      VARCHAR(20)     Departemen
pin_code        VARCHAR(4)      PIN untuk login
status          VARCHAR(20)     active/inactive
```

***4. orders***
```sql
-- Header pesanan
order_id                VARCHAR(50)     PRIMARY KEY
table_number            INT             Nomor meja
department              VARCHAR(20)     Departemen
status                  VARCHAR(20)     Status order
assigned_waiter_id      INT             FK → staff (waiter)
```

***5. order_items***
```sql
-- Detail item dalam order
item_id             BIGINT          AUTO_INCREMENT
order_id            VARCHAR(50)     FK → orders
ID_Menu             VARCHAR(10)     FK → menu_items
assigned_cook_id    INT             FK → staff (cook)
quantity            INT             Jumlah
item_status         VARCHAR(20)     not_started/in_progress/finished
started_time        TIMESTAMP       Waktu mulai masak
finished_time       TIMESTAMP       Waktu selesai masak
```

***6. schedules***
```sql
-- Jadwal shift karyawan
schedule_id     BIGINT          AUTO_INCREMENT
staff_id        INT             FK → staff
work_date       DATE            Tanggal kerja
shift_start     TIME            Jam mulai shift
shift_end       TIME            Jam selesai shift
is_working      BOOLEAN         TRUE/FALSE
```

### Relasi Antar Tabel:

```
menu_items (1) ──────< (N) order_items
    │                       │
    │                       │
    └──< (N) cooking_logs   │
             │              │
             │         (N) >──────< (1) orders
             │                          │
    staff (1)├──> (N) cooking_logs     │
             │                          │
             ├──> (N) order_items       │
             │        (assigned_cook)   │
             │                          │
             ├──> (N) orders            │
             │    (assigned_waiter)     │
             │                          │
             └──> (N) schedules
```

---

## 🔄 Data Flow

### Alur Lengkap Order → Analytics:

```
┌─────────────────────────────────────────────────────┐
│ 1. KITCHEN/BAR/SNACK PAGE                          │
│    - User klik START pada order item               │
│    - Assign karyawan                                │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 2. ORDER CONTEXT                                    │
│    - Catat startedTime                              │
│    - Update item status → "in_progress"             │
│    - Store staff name                               │
└────────────────┬────────────────────────────────────┘
                 │
                 │ (Karyawan memasak...)
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 3. KITCHEN/BAR/SNACK PAGE                          │
│    - User klik DONE                                 │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 4. ORDER CONTEXT                                    │
│    - Catat finishedTime                             │
│    - Update item status → "finished"                │
│    - Calculate duration                             │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 5. STAFF CONTEXT (useEffect monitoring)            │
│    - Detect item yang baru finished                 │
│    - Ambil data: menu, cook, times, department      │
│    - Prevent duplicate dengan Set tracking          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 6. CREATE COOKING LOG                              │
│    - Calculate duration_seconds                     │
│    - Get expected time dari menu config             │
│    - Calculate efficiency_ratio                     │
│    - Determine efficiency_category                  │
│    - Add to cookingLogs array                       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 7. ANALYTICS UPDATE                                 │
│    - Real-time state update                         │
│    - Trigger re-render pada admin dashboard         │
│    - Update charts dan tables                       │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 8. [BACKEND] PERSIST TO DATABASE                   │
│    - INSERT INTO cooking_logs                       │
│    - Trigger auto-calculate efficiency              │
│    - Update analytics views                         │
└─────────────────────────────────────────────────────┘
```

### Context Nesting:

```tsx
<OrderProvider>           // Layer 1: Order management
  <StaffProvider>         // Layer 2: Analytics (reads from OrderProvider)
    <Router>              // Layer 3: Navigation
      <Routes>            // Layer 4: Pages
        <Kitchen />
        <Bar />
        <Snack />
        <AdminHome />     // Menggunakan CookingAnalytics
      </Routes>
    </Router>
  </StaffProvider>
</OrderProvider>
```

---

## 💻 File Structure

### Frontend Structure:

```
/
├── App.tsx                          // Main app dengan providers
├── contexts/
│   ├── OrderContext.tsx             // Order state management
│   └── StaffContext.tsx             // Analytics & staff management
│
├── components/
│   ├── CookingAnalytics.tsx         // Main analytics component
│   ├── AnalyticsFilters.tsx         // Filter UI
│   ├── EfficiencyChart.tsx          // Recharts visualization
│   ├── AdminRetractableSidebar.tsx  // Admin sidebar
│   └── ...
│
├── data/
│   ├── menuItemEfficiency.ts        // Efficiency classification
│   ├── cookingLogs.ts               // Mock cooking logs data
│   ├── staff.ts                     // Staff database
│   ├── makananOrders.ts             // Kitchen orders
│   ├── barOrders.ts                 // Bar orders
│   └── snackOrders.ts               // Snack orders
│
├── AdminHome.tsx                    // Admin dashboard
├── AdminMenuManagement.tsx          // Menu management page
├── AdminStaffManagement.tsx         // Staff management page
├── AdminRawDatabase.tsx             // Raw data viewer
│
├── OrdersKitchen.tsx                // Kitchen order page
├── OrdersBar.tsx                    // Bar order page
├── OrdersSnack.tsx                  // Snack order page
│
└── guidelines/                      // Documentation
    ├── README_INDONESIA.md          // You are here!
    └── ...
```

---

## 🎨 UI Components

### Admin Dashboard (`/admin`):

***Header Section***
```typescript
- Judul: "📊 Employees Cooking Efficiency"
- Toggle: Mock Data ⟺ Real Data Only
- Export: Download CSV
```

***Filter Bar***
```typescript
- Dropdown: Pilih karyawan
- Dropdown: Pilih menu item  
- Dropdown: Pilih efficiency level
- DatePicker: Range tanggal
```

***Results Summary***
```typescript
- Badge: Jumlah records
- Badge: Source (Mock/Real data)
```

***Visualization***
```typescript
- Recharts: Horizontal stacked bar
- Colors: Per efficiency category
- Summary cards: Statistics
```

***Data Table***
```typescript
- Columns: Cook, Menu, Time, Efficiency
- Badges: Color-coded categories
- Pagination: First 10 shown
```

### Menu Management Page (`/admin` - Menu Management):

***Sidebar List***
```typescript
- Search bar
- Category filter: All/Kitchen/Bar/Snack
- Item cards: Custom badge jika ter-customize
```

***Main Panel***
```typescript
- Preset cards: 5 presets per item
  - Very Fast ⚡
  - Fast 🚀
  - Standard 👍
  - Slow 🐢
  - Extremely Slow 🐌
  
- Input fields:
  - Number input: Value
  - Dropdown: Unit (sec/min)
  - Auto-convert: Saat ganti unit

- Buttons:
  - Reset to Default
  - Save Changes (red jika error)
```

---

## 🧪 Testing Guide

### Scenario 1: Basic Order Flow

```typescript
// LANGKAH 1: Buka Kitchen Page
navigate('/kitchen')

// LANGKAH 2: Start Order
- Klik START pada item pertama
- Select karyawan "Juwita Mayasari"
- Verify: Item status → "ON THEIR WAY"
- Verify: Timer mulai

// LANGKAH 3: Finish Order
- Tunggu beberapa detik
- Klik DONE
- Verify: Item status → "FINISHED"
- Verify: Staff badge muncul

// LANGKAH 4: Check Analytics
navigate('/admin')
- Toggle ke "Real Data Only"
- Verify: 1 record untuk Juwita
- Verify: Menu name correct
- Verify: Duration calculated
- Verify: Efficiency category assigned
```

### Scenario 2: Multi-Department

```typescript
// Complete orders di semua departments
- Kitchen: 2 items
- Bar: 2 items  
- Snack: 2 items

// Check Admin Dashboard
navigate('/admin')
- Verify: 6 total records
- Filter by department
- Verify: Counts match

// Check by Staff
- Filter: Select specific karyawan
- Verify: Only their records shown
- Export CSV
- Verify: File downloaded correctly
```

### Scenario 3: Menu Management

```typescript
// LANGKAH 1: Open Menu Management
navigate to Menu Management

// LANGKAH 2: Select Item
- Select "Nasi Goreng"
- Verify: Current presets displayed
- Verify: Data source shown if exists

// LANGKAH 3: Edit Preset
- Change "Very Fast" from 5 min → 3 min
- Verify: No validation error
- Verify: Save button enabled

// LANGKAH 4: Invalid Edit
- Change "Standard" to less than "Fast"
- Verify: Field turns red
- Verify: Save button turns red
- Verify: Error message shown
- Don't save invalid changes

// LANGKAH 5: Unit Conversion
- Set value to 2 with unit "min"
- Change unit to "sec"
- Verify: Value auto-converts to 120
- Change back to "min"
- Verify: Value returns to 2
```

---

## 🚀 Deployment Guide

### Environment Setup:

***Development***
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Access at
http://localhost:5173
```

***Production Build***
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Output directory
/dist
```

### Database Setup:

***1. Create Database***
```sql
CREATE DATABASE kitchen_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

***2. Run Migration Script***
```bash
# Execute all table creations
mysql -u root -p kitchen_db < migration.sql
```

***3. Insert Sample Data***
```sql
-- Use scripts from FORMAT_DATABASE_SQL.md
-- Section: "Contoh Data"
```

***4. Create Views & Triggers***
```sql
-- Follow scripts in FORMAT_DATABASE_SQL.md
-- Section: "Views untuk Analytics"
-- Section: "Trigger & Stored Procedures"
```

***5. Setup Permissions***
```sql
-- Create users with appropriate permissions
-- See FORMAT_DATABASE_SQL.md
-- Section: "Security & Permissions"
```

---

## 🔧 Configuration

### Efficiency Thresholds:

***Customize di `/data/menuItemEfficiency.ts`:***

```typescript
export const EFFICIENCY_THRESHOLDS = {
  sangatCepat: {
    max: 0.5,           // Adjust: ≤50% = Very Fast
  },
  cepat: {
    min: 0.5,
    max: 0.8,           // Adjust: 50-80% = Fast
  },
  normal: {
    min: 0.8,
    max: 1.2,           // Adjust: 80-120% = Normal
  },
  lambat: {
    min: 1.2,
    max: 2.0,           // Adjust: 120-200% = Slow
  },
  sangatLambat: {
    min: 2.0,           // Adjust: ≥200% = Very Slow
  }
};
```

### Default Department Times:

```typescript
export function getDefaultStandardTime(department) {
  switch (department) {
    case 'kitchen':
      return 15;  // Adjust: minutes for kitchen
    case 'bar':
      return 3;   // Adjust: minutes for bar
    case 'snack':
      return 8;   // Adjust: minutes for snack
  }
}
```

### Colors:

```typescript
export const EFFICIENCY_LEVELS = [
  { level: 'Sangat Cepat', color: '#4ade80' },  // Change colors here
  { level: 'Cepat', color: '#86efac' },
  { level: 'Normal', color: '#60a5fa' },
  { level: 'Lambat', color: '#fb923c' },
  { level: 'Sangat Lambat', color: '#f87171' }
];
```

---

## 📝 Best Practices

### DO ✅:

***Development***
- ✅ Gunakan TypeScript untuk type safety
- ✅ Follow existing code patterns
- ✅ Write clear comments dalam Bahasa Indonesia
- ✅ Test perubahan sebelum commit
- ✅ Update dokumentasi saat ada perubahan

***Database***
- ✅ Gunakan transactions untuk multi-table operations
- ✅ Index foreign keys
- ✅ Validate data di application layer
- ✅ Regular backups
- ✅ Monitor query performance

***Analytics***
- ✅ Read from OrderContext (read-only)
- ✅ Prevent duplicate logs dengan Set tracking
- ✅ Handle edge cases (no data, zero times)
- ✅ Provide meaningful error messages

### DON'T ❌:

***Development***
- ❌ Modify OrderContext untuk analytics
- ❌ Break the one-way data flow
- ❌ Hardcode values yang should be configurable
- ❌ Ignore TypeScript errors
- ❌ Skip testing after changes

***Database***
- ❌ Store passwords in plain text
- ❌ Delete data tanpa backup
- ❌ Ignore foreign key constraints
- ❌ Use SELECT * in production
- ❌ Hardcode database credentials

***Analytics***
- ❌ Remove duplicate prevention
- ❌ Modify order management logic
- ❌ Assume data always exists
- ❌ Skip validation

---

## 🐛 Troubleshooting

### Issue: Analytics tidak update

***Solusi:***
```typescript
1. Check console untuk errors
2. Verify OrderContext working properly
3. Check StaffContext mounting correctly
4. Verify useEffect dependencies correct
5. Clear localStorage dan restart
```

### Issue: Cooking log duplicates

***Solusi:***
```typescript
1. Check trackedItems Set di StaffContext
2. Verify item.id is unique
3. Clear state dan test lagi
4. Check useEffect tidak trigger twice
```

### Issue: Database connection failed

***Solusi:***
```sql
1. Verify database credentials
2. Check if MySQL server running
3. Verify user permissions
4. Check firewall settings
5. Test connection dengan CLI
```

### Issue: Wrong efficiency classification

***Solusi:***
```typescript
1. Check EFFICIENCY_THRESHOLDS values
2. Verify calculation logic
3. Check average time calculation
4. Verify time unit conversions
5. Test with known values
```

### Issue: Menu preset validation error

***Solusi:***
```typescript
1. Check preset order: must be ascending
2. Verify unit conversions working
3. Check validation logic
4. Clear localStorage
5. Reset to defaults
```

---

## 📞 Support & Contact

### Documentation:
- 📖 Read all files di `/guidelines`
- 🔍 Check specific topics in respective files
- 💡 Review code comments

### Issues:
1. Check troubleshooting section
2. Review relevant documentation
3. Check console errors
4. Test in clean environment
5. Report dengan detail lengkap

### Enhancement Requests:
1. Document use case dengan jelas
2. Explain expected behavior
3. Provide examples
4. Consider impact on existing features

---

## 🎓 Learning Resources

### Untuk Pemula:

***Frontend Basics***
- React fundamentals
- TypeScript basics
- Context API patterns
- Component composition

***Database Basics***
- SQL query fundamentals
- Table relationships
- Indexing strategies
- Transaction management

### Untuk Advanced:

***System Architecture***
- State management patterns
- Data flow optimization
- Performance tuning
- Scalability considerations

***Analytics Implementation***
- Real-time data processing
- Efficiency algorithms
- Visualization best practices
- Export mechanisms

---

## 📊 Quick Reference Tables

### Efficiency Levels:

| Level | Ratio | Color | Indonesian |
|-------|-------|-------|------------|
| Very Fast | ≤50% | 🟢 #4ade80 | Sangat Cepat |
| Fast | 50-80% | 🟢 #86efac | Cepat |
| Normal | 80-120% | 🔵 #60a5fa | Normal |
| Slow | 120-200% | 🟠 #fb923c | Lambat |
| Very Slow | ≥200% | 🔴 #f87171 | Sangat Lambat |

### Status Values:

| Order Status | Item Status | Meaning |
|--------------|-------------|---------|
| not_started | not_started | Belum mulai |
| in_progress | in_progress | Sedang dikerjakan |
| finished | finished | Selesai |
| delivered | - | Sudah diantar |

### Department Mapping:

| Database | Frontend | Indonesian |
|----------|----------|------------|
| Makanan | kitchen | Makanan |
| Minuman | bar | Minuman |
| Snack | snack | Snack |

---

## 🎉 Kesimpulan

Sistem Kitchen Order Management dengan Analytics adalah solusi lengkap untuk:

✅ **Manajemen Order** - Track orders dari mulai sampai selesai  
✅ **Analisis Efisiensi** - Automatic performance tracking  
✅ **Manajemen Staff** - Scheduling dan performance review  
✅ **Manajemen Menu** - Customizable timing presets  
✅ **Reporting** - Export dan visualisasi data

**Dokumentasi ini akan terus diupdate seiring perkembangan sistem.**

---

## 📌 Version Info

```
Dokumentasi Version: 2.0
Last Updated: November 2024
Language: Bahasa Indonesia
System Version: 1.0.0
```

---

**Selamat menggunakan sistem! Semoga dokumentasi ini membantu! 🚀**

Untuk pertanyaan lebih lanjut, silakan review file dokumentasi lainnya di folder `/guidelines`.
