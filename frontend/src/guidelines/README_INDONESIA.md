# 🍳 Kitchen Order Management System

**Sistem Manajemen Pesanan Dapur - Dokumentasi Lengkap**

**Versi:** 3.0 (Staff Management Integration)  
**Terakhir Diupdate:** 29 November 2025  
**Status:** ✅ Production Ready (Frontend)

---

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Fitur Utama](#fitur-utama)
3. [Teknologi](#teknologi)
4. [Struktur Sistem](#struktur-sistem)
5. [Quick Start](#quick-start)
6. [Dokumentasi](#dokumentasi)
7. [Changelog](#changelog)
8. [Roadmap](#roadmap)

---

## 🎯 Overview

**Kitchen Order Management System** adalah aplikasi web untuk mengelola pesanan restoran dengan tiga departemen terpisah (Kitchen, Bar, Snack) dan sistem monitoring terpusat (Checker). Sistem ini dirancang untuk tablet landscape (1024px × 768px) dengan fokus pada efisiensi operasional dan pelacakan performa memasak.

### Konsep Utama

```
ORDER FLOW:
Customer Order → Department (Kitchen/Bar/Snack) → Cook Assignment → 
Cooking Process → Order Complete → Checker Assignment → Waiter Delivery

DATA FLOW:
OrderContext → localStorage → Analytics → Admin Dashboard
```

---

## ✨ Fitur Utama

### 1. **Three-Status Workflow**

```
NOT STARTED → ON THEIR WAY → FINISHED
```

Setiap menu item mengalir melalui 3 status dengan pelacakan waktu real-time:
- ✅ **NOT STARTED** - Item belum dimulai
- ⏳ **ON THEIR WAY** - Item sedang dimasak
- 🟢 **FINISHED** - Item selesai dimasak

### 2. **Multi-Department System**

| Department | Type | Menu Category |
|-----------|------|---------------|
| 🍳 **Kitchen** | Makanan | Nasi goreng, mie goreng, etc. |
| 🍹 **Bar** | Minuman | Thai tea, juice, coffee, etc. |
| 🍿 **Snack** | Snack | Kentang goreng, nugget, etc. |
| ✅ **Checker** | Monitoring | View all + assign waiters |

### 3. **Cook Assignment System**

- ✅ Assign cook ke setiap menu item
- ✅ Track siapa yang memasak apa
- ✅ Pelacakan waktu mulai dan selesai
- ✅ Data tersimpan untuk analytics

### 4. **Per-Item Waiter Assignment**

- ✅ Assign waiter ke **setiap item** (bukan per-receipt)
- ✅ "Assign All" button untuk efisiensi
- ✅ Track delivery time per-item
- ✅ Flexible delivery workflow

### 5. **Staff Management System**

- ✅ **CRUD Operations** (Create, Read, Update, Delete)
- ✅ **Auto-Increment ID** per departemen (k1, b2, s3, w1)
- ✅ **Active/Inactive Status** (soft delete)
- ✅ **Shift Management** (Pagi, Siang, Malam)
- ✅ **localStorage Integration** dengan SelectCookPanel/SelectWaiterPanel

### 6. **Cooking Analytics Dashboard**

- 📊 **Efficiency Classification** (Very Fast, Fast, Normal, Slow, Very Slow)
- 🔍 **5 Filter Capabilities**:
  1. Filter by cook name
  2. Filter by menu item
  3. Filter by department
  4. Filter by date range
  5. Filter by efficiency level
- ⏱️ **Quick Filters**: Yesterday, Today, This Week, This Month
- 📈 **Recharts Visualization**
- 💾 **Export to CSV**

### 7. **Menu Performance Review**

- 📋 Aggregated menu statistics
- 🏆 Top performers by frequency
- ⏱️ Average cooking times
- 📊 Bar chart visualization
- 💾 Export to CSV

### 8. **Raw Database View**

- 📄 View all order data (table/card mode)
- 🔍 Advanced filtering
- 👥 Employee tab (consolidated waiter + cook data)
- 📊 Delivery timing statistics
- 💾 Export functionality

---

## 🛠️ Teknologi

### Frontend Stack

```json
{
  "framework": "React 18 with TypeScript",
  "styling": "Tailwind CSS v4.0",
  "routing": "React Router v6",
  "charts": "Recharts",
  "icons": "Lucide React",
  "state": "Context API (OrderContext, StaffContext, WaiterContext)",
  "storage": "localStorage (temporary)"
}
```

### Design System

```css
/* Color Palette */
--primary: #4D236E;           /* Deep purple */
--receipt-card: #8b6dac;      /* Light purple */
--overlay: rgba(126,42,126,0.3);
--overlay-hover: rgba(126,42,126,0.46);

/* Typography */
font-family: 'Poppins', sans-serif;

/* Target Device */
device: Tablet Landscape (1024px × 768px)
```

---

## 🏗️ Struktur Sistem

### Context Provider Hierarchy

```
<OrderProvider>          ← Root (Order data & timing)
  <StaffProvider>        ← Middle (Staff data & analytics)
    <WaiterProvider>     ← Inner (Waiter assignment)
      <App />
    </WaiterProvider>
  </StaffProvider>
</OrderProvider>
```

### Data Flow Architecture

```
User Action (Department/Checker/Admin)
  ↓
Context Update (OrderContext/StaffContext/WaiterContext)
  ↓
localStorage Write
  ↓
Component Re-render
  ↓
UI Update (Real-time sync across all pages)
```

### localStorage Schema

```typescript
// Order data (per department)
kitchenOrders: Order[]
barOrders: Order[]
snackOrders: Order[]

// Analytics data
cookingLogs: CookingLog[]

// Staff data
staffManagementList: StaffMember[]
```

---

## 🚀 Quick Start

### 1. Installation (Figma Make)

Sistem ini sudah berjalan di Figma Make environment. Tidak perlu instalasi manual.

### 2. Login

```
URL: /
Options: 
  - Display Mode (View only)
  - Admin Mode (Full access)
```

### 3. Navigation

#### Department Workflow

```
Home → Select Department (Kitchen/Bar/Snack) → 
PIN Entry → Department Orders Page → 
Manage Orders (Start/Finish items)
```

#### Checker Workflow

```
Home → Checker → PIN Entry → 
Checker Home (Statistics) → 
Select Department or View All → 
Assign Waiters → Mark Delivered
```

#### Admin Workflow

```
Home → Admin → Admin Dashboard
Sidebar Options:
  - 🏠 Home (Analytics)
  - 👥 Staff Management
  - 🍽️ Menu Management
  - 📊 Raw Database
```

---

## 📚 Dokumentasi

### Panduan Lengkap

| File | Description |
|------|-------------|
| [CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md) | Dokumentasi kode lengkap sistem |
| [DATA_SYSTEM_GUIDE.md](./DATA_SYSTEM_GUIDE.md) | Panduan struktur data & localStorage |
| [FORMAT_DATABASE_SQL.md](./FORMAT_DATABASE_SQL.md) | Schema SQL untuk backend migration |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick reference untuk developer |
| [WAITER_CONTEXT_GUIDE.md](./WAITER_CONTEXT_GUIDE.md) | Panduan WaiterContext & per-item assignment |
| [PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md](./PANDUAN_INTEGRASI_ANALYTICS_INDONESIA.md) | Panduan analytics system |

### Changelog

| File | Description |
|------|-------------|
| [CHANGELOG_INDONESIA.md](../changelog/CHANGELOG_INDONESIA.md) | Changelog sistem lengkap |
| [CHANGELOG_WAITER_ASSIGNMENT_PER_ITEM_ID.md](../changelog/CHANGELOG_WAITER_ASSIGNMENT_PER_ITEM_ID.md) | Changelog per-item assignment |

---

## 🔄 Changelog Highlights

### Version 3.0 (29 Nov 2025) - Current

#### ✨ Staff Management System
- ✅ Complete CRUD operations di AdminStaffManagement
- ✅ Auto-increment ID system per departemen (k1, b2, s3, w1)
- ✅ localStorage integration dengan SelectCookPanel & SelectWaiterPanel
- ✅ Active/Inactive status toggle
- ✅ Shift management (Pagi, Siang, Malam)

#### ✨ Quick Filters Update
- ✅ Changed filters: ~~This Week, This Month, This Year~~
- ✅ New filters: **Yesterday, Today, This Week, This Month**
- ✅ Applied to: CookingAnalytics, MenuReview, AdminRawDatabase

#### ✅ Bug Fixes
- ✅ Fixed SelectWaiterPanel loading from localStorage (not hardcoded data)
- ✅ Fixed department mapping consistency
- ✅ Cleaned up invalid staff IDs (NaN, "005")

### Version 2.0 (29 Nov 2025)

#### ✨ Per-Item Waiter Assignment
- ✅ Changed from receipt-level to item-level assignment
- ✅ Added "Assign All" button with auto-hide logic
- ✅ Per-item delivery tracking
- ✅ Updated all Checker pages

#### ✨ WaiterContext Separation
- ✅ Separated waiter logic from OrderContext
- ✅ Created dedicated WaiterContext
- ✅ Modular code architecture

#### ✨ Employee Raw Database Tab
- ✅ Consolidated Waiter + Employee tabs
- ✅ Delivery timing statistics
- ✅ Per-item waiter assignment display

### Version 1.0

#### 🎉 Initial Release
- ✅ Three-department system (Kitchen, Bar, Snack)
- ✅ Checker monitoring system
- ✅ Basic analytics dashboard
- ✅ Timing data tracking

---

## 🗺️ Roadmap

### Phase 1: Backend Integration (In Progress)

- [ ] Develop REST API dengan struktur data existing
- [ ] Replace localStorage dengan database calls
- [ ] Implement authentication system
- [ ] Add real-time sync via WebSocket

### Phase 2: Enhanced Features

- [ ] Mobile responsive design
- [ ] Push notifications
- [ ] Staff scheduling system
- [ ] Revenue tracking
- [ ] Advanced reporting

### Phase 3: Scale & Optimize

- [ ] Multi-location support
- [ ] Performance optimization
- [ ] Caching strategy
- [ ] Load balancing

---

## 📖 User Guide

### Department Staff (Kitchen/Bar/Snack)

#### Start Your Shift

1. Navigate to Home page
2. Click your department button (MAKANAN/BAR/SNACK)
3. Enter PIN (default: 1234)
4. You're now in Department Orders page

#### Manage Orders

1. **View Orders**: Orders are grouped into 3 categories:
   - 🟢 **FINISHED** - All items done
   - 🟠 **ON THEIR WAY** - Some items in progress
   - 🔴 **NOT STARTED** - All items waiting

2. **Start Item**:
   - Click "Start" button on item
   - Select your name from cook panel
   - Item status → "ON THEIR WAY"

3. **Finish Item**:
   - Click "Finish" button on item
   - Item status → "FINISHED"
   - Time is automatically recorded

4. **Complete Order**:
   - When all items finished
   - Order moves to FINISHED category
   - Data saved to analytics

### Checker Staff

#### Start Your Shift

1. Navigate to Home page
2. Click CHECKER button
3. Enter PIN (default: 1234)
4. You're now in Checker Home

#### Monitor Orders

1. **View Statistics**:
   - See overview of all departments
   - Check pending orders count
   - Monitor completion status

2. **Select Department**:
   - Click department button (Makanan/Bar/Snack)
   - Or click "ALL" to see combined view

#### Assign Waiters

1. **Find Completed Order**:
   - Look for orders with all items FINISHED
   - Green "Assign" buttons visible

2. **Assign Per-Item**:
   - Click "Assign" on specific item
   - SelectWaiterPanel slides in
   - Select waiter from list
   - Button changes to "Delivered"

3. **Assign All Items**:
   - If all items unassigned
   - Click "Assign All" button
   - Select waiter once
   - All items assigned to same waiter

4. **Mark Delivered**:
   - Click "Delivered" button
   - Delivery time recorded
   - Item marked as delivered

### Admin Staff

#### Access Admin Dashboard

1. Navigate to Home page
2. Click "Admin" in login page
3. You're now in Admin Dashboard

#### Use Sidebar Navigation

- 🏠 **Home** - Cooking Analytics Dashboard
- 👥 **Staff Management** - CRUD operations
- 🍽️ **Menu Management** - Menu configuration
- 📊 **Raw Database** - View all data

#### Staff Management

1. **Add New Staff**:
   - Click "Add New Staff"
   - Fill form (name, department, position, shift, phone)
   - ID auto-generated (k1, b2, s3, w1)
   - Click "Save"

2. **Edit Staff**:
   - Click edit icon (✏️)
   - Modify fields
   - Click "Save Changes"

3. **Toggle Active/Inactive**:
   - Click "Deactivate" button
   - Staff won't appear in SelectPanel
   - Can reactivate anytime

4. **Delete Staff**:
   - Click delete icon (🗑️)
   - Confirm deletion
   - Data permanently removed

#### View Analytics

1. **Cooking Efficiency**:
   - Default view on Home
   - See efficiency classification
   - Use quick filters (Yesterday, Today, Week, Month)
   - Apply advanced filters
   - Export to CSV

2. **Menu Review**:
   - Switch to Menu Review tab
   - See top performing menus
   - Average cooking times
   - Export data

3. **Raw Database**:
   - Click "Raw Database" in sidebar
   - Switch between Table/Card view
   - Filter by department, date, etc.
   - Export data

---

## 🎨 UI Components Guide

### Receipt Card

```
┌─────────────────────────────┐
│ ORDER R001 - Budi          │
│ 10:30:00                   │
├─────────────────────────────┤
│ ☐ Nasi Goreng (2)          │
│   [Start] [Assign Cook]    │
│                            │
│ ☑ Thai Tea (1)             │
│   Ahmad - 05:30            │
│   [Assign Waiter]          │
└─────────────────────────────┘
```

### Status Circles

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ FINISHED │  │ ON THEIR │  │   NOT    │
│    5     │  │   WAY    │  │ STARTED  │
│          │  │    3     │  │    8     │
└──────────┘  └──────────┘  └──────────┘
```

### SelectCookPanel

```
┌─────────────────────────────┐
│  ✨ Assign Cook             │
│  Order R001 - Nasi Goreng  │
├─────────────────────────────┤
│  🔍 Search cook...          │
├─────────────────────────────┤
│  ☑ Ahmad Hidayat (k1)      │
│     Cook • Kitchen          │
│                             │
│  ☑ Rina Susanti (k2)       │
│     Cook • Kitchen          │
│                             │
│  ☐ Budi Santoso (k3)       │
│     Cook • Kitchen          │
│     [Inactive]              │
└─────────────────────────────┘
```

---

## 🔒 Security Notes

### Current Implementation

- ⚠️ PIN system is **placeholder** (not secure)
- ⚠️ localStorage is **client-side** (no encryption)
- ⚠️ No authentication/authorization layer

### For Production

- ✅ Implement proper JWT authentication
- ✅ Add role-based access control (RBAC)
- ✅ Encrypt sensitive data
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Add audit logging

---

## 🐛 Troubleshooting

### Common Issues

#### Staff tidak muncul di SelectPanel

**Solusi:**
1. Check localStorage: `localStorage.getItem('staffManagementList')`
2. Verify `isActive: true`
3. Check department mapping correct
4. Open browser console and check for errors

#### Data tidak sync antar pages

**Solusi:**
1. Refresh page (F5)
2. Check Context Provider hierarchy di App.tsx
3. Verify localStorage keys correct
4. Clear localStorage dan re-test

#### Quick filter tidak bekerja

**Solusi:**
1. Check date format (YYYY-MM-DD)
2. Verify filter state updates
3. Console.log startDate and endDate
4. Check data filtering logic

#### Order stuck di satu status

**Solusi:**
1. Check semua items memiliki status yang valid
2. Verify startedTime dan finishedTime set correct
3. Check elapsedTime calculated
4. Review completeOrder() logic

---

## 📞 Support

### Documentation

- 📖 [Full Documentation](./CODE_DOCUMENTATION.md)
- 🚀 [Quick Reference](./QUICK_REFERENCE.md)
- 📊 [Data Guide](./DATA_SYSTEM_GUIDE.md)
- 🔍 [SQL Schema](./FORMAT_DATABASE_SQL.md)

### Contact

- **Development Team**: [GitHub Issues]
- **Email**: support@example.com
- **Slack**: #kitchen-management-system

---

## 📄 License

Copyright © 2025 Kitchen Order Management System.  
All rights reserved.

---

## 🙏 Acknowledgments

- **Framework**: React Team
- **Styling**: Tailwind CSS Team
- **Charts**: Recharts Team
- **Icons**: Lucide Icons
- **Design**: Custom design by team

---

## 🎯 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ✅ Complete | Production ready |
| Backend API | 🔄 In Progress | Development phase |
| Database | 📝 Planned | Schema designed |
| Authentication | 📝 Planned | JWT + RBAC |
| Mobile UI | 📝 Planned | Responsive design |
| Real-time Sync | 📝 Planned | WebSocket |

---

## 💡 Tips & Best Practices

### For Developers

1. **Always use Context hooks** - Don't access localStorage directly
2. **Follow naming conventions** - Department names are case-sensitive
3. **Check isActive status** - Filter staff before displaying
4. **Use TypeScript types** - Leverage type safety
5. **Test localStorage limits** - Browser limit ~5-10 MB

### For Users

1. **Complete orders promptly** - Don't leave items hanging
2. **Assign cooks immediately** - Better analytics data
3. **Mark delivered accurately** - Important for timing stats
4. **Use quick filters** - Faster than advanced filters
5. **Export data regularly** - Backup analytics

---

**Sistem ini terus berkembang. Dokumentasi akan diupdate seiring perkembangan fitur.**

**Version:** 3.0  
**Status:** ✅ Production Ready (Frontend)  
**Next Milestone:** Backend API Integration

---

🎉 **Happy Cooking!** 🍳
