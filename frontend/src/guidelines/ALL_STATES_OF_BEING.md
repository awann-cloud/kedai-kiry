# ALL STATES OF BEING
## Comprehensive State & Phase Reference for Kitchen Management System

Dokumen ini menguraikan SEMUA fase, status, dan field name yang digunakan dalam sistem untuk receipts, menu items, dan entitas lainnya.

---

## 📋 RECEIPT/ORDER STATES

### Order Phases
Receipt memiliki beberapa fase berdasarkan status item-item di dalamnya:

#### Phase 1: NOT STARTED
- **Definisi**: SEMUA items dalam receipt berstatus `not-started`
- **Fields yang terisi**:
  - `id` ✓
  - `orderName` ✓
  - `orderTime` ✓
  - `items[]` ✓ (semua items ada)
- **Fields yang KOSONG**:
  - `frozenTime` ✗
  - `completed` ✗
  - `assignedWaiter` ✗
  - `delivered` ✗
  - `deliveredTime` ✗

#### Phase 2: ON-GOING (Mixed State)
- **Definisi**: TIDAK semua items finished DAN TIDAK semua items not-started
- **Kondisi**: Ada campuran status items (some started, some finished, some not-started)
- **Fields yang terisi**:
  - `id` ✓
  - `orderName` ✓
  - `orderTime` ✓
  - `items[]` ✓
  - Beberapa items memiliki `staff`, `startedTime`, dll
- **Fields yang KOSONG**:
  - `frozenTime` ✗
  - `completed` ✗
  - `delivered` ✗

#### Phase 3: ALL FINISHED (Cooking Complete)
- **Definisi**: SEMUA items berstatus `finished`
- **Fields yang terisi**:
  - `id` ✓
  - `orderName` ✓
  - `orderTime` ✓
  - `items[]` ✓ (semua finished)
  - `frozenTime` ✓ (waktu total memasak)
  - `completed` ✓ (true)
- **Fields yang KOSONG** (belum ada waiter):
  - `assignedWaiter` ✗
  - `delivered` ✗

#### Phase 4: WAITER ASSIGNED (Awaiting Delivery)
- **Definisi**: Semua items finished + waiter sudah ditugaskan
- **Fields yang terisi**:
  - Semua dari Phase 3 ✓
  - Items memiliki `waiter` ✓
  - Items memiliki `deliveryStartTime` ✓
  - Items memiliki `deliveryElapsedTime` ✓ (auto-update)
- **Fields yang KOSONG**:
  - `delivered` ✗
  - Items: `itemDelivered` ✗
  - Items: `deliveryFinishedTime` ✗

#### Phase 5: DELIVERED (Complete)
- **Definisi**: Semua items sudah di-deliver ke customer
- **Fields yang terisi**:
  - Semua dari Phase 4 ✓
  - `delivered` ✓ (true)
  - `deliveredTime` ✓
  - Items: `itemDelivered` ✓ (true)
  - Items: `deliveryFinishedTime` ✓
  - Items: `deliveryElapsedTime` ✓ (frozen)

---

## 🍽️ MENU ITEM STATES

### Item Status Values
Setiap menu item memiliki field `status` dengan 3 kemungkinan nilai:

#### Status: `"not-started"`
- **Definisi**: Item belum dikerjakan sama sekali
- **Fields yang terisi**:
  - `id` ✓
  - `name` ✓
  - `quantity` ✓
  - `notes` ✓
  - `status: "not-started"` ✓
  - `elapsedTime: 0` ✓
- **Fields yang KOSONG**:
  - `staff` ✗
  - `startedTime` ✗
  - `finishedTime` ✗
  - `waiter` ✗
  - `itemDelivered` ✗

#### Status: `"on-their-way"`
- **Definisi**: Item sedang dimasak/diproses
- **Fields yang terisi**:
  - Semua dari not-started ✓
  - `status: "on-their-way"` ✓
  - `staff` ✓ (nama cook/bartender/snack staff)
  - `startedTime` ✓ (timestamp mulai)
  - `elapsedTime` ✓ (auto-update tiap detik)
- **Fields yang KOSONG**:
  - `finishedTime` ✗
  - `waiter` ✗
  - `itemDelivered` ✗

#### Status: `"finished"`
- **Definisi**: Item selesai dimasak/diproses
- **Fields yang terisi**:
  - Semua dari on-their-way ✓
  - `status: "finished"` ✓
  - `finishedTime` ✓ (timestamp selesai)
  - `elapsedTime` ✓ (frozen, total waktu memasak)
- **Fields yang KOSONG** (sebelum waiter assigned):
  - `waiter` ✗
  - `deliveryStartTime` ✗
  - `itemDelivered` ✗

---

## 👨‍🍳 STAFF ASSIGNMENT STATES

### Cook/Bartender/Snack Staff Assignment

#### Unassigned (Not Started)
```typescript
item.status = "not-started"
item.staff = undefined
item.startedTime = undefined
item.elapsedTime = 0
```

#### Assigned & Working
```typescript
item.status = "on-their-way"
item.staff = "Chef John"          // Nama staff yang mengerjakan
item.startedTime = 1732878000000   // Timestamp mulai (ms)
item.elapsedTime = 45              // Update tiap detik
```

#### Completed
```typescript
item.status = "finished"
item.staff = "Chef John"           // Tetap ada
item.startedTime = 1732878000000   // Tetap ada
item.finishedTime = 1732878300000  // Timestamp selesai
item.elapsedTime = 300             // Frozen di total waktu
```

---

## 🚶 WAITER ASSIGNMENT STATES

### Per-Item Waiter Assignment

#### Unassigned (No Waiter)
```typescript
item.waiter = undefined
item.deliveryStartTime = undefined
item.deliveryElapsedTime = undefined
item.itemDelivered = undefined
item.deliveryFinishedTime = undefined
```

#### Waiter Assigned (Awaiting Delivery)
```typescript
item.waiter = "Siti"                    // Nama waiter
item.deliveryStartTime = 1732878500000  // Timestamp assigned (ms)
item.deliveryElapsedTime = 30           // Update tiap detik
item.itemDelivered = false              // Atau undefined
item.deliveryFinishedTime = undefined
```

#### Delivered
```typescript
item.waiter = "Siti"                    // Tetap ada
item.deliveryStartTime = 1732878500000  // Tetap ada
item.deliveryElapsedTime = 120          // Frozen di total waktu
item.itemDelivered = true               // DELIVERED!
item.deliveryFinishedTime = 1732878620000 // Timestamp delivered
```

---

## 🔄 STATE TRANSITIONS

### Department Pages (Kitchen/Bar/Snack)

```
NOT STARTED
    │
    │ [Staff clicks START button]
    │ → Select cook from panel
    │ → Assign staff name
    │ → Set startedTime
    ↓
ON-THEIR-WAY
    │
    │ [Staff clicks DONE button]
    │ → Set finishedTime
    │ → Freeze elapsedTime
    ↓
FINISHED
```

### Checker Pages

```
FINISHED ITEMS (from department)
    │
    │ [Checker clicks item name or ASSIGN ALL]
    │ → Select waiter from panel
    │ → Assign waiter name
    │ → Set deliveryStartTime
    ↓
WAITER ASSIGNED
    │
    │ [Checker clicks ALL DELIVERED button]
    │ → Mark all items as delivered
    │ → Set deliveryFinishedTime
    │ → Freeze deliveryElapsedTime
    │ → Set itemDelivered = true
    ↓
DELIVERED
```

---

## 📊 CATEGORIZATION LOGIC

### Receipt Categories (3-Tier System)

#### Category 1: FINISHED
```typescript
const allFinished = order.items.every(item => item.status === 'finished');
// Semua items selesai
// Tampil di kolom FINISHED
```

#### Category 2: ONGOING
```typescript
const hasStarted = order.items.some(item => item.status !== 'not-started');
const allFinished = order.items.every(item => item.status === 'finished');
const isOngoing = hasStarted && !allFinished;
// Ada progress tapi belum semua selesai
// Tampil di kolom ON THEIR WAY
```

#### Category 3: NOT STARTED
```typescript
const allNotStarted = order.items.every(item => item.status === 'not-started');
// Semua items belum dimulai
// Tampil di kolom NOT STARTED
```

### FIFO Ordering
Dalam setiap kategori, receipts diurutkan berdasarkan `orderTime` (First In, First Out).

---

## 🗄️ COMPLETE FIELD REFERENCE

### Order/Receipt Fields

| Field Name | Type | Description | When Set |
|------------|------|-------------|----------|
| `id` | string | Unique order ID (e.g., "R001") | Order created |
| `orderName` | string | Customer name | Order created |
| `orderTime` | number | Timestamp order dibuat (ms) | Order created |
| `items` | MenuItem[] | Array menu items | Order created |
| `frozenTime` | number | Total waktu memasak (detik) | All items finished |
| `completed` | boolean | Apakah semua items finished | All items finished |
| `assignedWaiter` | string | Legacy waiter field | (Legacy/deprecated) |
| `waiter` | string | Alias untuk assignedWaiter | (Legacy/deprecated) |
| `delivered` | boolean | Apakah order sudah dideliver | All items delivered |
| `deliveredTime` | number | Timestamp order dideliver (ms) | All items delivered |

### MenuItem Fields

| Field Name | Type | Description | When Set |
|------------|------|-------------|----------|
| `id` | string | Unique item ID (e.g., "item-1") | Item created |
| `name` | string | Nama menu item | Item created |
| `quantity` | number | Jumlah porsi | Item created |
| `notes` | string | Catatan khusus | Item created |
| `status` | string | "not-started" / "on-their-way" / "finished" | Changes throughout |
| `staff` | string | Nama cook/bartender/staff | Item started |
| `startedTime` | number | Timestamp mulai memasak (ms) | Item started |
| `finishedTime` | number | Timestamp selesai memasak (ms) | Item finished |
| `elapsedTime` | number | Durasi memasak (detik) | Auto-update, frozen saat finished |
| `waiter` | string | Nama waiter | Waiter assigned (Checker) |
| `itemDelivered` | boolean | Apakah item sudah dideliver | Item delivered |
| `deliveryStartTime` | number | Timestamp waiter assigned (ms) | Waiter assigned |
| `deliveryFinishedTime` | number | Timestamp item dideliver (ms) | Item delivered |
| `deliveryElapsedTime` | number | Durasi delivery (detik) | Auto-update, frozen saat delivered |

---

## 🎯 BUTTON STATES

### Department Pages (Kitchen/Bar/Snack)

| Item Status | Button Shown | Button Color | Action |
|-------------|--------------|--------------|--------|
| `not-started` | START | Green | Assign cook → status = `on-their-way` |
| `on-their-way` | DONE | Blue | Mark finished → status = `finished` |
| `finished` | FINISHED | Grey (disabled) | No action |

### Checker Pages

| Item State | Button Shown | Button Color | Action |
|------------|--------------|--------------|--------|
| Not finished | (hidden) | - | Wait for department |
| Finished, no waiter | ASSIGN | Green | Assign waiter |
| Finished, has waiter | ✓ [Waiter Name] | Blue | Change waiter (optional) |
| All items delivered | ALL DELIVERED | Grey (disabled) | No action |

### Receipt-Level Buttons (Checker)

| Condition | Button Shown | Action |
|-----------|--------------|--------|
| Some items have no waiter + all finished | ASSIGN ALL | Assign same waiter to all unassigned items |
| All items have waiters + not all delivered | ALL DELIVERED | Mark all items as delivered |
| All items delivered | ALL DELIVERED (disabled/grey) | No action |

---

## 📍 STATE PERSISTENCE

### localStorage Keys
```typescript
// Orders per department
localStorage.setItem('makananOrders', JSON.stringify(orders))
localStorage.setItem('barOrders', JSON.stringify(orders))
localStorage.setItem('snackOrders', JSON.stringify(orders))

// Cooking logs (completed items)
localStorage.setItem('cookingLogs', JSON.stringify(logs))
```

### OrderContext State
- **Live state**: OrderContext menyimpan state real-time
- **Sync**: Setiap perubahan auto-save ke localStorage
- **Auto-update**: `elapsedTime` dan `deliveryElapsedTime` update setiap detik via useEffect
- **Cross-page**: Perubahan di satu halaman langsung reflect di halaman lain

---

## 🔍 QUICK STATE CHECK

### "Apakah receipt ini sudah selesai memasak?"
```typescript
const isDoneCooking = order.items.every(item => item.status === 'finished');
```

### "Apakah receipt ini sudah assigned waiter?"
```typescript
const hasWaiter = order.items.every(item => item.waiter);
```

### "Apakah receipt ini sudah dideliver semua?"
```typescript
const isAllDelivered = order.items.every(item => item.itemDelivered);
```

### "Apakah item ini sedang dimasak?"
```typescript
const isCooking = item.status === 'on-their-way';
```

### "Apakah item ini sedang menunggu delivery?"
```typescript
const awaitingDelivery = item.status === 'finished' && item.waiter && !item.itemDelivered;
```

---

## 📝 SUMMARY

### Lifecycle Lengkap (Happy Path)

1. **ORDER CREATED** → Receipt baru, semua items `not-started`
2. **COOKING STARTS** → Staff assign, status → `on-their-way`
3. **COOKING DONE** → Staff finish, status → `finished`
4. **WAITER ASSIGNED** → Checker assign waiter ke items
5. **DELIVERED** → Checker mark all delivered

### Field Name Quick Reference

**Cooking-related:**
- `staff` (cook name)
- `startedTime`, `finishedTime`, `elapsedTime`

**Delivery-related:**
- `waiter` (waiter name)
- `deliveryStartTime`, `deliveryFinishedTime`, `deliveryElapsedTime`
- `itemDelivered` (boolean)

**Status:**
- `status` (item level): "not-started", "on-their-way", "finished"
- `completed` (order level): boolean, true jika semua items finished
- `delivered` (order level): boolean, true jika semua items delivered

---

**Last Updated**: 29 November 2025  
**Version**: 1.0  
**Purpose**: Complete state reference untuk development & debugging
