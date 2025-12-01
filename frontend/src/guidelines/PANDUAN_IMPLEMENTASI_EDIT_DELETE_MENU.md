# Panduan Implementasi Edit & Delete Item Menu

## Status Saat Ini
**Status:** KOSMETIK SAJA - Belum Diimplementasikan

Fungsionalitas Edit dan Delete di AdminMenuManagement.tsx saat ini hanya menampilkan dialog tetapi TIDAK benar-benar memodifikasi data apapun. Ketika Anda mencoba menyimpan perubahan, akan muncul alert: "This is cosmetic, it keeps crashing when I implement it T-T"

## Mengapa Hanya Kosmetik
Implementasi menyebabkan crash karena kompleksitas dalam menjaga konsistensi data di berbagai sistem yang saling terhubung:
- Konfigurasi item menu
- Pesanan aktif di berbagai departemen
- Log histori memasak
- Data analitik efisiensi
- Preset dan standar waktu

## File yang Terlibat
- `/AdminMenuManagement.tsx` - Halaman utama manajemen menu dengan three-dot menu
- `/components/admin/MenuItemEditDialog.tsx` - Dialog edit (kosmetik)
- `/components/admin/MenuItemDeleteDialog.tsx` - Dialog delete (kosmetik)
- `/data/menuItemsUtils.ts` - Utilities untuk discovery menu
- `/data/menuItemEfficiency.ts` - Manajemen konfigurasi
- `/data/*Orders.ts` - Item menu spesifik per departemen
- `/contexts/OrderContext.tsx` - Manajemen pesanan runtime

## Cara Implementasi yang Benar

### 1. Fungsionalitas Edit Item Menu

#### Sumber Data yang Perlu Diupdate
Ketika mengedit item menu (nama atau kategori), Anda harus mengupdate:

**A. File Data Menu Statis**
```typescript
// /data/makananOrders.ts, /data/barOrders.ts, /data/snackOrders.ts
export const makananMenuItems = [
  "Nasi Goreng",  // Jika ini diedit, update di sini
  "Mie Goreng",
  // ...
];
```

**B. Konfigurasi Efisiensi**
```typescript
// /data/menuItemEfficiency.ts
// Update saved configs di localStorage
const configs = loadSavedConfigs();
// Cari dan update config dengan nama lama
// Re-key dengan nama baru jika nama berubah
// Update department jika kategori berubah
saveConfigs(updatedConfigs);
```

**C. Pesanan Aktif di OrderContext**
```typescript
// /contexts/OrderContext.tsx
// Update semua pesanan yang mengandung item menu ini
orders.forEach(order => {
  order.items.forEach(item => {
    if (item.name === oldName) {
      item.name = newName;
      // Jika kategori berubah, mungkin perlu pindah ke departemen berbeda
    }
  });
});
```

**D. Log Histori Memasak**
```typescript
// /data/cookingLogs.ts
// Opsional: update data histori untuk konsistensi
cookingLogs.forEach(log => {
  if (log.itemName === oldName) {
    log.itemName = newName;
  }
});
```

#### Langkah-langkah Implementasi
1. **Validasi**
   - Cek apakah nama baru sudah ada di kategori target
   - Pastikan nama tidak kosong
   - Konfirmasi kategori valid

2. **Urutan Update**
   ```typescript
   async handleEdit(oldName: string, newName: string, newCategory: "Kitchen" | "Bar" | "Snack") {
     // 1. Update array menu statis
     updateMenuArray(oldName, newName, newCategory);
     
     // 2. Update efficiency configs
     updateEfficiencyConfigs(oldName, newName, newCategory);
     
     // 3. Update pesanan aktif
     updateActiveOrders(oldName, newName, newCategory);
     
     // 4. Update cooking logs (opsional)
     updateCookingLogs(oldName, newName);
     
     // 5. Persist semua perubahan
     saveAllData();
     
     // 6. Force re-render/re-discovery
     window.location.reload(); // atau gunakan state management
   }
   ```

3. **Edge Cases yang Perlu Ditangani**
   - Memindahkan item antar kategori (Kitchen → Bar)
   - Update item yang sedang dimasak
   - Menjaga konsistensi data timing
   - Menangani nama duplikat

### 2. Fungsionalitas Delete Item Menu

#### Pertimbangan Kritis
Menghapus item menu lebih kompleks karena:
- Pesanan aktif mungkin mengandung item ini
- Analitik histori bergantung pada item ini
- Konfigurasi efisiensi mereferensi item ini

#### Dua Pendekatan

**Pendekatan A: Soft Delete (Direkomendasikan)**
- Tandai item sebagai "diarsipkan" atau "tidak aktif"
- Simpan di data histori
- Hapus dari menu aktif
- Jaga integritas analitik

```typescript
interface MenuItemConfig {
  itemName: string;
  department: string;
  isArchived?: boolean; // Tambahkan flag ini
  // ...
}
```

**Pendekatan B: Hard Delete (Berbahaya)**
- Hapus sepenuhnya dari semua sistem
- Dapat merusak analitik histori
- Memerlukan cleanup ekstensif

#### Langkah-langkah Implementasi (Soft Delete)
1. **Tandai Sebagai Diarsipkan**
   ```typescript
   async handleDelete(itemName: string) {
     // 1. Update efficiency config
     const config = getConfigForItem(itemName);
     config.isArchived = true;
     saveConfigs();
     
     // 2. Hapus dari menu aktif
     removeFromMenuArrays(itemName);
     
     // 3. Simpan di data histori (JANGAN DIHAPUS)
     // cookingLogs tetap tidak berubah
     
     // 4. Tangani pesanan aktif
     // Opsi 1: Biarkan selesai
     // Opsi 2: Cancel pesanan yang mengandung item ini
     // Opsi 3: Tanya user apa yang harus dilakukan
     
     // 5. Update discovery untuk filter item yang diarsipkan
     // menuItemsUtils.ts harus skip item isArchived
   }
   ```

2. **Update Logika Discovery**
   ```typescript
   // /data/menuItemsUtils.ts
   export function discoverAllMenuItems(): DiscoveredMenuItem[] {
     const allItems = [...];
     
     // Filter item yang diarsipkan
     return allItems.filter(item => {
       const config = getConfigForItem(item.name);
       return !config?.isArchived;
     });
   }
   ```

#### Langkah-langkah Implementasi (Hard Delete)
⚠️ **PERINGATAN:** Pendekatan ini dapat merusak analitik dan menyebabkan inkonsistensi data.

```typescript
async handleHardDelete(itemName: string) {
  // 1. Hapus dari semua array menu
  removeFromAllMenuArrays(itemName);
  
  // 2. Hapus efficiency config
  deleteConfigForItem(itemName);
  
  // 3. Hapus dari pesanan aktif
  removeFromActiveOrders(itemName);
  
  // 4. OPSIONAL hapus dari cooking logs (TIDAK DIREKOMENDASIKAN)
  // Ini merusak analitik histori!
  
  // 5. Cleanup referensi lainnya
  cleanupReferences(itemName);
}
```

### 3. Tantangan State Management

#### Masalah Inti
Item menu ada di berbagai tempat:
1. **Array statis** (`/data/*Orders.ts`)
2. **Runtime state** (`OrderContext`)
3. **Persistent config** (`localStorage` via `menuItemEfficiency.ts`)
4. **Log histori** (`cookingLogs.ts`)

Setiap perubahan harus dipropagasi ke SEMUA lokasi secara atomik.

#### Solusi yang Direkomendasikan: Centralized Menu Service

Buat file baru `/data/menuItemService.ts`:

```typescript
export class MenuItemService {
  // Single source of truth
  private static instance: MenuItemService;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new MenuItemService();
    }
    return this.instance;
  }
  
  async editMenuItem(
    oldName: string, 
    newName: string, 
    newCategory: "Kitchen" | "Bar" | "Snack"
  ): Promise<void> {
    // Operasi atomik - semua berhasil atau semua gagal
    try {
      // 1. Validasi
      this.validateEdit(oldName, newName, newCategory);
      
      // 2. Mulai transaksi
      const transaction = new Transaction();
      
      // 3. Update semua sistem
      transaction.add(() => this.updateMenuArrays(oldName, newName, newCategory));
      transaction.add(() => this.updateConfigs(oldName, newName, newCategory));
      transaction.add(() => this.updateActiveOrders(oldName, newName, newCategory));
      
      // 4. Commit atau rollback
      await transaction.commit();
      
      // 5. Notifikasi observers
      this.notifyChange({ type: 'EDIT', oldName, newName, newCategory });
      
    } catch (error) {
      console.error('Gagal mengedit item menu:', error);
      throw error;
    }
  }
  
  async deleteMenuItem(itemName: string, mode: 'soft' | 'hard' = 'soft'): Promise<void> {
    // Operasi atomik serupa
  }
}
```

### 4. Rekomendasi Alur UI

#### Alur Edit
1. User klik Edit → Dialog terbuka dengan nilai saat ini
2. User memodifikasi nama/kategori
3. User klik Save
4. **Tampilkan loading state** ("Mengupdate item menu...")
5. Lakukan atomic update
6. **Tampilkan konfirmasi** ("Berhasil diupdate!")
7. Refresh daftar menu ATAU update state secara optimistic
8. **Jika gagal:** Tampilkan error dan kembalikan perubahan

#### Alur Delete
1. User klik Delete → Dialog konfirmasi muncul
2. **Peringatan jelas:** "Ini akan mempengaruhi X pesanan aktif"
3. User konfirmasi
4. **Tanya:** "Simpan data histori?" (Soft vs Hard delete)
5. **Tampilkan loading state** ("Menghapus item menu...")
6. Lakukan operasi delete
7. **Tampilkan konfirmasi**
8. Update UI

### 5. Checklist Testing

Sebelum implementasi, pastikan Anda dapat menangani:
- [ ] Edit nama item saja
- [ ] Edit kategori item saja
- [ ] Edit nama dan kategori sekaligus
- [ ] Edit item yang ada di pesanan aktif
- [ ] Edit item yang sedang dimasak saat ini
- [ ] Edit item dengan custom efficiency config
- [ ] Delete item tanpa pesanan aktif
- [ ] Delete item yang ada di pesanan aktif
- [ ] Delete item yang sedang dimasak
- [ ] Delete item dengan data histori
- [ ] Mencegah nama duplikat di kategori yang sama
- [ ] Rollback saat partial failure
- [ ] Edit concurrent (dua admin edit bersamaan)

### 6. Alternatif: Database Backend

Solusi SEBENARNYA adalah pindah dari static arrays + localStorage ke database yang proper:

```typescript
// Dengan Supabase atau sejenisnya
const supabase = createClient(url, key);

// Single source of truth
await supabase
  .from('menu_items')
  .update({ name: newName, category: newCategory })
  .eq('name', oldName);

// Semua query pull dari database
const { data: menuItems } = await supabase
  .from('menu_items')
  .select('*')
  .eq('is_archived', false);
```

Ini mengeliminasi masalah sync sepenuhnya.

## Kesimpulan

**Mengapa terus crash:**
- Terlalu banyak sumber data untuk disinkronkan
- Tidak ada dukungan atomic transaction
- Kompleksitas state management
- Risiko inkonsistensi data

**Yang diperlukan untuk implementasi yang benar:**
1. Centralized service layer
2. Dukungan transaction/rollback  
3. Validasi komprehensif
4. Error handling yang proper
5. Sinkronisasi state
6. **ATAU:** Migrasi ke database backend

**Estimasi effort:** 
- Quick hack: 2-4 jam (akan buggy)
- Implementasi proper: 8-12 jam
- Migrasi database: 16-24 jam (tapi paling robust)

Untuk saat ini, versi kosmetik menampilkan UX yang diinginkan tanpa risiko korupsi data.
