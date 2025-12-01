# Sistem Penugasan Pelayan Per-Item - Detail Teknis

**File:** `/guidelines/WAITER_ASSIGNMENT_PER_ITEM_DETAILS.md`  
**Tanggal:** 29 November 2025  
**Fitur:** Perubahan penugasan pelayan dari per-struk ke per-item menu  
**Status:** ✅ Frontend Complete | ⏳ Backend Pending

---

## 📋 Ringkasan

### Apa yang Berubah?
Sebelumnya, pelayan ditugaskan ke **seluruh struk/pesanan**. Sekarang, pelayan dapat ditugaskan ke **item menu individual** dalam satu pesanan.

### Mengapa?
Ini memungkinkan kontrol yang lebih detail atas penugasan pengiriman, memungkinkan beberapa pelayan menangani item berbeda dari pesanan yang sama.

### Cara Penugasan (3 Metode):

| Metode | Cara | Kapan Digunakan |
|--------|------|-----------------|
| **Tombol ASSIGN** | Klik tombol "ASSIGN" pada item | Penugasan normal, eksplisit |
| **Double-Tap** ⭐ | Ketuk 2x cepat (300ms) pada kartu item | Cepat untuk tablet |
| **Long-Press** ⭐ | Tahan 500ms pada kartu item | Alternatif untuk double-tap |
| **ASSIGN ALL** | Klik tombol di footer struk | Tugaskan banyak item sekaligus |

---

## 🔥 Fitur Terbaru (29 November 2025)

### 1. Tombol "ASSIGN ALL" Otomatis Hilang

**Perilaku:**
- Tombol "ASSIGN ALL" **hilang otomatis** jika semua finished items sudah punya waiter
- Hanya muncul jika masih ada item tanpa waiter

**Implementasi:**
```typescript
const finishedItems = order.items.filter(item => item.status === 'finished');
const allFinishedItemsHaveWaiters = finishedItems.length > 0 && 
  finishedItems.every(item => item.waiter);

// Tampilkan ASSIGN ALL hanya jika masih ada item tanpa waiter
{!order.waiter && !allFinishedItemsHaveWaiters ? (
  <button>ASSIGN ALL</button>
) : (
  <button>DELIVERED</button>
)}
```

### 2. ASSIGN ALL Tidak Overwrite

**Behavior:**
- "ASSIGN ALL" hanya menugaskan ke item yang **belum punya waiter**
- Item yang sudah punya waiter **tidak ditimpa**

**Implementasi:**
```typescript
const assignWaiter = (department, orderId, waiterName) => {
  // ...
  items: order.items.map(item => 
    !item.waiter ? {  // ⭐ Hanya jika belum ada waiter
      ...item,
      waiter: waiterName,
      deliveryStartTime: Date.now()
    } : item  // ⭐ Pertahankan yang sudah ada
  )
  // ...
};
```

### 3. Double-Tap & Long-Press Gestures

**Double-Tap Detection:**
```typescript
const lastTapRef = useRef<number>(0);

const handleItemClick = (item: MenuItem, order: any) => {
  const now = Date.now();
  const timeSinceLastTap = now - lastTapRef.current;

  // Deteksi double tap (dalam 300ms)
  if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
    if (!item.waiter) {
      setWaiterPanel({ isOpen: true, orderId, itemId, ... });
    }
    lastTapRef.current = 0;
  } else {
    lastTapRef.current = now;
  }
};
```

**Long-Press Detection:**
```typescript
const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

const handleItemTouchStart = (item: MenuItem, order: any) => {
  longPressTimerRef.current = setTimeout(() => {
    if (!item.waiter) {
      setWaiterPanel({ isOpen: true, orderId, itemId, ... });
    }
  }, 500);
};

const handleItemTouchEnd = () => {
  if (longPressTimerRef.current) {
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  }
};
```

**Event Handlers:**
```tsx
<div 
  className={`${!item.waiter ? 'cursor-pointer select-none' : ''}`}
  onClick={() => handleItemClick(item, order)}              // Double-tap
  onTouchStart={() => handleItemTouchStart(item, order)}    // Long-press (touch)
  onTouchEnd={handleItemTouchEnd}                           // Cancel
  onTouchCancel={handleItemTouchEnd}                        // Cancel if interrupted
  onMouseDown={() => handleItemTouchStart(item, order)}     // Long-press (mouse)
  onMouseUp={handleItemTouchEnd}                            // Cancel
  onMouseLeave={handleItemTouchEnd}                         // Cancel on leave
>
  {/* Konten item */}
</div>
```

---

## 🗄️ Struktur Data

### Interface MenuItem Update

**SEBELUM:**
```typescript
export interface MenuItem {
  id: string;
  name: string;
  quantity: number;
  notes: string;
  status: 'not-started' | 'on-their-way' | 'finished';
  staff?: string;
  startedTime?: number;
  finishedTime?: number;
  elapsedTime: number;
}
```

**SESUDAH:**
```typescript
export interface MenuItem {
  id: string;
  name: string;
  quantity: number;
  notes: string;
  status: 'not-started' | 'on-their-way' | 'finished';
  staff?: string;
  startedTime?: number;
  finishedTime?: number;
  elapsedTime: number;
  waiter?: string;           // ⭐ BARU: Pelayan untuk item ini
  itemDelivered?: boolean;   // ⭐ BARU: Status delivery item
}
```

---

## 🔄 Fungsi OrderContext

### Fungsi Baru: assignWaiterToItem

```typescript
interface OrderContextType {
  // ...existing functions...
  
  // ⭐ FUNGSI BARU
  assignWaiterToItem: (
    department: Department, 
    orderId: string, 
    itemId: string, 
    waiterName: string
  ) => void;
}
```

**Implementasi:**
```typescript
const assignWaiterToItem = (
  department: Department, 
  orderId: string, 
  itemId: string, 
  waiterName: string
) => {
  const updateOrders = (orders: Order[]) =>
    orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            items: order.items.map(item =>
              item.id === itemId
                ? { ...item, waiter: waiterName }
                : item
            )
          }
        : order
    );

  switch (department) {
    case 'kitchen': setKitchenOrders(updateOrders); break;
    case 'bar': setBarOrders(updateOrders); break;
    case 'snack': setSnackOrders(updateOrders); break;
  }
};
```

### Fungsi Dimodifikasi: assignWaiter

**Update Logic:**
```typescript
const assignWaiter = (department: Department, orderId: string, waiterName: string) => {
  const currentTime = Date.now();
  
  const updateOrders = (orders: Order[]) =>
    orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            waiter: waiterName,
            items: order.items.map(item => 
              !item.waiter ? {  // ⭐ Conditional assignment
                ...item,
                waiter: waiterName,
                deliveryStartTime: currentTime,
                deliveryElapsedTime: 0
              } : item  // ⭐ Keep existing waiter
            )
          }
        : order
    );

  // Update department orders...
};
```

---

## 🔌 Kebutuhan Backend API

### 1. Assign Waiter ke Item Tunggal

**Endpoint:**
```
POST /api/orders/{orderId}/items/{itemId}/assign-waiter
```

**Request Body:**
```json
{
  "department": "kitchen" | "bar" | "snack",
  "waiterName": "John Doe"
}
```

**SQL Query:**
```sql
UPDATE menu_items 
SET waiter = ?, 
    updated_at = NOW()
WHERE order_id = ? AND item_id = ?;
```

### 2. Assign Waiter ke Semua Item (ASSIGN ALL)

**Endpoint:**
```
POST /api/orders/{orderId}/assign-waiter-all
```

**Request Body:**
```json
{
  "department": "kitchen" | "bar" | "snack",
  "waiterName": "John Doe"
}
```

**SQL Query (dengan no-overwrite logic):**
```sql
-- ⭐ Hanya update item yang belum punya waiter
UPDATE menu_items 
SET waiter = ?, 
    updated_at = NOW()
WHERE order_id = ? 
  AND (waiter IS NULL OR waiter = '');

-- Update level order
UPDATE orders 
SET assigned_waiter = ?, 
    updated_at = NOW()
WHERE id = ?;
```

### 3. GET Orders dengan Data Waiter Level Item

**Endpoint:**
```
GET /api/orders?department={department}
```

**Response Update:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Meja 5",
      "waiter": "John Doe",
      "items": [
        {
          "id": "1-1",
          "name": "Nasi Goreng",
          "status": "finished",
          "staff": "Chef Mike",
          "waiter": "John Doe",        // ⭐ FIELD BARU
          "itemDelivered": false        // ⭐ FIELD BARU
        },
        {
          "id": "1-2",
          "name": "Mie Goreng",
          "status": "finished",
          "staff": "Chef Sarah",
          "waiter": "Jane Smith",       // ⭐ Different waiter
          "itemDelivered": false
        }
      ]
    }
  ]
}
```

---

## 📊 Database Schema Update

### Tambah Kolom ke menu_items

```sql
ALTER TABLE menu_items 
ADD COLUMN waiter VARCHAR(255) DEFAULT NULL 
  COMMENT 'Pelayan yang ditugaskan mengantar item ini',
ADD COLUMN item_delivered BOOLEAN DEFAULT FALSE 
  COMMENT 'Apakah item ini sudah diantar',
ADD INDEX idx_waiter (waiter),
ADD INDEX idx_item_delivered (item_delivered);
```

### Script Migrasi Data Existing

```sql
-- Salin waiter dari level order ke semua items
UPDATE menu_items mi
JOIN orders o ON mi.order_id = o.id
SET mi.waiter = o.assigned_waiter
WHERE o.assigned_waiter IS NOT NULL 
  AND mi.waiter IS NULL
  AND mi.status = 'finished';
```

---

## 🎯 File yang Dimodifikasi

### Frontend (✅ Complete)
- `/data/makananOrders.ts` - Interface MenuItem updated
- `/contexts/OrderContext.tsx` - assignWaiterToItem added, assignWaiter fixed
- `/contexts/WaiterContext.tsx` - New context for waiter features
- `/CheckerOrdersAll.tsx` - UI updated with gestures
- `/CheckerOrdersMakanan.tsx` - UI updated with gestures
- `/CheckerOrdersBar.tsx` - UI updated with gestures
- `/CheckerOrdersSnacktsx.tsx` - UI updated with gestures

### Backend (⏳ Pending)
- Database schema migration
- New API endpoints
- Update GET endpoints
- Migration scripts

---

## ✅ Testing Checklist

### Frontend Testing (✅ Complete)
- [x] Double-tap on finished item without waiter → opens panel
- [x] Double-tap on finished item with waiter → no action
- [x] Long-press (500ms) on finished item → opens panel
- [x] Release before 500ms → no action (canceled)
- [x] "ASSIGN ALL" only assigns to items without waiter
- [x] "ASSIGN ALL" button hides when all items have waiters
- [x] Individual assign then "ASSIGN ALL" → no overwrite
- [x] Cursor pointer only on items without waiter

### Backend Testing (⏳ Pending)
- [ ] POST `/items/{itemId}/assign-waiter` works correctly
- [ ] POST `/orders/{orderId}/assign-waiter-all` with no-overwrite logic
- [ ] GET endpoint returns item-level waiter data
- [ ] Database indexes created for performance
- [ ] Migration script runs successfully on existing data
- [ ] API handles concurrent requests properly

---

## 🚀 Deployment Steps

1. **Database Migration** (Run FIRST):
   ```bash
   ALTER TABLE menu_items ADD COLUMN waiter VARCHAR(255);
   ALTER TABLE menu_items ADD COLUMN item_delivered BOOLEAN DEFAULT FALSE;
   # Run migration script
   ```

2. **Backend API** (Deploy SECOND):
   - Deploy new endpoints
   - Update GET endpoints
   - Test thoroughly

3. **Frontend** (Deploy LAST):
   - Already complete and ready
   - Test end-to-end with backend

---

**Status:** ✅ Frontend Complete | ⏳ Backend Pending  
**Priority:** 🔥 HIGH - Required for waiter assignment workflow  
**Documentation:** Complete

---

**Related Files:**
- Main Changelog: `/guidelines/CHANGELOG_FROM_LAST_VERSION.md`
- WaiterContext Guide: `/guidelines/WAITER_CONTEXT_GUIDE.md`
- Quick Reference: `/guidelines/QUICK_REFERENCE.md`
