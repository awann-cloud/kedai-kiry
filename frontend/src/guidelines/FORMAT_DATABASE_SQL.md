# 🗄️ Format Database SQL - Sistem Order Management & Analytics

## 📋 Daftar Isi

***DOKUMENTASI DATABASE***
File ini berisi spesifikasi lengkap struktur database SQL untuk sistem kitchen order management.

---

## 🎯 Overview

### Tabel Utama:
1. **menu_items** - Data menu dan waktu memasak
2. **cooking_logs** - Log histori memasak
3. **staff** - Data karyawan
4. **orders** - Data pesanan
5. **order_items** - Detail item dalam pesanan
6. **schedules** - Jadwal shift karyawan

---

## 📊 1. Tabel: menu_items

***STRUKTUR UTAMA***

### Definisi Tabel:

```sql
CREATE TABLE menu_items (
    -- Primary Key
    ID_Menu VARCHAR(10) PRIMARY KEY,
    
    -- Informasi Menu
    Nama_Menu VARCHAR(100) NOT NULL,
    Kategori VARCHAR(50) NOT NULL CHECK (Kategori IN ('Minuman', 'Makanan', 'Snack')),
    Harga DECIMAL(10,2) NOT NULL CHECK (Harga >= 0),
    
    -- Waktu Memasak (dalam detik)
    Waktu_Cepat INT NOT NULL CHECK (Waktu_Cepat > 0) COMMENT 'Preset: Very Fast',
    Waktu_Normal INT NOT NULL CHECK (Waktu_Normal > 0) COMMENT 'Preset: Standard',
    Waktu_Lama INT NOT NULL CHECK (Waktu_Lama > 0) COMMENT 'Preset: Extremely Slow',
    
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
  - `MN003` - Air Mineral
  - `MN004` - Mineral dus
- **Constraint**: UNIQUE, NOT NULL
- **Catatan**: Auto-increment manual (bukan AUTO_INCREMENT)

***Nama_Menu***
- **Tipe**: `VARCHAR(100)`
- **Contoh**: 
  - "Thai Tea + Nusantara"
  - "Air Hangat / Es Kosong"
  - "Nasi Goreng Special"
- **Constraint**: NOT NULL
- **Catatan**: Case-sensitive, bisa mengandung special characters

***Kategori***
- **Tipe**: `VARCHAR(50)`
- **Nilai Valid**: `"Minuman"`, `"Makanan"`, `"Snack"`
- **Mapping ke Department**:
  ```typescript
  // Frontend mapping
  "Minuman" → department: "bar"
  "Makanan" → department: "kitchen"
  "Snack"   → department: "snack"
  ```
- **Constraint**: CHECK constraint untuk validasi

***Harga***
- **Tipe**: `DECIMAL(10,2)`
- **Contoh**: 
  - `17000.00` - Thai Tea
  - `2000.00` - Air Hangat
  - `8000.00` - Air Mineral
  - `5000.00` - Mineral dus
- **Unit**: Rupiah (IDR)
- **Range**: 0 - 99,999,999.99
- **Constraint**: CHECK >= 0

### Kolom Waktu Memasak:

***Waktu_Cepat***
- **Tipe**: `INT`
- **Unit**: Detik
- **Mapping**: Preset "Very Fast" di frontend
- **Contoh berdasarkan screenshot**:
  - `7` detik (Thai Tea)
  - `5` detik (Air Hangat)
  - `5` detik (Air Mineral)
  - `5` detik (Mineral dus)
- **Constraint**: > 0
- **Catatan**: Waktu tercepat yang mungkin

***Waktu_Normal***
- **Tipe**: `INT`
- **Unit**: Detik
- **Mapping**: Preset "Standard" di frontend
- **Contoh berdasarkan screenshot**:
  - `8-17` → Store as `12` (rata-rata atau median)
  - `6-15` → Store as `10`
  - Atau gunakan nilai tengah range
- **Constraint**: >= Waktu_Cepat
- **Catatan**: Waktu standar yang diharapkan

***Waktu_Lama***
- **Tipe**: `INT`
- **Unit**: Detik
- **Mapping**: Preset "Extremely Slow" di frontend
- **Contoh berdasarkan screenshot**:
  - `17` detik
  - `15` detik
  - `15` detik
- **Constraint**: >= Waktu_Normal
- **Catatan**: Batas waktu maksimal yang dapat diterima

### Metadata Columns:

***created_at***
- **Tipe**: `TIMESTAMP`
- **Default**: `CURRENT_TIMESTAMP`
- **Catatan**: Auto-fill saat insert

***updated_at***
- **Tipe**: `TIMESTAMP`
- **Default**: `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
- **Catatan**: Auto-update saat ada perubahan

***is_active***
- **Tipe**: `BOOLEAN` (TINYINT(1))
- **Default**: `TRUE`
- **Nilai**: `0` (inactive), `1` (active)
- **Catatan**: Soft delete, menu tidak benar-benar dihapus

---

### Contoh Data (dari screenshot):

```sql
INSERT INTO menu_items (ID_Menu, Nama_Menu, Kategori, Harga, Waktu_Cepat, Waktu_Normal, Waktu_Lama) VALUES
('MN001', 'Thai Tea + Nusantara', 'Minuman', 17000.00, 7, 12, 17),
('MN002', 'Air Hangat / Es Kosong', 'Minuman', 2000.00, 5, 10, 15),
('MN003', 'Air Mineral', 'Minuman', 8000.00, 5, 10, 15),
('MN004', 'Mineral dus', 'Minuman', 5000.00, 5, 10, 15);
```

### Interpretasi Range dari Screenshot:

***Kolom "Waktu_Normal" di screenshot menunjukkan range (e.g., "8-17")***

**Opsi 1: Store sebagai 2 kolom**
```sql
ALTER TABLE menu_items 
ADD COLUMN Waktu_Normal_Min INT,
ADD COLUMN Waktu_Normal_Max INT;
```

**Opsi 2: Store nilai tengah (RECOMMENDED)**
```sql
-- Untuk "8-17", store 12 atau 13
-- Lebih simple untuk analytics
UPDATE menu_items 
SET Waktu_Normal = (8 + 17) / 2 
WHERE ID_Menu = 'MN001';
```

**Opsi 3: Store sebagai JSON (MySQL 5.7+)**
```sql
ALTER TABLE menu_items 
ADD COLUMN waktu_details JSON;

-- Store: {"cepat": 7, "normal": {"min": 8, "max": 17}, "lama": 17}
```

---

## 📝 2. Tabel: cooking_logs

***LOG HISTORI MEMASAK***

### Definisi Tabel:

```sql
CREATE TABLE cooking_logs (
    -- Primary Key
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Keys
    ID_Menu VARCHAR(10) NOT NULL,
    staff_id INT NOT NULL,
    order_item_id BIGINT,
    
    -- Order Info
    order_id VARCHAR(50) NOT NULL,
    department VARCHAR(20) NOT NULL,
    
    -- Timing Data
    start_time TIMESTAMP NOT NULL,
    finish_time TIMESTAMP NOT NULL,
    duration_seconds INT GENERATED ALWAYS AS (TIMESTAMPDIFF(SECOND, start_time, finish_time)) STORED,
    
    -- Performance Metrics
    efficiency_category VARCHAR(20),
    efficiency_ratio DECIMAL(5,2),
    expected_duration INT COMMENT 'Waktu_Normal dari menu_items',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (ID_Menu) REFERENCES menu_items(ID_Menu) ON DELETE RESTRICT,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE RESTRICT,
    
    -- Indexes untuk performa query
    INDEX idx_cook_staff (staff_id),
    INDEX idx_menu (ID_Menu),
    INDEX idx_department (department),
    INDEX idx_finish_time (finish_time),
    INDEX idx_efficiency (efficiency_category),
    INDEX idx_order (order_id),
    
    -- Composite indexes untuk analytics queries
    INDEX idx_staff_menu (staff_id, ID_Menu),
    INDEX idx_dept_date (department, finish_time),
    
    -- Constraints
    CONSTRAINT chk_time_order CHECK (finish_time > start_time),
    CONSTRAINT chk_dept CHECK (department IN ('kitchen', 'bar', 'snack'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***log_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`
- **Range**: 1 - 9,223,372,036,854,775,807
- **Catatan**: Auto-increment, unique untuk setiap log

***ID_Menu*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Referensi**: `menu_items.ID_Menu`
- **Constraint**: NOT NULL, RESTRICT on delete
- **Contoh**: `'MN001'`, `'MN002'`

***staff_id*** (FOREIGN KEY)
- **Tipe**: `INT`
- **Referensi**: `staff.staff_id`
- **Constraint**: NOT NULL, RESTRICT on delete
- **Catatan**: Link ke tabel staff

***order_item_id***
- **Tipe**: `BIGINT`
- **Nullable**: YES
- **Referensi**: `order_items.item_id` (jika ada tabel order_items)
- **Catatan**: Untuk traceability ke specific order item

***order_id***
- **Tipe**: `VARCHAR(50)`
- **Format**: `"ORD-KITCHEN-001"`, `"ORD-BAR-045"`
- **Constraint**: NOT NULL
- **Catatan**: Readable order identifier

***department***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"kitchen"`, `"bar"`, `"snack"`
- **Constraint**: CHECK constraint, NOT NULL
- **Catatan**: Lowercase untuk consistency

### Timing Columns:

***start_time***
- **Tipe**: `TIMESTAMP`
- **Format**: `"YYYY-MM-DD HH:MM:SS"`
- **Contoh**: `"2024-11-21 10:15:30"`
- **Constraint**: NOT NULL
- **Catatan**: Saat karyawan klik START

***finish_time***
- **Tipe**: `TIMESTAMP`
- **Format**: `"YYYY-MM-DD HH:MM:SS"`
- **Contoh**: `"2024-11-21 10:23:45"`
- **Constraint**: NOT NULL, > start_time
- **Catatan**: Saat karyawan klik DONE

***duration_seconds*** (GENERATED COLUMN)
- **Tipe**: `INT`
- **Formula**: `TIMESTAMPDIFF(SECOND, start_time, finish_time)`
- **Contoh**: `495` (8 menit 15 detik)
- **Catatan**: Auto-calculated, tidak bisa di-insert manual
- **Storage**: STORED (tersimpan di disk, lebih cepat query)

### Performance Metrics:

***efficiency_category***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: 
  - `"Sangat Cepat"` - Very Fast
  - `"Cepat"` - Fast
  - `"Normal"` - Normal
  - `"Lambat"` - Slow
  - `"Sangat Lambat"` - Very Slow
- **Nullable**: YES
- **Catatan**: Calculated by application logic

***efficiency_ratio***
- **Tipe**: `DECIMAL(5,2)`
- **Format**: `1.25` (artinya 125% dari waktu normal)
- **Range**: `0.00` - `999.99`
- **Nullable**: YES
- **Formula**: `duration_seconds / expected_duration`

***expected_duration***
- **Tipe**: `INT`
- **Unit**: Detik
- **Sumber**: `Waktu_Normal` dari `menu_items`
- **Nullable**: YES
- **Catatan**: Snapshot nilai pada saat cooking, bukan reference

---

### Contoh Insert:

```sql
-- Insert cooking log
INSERT INTO cooking_logs (
    ID_Menu, 
    staff_id, 
    order_id, 
    department, 
    start_time, 
    finish_time, 
    efficiency_category,
    efficiency_ratio,
    expected_duration
)
VALUES (
    'MN001',                        -- Thai Tea
    1,                              -- Juwita Mayasari
    'ORD-BAR-123',
    'bar',
    '2024-11-21 10:15:30',
    '2024-11-21 10:20:45',          -- 5 min 15 sec = 315 sec
    'Cepat',                        -- Calculated
    0.88,                           -- 315 / 360 = 0.875
    360                             -- 6 minutes expected
);
```

---

## 👥 3. Tabel: staff

***DATA KARYAWAN***

### Definisi Tabel:

```sql
CREATE TABLE staff (
    -- Primary Key
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Informasi Personal
    nama_lengkap VARCHAR(100) NOT NULL,
    department VARCHAR(20) NOT NULL,
    role VARCHAR(20) DEFAULT 'cook',
    
    -- Autentikasi
    pin_code VARCHAR(4) NOT NULL,
    
    -- Kontak
    phone VARCHAR(15),
    email VARCHAR(100),
    
    -- Employment Info
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    UNIQUE KEY unique_pin (department, pin_code),
    CONSTRAINT chk_dept CHECK (department IN ('kitchen', 'bar', 'snack', 'checker', 'waiter')),
    CONSTRAINT chk_status CHECK (status IN ('active', 'inactive', 'on_leave')),
    CONSTRAINT chk_pin CHECK (pin_code REGEXP '^[0-9]{4}$'),
    
    -- Indexes
    INDEX idx_department (department),
    INDEX idx_status (status),
    INDEX idx_nama (nama_lengkap)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***staff_id*** (PRIMARY KEY)
- **Tipe**: `INT AUTO_INCREMENT`
- **Range**: 1 - 2,147,483,647
- **Catatan**: Auto-increment

***nama_lengkap***
- **Tipe**: `VARCHAR(100)`
- **Contoh**: `"Juwita Mayasari"`, `"Budi Santoso"`
- **Constraint**: NOT NULL
- **Catatan**: Full name dengan proper capitalization

***department***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"kitchen"`, `"bar"`, `"snack"`, `"checker"`, `"waiter"`
- **Constraint**: CHECK constraint, NOT NULL

***role***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"cook"`, `"waiter"`, `"checker"`, `"manager"`
- **Default**: `"cook"`
- **Catatan**: Berbeda dengan department (1 department bisa punya banyak role)

***pin_code***
- **Tipe**: `VARCHAR(4)`
- **Format**: 4 digit angka (`"1234"`, `"5678"`)
- **Constraint**: 
  - UNIQUE per department
  - REGEX `^[0-9]{4}$`
  - NOT NULL
- **Catatan**: Untuk PIN entry authentication

***phone***
- **Tipe**: `VARCHAR(15)`
- **Format**: `"+62812XXXXXXXX"` atau `"08XXXXXXXXXX"`
- **Nullable**: YES

***email***
- **Tipe**: `VARCHAR(100)`
- **Format**: Valid email address
- **Nullable**: YES

***hire_date***
- **Tipe**: `DATE`
- **Format**: `"YYYY-MM-DD"`
- **Contoh**: `"2024-01-15"`
- **Nullable**: YES

***status***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"active"`, `"inactive"`, `"on_leave"`
- **Default**: `"active"`
- **Catatan**: Untuk filter staff yang aktif

---

### Contoh Data:

```sql
INSERT INTO staff (nama_lengkap, department, role, pin_code, phone, hire_date) VALUES
('Juwita Mayasari', 'kitchen', 'cook', '1234', '+628123456789', '2023-01-15'),
('Budi Santoso', 'kitchen', 'cook', '5678', '+628198765432', '2023-02-01'),
('Siti Nurhaliza', 'bar', 'cook', '1234', '+628111111111', '2023-03-10'),
('Ahmad Dahlan', 'snack', 'cook', '1234', '+628122222222', '2023-04-05'),
('Rina Wijaya', 'checker', 'checker', '9999', '+628133333333', '2023-05-20');
```

---

## 🧾 4. Tabel: orders

***HEADER PESANAN***

### Definisi Tabel:

```sql
CREATE TABLE orders (
    -- Primary Key
    order_id VARCHAR(50) PRIMARY KEY,
    
    -- Order Info
    table_number INT,
    department VARCHAR(20) NOT NULL,
    
    -- Status Tracking
    status VARCHAR(20) DEFAULT 'not_started',
    
    -- Staff Assignment
    assigned_waiter_id INT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    
    -- Totals
    total_items INT DEFAULT 0,
    total_amount DECIMAL(10,2),
    
    -- Foreign Keys
    FOREIGN KEY (assigned_waiter_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
    
    -- Constraints
    CONSTRAINT chk_dept CHECK (department IN ('kitchen', 'bar', 'snack')),
    CONSTRAINT chk_status CHECK (status IN ('not_started', 'in_progress', 'finished', 'delivered')),
    
    -- Indexes
    INDEX idx_table (table_number),
    INDEX idx_status (status),
    INDEX idx_dept (department),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***order_id*** (PRIMARY KEY)
- **Tipe**: `VARCHAR(50)`
- **Format**: `"ORD-{DEPT}-{NUMBER}"`
- **Contoh**: `"ORD-KITCHEN-001"`, `"ORD-BAR-045"`
- **Constraint**: UNIQUE, NOT NULL

***table_number***
- **Tipe**: `INT`
- **Range**: 1 - 999
- **Nullable**: YES (takeaway orders bisa NULL)

***department***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"kitchen"`, `"bar"`, `"snack"`
- **Constraint**: CHECK constraint

***status***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: 
  - `"not_started"` - Belum mulai
  - `"in_progress"` - Sedang dikerjakan
  - `"finished"` - Selesai masak
  - `"delivered"` - Sudah diantar
- **Default**: `"not_started"`

***assigned_waiter_id*** (FOREIGN KEY)
- **Tipe**: `INT`
- **Referensi**: `staff.staff_id`
- **Nullable**: YES (NULL = belum assign waiter)
- **On Delete**: SET NULL

### Timestamp Columns:

***created_at***
- **Tipe**: `TIMESTAMP`
- **Default**: `CURRENT_TIMESTAMP`
- **Catatan**: Saat order dibuat

***started_at***
- **Tipe**: `TIMESTAMP NULL`
- **Catatan**: Saat first item mulai dimasak

***completed_at***
- **Tipe**: `TIMESTAMP NULL`
- **Catatan**: Saat all items selesai

***delivered_at***
- **Tipe**: `TIMESTAMP NULL`
- **Catatan**: Saat waiter deliver ke meja

---

## 📦 5. Tabel: order_items

***DETAIL ITEM DALAM PESANAN***

### Definisi Tabel:

```sql
CREATE TABLE order_items (
    -- Primary Key
    item_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Keys
    order_id VARCHAR(50) NOT NULL,
    ID_Menu VARCHAR(10) NOT NULL,
    assigned_cook_id INT,
    
    -- Item Info
    quantity INT DEFAULT 1,
    item_status VARCHAR(20) DEFAULT 'not_started',
    
    -- Timing
    started_time TIMESTAMP NULL,
    finished_time TIMESTAMP NULL,
    
    -- Pricing
    unit_price DECIMAL(10,2),
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (ID_Menu) REFERENCES menu_items(ID_Menu) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_cook_id) REFERENCES staff(staff_id) ON DELETE SET NULL,
    
    -- Constraints
    CONSTRAINT chk_item_status CHECK (item_status IN ('not_started', 'in_progress', 'finished')),
    CONSTRAINT chk_quantity CHECK (quantity > 0),
    
    -- Indexes
    INDEX idx_order (order_id),
    INDEX idx_menu (ID_Menu),
    INDEX idx_cook (assigned_cook_id),
    INDEX idx_status (item_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***item_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`
- **Catatan**: Unique ID untuk setiap item

***order_id*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(50)`
- **Referensi**: `orders.order_id`
- **On Delete**: CASCADE (hapus order = hapus items)

***ID_Menu*** (FOREIGN KEY)
- **Tipe**: `VARCHAR(10)`
- **Referensi**: `menu_items.ID_Menu`
- **On Delete**: RESTRICT (tidak bisa hapus menu yang sedang diorder)

***assigned_cook_id*** (FOREIGN KEY)
- **Tipe**: `INT`
- **Referensi**: `staff.staff_id`
- **Nullable**: YES
- **On Delete**: SET NULL

***quantity***
- **Tipe**: `INT`
- **Default**: `1`
- **Constraint**: > 0

***item_status***
- **Tipe**: `VARCHAR(20)`
- **Nilai**: `"not_started"`, `"in_progress"`, `"finished"`
- **Default**: `"not_started"`

***started_time***
- **Tipe**: `TIMESTAMP NULL`
- **Catatan**: Saat cook klik START

***finished_time***
- **Tipe**: `TIMESTAMP NULL`
- **Catatan**: Saat cook klik DONE

***unit_price***
- **Tipe**: `DECIMAL(10,2)`
- **Catatan**: Snapshot harga saat order (bisa beda dengan harga current)

***subtotal*** (GENERATED COLUMN)
- **Tipe**: `DECIMAL(10,2)`
- **Formula**: `quantity * unit_price`
- **Storage**: STORED

---

## 📅 6. Tabel: schedules

***JADWAL SHIFT KARYAWAN***

### Definisi Tabel:

```sql
CREATE TABLE schedules (
    -- Primary Key
    schedule_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Foreign Key
    staff_id INT NOT NULL,
    
    -- Date & Time
    work_date DATE NOT NULL,
    day_of_week VARCHAR(10) NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    
    -- Status
    is_working BOOLEAN DEFAULT TRUE,
    leave_reason VARCHAR(200),
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_day CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
    CONSTRAINT chk_shift CHECK (shift_end > shift_start),
    
    -- Indexes
    UNIQUE KEY unique_staff_date (staff_id, work_date),
    INDEX idx_date (work_date),
    INDEX idx_staff (staff_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Detail Kolom:

***schedule_id*** (PRIMARY KEY)
- **Tipe**: `BIGINT AUTO_INCREMENT`

***staff_id*** (FOREIGN KEY)
- **Tipe**: `INT`
- **Referensi**: `staff.staff_id`
- **On Delete**: CASCADE

***work_date***
- **Tipe**: `DATE`
- **Format**: `"YYYY-MM-DD"`
- **Constraint**: UNIQUE per staff

***day_of_week***
- **Tipe**: `VARCHAR(10)`
- **Nilai**: `"monday"`, `"tuesday"`, ..., `"sunday"`
- **Catatan**: Lowercase untuk consistency

***shift_start***
- **Tipe**: `TIME`
- **Format**: `"HH:MM:SS"`
- **Contoh**: `"08:00:00"`, `"14:00:00"`

***shift_end***
- **Tipe**: `TIME`
- **Format**: `"HH:MM:SS"`
- **Contoh**: `"16:00:00"`, `"22:00:00"`
- **Constraint**: > shift_start

***is_working***
- **Tipe**: `BOOLEAN`
- **Default**: `TRUE`
- **Catatan**: FALSE = cuti/off

***leave_reason***
- **Tipe**: `VARCHAR(200)`
- **Nullable**: YES
- **Contoh**: `"Sakit"`, `"Cuti Tahunan"`, `"Izin Keluarga"`

---

## 🔗 Relasi Antar Tabel

### Entity Relationship Diagram (ERD):

```
menu_items (1) ──────< (N) order_items
    │                       │
    │                       │
    │                  (N) >──────< (1) orders
    │                                   │
    └──< (N) cooking_logs               │
             │                          │
             │                          │
    staff (1)├──> (N) cooking_logs     │
             │                          │
             ├──> (N) order_items       │
             │                          │
             ├──> (N) orders (waiter)   │
             │                          │
             └──> (N) schedules
```

### Penjelasan Relasi:

***menu_items → order_items*** (1:N)
- Satu menu item bisa ada di banyak order items
- Foreign Key: `order_items.ID_Menu`

***orders → order_items*** (1:N)
- Satu order bisa punya banyak items
- Foreign Key: `order_items.order_id`
- Cascade delete: Hapus order = hapus items

***menu_items → cooking_logs*** (1:N)
- Satu menu bisa punya banyak cooking logs
- Foreign Key: `cooking_logs.ID_Menu`

***staff → cooking_logs*** (1:N)
- Satu staff bisa punya banyak cooking logs
- Foreign Key: `cooking_logs.staff_id`

***staff → order_items*** (1:N)
- Satu cook bisa di-assign ke banyak items
- Foreign Key: `order_items.assigned_cook_id`

***staff → orders*** (1:N)
- Satu waiter bisa di-assign ke banyak orders
- Foreign Key: `orders.assigned_waiter_id`

***staff → schedules*** (1:N)
- Satu staff punya banyak schedule entries
- Foreign Key: `schedules.staff_id`
- Cascade delete: Hapus staff = hapus schedules

---

## 📈 Query Analytics Penting

### 1. Average Cooking Time per Cook:

```sql
SELECT 
    s.nama_lengkap AS cook_name,
    s.department,
    COUNT(cl.log_id) AS total_orders_completed,
    AVG(cl.duration_seconds) AS avg_duration_seconds,
    ROUND(AVG(cl.duration_seconds) / 60, 2) AS avg_duration_minutes,
    MIN(cl.duration_seconds) AS fastest_time,
    MAX(cl.duration_seconds) AS slowest_time
FROM staff s
INNER JOIN cooking_logs cl ON s.staff_id = cl.staff_id
WHERE s.department IN ('kitchen', 'bar', 'snack')
AND cl.finish_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY s.staff_id, s.nama_lengkap, s.department
ORDER BY avg_duration_seconds ASC;
```

### 2. Efficiency Distribution:

```sql
SELECT 
    efficiency_category,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cooking_logs), 2) AS percentage,
    AVG(duration_seconds) AS avg_duration,
    AVG(efficiency_ratio) AS avg_ratio
FROM cooking_logs
WHERE finish_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY efficiency_category
ORDER BY 
    CASE efficiency_category
        WHEN 'Sangat Cepat' THEN 1
        WHEN 'Cepat' THEN 2
        WHEN 'Normal' THEN 3
        WHEN 'Lambat' THEN 4
        WHEN 'Sangat Lambat' THEN 5
        ELSE 6
    END;
```

### 3. Menu Performance:

```sql
SELECT 
    m.Nama_Menu,
    m.Kategori,
    m.Waktu_Normal AS expected_seconds,
    COUNT(cl.log_id) AS times_cooked,
    AVG(cl.duration_seconds) AS avg_actual_seconds,
    ROUND(AVG(cl.duration_seconds) / m.Waktu_Normal * 100, 2) AS performance_percentage,
    MIN(cl.duration_seconds) AS best_time,
    MAX(cl.duration_seconds) AS worst_time
FROM menu_items m
LEFT JOIN cooking_logs cl ON m.ID_Menu = cl.ID_Menu
WHERE m.is_active = TRUE
AND (cl.finish_time >= DATE_SUB(NOW(), INTERVAL 30 DAY) OR cl.finish_time IS NULL)
GROUP BY m.ID_Menu, m.Nama_Menu, m.Kategori, m.Waktu_Normal
HAVING times_cooked > 0
ORDER BY times_cooked DESC;
```

### 4. Daily Department Summary:

```sql
SELECT 
    DATE(finish_time) AS date,
    department,
    COUNT(*) AS total_items_cooked,
    COUNT(DISTINCT staff_id) AS cooks_working,
    AVG(duration_seconds) AS avg_duration,
    SUM(CASE WHEN efficiency_category IN ('Sangat Cepat', 'Cepat') THEN 1 ELSE 0 END) AS fast_items,
    SUM(CASE WHEN efficiency_category = 'Normal' THEN 1 ELSE 0 END) AS normal_items,
    SUM(CASE WHEN efficiency_category IN ('Lambat', 'Sangat Lambat') THEN 1 ELSE 0 END) AS slow_items
FROM cooking_logs
WHERE finish_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(finish_time), department
ORDER BY date DESC, department;
```

### 5. Cook Leaderboard:

```sql
SELECT 
    s.nama_lengkap,
    s.department,
    COUNT(cl.log_id) AS total_completed,
    SUM(CASE WHEN cl.efficiency_category = 'Sangat Cepat' THEN 1 ELSE 0 END) AS very_fast_count,
    SUM(CASE WHEN cl.efficiency_category = 'Cepat' THEN 1 ELSE 0 END) AS fast_count,
    SUM(CASE WHEN cl.efficiency_category = 'Normal' THEN 1 ELSE 0 END) AS normal_count,
    SUM(CASE WHEN cl.efficiency_category = 'Lambat' THEN 1 ELSE 0 END) AS slow_count,
    SUM(CASE WHEN cl.efficiency_category = 'Sangat Lambat' THEN 1 ELSE 0 END) AS very_slow_count,
    AVG(cl.efficiency_ratio) AS avg_efficiency_ratio,
    -- Score calculation: very fast = 5 points, fast = 4, normal = 3, slow = 2, very slow = 1
    SUM(
        CASE cl.efficiency_category
            WHEN 'Sangat Cepat' THEN 5
            WHEN 'Cepat' THEN 4
            WHEN 'Normal' THEN 3
            WHEN 'Lambat' THEN 2
            WHEN 'Sangat Lambat' THEN 1
            ELSE 0
        END
    ) AS total_score
FROM staff s
INNER JOIN cooking_logs cl ON s.staff_id = cl.staff_id
WHERE cl.finish_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY s.staff_id, s.nama_lengkap, s.department
HAVING total_completed >= 10
ORDER BY total_score DESC, avg_efficiency_ratio ASC
LIMIT 20;
```

### 6. Hourly Peak Analysis:

```sql
SELECT 
    HOUR(finish_time) AS hour,
    department,
    COUNT(*) AS items_completed,
    AVG(duration_seconds) AS avg_duration,
    COUNT(DISTINCT staff_id) AS cooks_active
FROM cooking_logs
WHERE finish_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY HOUR(finish_time), department
ORDER BY hour, department;
```

---

## 🔄 Trigger & Stored Procedures

### Trigger 1: Auto-create Cooking Log

***Trigger untuk otomatis membuat cooking log saat order_item selesai***

```sql
DELIMITER //

CREATE TRIGGER after_order_item_finished
AFTER UPDATE ON order_items
FOR EACH ROW
BEGIN
    -- Check if status changed to 'finished' and has timing data
    IF NEW.item_status = 'finished' 
       AND OLD.item_status != 'finished'
       AND NEW.started_time IS NOT NULL 
       AND NEW.finished_time IS NOT NULL 
       AND NEW.assigned_cook_id IS NOT NULL THEN
        
        -- Get expected duration from menu_items
        SET @expected_dur = (
            SELECT Waktu_Normal 
            FROM menu_items 
            WHERE ID_Menu = NEW.ID_Menu
        );
        
        -- Calculate efficiency ratio
        SET @actual_dur = TIMESTAMPDIFF(SECOND, NEW.started_time, NEW.finished_time);
        SET @eff_ratio = @actual_dur / @expected_dur;
        
        -- Determine efficiency category
        SET @eff_category = CASE
            WHEN @eff_ratio <= 0.5 THEN 'Sangat Cepat'
            WHEN @eff_ratio < 0.8 THEN 'Cepat'
            WHEN @eff_ratio <= 1.2 THEN 'Normal'
            WHEN @eff_ratio < 2.0 THEN 'Lambat'
            ELSE 'Sangat Lambat'
        END;
        
        -- Get department from order
        SET @dept = (
            SELECT department 
            FROM orders 
            WHERE order_id = NEW.order_id
        );
        
        -- Insert cooking log
        INSERT INTO cooking_logs (
            ID_Menu,
            staff_id,
            order_item_id,
            order_id,
            department,
            start_time,
            finish_time,
            efficiency_category,
            efficiency_ratio,
            expected_duration
        ) VALUES (
            NEW.ID_Menu,
            NEW.assigned_cook_id,
            NEW.item_id,
            NEW.order_id,
            @dept,
            NEW.started_time,
            NEW.finished_time,
            @eff_category,
            @eff_ratio,
            @expected_dur
        );
    END IF;
END//

DELIMITER ;
```

### Trigger 2: Update Order Status

```sql
DELIMITER //

CREATE TRIGGER after_order_items_change
AFTER UPDATE ON order_items
FOR EACH ROW
BEGIN
    DECLARE total_items INT;
    DECLARE finished_items INT;
    DECLARE started_items INT;
    
    -- Count items in this order
    SELECT COUNT(*), 
           SUM(CASE WHEN item_status = 'finished' THEN 1 ELSE 0 END),
           SUM(CASE WHEN item_status IN ('in_progress', 'finished') THEN 1 ELSE 0 END)
    INTO total_items, finished_items, started_items
    FROM order_items
    WHERE order_id = NEW.order_id;
    
    -- Update order status based on items
    IF finished_items = total_items THEN
        -- All items finished
        UPDATE orders 
        SET status = 'finished',
            completed_at = NOW()
        WHERE order_id = NEW.order_id 
        AND status != 'finished';
        
    ELSEIF started_items > 0 THEN
        -- At least one item started
        UPDATE orders 
        SET status = 'in_progress',
            started_at = COALESCE(started_at, NOW())
        WHERE order_id = NEW.order_id 
        AND status = 'not_started';
    END IF;
END//

DELIMITER ;
```

### Stored Procedure: Calculate Staff Performance

```sql
DELIMITER //

CREATE PROCEDURE calculate_staff_performance(
    IN p_staff_id INT,
    IN p_days INT,
    OUT p_avg_duration DECIMAL(10,2),
    OUT p_total_orders INT,
    OUT p_efficiency_score DECIMAL(5,2)
)
BEGIN
    SELECT 
        AVG(duration_seconds),
        COUNT(*),
        AVG(efficiency_ratio)
    INTO 
        p_avg_duration,
        p_total_orders,
        p_efficiency_score
    FROM cooking_logs
    WHERE staff_id = p_staff_id
    AND finish_time >= DATE_SUB(NOW(), INTERVAL p_days DAY);
END//

DELIMITER ;
```

### Usage Example:

```sql
-- Call stored procedure
CALL calculate_staff_performance(1, 30, @avg, @total, @score);

-- Display results
SELECT 
    @avg AS average_duration_seconds,
    @total AS total_orders_completed,
    @score AS efficiency_score;
```

---

## 📊 Views untuk Analytics

### View 1: Staff Performance Summary

```sql
CREATE OR REPLACE VIEW v_staff_performance AS
SELECT 
    s.staff_id,
    s.nama_lengkap,
    s.department,
    COUNT(cl.log_id) AS total_orders,
    AVG(cl.duration_seconds) AS avg_duration,
    AVG(cl.efficiency_ratio) AS avg_efficiency_ratio,
    SUM(CASE WHEN cl.efficiency_category IN ('Sangat Cepat', 'Cepat') THEN 1 ELSE 0 END) AS fast_orders,
    SUM(CASE WHEN cl.efficiency_category IN ('Lambat', 'Sangat Lambat') THEN 1 ELSE 0 END) AS slow_orders,
    MIN(cl.finish_time) AS first_order_date,
    MAX(cl.finish_time) AS last_order_date
FROM staff s
LEFT JOIN cooking_logs cl ON s.staff_id = cl.staff_id
WHERE s.status = 'active'
GROUP BY s.staff_id, s.nama_lengkap, s.department;
```

### View 2: Menu Popularity & Performance

```sql
CREATE OR REPLACE VIEW v_menu_analytics AS
SELECT 
    m.ID_Menu,
    m.Nama_Menu,
    m.Kategori,
    m.Harga,
    m.Waktu_Normal AS expected_duration,
    COUNT(DISTINCT oi.order_id) AS times_ordered,
    COALESCE(SUM(oi.quantity), 0) AS total_quantity_ordered,
    COUNT(cl.log_id) AS times_cooked,
    AVG(cl.duration_seconds) AS avg_cooking_time,
    AVG(cl.efficiency_ratio) AS avg_efficiency_ratio,
    MIN(cl.duration_seconds) AS best_time,
    MAX(cl.duration_seconds) AS worst_time
FROM menu_items m
LEFT JOIN order_items oi ON m.ID_Menu = oi.ID_Menu
LEFT JOIN cooking_logs cl ON m.ID_Menu = cl.ID_Menu
WHERE m.is_active = TRUE
GROUP BY m.ID_Menu, m.Nama_Menu, m.Kategori, m.Harga, m.Waktu_Normal;
```

### View 3: Daily Department Stats

```sql
CREATE OR REPLACE VIEW v_daily_department_stats AS
SELECT 
    DATE(cl.finish_time) AS date,
    cl.department,
    COUNT(*) AS items_completed,
    COUNT(DISTINCT cl.staff_id) AS unique_cooks,
    COUNT(DISTINCT cl.ID_Menu) AS unique_menus,
    AVG(cl.duration_seconds) AS avg_duration,
    MIN(cl.duration_seconds) AS min_duration,
    MAX(cl.duration_seconds) AS max_duration,
    SUM(CASE WHEN cl.efficiency_category = 'Sangat Cepat' THEN 1 ELSE 0 END) AS very_fast_count,
    SUM(CASE WHEN cl.efficiency_category = 'Cepat' THEN 1 ELSE 0 END) AS fast_count,
    SUM(CASE WHEN cl.efficiency_category = 'Normal' THEN 1 ELSE 0 END) AS normal_count,
    SUM(CASE WHEN cl.efficiency_category = 'Lambat' THEN 1 ELSE 0 END) AS slow_count,
    SUM(CASE WHEN cl.efficiency_category = 'Sangat Lambat' THEN 1 ELSE 0 END) AS very_slow_count
FROM cooking_logs cl
GROUP BY DATE(cl.finish_time), cl.department;
```

---

## 🔒 Security & Permissions

### Recommended User Roles:

```sql
-- Role 1: Admin (full access)
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON kitchen_db.* TO 'admin_user'@'localhost';

-- Role 2: Application (read/write data, no DDL)
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'app_password';
GRANT SELECT, INSERT, UPDATE ON kitchen_db.* TO 'app_user'@'localhost';
GRANT DELETE ON kitchen_db.cooking_logs TO 'app_user'@'localhost';
GRANT DELETE ON kitchen_db.order_items TO 'app_user'@'localhost';

-- Role 3: Analytics (read-only)
CREATE USER 'analytics_user'@'localhost' IDENTIFIED BY 'analytics_password';
GRANT SELECT ON kitchen_db.* TO 'analytics_user'@'localhost';
GRANT SELECT ON kitchen_db.v_staff_performance TO 'analytics_user'@'localhost';
GRANT SELECT ON kitchen_db.v_menu_analytics TO 'analytics_user'@'localhost';
GRANT SELECT ON kitchen_db.v_daily_department_stats TO 'analytics_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

---

## 🚀 Migration Script

### Script untuk membuat semua tabel:

```sql
-- Database Creation
CREATE DATABASE IF NOT EXISTS kitchen_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE kitchen_db;

-- Drop tables if exist (for clean migration)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS cooking_logs;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS menu_items;
SET FOREIGN_KEY_CHECKS = 1;

-- Create tables (order matters for foreign keys)
-- 1. menu_items (no dependencies)
CREATE TABLE menu_items ( /* ... full definition above ... */ );

-- 2. staff (no dependencies)
CREATE TABLE staff ( /* ... full definition above ... */ );

-- 3. orders (depends on staff)
CREATE TABLE orders ( /* ... full definition above ... */ );

-- 4. order_items (depends on orders, menu_items, staff)
CREATE TABLE order_items ( /* ... full definition above ... */ );

-- 5. cooking_logs (depends on menu_items, staff)
CREATE TABLE cooking_logs ( /* ... full definition above ... */ );

-- 6. schedules (depends on staff)
CREATE TABLE schedules ( /* ... full definition above ... */ );

-- Create views
-- v_staff_performance
-- v_menu_analytics
-- v_daily_department_stats

-- Create triggers
-- after_order_item_finished
-- after_order_items_change

-- Create stored procedures
-- calculate_staff_performance

-- Insert sample data
-- (Use the example inserts from above)
```

---

## 📝 Catatan Penting

### Performance Optimization:

***1. Indexing Strategy***
- Primary keys di-index otomatis
- Foreign keys harus di-index
- Kolom yang sering di-WHERE clause harus di-index
- Composite indexes untuk multi-column queries

***2. Partitioning (untuk data besar)***
```sql
-- Partition cooking_logs by month
ALTER TABLE cooking_logs
PARTITION BY RANGE (YEAR(finish_time) * 100 + MONTH(finish_time)) (
    PARTITION p202401 VALUES LESS THAN (202402),
    PARTITION p202402 VALUES LESS THAN (202403),
    -- ... add more partitions as needed
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

***3. Archive Old Data***
```sql
-- Archive logs older than 1 year
CREATE TABLE cooking_logs_archive LIKE cooking_logs;

INSERT INTO cooking_logs_archive
SELECT * FROM cooking_logs
WHERE finish_time < DATE_SUB(NOW(), INTERVAL 1 YEAR);

DELETE FROM cooking_logs
WHERE finish_time < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

### Data Integrity:

***1. Regular Backups***
```bash
# Daily backup
mysqldump -u admin_user -p kitchen_db > backup_$(date +%Y%m%d).sql

# Backup specific tables
mysqldump -u admin_user -p kitchen_db menu_items staff > backup_core_$(date +%Y%m%d).sql
```

***2. Data Validation***
- Gunakan CHECK constraints
- Gunakan triggers untuk validasi complex
- Validasi juga di application layer

***3. Monitoring***
```sql
-- Check for orphaned records
SELECT * FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL;

-- Check for negative durations
SELECT * FROM cooking_logs
WHERE duration_seconds < 0;

-- Check for missing efficiency categories
SELECT * FROM cooking_logs
WHERE efficiency_category IS NULL
AND finish_time IS NOT NULL;
```

---

## 🎓 Best Practices

### DO:
- ✅ Gunakan transactions untuk operasi multi-table
- ✅ Index foreign keys
- ✅ Gunakan prepared statements (mencegah SQL injection)
- ✅ Validate data di application layer
- ✅ Log important changes
- ✅ Regular backups
- ✅ Monitor query performance

### DON'T:
- ❌ Store passwords in plain text
- ❌ Delete data without backup
- ❌ Ignore foreign key constraints
- ❌ Use SELECT * in production
- ❌ Hardcode database credentials
- ❌ Ignore error logs
- ❌ Skip index optimization

---

## 📞 Support

Untuk pertanyaan tentang struktur database:
1. Review dokumentasi ini
2. Check ERD dan relationships
3. Test queries di development environment
4. Consult dengan DBA team

---

**Dokumentasi ini adalah spesifikasi lengkap untuk implementasi database backend sistem kitchen order management.** 🎉
