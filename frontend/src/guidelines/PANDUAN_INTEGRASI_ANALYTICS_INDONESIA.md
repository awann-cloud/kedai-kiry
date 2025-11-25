# 📊 Panduan Lengkap Sistem Analytics Efisiensi Memasak

## 📚 Daftar Isi

***DOKUMENTASI UTAMA***
Folder ini berisi dokumentasi lengkap untuk sistem analytics efisiensi memasak dan integrasinya dengan OrderContext.

---

## 📄 Dokumen yang Tersedia

### 1. **PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md** ⭐ MULAI DARI SINI
   - **Tujuan**: Panduan lengkap dalam Bahasa Indonesia
   - **Isi**:
     - Penjelasan sistem analytics
     - Integrasi dengan OrderContext
     - Format database SQL
     - Cara penggunaan
     - Troubleshooting
   - **Cocok untuk**: Pemahaman menyeluruh sistem

### 2. **FORMAT_DATABASE_SQL.md**
   - **Tujuan**: Spesifikasi struktur database
   - **Isi**:
     - Skema tabel lengkap
     - Relasi antar tabel
     - Query contoh
     - Migrasi data
   - **Cocok untuk**: Implementasi database backend

---

## 🚀 Mulai Cepat

### Untuk Pengguna:
1. Baca: **PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md** (file ini)
2. Buka halaman `/admin`
3. Scroll ke bagian analytics
4. Klik tombol toggle untuk melihat data real vs mock

### Untuk Developer:
1. Baca dokumentasi ini lengkap
2. Pelajari: **FORMAT_DATABASE_SQL.md**
3. Review kode di:
   - `/contexts/OrderContext.tsx`
   - `/contexts/StaffContext.tsx`
   - `/components/CookingAnalytics.tsx`
   - `/data/menuItemEfficiency.ts`

---

## ✅ Apakah Sistem Ini Bekerja?

**YA! Sistem analytics secara otomatis mengumpulkan data dari OrderContext.**

### Bagaimana Caranya:
1. Karyawan mulai dan selesai memasak (di Kitchen/Bar/Snack)
2. Sistem otomatis mendeteksi item yang selesai
3. Membuat log memasak dengan data timing
4. Update analytics secara real-time
5. Tidak perlu intervensi manual

### Fitur:
- ✅ Pelacakan otomatis
- ✅ Update real-time
- ✅ Pencegahan duplikat
- ✅ Toggle mock/real data
- ✅ Export CSV
- ✅ Klasifikasi efisiensi
- ✅ Kemampuan filtering

---

## 📊 Data yang Dilacak

Setiap kali karyawan selesai memasak item:

| Data Point | Sumber | Contoh |
|------------|--------|---------|
| Nama Menu | `item.name` | "Nasi Goreng" |
| Nama Cook | `item.staff` | "Juwita Mayasari" |
| Waktu Masak | Dihitung | 8 menit 45 detik |
| Departemen | Order dept | "kitchen" |
| Timestamp | `item.finishedTime` | 2024-11-21 10:25:25 |

---

## 🗄️ Format Database SQL

***STRUKTUR TABEL MENU***

### Tabel: `menu_items`

Berdasarkan screenshot database yang diberikan, berikut struktur lengkapnya:

```sql
CREATE TABLE menu_items (
    ID_Menu VARCHAR(10) PRIMARY KEY,
    Nama_Menu VARCHAR(100) NOT NULL,
    Kategori VARCHAR(50) NOT NULL,
    Harga DECIMAL(10,2) NOT NULL,
    Waktu_Cepat INT NOT NULL COMMENT 'Waktu memasak kategori cepat (detik)',
    Waktu_Normal INT NOT NULL COMMENT 'Waktu memasak kategori normal (detik)',
    Waktu_Lama INT NOT NULL COMMENT 'Waktu memasak kategori lama (detik)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Detail Kolom:

***ID_Menu (PRIMARY KEY)***
- Tipe: `VARCHAR(10)`
- Contoh: "MN001", "MN002", "MN003"
- Format: "MN" + 3 digit angka
- Constraint: UNIQUE, NOT NULL

***Nama_Menu***
- Tipe: `VARCHAR(100)`
- Contoh: "Thai Tea + Nusantara", "Air Hangat / Es Kosong"
- Deskripsi: Nama lengkap menu item

***Kategori***
- Tipe: `VARCHAR(50)`
- Nilai: "Minuman", "Makanan", "Snack"
- Mapping ke sistem:
  - "Minuman" → department: "bar"
  - "Makanan" → department: "kitchen"
  - "Snack" → department: "snack"

***Harga***
- Tipe: `DECIMAL(10,2)`
- Contoh: 17000.00, 2000.00, 8000.00
- Unit: Rupiah (IDR)

### Kolom Waktu Memasak:

***Waktu_Cepat***
- Tipe: `INT`
- Unit: Detik
- Contoh: 7 (7 detik), 5 (5 detik)
- Mapping: Preset "Very Fast"

***Waktu_Normal***
- Tipe: `INT`
- Unit: Detik
- Contoh: 8-17 (8 sampai 17 detik), 6-15 (6 sampai 15 detik)
- Mapping: Preset "Standard"

***Waktu_Lama***
- Tipe: `INT`
- Unit: Detik
- Contoh: 17, 15, 15
- Mapping: Preset "Extremely Slow"

---

### Tabel: `cooking_logs`

```sql
CREATE TABLE cooking_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    ID_Menu VARCHAR(10) NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    cook_name VARCHAR(100) NOT NULL,
    department VARCHAR(20) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    finish_time TIMESTAMP NOT NULL,
    duration_seconds INT GENERATED ALWAYS AS (TIMESTAMPDIFF(SECOND, start_time, finish_time)) STORED,
    efficiency_category VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Menu) REFERENCES menu_items(ID_Menu),
    INDEX idx_cook_name (cook_name),
    INDEX idx_department (department),
    INDEX idx_finish_time (finish_time)
);
```

### Detail Kolom Cooking Logs:

***log_id (PRIMARY KEY)***
- Tipe: `INT AUTO_INCREMENT`
- Generated otomatis

***ID_Menu (FOREIGN KEY)***
- Tipe: `VARCHAR(10)`
- Referensi: `menu_items.ID_Menu`
- Constraint: NOT NULL

***order_id***
- Tipe: `VARCHAR(50)`
- Format: "ORD-KITCHEN-001", "ORD-BAR-045"
- Unique per order item

***cook_name***
- Tipe: `VARCHAR(100)`
- Contoh: "Juwita Mayasari", "Budi Santoso"
- Dari: Staff database

***department***
- Tipe: `VARCHAR(20)`
- Nilai: "kitchen", "bar", "snack"
- Lowercase untuk consistency

***start_time***
- Tipe: `TIMESTAMP`
- Format: "YYYY-MM-DD HH:MM:SS"
- Contoh: "2024-11-21 10:15:30"

***finish_time***
- Tipe: `TIMESTAMP`
- Format: "YYYY-MM-DD HH:MM:SS"
- Contoh: "2024-11-21 10:23:45"

***duration_seconds (GENERATED COLUMN)***
- Tipe: `INT`
- Calculated: `TIMESTAMPDIFF(SECOND, start_time, finish_time)`
- Auto-update setiap ada perubahan

***efficiency_category***
- Tipe: `VARCHAR(20)`
- Nilai: "Sangat Cepat", "Cepat", "Normal", "Lambat", "Sangat Lambat"
- Nullable (dapat NULL)

---

### Tabel: `staff`

```sql
CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(100) NOT NULL,
    department VARCHAR(20) NOT NULL,
    pin_code VARCHAR(4) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_pin (department, pin_code),
    INDEX idx_department (department)
);
```

### Detail Kolom Staff:

***staff_id (PRIMARY KEY)***
- Tipe: `INT AUTO_INCREMENT`
- Generated otomatis

***nama_lengkap***
- Tipe: `VARCHAR(100)`
- Contoh: "Juwita Mayasari"
- NOT NULL

***department***
- Tipe: `VARCHAR(20)`
- Nilai: "kitchen", "bar", "snack", "checker"
- NOT NULL

***pin_code***
- Tipe: `VARCHAR(4)`
- Format: 4 digit angka
- Contoh: "1234", "5678"
- UNIQUE per department

***status***
- Tipe: `VARCHAR(20)`
- Nilai: "active", "inactive"
- Default: "active"

---

## 🔄 Mapping Data: Frontend ↔ Database

### Menu Items:

| Frontend Field | Database Column | Konversi |
|----------------|-----------------|----------|
| `name` | `Nama_Menu` | Direct |
| `department` | `Kategori` | "kitchen"→"Makanan", "bar"→"Minuman", "snack"→"Snack" |
| `presets[0].value` (Very Fast) | `Waktu_Cepat` | Direct (seconds) |
| `presets[2].value` (Standard) | `Waktu_Normal` | Direct (seconds) |
| `presets[4].value` (Extremely Slow) | `Waktu_Lama` | Direct (seconds) |

### Cooking Logs:

| Frontend State | Database Column | Konversi |
|----------------|-----------------|----------|
| `item.name` | `ID_Menu` | Lookup dari `menu_items` by `Nama_Menu` |
| `item.id` | `order_id` | Direct |
| `item.staff` | `cook_name` | Direct |
| `order.department` | `department` | Direct |
| `item.startedTime` | `start_time` | Convert Date to TIMESTAMP |
| `item.finishedTime` | `finish_time` | Convert Date to TIMESTAMP |
| Calculated | `duration_seconds` | Auto-generated |
| Calculated | `efficiency_category` | Based on algorithm |

---

## 📥 Contoh Query SQL

### Insert Menu Item:

```sql
INSERT INTO menu_items (ID_Menu, Nama_Menu, Kategori, Harga, Waktu_Cepat, Waktu_Normal, Waktu_Lama)
VALUES ('MN005', 'Nasi Goreng Special', 'Makanan', 25000.00, 300, 480, 900);
-- Waktu dalam detik: 5 menit, 8 menit, 15 menit
```

### Insert Cooking Log:

```sql
INSERT INTO cooking_logs (ID_Menu, order_id, cook_name, department, start_time, finish_time, efficiency_category)
VALUES (
    'MN001',
    'ORD-KITCHEN-123',
    'Juwita Mayasari',
    'kitchen',
    '2024-11-21 10:15:30',
    '2024-11-21 10:20:45',
    'Cepat'
);
```

### Query Analytics:

```sql
-- Mendapatkan rata-rata waktu memasak per koki
SELECT 
    cook_name,
    COUNT(*) as total_orders,
    AVG(duration_seconds) as avg_duration,
    MIN(duration_seconds) as fastest,
    MAX(duration_seconds) as slowest
FROM cooking_logs
WHERE department = 'kitchen'
GROUP BY cook_name
ORDER BY avg_duration ASC;
```

### Query Efficiency Distribution:

```sql
-- Distribusi kategori efisiensi
SELECT 
    efficiency_category,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cooking_logs), 2) as percentage
FROM cooking_logs
GROUP BY efficiency_category
ORDER BY 
    CASE efficiency_category
        WHEN 'Sangat Cepat' THEN 1
        WHEN 'Cepat' THEN 2
        WHEN 'Normal' THEN 3
        WHEN 'Lambat' THEN 4
        WHEN 'Sangat Lambat' THEN 5
    END;
```

### Query Menu Performance:

```sql
-- Performance per menu item
SELECT 
    m.Nama_Menu,
    m.Kategori,
    COUNT(cl.log_id) as times_cooked,
    AVG(cl.duration_seconds) as avg_duration,
    m.Waktu_Normal as expected_duration,
    ROUND(AVG(cl.duration_seconds) / m.Waktu_Normal * 100, 2) as efficiency_percentage
FROM menu_items m
LEFT JOIN cooking_logs cl ON m.ID_Menu = cl.ID_Menu
GROUP BY m.ID_Menu, m.Nama_Menu, m.Kategori, m.Waktu_Normal
ORDER BY times_cooked DESC;
```

---

## 🎯 File-File Penting

### File Baru (7):
1. `/data/cookingLogs.ts` - Data mock (35 records)
2. `/contexts/StaffContext.tsx` - Logic analytics + integrasi OrderContext
3. `/components/AnalyticsFilters.tsx` - UI Filter
4. `/components/EfficiencyChart.tsx` - Visualisasi Recharts
5. `/components/CookingAnalytics.tsx` - Komponen analytics utama
6. `/data/menuItemEfficiency.ts` - Sistem preset waktu memasak
7. File dokumentasi (folder ini)

### File yang Dimodifikasi (2):
1. `/App.tsx` - Tambahan StaffProvider wrapping
2. `/AdminHome.tsx` - Tambahan komponen CookingAnalytics

### Tidak Diubah:
- ❌ `/contexts/OrderContext.tsx` - **ZERO PERUBAHAN** (integrasi read-only)

---

## 🔄 Alur Data Lengkap

```
Halaman Kitchen/Bar/Snack
    ↓
Karyawan klik START → OrderContext catat startedTime
    ↓
Karyawan klik DONE → OrderContext catat finishedTime
    ↓
StaffContext deteksi (monitoring via useEffect)
    ↓
Otomatis buat cooking log
    ↓
Analytics update real-time
    ↓
Admin Dashboard tampilkan hasil
    ↓
[BACKEND] Data dikirim ke database MySQL
    ↓
[BACKEND] Query analytics dari database
```

---

## 🎨 Fitur UI

### Dashboard Admin (`/admin`):

### Bagian Header:
- Judul: "📊 Employees Cooking Efficiency"
- Tombol Toggle: Switch antara mock/real data
- Tombol Export CSV: Download data terfilter

### Bar Filter:
- Dropdown karyawan
- Dropdown menu item
- Dropdown level efisiensi
- Date picker range (mulai/akhir)

### Ringkasan Hasil:
- Jumlah record
- Indikator sumber data

### Visualisasi:
- Horizontal stacked bar chart
- Level efisiensi dengan kode warna
- Kartu statistik summary

### Tabel Data:
- Record detail (10 pertama)
- Kolom sortable
- Badge dengan kode warna
- Indikator pagination

---

## 🧪 Testing

### Skenario Test 1: Single Order
```
1. Buka /kitchen
2. Klik START pada item apa saja → Assign "Juwita"
3. Tunggu 10 detik
4. Klik DONE
5. Buka /admin
6. Toggle ke "Real Data Only" (tombol hijau)
7. ✅ Harus melihat 1 record untuk Juwita
```

### Skenario Test 2: Multiple Departments
```
1. Selesaikan 1 item di Kitchen
2. Selesaikan 1 item di Bar
3. Selesaikan 1 item di Snack
4. Buka /admin → Real Data Only
5. ✅ Harus melihat 3 record dari departemen berbeda
```

### Skenario Test 3: Filtering
```
1. Selesaikan beberapa order
2. Buka /admin
3. Filter berdasarkan karyawan tertentu
4. ✅ Harus melihat hanya record karyawan tersebut
```

---

## 🛠️ Detail Teknis

### Nesting Context:
```tsx
<OrderProvider>        // Manajemen order
  <StaffProvider>      // Analytics (baca dari OrderProvider)
    <Routes />
  </StaffProvider>
</OrderProvider>
```

### Metode Integrasi:
```typescript
// Di StaffContext.tsx
const { getAllOrders } = useOrders(); // Akses OrderContext

useEffect(() => {
  // Monitor item yang selesai
  const allDepartments = getAllOrders();
  
  // Proses item yang baru selesai
  // Buat cooking log otomatis
}, [getAllOrders]);
```

### Pencegahan Duplikat:
```typescript
const [trackedItems, setTrackedItems] = useState<Set<string>>(new Set());

if (!trackedItems.has(item.id)) {
  // Proses dan track
  setTrackedItems(prev => new Set(prev).add(item.id));
}
```

---

## 📈 Klasifikasi Efisiensi

### Algoritma:

***LANGKAH 1: Konversi ke Detik***
```typescript
// Convert semua waktu ke detik untuk perbandingan
const durationInSeconds = Math.floor((finishTime - startTime) / 1000);
```

***LANGKAH 2: Hitung Rata-rata per Menu***
```typescript
// Group berdasarkan nama menu
// Calculate average untuk setiap menu
const averages = calculateAveragesByMenu(allLogs);
```

***LANGKAH 3: Bandingkan Individual vs Rata-rata***
```typescript
// Ratio = Individual Time / Average Time
const ratio = individualTime / averageTime;
```

***LANGKAH 4: Klasifikasi***
```
Ratio ≤ 0.5  → "Sangat Cepat" (Very Fast)    🟢 #10b981
Ratio < 0.8  → "Cepat" (Fast)                🟢 #34d399
Ratio ≤ 1.2  → "Normal"                      🔵 #3b82f6
Ratio < 2.0  → "Lambat" (Slow)               🟠 #f59e0b
Ratio ≥ 2.0  → "Sangat Lambat" (Very Slow)   🔴 #ef4444
```

### Kode Warna:
- 🟢 **Sangat Cepat**: `#10b981` (Hijau Terang)
- 🟢 **Cepat**: `#34d399` (Hijau Muda)
- 🔵 **Normal**: `#3b82f6` (Biru)
- 🟠 **Lambat**: `#f59e0b` (Oranye)
- 🔴 **Sangat Lambat**: `#ef4444` (Merah)

---

## 💡 Manfaat Utama

### Untuk Manajemen:
- ✅ Track performa staff otomatis
- ✅ Identifikasi koki cepat/lambat
- ✅ Optimasi operasional dapur
- ✅ Keputusan berbasis data

### Untuk Development:
- ✅ Integrasi non-invasif
- ✅ Zero impact pada order management
- ✅ Clean separation of concerns
- ✅ Mudah maintenance

### Untuk Pengguna:
- ✅ Tidak ada pekerjaan tambahan
- ✅ Pengumpulan data otomatis
- ✅ Feedback real-time
- ✅ Visualisasi mudah dibaca

---

## 🔮 Peningkatan di Masa Depan

### Fitur Potensial:
1. **Persistent Storage**: Simpan log ke database
2. **Historical Trends**: Perbandingan minggu/bulan
3. **Real-Time Alerts**: Notifikasi saat waktu memasak melebihi rata-rata
4. **Leaderboards**: Gamifikasi untuk performa
5. **Shift Reports**: Ringkasan harian/mingguan
6. **Mobile View**: Chart responsif untuk tablet
7. **Push Notifications**: Milestone performa

### Strategi Implementasi:
Semua dapat ditambahkan tanpa memodifikasi mekanisme tracking inti atau OrderContext!

---

## 🤝 Kontribusi

Saat memodifikasi sistem analytics:

### LAKUKAN:
- ✅ Baca dari OrderContext saja
- ✅ Tambahkan fitur analytics baru
- ✅ Tingkatkan visualisasi
- ✅ Tambah filter lebih banyak

### JANGAN:
- ❌ Modifikasi OrderContext.tsx
- ❌ Ubah logic order management
- ❌ Rusak one-way data flow
- ❌ Hapus pencegahan duplikat

---

## 🐛 Troubleshooting

### Masalah: Tidak ada real data yang muncul
**Solusi**: 
1. Pastikan Anda sudah menyelesaikan order (START → DONE)
2. Toggle ke mode "Real Data Only" (tombol hijau)
3. Cek bahwa nama staff ter-assign saat start

### Masalah: Data tidak update
**Solusi**:
1. Refresh halaman
2. Cek console untuk error
3. Verifikasi OrderContext berfungsi dengan baik

### Masalah: Chart tidak muncul
**Solusi**:
1. Pastikan recharts ter-install
2. Cek bahwa ada data untuk ditampilkan
3. Coba filter berbeda

---

## 📞 Dukungan

Untuk pertanyaan atau masalah:
1. Baca dokumentasi di folder ini
2. Cek implementation guide
3. Review flow diagram
4. Periksa kode dengan comment

---

## 📝 Ringkasan

**Sistem cooking analytics sudah terintegrasi penuh dengan OrderContext dan secara otomatis melacak performa memasak saat staff menyelesaikan order secara real-time.**

- **Setup**: Complete ✅
- **Integrasi**: Otomatis ✅
- **Testing**: Siap ✅
- **Dokumentasi**: Lengkap ✅

**Gunakan sistem seperti biasa, dan analytics akan terbangun otomatis!** 🎉

---

## 📁 Hierarki Dokumen

```
/guidelines/PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md ⭐ (ANDA DI SINI)
    ↓ Detail di
/guidelines/FORMAT_DATABASE_SQL.md
    ↓ Referensi
/chart implementation hell fro kakak backend/README_ANALYTICS_INTEGRATION.md
    ↓ Detail di
/chart implementation hell fro kakak backend/IMPLEMENTATION_GUIDE_COOKING_ANALYTICS.md
```

**Mulai dengan file ⭐ ini untuk pemahaman tercepat!**
