/**
 * App.tsx - Main Application Router
 * 
 * This is the root component of the Kitchen Order Management System.
 * It sets up all routing and wraps the app with OrderProvider for centralized state management.
 * 
 * ROUTE STRUCTURE:
 * 
 * LOGIN & DISPLAY:
 * - / : Login page with options to go to Display or Admin
 * - /home : Home page with 4 department buttons (MAKANAN, BAR, SNACK, CHECKER)
 * 
 * KITCHEN DEPARTMENT:
 * - /pin : Kitchen staff PIN entry (PinEntryMakanan)
 * - /makanan : Kitchen orders management (OrdersKitchen)
 * 
 * BAR DEPARTMENT:
 * - /minuman : Bar staff PIN entry (PinEntryBar)
 * - /barorders : Bar orders management (OrdersBar)
 * 
 * SNACK DEPARTMENT:
 * - /snack : Snack staff PIN entry (PinEntrySnack)
 * - /snackorders : Snack orders management (OrdersSnack)
 * 
 * CHECKER SECTION (Special - Can see and manage all departments):
 * - /checker : Checker PIN entry (PinEntryChecker)
 * - /checkerhome : Checker department selection + statistics dashboard (CheckerHome)
 * - /checkerorders : View all departments combined (CheckerOrdersAll)
 * - /checkermakananorders : View kitchen orders only (CheckerOrdersMakanan)
 * - /checkerbarorders : View bar orders only (CheckerOrdersBar)
 * - /checkersnackorders : View snack orders only (CheckerOrdersSnacktsx)
 * 
 * ORDERPROVIDER WRAPPER:
 * All routes are wrapped in <OrderProvider> which provides centralized order management.
 * This ensures all order updates sync automatically across all pages in real-time.
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './contexts/OrderContext';
import { StaffProvider } from './contexts/StaffContext';
import { WaiterProvider } from './contexts/WaiterContext'; // ⭐ NEW (Post v732)
import Login from './Login';
import Home from './Home';
import PinEntryMakanan from './PinEntryMakanan';
import PinEntryBar from './PinEntryBar';
import PinEntrySnack from './PinEntrySnack';
import OrdersKitchen from './OrdersKitchen';
import OrdersBar from './OrdersBar';
import OrdersSnack from './OrdersSnack';
import PinEntryChecker from './PinEntryChecker';
import CheckerHome from './CheckerHome';
import CheckerOrdersAll from './CheckerOrdersAll';
import CheckerOrdersMakanan from './CheckerOrdersMakanan';
import CheckerOrdersBar from './CheckerOrdersBar';
import CheckerOrdersSnacktsx from './CheckerOrdersSnacktsx';
import AdminHome from './AdminHome';
import AdminRawDatabase from './AdminRawDatabase';
import AdminStaffManagement from './AdminStaffManagement';
import AdminMenuManagement from './AdminMenuManagement';
import AdminSettings from './AdminSettings';

export default function App() {
  return (
    // OrderProvider wraps the entire app to provide centralized order management
    // All order updates sync across all pages automatically via React Context
    <OrderProvider>
      <StaffProvider>
        {/* ⭐ WaiterProvider (Post v732) - Handles waiter assignment & delivery tracking */}
        <WaiterProvider>
          {/* HashRouter is used for client-side routing (works well with static hosting) */}
          <HashRouter>
          <Routes>
          {/* Login Page - Landing page with options to go to Display or Admin */}
          <Route path="/" element={<Login />} />
          
          {/* Home/Display page - Main department selection screen (4 buttons) */}
          <Route path="/home" element={<Home />} />
          
          {/* Kitchen Department Routes */}
          <Route path="/pin" element={<PinEntryMakanan />} /> {/* Kitchen PIN authentication */}
          <Route path="/makanan" element={<OrdersKitchen />} /> {/* Kitchen order management */}
          
          {/* Bar Department Routes */}
          <Route path="/minuman" element={<PinEntryBar />} /> {/* Bar PIN authentication */}
          <Route path="/barorders" element={<OrdersBar />} /> {/* Bar order management */}
          
          {/* Snack Department Routes */}
          <Route path="/snack" element={<PinEntrySnack />} /> {/* Snack PIN authentication */}
          <Route path="/snackorders" element={<OrdersSnack />} /> {/* Snack order management */}
          
          {/* Checker Section Routes - Special section that can view and manage all departments */}
          <Route path="/checker" element={<PinEntryChecker />} /> {/* Checker PIN authentication */}
          <Route path="/checkerhome" element={<CheckerHome />} /> {/* Checker dashboard with statistics */}
          <Route path="/checkerorders" element={<CheckerOrdersAll />} /> {/* View all departments combined */}
          <Route path="/checkermakananorders" element={<CheckerOrdersMakanan />} /> {/* Kitchen orders (Checker view) */}
          <Route path="/checkerbarorders" element={<CheckerOrdersBar />} /> {/* Bar orders (Checker view) */}
          <Route path="/checkersnackorders" element={<CheckerOrdersSnacktsx />} /> {/* Snack orders (Checker view) */}
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminHome />} /> {/* Admin dashboard */}
          
          {/* Raw Database Route */}
          <Route path="/raw-database" element={<AdminRawDatabase />} /> {/* Raw cooking data viewer */}
          
          {/* Staff Management Route */}
          <Route path="/staff-management" element={<AdminStaffManagement />} /> {/* Staff management dashboard */}
          
          {/* Menu Management Route */}
          <Route path="/menu-management" element={<AdminMenuManagement />} /> {/* Menu management dashboard */}
          
          {/* Admin Settings Route */}
          <Route path="/admin-settings" element={<AdminSettings />} /> {/* Admin settings dashboard */}
          </Routes>
          </HashRouter>
        </WaiterProvider>
      </StaffProvider>
    </OrderProvider>
  );
}