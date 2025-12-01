/**
 * SelectCookPanel Component
 * 
 * A slide-in panel from the right side for assigning department staff to menu items.
 * Used in department pages (Kitchen/Bar/Snack) and checker department-specific pages.
 * 
 * WORKFLOW:
 * 1. User clicks "START" button on not-started menu item
 * 2. Panel slides in showing available staff for that department
 * 3. User selects staff member (only available ones are clickable)
 * 4. Parent component calls OrderContext's startItem() with selected staff name
 * 5. Item status changes to "on-their-way" and timer starts
 * 6. Update syncs across all pages automatically via OrderContext
 * 
 * FEATURES:
 * - Slides in from the right with smooth animation
 * - Shows staff members filtered by department (kitchen/bar/snack)
 * - Displays availability status (green = available, red = busy)
 * - Disables selection of unavailable staff
 * - Includes search bar for filtering staff (placeholder for future implementation)
 * - Department-specific titles (Select Cook/Bartender/Snack Staff)
 */

import React, { useState, useEffect } from 'react';
import svgPaths from "../imports/StaffPanelPaths";
import { imgGroup } from "../imports/StaffPanelImages";
import { Worker } from '../data/staff';
import { useStaff } from '../contexts/StaffContext';

/**
 * Props for SelectCookPanel component
 */
interface SelectCookPanelProps {
  isOpen: boolean;                                       // Controls whether panel is visible
  onClose: () => void;                                   // Callback when panel should close (backdrop click or X button)
  onSelectCook: (cookName: string) => void;              // Callback when a staff member is selected (calls startItem in parent)
  itemName: string;                                      // Name of the menu item being started (displayed in panel header)
  orderId: string | null;                                // Order ID for the item
  itemId: string | null;                                 // Menu item ID
  department?: 'kitchen' | 'bar' | 'snack' | 'waitress'; // Department to show staff from (defaults to 'kitchen')
}

export default function SelectCookPanel({ isOpen, onClose, onSelectCook, itemName, orderId, itemId, department = 'kitchen' }: SelectCookPanelProps) {
  // Get staff members from AdminStaffManagement localStorage (filtered by department)
  const [staff, setStaff] = useState<Worker[]>([]);
  
  useEffect(() => {
    // Load staff from AdminStaffManagement localStorage
    const savedStaffList = localStorage.getItem('staffManagementList');
    if (savedStaffList) {
      try {
        const staffList = JSON.parse(savedStaffList);
        
        // Map department names: Kitchen/Bar/Snack/Checker -> kitchen/bar/snack/waitress
        const departmentMap: { [key: string]: string } = {
          'Kitchen': 'kitchen',
          'Bar': 'bar',
          'Snack': 'snack',
          'Checker': 'waitress'
        };
        
        // Filter by department and convert to Worker format
        const filteredStaff = staffList
          .filter((s: any) => departmentMap[s.department] === department && s.isActive)
          .map((s: any) => ({
            id: s.id,
            name: s.name,
            position: s.position || 'Staff',
            department: departmentMap[s.department],
            available: s.isActive
          }));
        
        setStaff(filteredStaff);
      } catch (e) {
        console.error('Failed to parse staff list:', e);
      }
    }
  }, [department, isOpen]); // Reload when department changes or panel opens
  
  /**
   * Get panel title based on department
   * Each department has a customized title for better UX
   */
  const getTitle = () => {
    switch (department) {
      case 'kitchen': return 'Select Cook';
      case 'bar': return 'Select Bartender';
      case 'snack': return 'Select Snack Staff';
      case 'waitress': return 'Select Waitress';
      default: return 'Select Staff';
    }
  };

  return (
    <>
      {/* Backdrop - Semi-transparent overlay that dims the background */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose} // Click backdrop to close panel
        />
      )}
      
      {/* Main Panel - Slides in from the right */}
      <div 
        className={`fixed right-0 top-0 h-screen w-[544px] bg-[#3c044d] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full' // Smooth slide animation
        }`}
      >
        {/* Header Section - Shows sparkle icon and panel title */}
        <div className="relative h-[97px] flex items-center">
          {/* Decorative sparkle icon */}
          <div className="absolute left-[42px] top-[18px] w-[69px] h-[69px] mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${imgGroup}')` }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71 71">
              <g>
                <path d={svgPaths.p2769aba0} fill="#B7C9FF" />
              </g>
            </svg>
          </div>
          
          {/* Panel title - Changes based on department */}
          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[24px] text-white top-[33px]">{getTitle()}</p>
          
          {/* Close button (X icon) */}
          <button 
            onClick={onClose}
            className="absolute right-[42px] top-[33px] text-white hover:text-gray-300 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Item Information - Shows which menu item is being started */}
        <div className="px-[42px] mb-4">
          <p className="text-white/60 text-[13px]">Starting item:</p>
          <p className="text-white text-[18px] font-['Poppins:Bold',sans-serif]">{itemName}</p>
        </div>

        {/* Search Bar - For filtering staff (currently non-functional, ready for future implementation) */}
        <div className="px-[42px] mb-[20px]">
          <div className="bg-gray-50 h-[56px] rounded-[18px] flex items-center px-4">
            <input 
              type="text" 
              placeholder="Search cook..." 
              className="bg-transparent w-full outline-none text-[#3c044d]"
            />
          </div>
        </div>

        {/* Staff List - Scrollable list of all staff members in the department */}
        <div className="px-[30px] space-y-[24px] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {staff.map((worker) => (
            <button
              key={worker.id}
              onClick={() => worker.available && onSelectCook(worker.name)} // Only allow selection if worker is available
              disabled={!worker.available} // Disable button if worker is busy
              className={`w-full text-left transition-all ${
                worker.available ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-not-allowed opacity-60'
              }`}
            >
              {/* Staff Card */}
              <div className="relative bg-[rgba(217,217,217,0.01)] h-[142px] rounded-[18px]">
                {/* Card border */}
                <div 
                  aria-hidden="true" 
                  className="absolute border border-[#a587ce] border-solid inset-0 pointer-events-none rounded-[18px]" 
                />
                
                {/* Profile Picture Placeholder - Purple circle */}
                <div className="absolute left-[24px] size-[88px] top-[27px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" fill="#A587CE" r="44" />
                  </svg>
                </div>

                {/* Availability Indicator - Green (available) or Red (busy) dot */}
                <div className="absolute right-[34px] size-[34px] top-[54px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill={worker.available ? "#8ED2B1" : "#FF6B6B"} r="17" />
                  </svg>
                </div>

                {/* Worker Name - Dimmed if unavailable */}
                <p className={`absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[147px] not-italic text-[24px] top-[39px] ${
                  worker.available ? 'text-gray-50' : 'text-gray-50/30'
                }`}>
                  {worker.name}
                </p>

                {/* Worker Position/Title - Dimmed if unavailable */}
                <p className={`absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[147px] not-italic text-[13px] top-[83px] ${
                  worker.available ? 'text-[#fff2f2]' : 'text-[#fff2f2]/30'
                }`}>
                  {worker.position}
                </p>

                {/* Availability Status Text - Shows "Available" or "Busy" */}
                <p className={`absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[233px] not-italic text-[13px] top-[83px] ${
                  worker.available ? 'text-[#fef3f3]' : 'text-[#fef3f3]/30'
                }`}>
                  {worker.available ? 'Available' : 'Busy'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}