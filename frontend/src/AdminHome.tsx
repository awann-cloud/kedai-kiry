/**
 * AdminHome.tsx - Admin Dashboard Page
 * 
 * Main admin interface showing:
 * - Admin greeting with profile picture
 * - Sidebar navigation
 */

import AdminHeaderGreeting from './imports/AdminHeaderGreeting';
import { AdminRetractableSidebar } from './components/AdminRetractableSidebar';
import ShortcutList from './imports/ShortcutList';
import CookingAnalytics from './components/CookingAnalytics';
import MenuReview from './components/MenuReview';

export default function AdminHome() {
  return (
    <div className="w-screen h-screen bg-[#4D236E] overflow-auto relative">
      {/* Main Content Area */}
      <div className="min-h-screen pb-8">
        {/* Header Frame */}
        <div className="h-[220px] mx-8 mt-8 rounded-[12px] shadow-[4px_4px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden ml-[100px]">
          <AdminHeaderGreeting />
        </div>

        {/* Shortcut List */}
        <div className="mx-8 mt-8 ml-[100px]">
          <ShortcutList />
        </div>

        {/* Cooking Analytics Section */}
        <div className="mx-8 mt-8 ml-[100px]">
          <CookingAnalytics />
        </div>

        {/* Menu Review Section */}
        <div className="mx-8 mt-8 ml-[100px]">
          <MenuReview />
        </div>
      </div>

      {/* Sidebar with active "home" state - positioned absolutely to overlay */}
      <AdminRetractableSidebar activePage="home" />
    </div>
  );
}