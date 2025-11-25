/**
 * SelectWaiterPanel Component
 * 
 * A slide-in panel from the right side for assigning waiters/waitresses to completed orders.
 * ONLY used in Checker section pages - this is part of the dual workflow system.
 * 
 * CHECKER WORKFLOW:
 * 1. Department completes order (all items finished)
 * 2. Order appears in Checker views with green "Assign" button
 * 3. Checker clicks "Assign" button → this panel slides in
 * 4. Checker selects available waiter/waitress
 * 5. Parent component calls OrderContext's assignWaiter() with selected waiter name
 * 6. Button changes to blue "Delivered" button
 * 7. Update syncs across all Checker pages automatically via OrderContext
 * 
 * FEATURES:
 * - Slides in from the right with smooth animation
 * - Shows waitress staff members (from WAITSTAFF array)
 * - Displays availability status (green = available, red = busy)
 * - Disables selection of unavailable staff
 * - Includes search bar for filtering waiters (placeholder for future implementation)
 */

import svgPaths from "../imports/StaffPanelPaths";
import { imgGroup } from "../imports/StaffPanelImages";
import { getStaffByDepartment } from '../data/staff';

/**
 * Props for SelectWaiterPanel component
 */
interface SelectWaiterPanelProps {
  isOpen: boolean;                         // Controls whether panel is visible
  onClose: () => void;                     // Callback when panel should close (backdrop click or X button)
  onSelectWaiter: (waiterName: string) => void; // Callback when a waiter is selected (calls assignWaiter in parent)
  orderName: string;                       // Name of the order/customer (displayed in panel header)
  orderId: string | null;                  // Order ID for the order being assigned
}

export default function SelectWaiterPanel({ isOpen, onClose, onSelectWaiter, orderName, orderId }: SelectWaiterPanelProps) {
  // Get waitress staff members from the staff database
  // Uses getStaffByDepartment('waitress') to return WAITSTAFF array
  const waitstaff = getStaffByDepartment('waitress');

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
          
          {/* Panel title */}
          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[130px] not-italic text-[24px] text-white top-[33px]">Assign Waiter</p>
          
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

        {/* Order Information */}
        <div className="px-[42px] mb-4">
          <p className="text-white/60 text-[13px]">Assigning waiter for:</p>
          <p className="text-white text-[18px] font-['Poppins:Bold',sans-serif]">{orderName}</p>
          <p className="text-white/60 text-[11px] mt-1">{orderId}</p>
        </div>

        {/* Search Bar */}
        <div className="px-[42px] mb-[20px]">
          <div className="bg-gray-50 h-[56px] rounded-[18px] flex items-center px-4">
            <input 
              type="text" 
              placeholder="Search waiter..." 
              className="bg-transparent w-full outline-none text-[#3c044d]"
            />
          </div>
        </div>

        {/* Waitstaff List */}
        <div className="px-[30px] space-y-[24px] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {waitstaff.map((worker) => (
            <button
              key={worker.id}
              onClick={() => worker.available && onSelectWaiter(worker.name)}
              disabled={!worker.available}
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
                
                {/* Profile Picture Placeholder */}
                <div className="absolute left-[24px] size-[88px] top-[27px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" fill="#A587CE" r="44" />
                  </svg>
                </div>

                {/* Availability Indicator */}
                <div className="absolute right-[34px] size-[34px] top-[54px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill={worker.available ? "#8ED2B1" : "#FF6B6B"} r="17" />
                  </svg>
                </div>

                {/* Worker Name */}
                <p className={`absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[147px] not-italic text-[24px] top-[39px] ${
                  worker.available ? 'text-gray-50' : 'text-gray-50/30'
                }`}>
                  {worker.name}
                </p>

                {/* Worker Position */}
                <p className={`absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[147px] not-italic text-[13px] top-[83px] ${
                  worker.available ? 'text-white' : 'text-white/30'
                }`}>
                  {worker.position}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}