# 🗄️ Format Database SQL - Sistem Order Management & Analytics

**Terakhir Diupdate:** 29 November 2025  
**Versi:** 3.0 (Staff Management + Per-Item Waiter Assignment)

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Tabel menu_items](#tabel-menu_items)
3. [Tabel log_memasak](#tabel-log_memasak)
4. [Tabel staff](#tabel-staff)
5. [Tabel orders](#tabel-orders)
6. [Tabel order_items](#tabel-order_items)
7. [Tabel waiter_assignments](#tabel-waiter_assignments)
8. [Tabel schedules](#tabel-schedules)
9. [Relationships & Constraints](#relationships--constraints)
10. [Sample Queries](#sample-queries)

---

## 🎯 Overview

### Tabel Utama:

1. **menu_items** - Data menu dan waktu memasak preset
2. **log_memasak** - Log histori memasak (cooking analytics)
3. **staff** - Data karyawan dengan auto-increment ID
4. **orders** - Data pesanan (receipt level)
5. **order_items** - Detail item dalam pesanan
6. **waiter_assignments** - Assignment waiter per-item
7. **schedules** - Jadwal shift karyawan

### Database Engine:

- **Engine:** InnoDB (support foreign keys & transactions)
- **Charset:** utf8mb4
- **Collation:** utf8mb4_unicode_ci

---

## 📊 1. Tabel: menu_items

### Definisi Tabel:

```sql
CREATE TABLE menu_items (
    -- Primary Key
    ID_Menu VARCHAR(10) PRIMARY KEY,
    
    -- Informasi Menu
    Nama_Menu VARCHAR(100) NOT NULL,
    Kategori ENUM('Minuman', 'Makanan', 'Snack') NOT NULL,
    Harga DECIMAL(10,2) NOT NULL CHECK (Harga >= 0),
    
    -- Waktu Memasak Preset (dalam detik)
    Waktu_Cepat INT NOT NULL CHECK (Waktu_Cepat > 0) COMMENT 'Preset: Very Fast (≤120s)',
    Waktu_Normal INT NOT NULL CHECK (Waktu_Normal > 0) COMMENT 'Preset: Normal (≤360s)',
    Waktu_Lama INT NOT NULL CHECK (Waktu_Lama > 0) COMMENT 'Preset: Very Slow (>600s)',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Constraints
    CONSTRAINT chk_waktu_order CHECK (Waktu_Cepat <= Waktu_Normal AND Waktu_Normal <= Waktu_Lama),
    INDEX idx_kategori (Kategori),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***ID_Menu*** (PRIMARY KEY)
- **Tipe**: `VARCHAR(10)`
- **Format**: "MN" + 3-4 digit angka
- **Contoh**: 
  - `MN001` - Thai Tea + Nusantara
  - `MN002` - Air Hangat / Es Kosong
  - `MN003` - Nasi Goreng Special
  - `MN100` - Sate Ayam
- **Constraint**: UNIQUE, NOT NULL
- **Auto-increment**: Manual (bukan AUTO_INCREMENT)

***Nama_Menu***
- **Tipe**: `VARCHAR(100)`
- **Contoh**: "Thai Tea + Nusantara", "Nasi Goreng Special"
- **Constraint**: NOT NULL
- **Case**: Sensitive

***Kategori***
- **Tipe**: `ENUM('Minuman', 'Makanan', 'Snack')`
- **Mapping ke Department**:
  ```
  "Minuman" → Bar Department
  "Makanan" → Kitchen Department
  "Snack"   → Snack Department
  ```

***Harga***
- **Tipe**: `DECIMAL(10,2)`
- **Unit**: Rupiah (IDR)
- **Range**: 0 - 99,999,999.99
- **Contoh**: 17000.00, 25000.00, 5000.00

***Waktu_Cepat*** (Very Fast Preset)
- **Tipe**: `INT`
- **Unit**: Detik
- **Range**: ≤ 120 detik (2 menit)
- **Contoh**: 60, 90, 120

***Waktu_Normal*** (Normal Preset)
- **Tipe**: `INT`
- **Unit**: Detik
- **Range**: 121-360 detik (2-6 menit)
- **Contoh**: 180, 240, 300

***Waktu_Lama*** (Very Slow Preset)
- **Tipe**: `INT`
- **Unit**: Detik
- **Range**: > 600 detik (> 10 menit)
- **Contoh**: 600, 900, 1200

---

## 📈 2. Tabel: log_memasak

### Definisi Tabel:

```sql
CREATE TABLE log_memasak (
    -- Primary Key
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Keys
    ID_Menu VARCHAR(10) NOT NULL,
    staff_id VARCHAR(10) NOT NULL,
    order_id VARCHAR(20) NOT NULL,
    
    -- Menu Info (denormalized untuk performance)
    menu_name VARCHAR(100) NOT NULL,
    cook_name VARCHAR(100) NOT NULL,
    department ENUM('kitchen', 'bar', 'snack') NOT NULL,
    
    -- Quantity
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    
    -- Timing Data
    started_time DATETIME NOT NULL COMMENT 'Waktu mulai memasak',
    finished_time DATETIME NOT NULL COMMENT 'Waktu selesai memasak',
    elapsed_time INT NOT NULL COMMENT 'Durasi memasak (detik)',
    frozen_time DATETIME NOT NULL COMMENT 'Waktu save ke log',
    
    -- Efficiency Classification
    efficiency_level ENUM('Very Fast', 'Fast', 'Normal', 'Slow', 'Very Slow') NOT NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    CONSTRAINT fk_log_menu FOREIGN KEY (ID_Menu) REFERENCES menu_items(ID_Menu) ON DELETE CASCADE,
    CONSTRAINT fk_log_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
    CONSTRAINT fk_log_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_cook (staff_id),
    INDEX idx_menu (ID_Menu),
    INDEX idx_department (department),
    INDEX idx_date (finished_time),
    INDEX idx_efficiency (efficiency_level),
    INDEX idx_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***log_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`
- **Range**: 1 - 9,223,372,036,854,775,807
- **Auto-increment**: Database managed

***ID_Menu*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Reference**: menu_items.ID_Menu
- **Cascade**: DELETE CASCADE

***staff_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Format**: Prefix-based ID (k1, b2, s3, w1)
- **Reference**: staff.staff_id
- **Cascade**: DELETE CASCADE

***order_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(20)`
- **Format**: "R" + timestamp atau sequential
- **Reference**: orders.order_id
- **Contoh**: R001, R002, R1732867200000

***menu_name*** (Denormalized)
- **Tipe**: `VARCHAR(100)`
- **Purpose**: Fast query tanpa JOIN
- **Contoh**: "Nasi Goreng Special"

***cook_name*** (Denormalized)
- **Tipe**: `VARCHAR(100)`
- **Purpose**: Fast query tanpa JOIN
- **Contoh**: "Ahmad Hidayat"

***department***
- **Tipe**: `ENUM('kitchen', 'bar', 'snack')`
- **Lowercase**: Berbeda dengan menu_items.Kategori

***quantity***
- **Tipe**: `INT`
- **Default**: 1
- **Range**: > 0

***started_time***
- **Tipe**: `DATETIME`
- **Format**: 'YYYY-MM-DD HH:MM:SS'
- **Contoh**: '2025-11-29 10:30:00'
- **Purpose**: Timestamp mulai memasak

***finished_time***
- **Tipe**: `DATETIME`
- **Format**: 'YYYY-MM-DD HH:MM:SS'
- **Contoh**: '2025-11-29 10:35:30'
- **Purpose**: Timestamp selesai memasak

***elapsed_time***
- **Tipe**: `INT`
- **Unit**: Detik
- **Calculation**: `(finished_time - started_time)`
- **Contoh**: 330 (5 menit 30 detik)

***frozen_time***
- **Tipe**: `DATETIME`
- **Purpose**: Snapshot timestamp saat data disimpan ke log
- **Usually**: Sama dengan atau setelah finished_time

***efficiency_level***
- **Tipe**: `ENUM('Very Fast', 'Fast', 'Normal', 'Slow', 'Very Slow')`
- **Classification**:
  ```
  Very Fast: ≤ 120s (≤ 2 min)
  Fast:      121-240s (2-4 min)
  Normal:    241-360s (4-6 min)
  Slow:      361-600s (6-10 min)
  Very Slow: > 600s (> 10 min)
  ```

---

## 👥 3. Tabel: staff

### Definisi Tabel:

```sql
CREATE TABLE staff (
    -- Primary Key
    staff_id VARCHAR(10) PRIMARY KEY,
    
    -- Personal Info
    staff_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    
    -- Role & Department
    position VARCHAR(50) NOT NULL COMMENT 'Job title: Cook, Bartender, Waiter, etc.',
    department ENUM('Kitchen', 'Bar', 'Snack', 'Checker') NOT NULL,
    
    -- Schedule
    shift ENUM('Pagi', 'Siang', 'Malam') NOT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_department (department),
    INDEX idx_active (is_active),
    INDEX idx_shift (shift)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***staff_id*** (PRIMARY KEY)
- **Tipe**: `VARCHAR(10)`
- **Format**: Prefix + Sequential Number
- **Prefix Mapping**:
  ```
  Kitchen → k{n}  (k1, k2, k3, ...)
  Bar     → b{n}  (b1, b2, b3, ...)
  Snack   → s{n}  (s1, s2, s3, ...)
  Checker → w{n}  (w1, w2, w3, ...)
  ```
- **Contoh**: k1, k2, b1, b2, s1, w1, w2
- **Auto-increment**: Per-department counter

***staff_name***
- **Tipe**: `VARCHAR(100)`
- **Contoh**: "Ahmad Hidayat", "Siti Nurhaliza"
- **Constraint**: NOT NULL

***phone_number***
- **Tipe**: `VARCHAR(20)`
- **Format**: Flexible (08xxxx atau +62xxx)
- **Contoh**: "081234567890"
- **Nullable**: TRUE

***position***
- **Tipe**: `VARCHAR(50)`
- **Contoh**: "Head Cook", "Bartender", "Waitress", "Cook"
- **Constraint**: NOT NULL

***department***
- **Tipe**: `ENUM('Kitchen', 'Bar', 'Snack', 'Checker')`
- **Case**: Capitalized (berbeda dengan department di log_memasak)
- **Mapping**:
  ```
  Kitchen → Cook/Head Cook
  Bar     → Bartender/Barista
  Snack   → Snack Cook
  Checker → Waiter/Waitress
  ```

***shift***
- **Tipe**: `ENUM('Pagi', 'Siang', 'Malam')`
- **Shifts**:
  - Pagi: 06:00-14:00
  - Siang: 14:00-22:00
  - Malam: 22:00-06:00

***is_active***
- **Tipe**: `BOOLEAN`
- **Default**: TRUE
- **Purpose**: Soft delete (tidak menghapus data staff)
- **Effect**: Inactive staff tidak muncul di SelectCookPanel/SelectWaiterPanel

---

## 📋 4. Tabel: orders

### Definisi Tabel:

```sql
CREATE TABLE orders (
    -- Primary Key
    order_id VARCHAR(20) PRIMARY KEY,
    
    -- Order Info
    customer_name VARCHAR(100) NOT NULL,
    order_time DATETIME NOT NULL,
    
    -- Department
    department ENUM('kitchen', 'bar', 'snack') NOT NULL,
    
    -- Status
    status ENUM('pending', 'in-progress', 'completed', 'delivered') NOT NULL DEFAULT 'pending',
    
    -- Completed Time
    completed_time DATETIME NULL COMMENT 'Waktu semua items selesai dimasak',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_department (department),
    INDEX idx_status (status),
    INDEX idx_order_time (order_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***order_id*** (PRIMARY KEY)
- **Tipe**: `VARCHAR(20)`
- **Format**: "R" + sequential atau timestamp
- **Contoh**: R001, R002, R1732867200000
- **Constraint**: UNIQUE, NOT NULL

***customer_name***
- **Tipe**: `VARCHAR(100)`
- **Contoh**: "Budi", "Meja 5", "Siti"
- **Constraint**: NOT NULL

***order_time***
- **Tipe**: `DATETIME`
- **Format**: 'YYYY-MM-DD HH:MM:SS'
- **Purpose**: Timestamp saat order dibuat

***department***
- **Tipe**: `ENUM('kitchen', 'bar', 'snack')`
- **Lowercase**: Konsisten dengan log_memasak

***status***
- **Tipe**: `ENUM('pending', 'in-progress', 'completed', 'delivered')`
- **States**:
  - `pending`: Semua items not-started
  - `in-progress`: Ada item yang started/on-going
  - `completed`: Semua items finished
  - `delivered`: Semua items delivered by waiter

***completed_time***
- **Tipe**: `DATETIME`
- **Nullable**: TRUE
- **Set**: Ketika status → 'completed'

---

## 🍽️ 5. Tabel: order_items

### Definisi Tabel:

```sql
CREATE TABLE order_items (
    -- Primary Key
    item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Keys
    order_id VARCHAR(20) NOT NULL,
    ID_Menu VARCHAR(10) NOT NULL,
    staff_id VARCHAR(10) NULL COMMENT 'Cook yang mengerjakan item ini',
    
    -- Item Info
    menu_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    
    -- Status
    status ENUM('not-started', 'on-going', 'finished') NOT NULL DEFAULT 'not-started',
    
    -- Timing Data
    started_time DATETIME NULL COMMENT 'Waktu cook mulai item',
    finished_time DATETIME NULL COMMENT 'Waktu cook selesai item',
    elapsed_time INT NULL COMMENT 'Durasi memasak (detik)',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    CONSTRAINT fk_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_menu FOREIGN KEY (ID_Menu) REFERENCES menu_items(ID_Menu) ON DELETE CASCADE,
    CONSTRAINT fk_item_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_order (order_id),
    INDEX idx_menu (ID_Menu),
    INDEX idx_cook (staff_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***item_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`
- **Auto-increment**: Database managed

***order_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(20)`
- **Reference**: orders.order_id
- **Cascade**: DELETE CASCADE

***ID_Menu*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Reference**: menu_items.ID_Menu
- **Cascade**: DELETE CASCADE

***staff_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Reference**: staff.staff_id
- **Nullable**: TRUE (item belum di-assign cook)
- **Cascade**: DELETE SET NULL

***menu_name*** (Denormalized)
- **Tipe**: `VARCHAR(100)`
- **Purpose**: Fast query tanpa JOIN

***quantity***
- **Tipe**: `INT`
- **Default**: 1
- **Range**: > 0

***status***
- **Tipe**: `ENUM('not-started', 'on-going', 'finished')`
- **Flow**: not-started → on-going → finished

***started_time***
- **Tipe**: `DATETIME`
- **Nullable**: TRUE
- **Set**: Ketika status → 'on-going'

***finished_time***
- **Tipe**: `DATETIME`
- **Nullable**: TRUE
- **Set**: Ketika status → 'finished'

***elapsed_time***
- **Tipe**: `INT`
- **Unit**: Detik
- **Calculation**: `(finished_time - started_time)`
- **Nullable**: TRUE

---

## 👨‍🍳 6. Tabel: waiter_assignments

### Definisi Tabel:

```sql
CREATE TABLE waiter_assignments (
    -- Primary Key
    assignment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Keys
    order_id VARCHAR(20) NOT NULL,
    item_id BIGINT NOT NULL,
    waiter_id VARCHAR(10) NOT NULL,
    
    -- Assignment Info
    waiter_name VARCHAR(100) NOT NULL,
    assigned_time DATETIME NOT NULL,
    delivered_time DATETIME NULL,
    
    -- Status
    is_delivered BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    CONSTRAINT fk_assignment_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_item FOREIGN KEY (item_id) REFERENCES order_items(item_id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_waiter FOREIGN KEY (waiter_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
    
    -- Unique Constraint: One waiter per item
    UNIQUE KEY unique_item_assignment (item_id),
    
    -- Indexes
    INDEX idx_order (order_id),
    INDEX idx_waiter (waiter_id),
    INDEX idx_delivered (is_delivered)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***assignment_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`
- **Auto-increment**: Database managed

***order_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(20)`
- **Reference**: orders.order_id
- **Cascade**: DELETE CASCADE

***item_id*** (FOREIGN KEY)
- **Tipe**: `BIGINT`
- **Reference**: order_items.item_id
- **Cascade**: DELETE CASCADE
- **Unique**: Satu item hanya bisa di-assign ke satu waiter

***waiter_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Format**: w1, w2, w3, ...
- **Reference**: staff.staff_id WHERE department='Checker'
- **Cascade**: DELETE CASCADE

***waiter_name*** (Denormalized)
- **Tipe**: `VARCHAR(100)`
- **Purpose**: Fast query tanpa JOIN

***assigned_time***
- **Tipe**: `DATETIME`
- **Purpose**: Timestamp saat waiter di-assign ke item

***delivered_time***
- **Tipe**: `DATETIME`
- **Nullable**: TRUE
- **Set**: Ketika waiter marks item as delivered

***is_delivered***
- **Tipe**: `BOOLEAN`
- **Default**: FALSE
- **Purpose**: Quick status check

---

## 📅 7. Tabel: schedules

### Definisi Tabel:

```sql
CREATE TABLE schedules (
    -- Primary Key
    schedule_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Key
    staff_id VARCHAR(10) NOT NULL,
    
    -- Schedule Info
    work_date DATE NOT NULL,
    shift ENUM('Pagi', 'Siang', 'Malam') NOT NULL,
    
    -- Status
    is_present BOOLEAN DEFAULT TRUE,
    notes TEXT NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraint
    CONSTRAINT fk_schedule_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
    
    -- Unique: One shift per staff per date
    UNIQUE KEY unique_staff_date (staff_id, work_date),
    
    -- Indexes
    INDEX idx_date (work_date),
    INDEX idx_staff (staff_id),
    INDEX idx_shift (shift)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔗 Relationships & Constraints

### ER Diagram (Text)

```
menu_items (1) ──< (N) order_items
menu_items (1) ──< (N) log_memasak

staff (1) ──< (N) order_items (assignedCook)
staff (1) ──< (N) log_memasak (cookName)
staff (1) ──< (N) waiter_assignments (waiter)
staff (1) ──< (N) schedules

orders (1) ──< (N) order_items
orders (1) ──< (N) log_memasak
orders (1) ──< (N) waiter_assignments

order_items (1) ──< (1) waiter_assignments (unique constraint)
```

### Key Relationships:

1. **menu_items → order_items** (1:N)
   - One menu can be ordered multiple times

2. **menu_items → log_memasak** (1:N)
   - One menu can have multiple cooking logs

3. **staff → order_items** (1:N)
   - One cook can cook multiple items

4. **staff → log_memasak** (1:N)
   - One cook has multiple cooking logs

5. **staff → waiter_assignments** (1:N)
   - One waiter can deliver multiple items

6. **orders → order_items** (1:N)
   - One order has multiple items

7. **order_items → waiter_assignments** (1:1)
   - One item assigned to one waiter (UNIQUE constraint)

---

## 🔍 Sample Queries

### 1. Get All Active Staff by Department

```sql
SELECT staff_id, staff_name, position, shift
FROM staff
WHERE department = 'Kitchen' AND is_active = TRUE
ORDER BY staff_name;
```

### 2. Get Cooking Logs with Filters

```sql
SELECT 
    lm.log_id,
    lm.menu_name,
    lm.cook_name,
    lm.department,
    lm.elapsed_time,
    lm.efficiency_level,
    DATE(lm.finished_time) as cook_date
FROM log_memasak lm
WHERE 
    lm.department = 'kitchen'
    AND DATE(lm.finished_time) >= '2025-11-01'
    AND DATE(lm.finished_time) <= '2025-11-30'
    AND lm.efficiency_level IN ('Very Fast', 'Fast')
ORDER BY lm.finished_time DESC;
```

### 3. Get Order with Items and Status

```sql
SELECT 
    o.order_id,
    o.customer_name,
    o.order_time,
    oi.menu_name,
    oi.quantity,
    oi.status,
    s.staff_name as cook_name,
    wa.waiter_name,
    wa.is_delivered
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
LEFT JOIN staff s ON oi.staff_id = s.staff_id
LEFT JOIN waiter_assignments wa ON oi.item_id = wa.item_id
WHERE o.order_id = 'R001';
```

### 4. Get Cook Performance Statistics

```sql
SELECT 
    cook_name,
    department,
    COUNT(*) as total_items,
    AVG(elapsed_time) as avg_time_seconds,
    MIN(elapsed_time) as fastest_time,
    MAX(elapsed_time) as slowest_time,
    SUM(CASE WHEN efficiency_level = 'Very Fast' THEN 1 ELSE 0 END) as very_fast_count,
    SUM(CASE WHEN efficiency_level = 'Fast' THEN 1 ELSE 0 END) as fast_count,
    SUM(CASE WHEN efficiency_level = 'Normal' THEN 1 ELSE 0 END) as normal_count,
    SUM(CASE WHEN efficiency_level = 'Slow' THEN 1 ELSE 0 END) as slow_count,
    SUM(CASE WHEN efficiency_level = 'Very Slow' THEN 1 ELSE 0 END) as very_slow_count
FROM log_memasak
WHERE DATE(finished_time) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY cook_name, department
ORDER BY avg_time_seconds ASC;
```

### 5. Get Menu Performance Statistics

```sql
SELECT 
    menu_name,
    department,
    COUNT(*) as order_count,
    AVG(elapsed_time) as avg_cooking_time,
    MIN(elapsed_time) as min_cooking_time,
    MAX(elapsed_time) as max_cooking_time
FROM log_memasak
WHERE DATE(finished_time) >= '2025-11-01'
GROUP BY menu_name, department
ORDER BY order_count DESC
LIMIT 10;
```

### 6. Get Waiter Delivery Statistics

```sql
SELECT 
    wa.waiter_name,
    COUNT(*) as total_deliveries,
    SUM(CASE WHEN wa.is_delivered THEN 1 ELSE 0 END) as completed_deliveries,
    AVG(TIMESTAMPDIFF(SECOND, wa.assigned_time, wa.delivered_time)) as avg_delivery_time_seconds
FROM waiter_assignments wa
WHERE DATE(wa.assigned_time) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    AND wa.is_delivered = TRUE
GROUP BY wa.waiter_name
ORDER BY completed_deliveries DESC;
```

### 7. Get Daily Order Summary

```sql
SELECT 
    DATE(o.order_time) as order_date,
    o.department,
    COUNT(DISTINCT o.order_id) as total_orders,
    COUNT(oi.item_id) as total_items,
    SUM(oi.quantity) as total_quantity,
    AVG(oi.elapsed_time) as avg_cooking_time
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE DATE(o.order_time) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY DATE(o.order_time), o.department
ORDER BY order_date DESC, o.department;
```

### 8. Get Staff Schedule for Today

```sql
SELECT 
    s.staff_id,
    s.staff_name,
    s.position,
    s.department,
    sc.shift,
    sc.is_present,
    sc.notes
FROM staff s
JOIN schedules sc ON s.staff_id = sc.staff_id
WHERE sc.work_date = CURDATE()
    AND s.is_active = TRUE
ORDER BY s.department, sc.shift, s.staff_name;
```

---

## 🚀 Migration dari localStorage ke Database

### Phase 1: Data Export

```javascript
// Export dari localStorage
const kitchenOrders = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');
const cookingLogs = JSON.parse(localStorage.getItem('cookingLogs') || '[]');
const staffList = JSON.parse(localStorage.getItem('staffManagementList') || '[]');

// Format untuk SQL INSERT
const sqlInserts = {
  orders: kitchenOrders.map(order => ({
    order_id: order.id,
    customer_name: order.orderName,
    order_time: order.orderTime,
    department: 'kitchen',
    status: 'completed'
  })),
  // ... similar for other tables
};
```

### Phase 2: API Integration

```typescript
// Replace localStorage calls dengan API calls
// Before:
const orders = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');

// After:
const orders = await fetch('/api/orders?department=kitchen').then(r => r.json());
```

---

## 📝 Notes & Best Practices

### 1. Data Denormalization

Beberapa field di-denormalize (menu_name, cook_name, waiter_name) untuk:
- ✅ Performance (menghindari JOIN berulang)
- ✅ Consistency (data tetap tersimpan walau source berubah)
- ⚠️ Trade-off: Storage space vs Query speed

### 2. Soft Delete

Staff menggunakan `is_active` flag bukan DELETE:
- ✅ Preserve historical data
- ✅ Analytics tetap valid
- ✅ Bisa di-reactivate

### 3. Cascade Delete

Foreign keys menggunakan CASCADE untuk:
- ✅ Auto-cleanup related data
- ✅ Maintain referential integrity
- ⚠️ Hati-hati dengan production data

### 4. Index Strategy

Indexes dibuat berdasarkan:
- 🔍 Frequent query filters (department, status, date)
- 🔗 Foreign keys (untuk JOIN performance)
- 📊 Analytics queries (efficiency_level, cook_name)

---

## 🔄 Changelog

### Version 3.0 (29 Nov 2025)
- ✨ Added staff table dengan auto-increment ID system
- ✨ Added waiter_assignments table (per-item assignment)
- ✨ Updated staff_id format (k1, b2, s3, w1)
- ✨ Added completed_time to orders table
- ✨ Enhanced indexes untuk analytics queries

### Version 2.0
- ✨ Added log_memasak table
- ✨ Added order_items table
- ✨ Separated orders dan items

### Version 1.0
- 🎉 Initial schema design

---

**Dokumentasi ini akan diupdate seiring perkembangan sistem.**

**Status:** ✅ Ready for Backend Implementation  
**Next Step:** API Development + Migration Script
