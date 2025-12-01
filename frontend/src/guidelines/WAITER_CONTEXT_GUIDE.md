# Panduan WaiterContext

**Terakhir Diupdate:** 29 November 2025  
**Versi:** 3.0 (Staff Management Integration)

## ⭐ FITUR BARU (Post Figma v732)

File ini mendokumentasikan **WaiterContext** - sistem pengelolaan penugasan pelayan dan pelacakan pengiriman yang ditambahkan setelah Figma version 732, termasuk integrasi dengan AdminStaffManagement di versi 3.0.

---

## 📋 Daftar Isi

1. [Gambaran Umum](#gambaran-umum)
2. [Arsitektur](#arsitektur)
3. [Fitur Utama](#fitur-utama)
4. [Staff Management Integration](#staff-management-integration)
5. [Integrasi dengan Context Lain](#integrasi-dengan-context-lain)
6. [Cara Penggunaan](#cara-penggunaan)
7. [Alur Kerja](#alur-kerja)
8. [File Terkait](#file-terkait)

---

## Gambaran Umum

### Apa itu WaiterContext?

WaiterContext adalah context React yang mengelola semua fungsi terkait pelayan yang ditambahkan setelah Figma version 732. Context ini memisahkan logika penugasan pelayan dan pelacakan pengiriman dari OrderContext untuk menjaga pemisahan concerns yang bersih.

### Mengapa Dipisahkan?

**Alasan pemisahan:**
- **Separation of Concerns:** OrderContext fokus pada manajemen pesanan inti, WaiterContext fokus pada penugasan pelayan
- **Maintainability:** Lebih mudah untuk memahami, debug, dan maintain kode yang terorganisir dengan baik
- **Scalability:** Memudahkan penambahan fitur pelayan baru tanpa mengubah OrderContext
- **Clarity:** Developer baru dapat langsung melihat fitur mana yang ditambahkan post-v732

---

## Arsitektur

### Hierarki Provider

```
App.tsx
└── OrderProvider (manajemen pesanan inti)
    └── StaffProvider (data staff & analytics)
        └── WaiterProvider (⭐ penugasan pelayan & delivery tracking)
            └── Application Components
```

### Dependency Flow

```
WaiterContext
    ↓ (menggunakan)
OrderContext
    ↓ (mengakses)
Order State (kitchen/bar/snack orders)
```

WaiterContext **tidak** mengelola state sendiri. Ia menggunakan functions dari OrderContext untuk memodifikasi order state yang sudah ada.

---

## Fitur Utama

### 1. Per-Item Waiter Assignment

**Fungsi:** `assignWaiterToItem()`

Menugaskan pelayan ke **item menu individual** daripada seluruh receipt.

**Kegunaan:**
- Item yang sudah selesai dapat langsung ditugaskan ke pelayan
- Tidak perlu menunggu seluruh receipt selesai
- Setiap item memiliki pelayan sendiri

**Yang Diupdate:**
- `waiter` - nama pelayan yang ditugaskan ke item
- `deliveryStartTime` - timestamp saat waiter ditugaskan (milliseconds since epoch)
- `itemDelivered` - boolean status apakah item sudah di-deliver
- `deliveryFinishedTime` - timestamp saat item di-deliver (milliseconds since epoch)
- `deliveryElapsedTime` - durasi delivery dalam detik (auto-update tiap detik)

### 2. Bulk Waiter Assignment

**Fungsi:** `assignWaiterToOrder()` (Legacy)

Menugaskan pelayan ke **semua item dalam order** sekaligus.

**Kegunaan:**
- Button \"ASSIGN ALL\" di Checker interface
- Semua item finished mendapat pelayan yang sama
- Assignment dimulai untuk semua item bersamaan

**Note:** Sistem sekarang fokus pada per-item assignment, tapi bulk assignment masih didukung untuk kompatibilitas.

### 3. Delivery Completion

**Fungsi:** `markItemDelivered()`

Menandai item sebagai sudah dikirim.

**Kegunaan:**
- Button \"DELIVERED\" di Checker interface
- Menyelesaikan workflow delivery per-item
- Merekam waktu akhir delivery

**Yang Diupdate:**
- `deliveredTime` - timestamp sekarang
- Item status di-track sebagai delivered

---

## Staff Management Integration

### ✨ Versi 3.0 Update

**SelectWaiterPanel** sekarang terintegrasi dengan **AdminStaffManagement** melalui localStorage.

#### Cara Kerja

```typescript
// SelectWaiterPanel.tsx - Loads dari localStorage
export default function SelectWaiterPanel({ ... }) {
  const [waitstaff, setWaitstaff] = useState<Worker[]>([]);
  
  useEffect(() => {
    // Load staff from AdminStaffManagement localStorage
    const savedStaffList = localStorage.getItem('staffManagementList');
    if (savedStaffList) {
      try {
        const staffList = JSON.parse(savedStaffList);
        
        // Filter by Checker department dan hanya yang aktif
        const filteredStaff = staffList
          .filter((s: any) => s.department === 'Checker' && s.isActive)
          .map((s: any) => ({
            id: s.id,              // w1, w2, w3, etc.
            name: s.name,
            position: s.position || 'Waiter',
            department: 'waitress', // Internal format
            available: s.isActive
          }));
        
        setWaitstaff(filteredStaff);
      } catch (e) {
        console.error('Failed to parse staff list:', e);
      }
    }
  }, [isOpen]); // Reload when panel opens
  
  // ... rest of component
}
```

#### Key Points

- ✅ **Tidak lagi hardcoded** - Load dari localStorage `staffManagementList`
- ✅ **Filter by department** - Hanya `department === 'Checker'`
- ✅ **Active staff only** - Hanya `isActive: true`
- ✅ **Auto-increment ID** - Uses waiter ID format: **w1, w2, w3, w4**, etc.
- ✅ **Auto-refresh** - Reloads saat panel dibuka
- ✅ **Real-time sync** - Perubahan di Admin langsung terlihat

#### Data Flow

```
1. Admin Staff Management
   ├─ Add new waiter
   ├─ Department: 'Checker'
   ├─ Auto-generate ID: w1, w2, w3, ...
   ├─ Set isActive: true
   ├─ Set shift: 'Pagi'/'Siang'/'Malam'
   └─ Save to localStorage: 'staffManagementList'

2. SelectWaiterPanel (Checker Pages)
   ├─ Load from localStorage: 'staffManagementList'
   ├─ Filter: department === 'Checker' && isActive === true
   ├─ Convert format: 'Checker' → 'waitress' (internal)
   ├─ Display in panel dengan ID (w1, w2, w3)
   └─ Show availability status

3. Waiter Selection (User Action)
   ├─ Checker selects waiter from panel
   ├─ Call: assignWaiterToItem(dept, orderId, itemId, waiterName)
   ├─ Save to item.waiter: waiterName
   ├─ Save to item.deliveryStartTime: Date.now()
   └─ Update localStorage orders

4. Mark Delivered
   ├─ Checker clicks "Delivered" button
   ├─ Call: markItemDelivered(dept, orderId, itemId)
   ├─ Set item.deliveredTime: Date.now()
   └─ Track as delivered
```

#### Department Mapping

| Admin Format | Internal Format | Used In |
|--------------|-----------------|---------|
| `Checker` | `waitress` | SelectWaiterPanel, OrderContext |
| `Kitchen` | `kitchen` | SelectCookPanel |
| `Bar` | `bar` | SelectCookPanel |
| `Snack` | `snack` | SelectCookPanel |

```typescript
// Mapping function
const departmentMap: { [key: string]: string } = {
  'Kitchen': 'kitchen',
  'Bar': 'bar',
  'Snack': 'snack',
  'Checker': 'waitress'
};
```

#### Waiter ID Format

Auto-generated dengan prefix `w`:

| Staff Count | Next ID |
|------------|---------|
| 0 existing | w1 |
| w1 existing | w2 |
| w1, w2, w3 existing | w4 |
| w1, w2, w4 existing (w3 deleted) | w5 |

**Logic:**
```typescript
// Find max ID and increment
const existingIds = staffList
  .filter(s => s.department === 'Checker')
  .map(s => parseInt(s.id.replace('w', '')))
  .filter(num => !isNaN(num));

const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
const nextId = `w${maxId + 1}`;
```

---

## Integrasi dengan Context Lain

### OrderContext

**Relasi:** WaiterContext menggunakan OrderContext

**Fungsi yang Digunakan:**
- `assignWaiterToItem()` - delegate to OrderContext
- `assignWaiter()` - delegate to OrderContext (legacy)
- `markItemDelivered()` - delegate to OrderContext
- `markDelivered()` - delegate to OrderContext (legacy)

**Data yang Dimodifikasi:**
- MenuItem fields: `waiter`, `itemDelivered`, `deliveryStartTime`, `deliveryFinishedTime`, `deliveryElapsedTime`
- Order fields: `assignedWaiter`, `deliveredTime` (legacy, masih ada untuk backward compatibility)

### StaffContext

**Relasi:** StaffContext memantau perubahan dari WaiterContext

**Automatic Integration:**
- StaffContext memiliki monitoring effect yang mendeteksi item delivered
- Saat item ditandai delivered, StaffContext otomatis:
  - Membuat record untuk waiter analytics
  - Update cooking log dengan delivery timing
  - Menambahkan data ke analytics pelayan

**Data yang Ditambahkan ke CookingLog:**
- `waiter` - nama waiter yang deliver item
- `itemDelivered` - status delivery item
- `deliveryStartTime` - timestamp waiter ditugaskan
- `deliveryFinishedTime` - timestamp item di-deliver
- `deliveryElapsedTime` - durasi delivery dalam detik

---

## Cara Penggunaan

### Setup (Sudah Dikonfigurasi)

WaiterProvider sudah di-wrap di App.tsx:

```typescript
<OrderProvider>
  <StaffProvider>
    <WaiterProvider>
      {/* Your app components */}
    </WaiterProvider>
  </StaffProvider>
</OrderProvider>
```

### Menggunakan Hook

```typescript
import { useWaiter } from './contexts/WaiterContext';

function CheckerComponent() {
  const { 
    assignWaiterToItem, 
    markItemDelivered,
    getItemWaiter,
    isItemDelivered
  } = useWaiter();
  
  // Assign pelayan ke item
  const handleAssignToItem = () => {
    assignWaiterToItem('kitchen', 'R001', 'item-1', 'Siti');
  };
  
  // Mark item delivered
  const handleDelivered = () => {
    markItemDelivered('kitchen', 'R001', 'item-1');
  };
  
  // Check waiter assignment
  const waiterName = getItemWaiter('kitchen', 'R001', 'item-1');
  
  // Check delivery status
  const delivered = isItemDelivered('kitchen', 'R001', 'item-1');
}
```

### Menggunakan SelectWaiterPanel

```typescript
import SelectWaiterPanel from './components/SelectWaiterPanel';

function CheckerPage() {
  const [waiterPanel, setWaiterPanel] = useState({
    isOpen: false,
    orderId: null,
    itemId: null,
    orderName: ''
  });
  
  // Open panel
  const openWaiterPanel = (orderId: string, itemId: string, orderName: string) => {
    setWaiterPanel({
      isOpen: true,
      orderId,
      itemId,
      orderName
    });
  };
  
  // Handle waiter selection
  const handleSelectWaiter = (waiterName: string) => {
    if (waiterPanel.orderId && waiterPanel.itemId) {
      assignWaiterToItem(
        'kitchen',
        waiterPanel.orderId,
        waiterPanel.itemId,
        waiterName
      );
    }
    setWaiterPanel({ ...waiterPanel, isOpen: false });
  };
  
  return (
    <>
      {/* Your UI */}
      <button onClick={() => openWaiterPanel('R001', 'item-1', 'Budi')}>
        Assign Waiter
      </button>
      
      {/* Waiter Panel */}
      <SelectWaiterPanel
        isOpen={waiterPanel.isOpen}
        onClose={() => setWaiterPanel({ ...waiterPanel, isOpen: false })}
        onSelectWaiter={handleSelectWaiter}
        orderName={waiterPanel.orderName}
        orderId={waiterPanel.orderId}
      />
    </>
  );
}
```

---

## Alur Kerja

### Workflow Per-Item Assignment

```
1. Cook menyelesaikan item
   └── item.status = 'finished'
       
2. Checker melihat button "ASSIGN"
   └── Checker klik ASSIGN
       
3. SelectWaiterPanel slides in
   ├── Load waiters dari localStorage 'staffManagementList'
   ├── Filter: department === 'Checker' && isActive
   └── Display waiter list (w1, w2, w3, ...)
       
4. Checker selects waiter
   └── assignWaiterToItem() dipanggil
       ├── item.waiter = "Siti"
       ├── item.deliveryStartTime = Date.now()
       └── Save to localStorage
       
5. Button changes to "DELIVERED"
   └── Waiter mengambil dan mengirim item
       
6. Checker klik DELIVERED
   └── markItemDelivered() dipanggil
       ├── item.deliveredTime = Date.now()
       └── Item tracked as delivered
       
7. Data available for analytics
   └── Admin Raw Database shows delivery data
```

### Workflow Bulk Assignment ("ASSIGN ALL")

```
1. Semua items dalam order = 'finished'
   └── Button "ASSIGN ALL" muncul
       
2. Checker klik ASSIGN ALL
   └── SelectWaiterPanel opens
       
3. Checker selects waiter
   └── assignWaiterToOrder() dipanggil (atau loop assignWaiterToItem)
       ├── Untuk SETIAP item dalam order:
       │   ├── item.waiter = "Siti"
       │   └── item.deliveryStartTime = Date.now()
       └── Button "ASSIGN ALL" auto-hides
       
4. All items show "DELIVERED" button
   └── Pelayan dapat mengirim items satu per satu
       
5. Mark each item delivered separately
   ├── Item 1 delivered → klik DELIVERED untuk item 1
   ├── Item 2 delivered → klik DELIVERED untuk item 2
   └── Setiap item punya delivery time sendiri
```

---

## File Terkait

### Context Files

| File | Deskripsi | Relasi |
|------|-----------|---------|
| `/contexts/WaiterContext.tsx` | ⭐ Main file - penugasan pelayan | Provider utama |
| `/contexts/OrderContext.tsx` | Manajemen pesanan inti | Digunakan oleh WaiterContext |
| `/contexts/StaffContext.tsx` | Analytics & tracking | Memantau WaiterContext |

### Component Files

| File | Purpose | Integration |
|------|---------|-------------|
| `/components/SelectWaiterPanel.tsx` | ⭐ Waiter selection panel | Loads dari localStorage |
| `/components/SelectCookPanel.tsx` | Cook selection panel | Similar integration |
| `/AdminStaffManagement.tsx` | Staff CRUD operations | Source of truth |

### Checker Pages (Using WaiterContext)

| File | Fungsi yang Digunakan | Keterangan |
|------|---------------------|------------|
| `/CheckerOrdersAll.tsx` | `assignWaiterToItem`, `markItemDelivered` | Checker view all departments |
| `/CheckerOrdersMakanan.tsx` | Same as above | Checker view kitchen |
| `/CheckerOrdersBar.tsx` | Same as above | Checker view bar |
| `/CheckerOrdersSnack.tsx` | Same as above | Checker view snack |

### Admin/Analytics Files

| File | Tab/Section | Keterangan |
|------|------------|------------|
| `/AdminRawDatabase.tsx` | Tab "Employee" | Menampilkan cook & waiter activity |
| `/AdminStaffManagement.tsx` | Staff Management | CRUD operations + auto-increment ID |
| `/contexts/StaffContext.tsx` | Delivery tracking logic | Auto-records delivery performance |

---

## Catatan Penting

### Migration Notes

Jika Anda ingin menambahkan fitur waiter baru:

1. **Tambahkan function di WaiterContext.tsx**
2. **Update interface WaiterContextType**
3. **Export function melalui useWaiter hook**
4. **Gunakan di Checker components**

### Performance Considerations

- SelectWaiterPanel loads staff setiap kali panel dibuka
- Data filtered di client-side (efficient untuk < 100 staff)
- localStorage read/write operations fast (< 1ms)
- No unnecessary re-renders (proper useEffect dependencies)

### Testing Checklist

Saat testing WaiterContext:

- [ ] Per-item assignment works correctly
- [ ] SelectWaiterPanel loads staff dari localStorage
- [ ] Only active staff shown in panel
- [ ] Waiter ID format correct (w1, w2, w3)
- [ ] "Assign All" button shows/hides correctly
- [ ] Delivery tracking saves correctly
- [ ] Raw Database shows waiter activity
- [ ] Staff changes in Admin immediately reflect in SelectWaiterPanel

### Common Issues

#### Staff tidak muncul di SelectWaiterPanel

**Solutions:**
1. Check localStorage: `localStorage.getItem('staffManagementList')`
2. Verify staff.isActive = true
3. Check staff.department === 'Checker'
4. Console.log filtered staff array
5. Test with simple case (add 1 waiter manually)

#### Waiter ID tidak ter-generate

**Solutions:**
1. Check prefix mapping: 'Checker' → 'w'
2. Verify existing IDs format (w1, w2, not "NaN" or "005")
3. Check auto-increment logic in AdminStaffManagement
4. Test generateNextStaffId() function

#### Data tidak sync antar pages

**Solutions:**
1. Verify same localStorage key: 'staffManagementList'
2. Check Context Provider hierarchy
3. Ensure useEffect dependencies correct
4. Test localStorage.setItem() called after changes

---

## Best Practices

### 1. Always Filter by isActive

```typescript
// ✅ CORRECT
const activeWaiters = staffList.filter(s => 
  s.department === 'Checker' && s.isActive
);

// ❌ WRONG
const allWaiters = staffList.filter(s => 
  s.department === 'Checker'
);
```

### 2. Handle localStorage Errors

```typescript
// ✅ CORRECT
try {
  const staffList = JSON.parse(localStorage.getItem('staffManagementList') || '[]');
  // Process staffList
} catch (error) {
  console.error('Failed to parse staff list:', error);
  // Fallback to empty array
}

// ❌ WRONG
const staffList = JSON.parse(localStorage.getItem('staffManagementList'));
```

### 3. Department Name Mapping

```typescript
// ✅ CORRECT - Use mapping
const departmentMap = {
  'Checker': 'waitress',
  'Kitchen': 'kitchen',
  // etc.
};
const internalDept = departmentMap[adminDept];

// ❌ WRONG - Hardcode lowercase
const internalDept = adminDept.toLowerCase(); // Breaks for "Checker"
```

### 4. Reload on Panel Open

```typescript
// ✅ CORRECT - Reload when panel opens
useEffect(() => {
  if (isOpen) {
    loadStaffFromLocalStorage();
  }
}, [isOpen]);

// ❌ WRONG - Load once on mount
useEffect(() => {
  loadStaffFromLocalStorage();
}, []); // Won't reflect admin changes
```

---

**Last Updated:** 29 November 2025  
**Version:** 3.0 (Staff Management Integration)  
**Status:** ✅ Production Ready dengan localStorage Integration
