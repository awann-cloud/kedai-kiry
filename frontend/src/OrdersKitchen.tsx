/**
 * KitchenOrders.tsx - Kitchen Order Management Page
 * 
 * Main order management interface for the Kitchen department.
 * Displays all kitchen orders as receipt cards with real-time status tracking.
 * 
 * WORKFLOW:
 * Menu items progress through three status groups:
 * 1. "not-started" (red indicator) → shown at bottom of each card
 * 2. "on-their-way" (yellow indicator) → shown in middle, timer running
 * 3. "finished" (green indicator) → shown at top
 * 
 * FEATURES:
 * - Real-time clock display in header
 * - Live statistics (# on-going items, # not started items)
 * - Horizontal scrolling receipt cards (391px width each)
 * - Vertical scrolling within each receipt card
 * - Priority sorting (PRIORITAS first, then NORMAL in FIFO order)
 * - Color-coded order indicators (red/yellow/green)
 * - Staff assignment via SelectCookPanel
 * - Timer tracking for in-progress items
 * - "FINISHED" button becomes active when all items are complete
 * 
 * UI DESIGN:
 * - Dark purple background (#4D236E)
 * - Lighter purple receipt cards (#8b6dac)
 * - Designed for landscape tablet (1024px × 768px)
 * 
 * DATA FLOW:
 * Currently uses local TypeScript data (initialOrdersData).
 * In production, would fetch from MySQL database via backend API.
 */

import { useState, useEffect } from 'react';
import StatusCirclesPaths from "./imports/StatusCirclesPaths";
import { imgGroup } from "./imports/PlaceholderSquare";
import CookChefIconPaths from "./imports/CookChefIcon";
import { type MenuItem, type Order } from './data/orders';
import { useNavigate } from 'react-router-dom';
import SelectCookPanel from './components/SelectCookPanel';
import SearchReceiptSidebar from './components/SearchReceiptSidebar';
import { useOrders } from './contexts/OrderContext';

/**
 * FoodIcon Component
 * 
 * Displays the kitchen/food icon in the header.
 * Clickable to open the sidebar (not navigate to home).
 */
function FoodIcon({ onClick }: { onClick: () => void }) {
  return (
    <div className="size-[80px] cursor-pointer" data-name="food" onClick={onClick}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="food">
          <circle cx="40" cy="40" fill="var(--fill-0, #61428C)" id="Circle behind" r="40" />
          <g id="Food Iocn">
            <mask height="50" id="mask0_9_95" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="58" x="11" y="17">
              <g id="303cbfc917">
                <path d={CookChefIconPaths.pb41c280} fill="var(--fill-0, white)" id="Vector" />
              </g>
            </mask>
            <g mask="url(#mask0_9_95)">
              <g id="Group">
                <path d={CookChefIconPaths.pdb93600} fill="var(--fill-0, white)" id="Vector_2" />
              </g>
              <path d={CookChefIconPaths.p242b800} fill="var(--fill-0, white)" id="Vector_3" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function KitchenOrders() {
  // STATE MANAGEMENT
  
  // Use centralized order management from context
  // This ensures all changes sync across all department views and checker
  const { getOrders, startItem, finishItem, completeOrder } = useOrders();
  const orders = getOrders('kitchen'); // Get kitchen orders from shared state
  const navigate = useNavigate();
  
  // Current time for the header clock (updated every second)
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for the staff selection panel (SelectCookPanel)
  // Tracks which item is being assigned and whether panel is open
  const [selectCookPanel, setSelectCookPanel] = useState<{
    isOpen: boolean;      // Whether the panel is visible
    orderId: string | null; // ID of the order containing the item
    itemId: string | null;  // ID of the menu item being started
    itemName: string;       // Name of the item (displayed in panel)
  }>({
    isOpen: false,
    orderId: null,
    itemId: null,
    itemName: ''
  });

  useEffect(() => {
    // Timer for updating current time
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  // Timer updates are now handled by OrderContext, no need for local interval

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  /**
   * Handle Start Item
   * Uses context method to start an item - changes sync across all views
   */
  const handleStartItem = (orderId: string, itemId: string, cookName: string) => {
    startItem('kitchen', orderId, itemId, cookName);
  };

  /**
   * Handle Done Item
   * Uses context method to finish an item - changes sync across all views
   */
  const handleDoneItem = (orderId: string, itemId: string) => {
    finishItem('kitchen', orderId, itemId);
  };

  /**
   * Handle Finish Order
   * Uses context method to complete an order - changes sync across all views
   */
  const handleFinishOrder = (orderId: string) => {
    completeOrder('kitchen', orderId);
  };

  const getItemCounts = (items: MenuItem[]) => {
    const total = items.length;
    const finished = items.filter(item => item.status === 'finished').length;
    const toGo = total - finished;
    return { total, finished, toGo };
  };

  const getOrderElapsedTime = (items: MenuItem[]) => {
    const startedItem = items.find(item => item.startedTime);
    if (!startedItem) return 0;
    return Math.floor((Date.now() - startedItem.startedTime!) / 1000);
  };

  // Calculate header statistics
  const getTotalStats = () => {
    const allItems = orders.flatMap(order => order.items);
    const onGoingCount = allItems.filter(item => item.status === 'on-their-way').length;
    const notStartedCount = allItems.filter(item => item.status === 'not-started').length;
    
    // Find the longest running item time
    const onGoingItems = allItems.filter(item => item.status === 'on-their-way' && item.startedTime);
    const longestTime = onGoingItems.length > 0
      ? Math.max(...onGoingItems.map(item => Math.floor((Date.now() - item.startedTime!) / 1000)))
      : 0;
    
    return { onGoingCount, notStartedCount, longestTime };
  };

  const stats = getTotalStats();

  // Format current time as HH:MM
  const formatClock = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const openSelectCookPanel = (orderId: string, itemId: string, itemName: string) => {
    setSelectCookPanel({
      isOpen: true,
      orderId,
      itemId,
      itemName
    });
  };

  const handleSelectCook = (cookName: string) => {
    if (selectCookPanel.orderId && selectCookPanel.itemId) {
      handleStartItem(selectCookPanel.orderId, selectCookPanel.itemId, cookName);
      setSelectCookPanel({ isOpen: false, orderId: null, itemId: null, itemName: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#4D236E]">
      {/* Header Section */}
      <div className="bg-[#4d236e] relative h-[100px] px-[44px] py-[10px]">
        <FoodIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[133px] not-italic text-[28px] text-white top-[17px]">Section Makanan</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[134px] not-italic text-[14px] text-white top-[62px] underline">{stats.onGoingCount} Item On Going</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[281px] not-italic text-[14px] text-white top-[62px] underline">{stats.notStartedCount} Item Hasn't Started Yet</p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] right-[44px] not-italic text-[40px] text-white top-[26px]">{formatClock()}</p>
      </div>

      {/* Orders Section */}
      <div className="flex gap-8 overflow-x-auto pb-4 px-8 pt-4">
        {orders
          .sort((a, b) => {
            // Priority orders first, then FIFO for each group
            if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
            if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
            return 0; // Maintain original order within each group (FIFO)
          })
          .map((order) => {
          const counts = getItemCounts(order.items);
          const orderTime = order.frozenTime !== undefined ? order.frozenTime : getOrderElapsedTime(order.items);
          const notStartedItems = order.items.filter(item => item.status === 'not-started');
          const onTheirWayItems = order.items.filter(item => item.status === 'on-their-way');
          const finishedItems = order.items.filter(item => item.status === 'finished');
          const allItemsFinished = order.items.every(item => item.status === 'finished');
          const allItemsNotStarted = order.items.every(item => item.status === 'not-started');
          
          // Determine indicator color based on order status
          let indicatorColor = '#FFEF63'; // yellow - on going (default)
          if (allItemsFinished) {
            indicatorColor = '#4caf50'; // bright green - finished
          } else if (allItemsNotStarted) {
            indicatorColor = '#ff4444'; // bright red - not started
          }

          return (
            <div key={order.id} id={`order-${order.id}`} className="flex-shrink-0 w-[391px]">
              <div className="bg-[#8b6dac] rounded-[19px] overflow-hidden shadow-lg h-[633px] relative">
                {/* Receipt Statistic - Behind header */}
                <div className="absolute top-[58px] left-0 right-0 bg-[#f7f7f9] rounded-[19px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[89px] z-10">
                  <div className="absolute right-[13px] top-[40px] w-[48px] h-[41px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 42">
                      <mask height="42" id={`mask-${order.id}`} maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="49" x="0" y="0">
                        <path d="M0 0H48.875V41.8906H0V0Z" fill="white" />
                      </mask>
                      <g mask={`url(#mask-${order.id})`}>
                        <path d={StatusCirclesPaths.p9777f80} fill="#3C044D" />
                        <path d={StatusCirclesPaths.p3f72a940} fill="#3C044D" />
                      </g>
                    </svg>
                  </div>
                  <p className="absolute left-[21px] top-[43px] text-[#541168] text-[15px] underline not-italic">{counts.total} ITEMS</p>
                  <p className="absolute left-[21px] top-[67px] text-[#6f839a] text-[8px] not-italic">{counts.finished} ITEMS FINISHED</p>
                  <p className="absolute left-[97px] top-[67px] text-[#6f839a] text-[8px] not-italic">{counts.toGo} ITEMS TO GO</p>
                </div>

                {/* Receipt Info - In front */}
                <div className="absolute top-0 left-0 right-0 bg-[#3c044d] h-[94px] px-4 flex items-center z-20">
                  {order.priority === 'NORMAL' ? (
                    <div 
                      className="absolute left-[24px] top-[35px] w-[24px] h-[24px] rounded-full" 
                      style={{ backgroundColor: indicatorColor }}
                    />
                  ) : (
                    <div className="absolute left-[9px] top-[23px] w-[48px] h-[48px] mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${imgGroup}')` }}>
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
                        <path d={StatusCirclesPaths.p3e5c6d00} fill={indicatorColor} />
                      </svg>
                    </div>
                  )}
                  <div className="ml-[52px] flex-1">
                    <p className="text-gray-50 not-italic font-bold text-[18px]">{order.name}</p>
                    <p className="text-white text-[11px] underline not-italic">ID ORDER: {order.orderId}</p>
                  </div>
                  <p className="text-white text-[28px] not-italic">{formatTime(orderTime)}</p>
                </div>

                {/* Scrollable Items Area */}
                <div className="absolute top-[147px] bottom-[89px] left-0 right-0 overflow-y-auto px-4 py-4 space-y-4"> {/* Finished Items */}
                  {finishedItems.map((item) => (
                    <div key={item.id} className="relative w-full min-h-[130px]">
                      <div className="absolute bg-gray-50 inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      <div className="relative px-[27px] pt-[20px] pb-4">
                        <div className="flex gap-2 items-start">
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[17px] text-black w-[110px] break-words">{item.name}</p>
                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                        </div>
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 w-[166px] break-words">{item.notes}</p>
                      </div>
                      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic right-[12.26px] text-[#00783e] text-[28px] text-right top-[20px] w-[98.739px]">
                        {formatTime(item.elapsedTime)}
                      </p>
                      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-[10px] text-right right-[12.26px] top-[60px] w-[99.848px]">{item.staff}</p>
                      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-[8px] text-right right-[12.26px] top-[75px] w-[99.848px]">
                        STARTED IN: {item.startedTime ? new Date(item.startedTime).toLocaleTimeString() : 'XX:XX'}
                      </p>
                      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-[8px] text-right right-[12.26px] top-[90px] w-[99.848px]">
                        FINISHED IN: {item.finishedTime ? new Date(item.finishedTime).toLocaleTimeString() : 'XX:XX'}
                      </p>
                    </div>
                  ))}

                  {/* On Their Way Items */}
                  {onTheirWayItems.map((item) => (
                    <div key={item.id} className="relative w-full min-h-[130px]">
                      <div className="absolute bg-[#f7f7f9] inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      <div className="relative px-[27px] pt-[20px] pb-4">
                        <div className="flex gap-2 items-start">
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[110px] break-words">{item.name}</p>
                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                        </div>
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 w-[166px] break-words">{item.notes}</p>
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-[10px] mt-2">{item.staff}</p>
                      </div>
                      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic right-[12.26px] text-[#3c044d] text-[28px] text-right top-[15px] w-[98.739px]">
                        {formatTime(item.elapsedTime)}
                      </p>
                      <button
                        onClick={() => handleDoneItem(order.id, item.id)}
                        className="absolute right-[12.26px] top-[63px] bg-[#edbb0d] rounded-[10px] px-6 py-2.5"
                      >
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#44391e] text-[18px]">DONE</p>
                      </button>
                    </div>
                  ))}

                  {/* Not Started Items */}
                  {notStartedItems.map((item) => (
                    <div key={item.id} className="relative w-full min-h-[95px]">
                      <div className="absolute bg-[#f7f7f9] inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      <div className="relative px-[27px] pt-[28px] pb-4">
                        <div className="flex gap-2 items-start">
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[110px] break-words">{item.name}</p>
                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                        </div>
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 w-[166px] break-words">{item.notes}</p>
                      </div>
                      <button
                        onClick={() => openSelectCookPanel(order.id, item.id, item.name)}
                        className="absolute right-[12.26px] top-[28px] bg-[#880608] rounded-[10px] px-6 py-2.5"
                      >
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[18px] text-white">START</p>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Receipt Status */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#f7f7f9] rounded-[19px] p-4 h-[89px] flex items-center justify-between">
                  <div>
                    <p className="text-[#3c044d] not-italic">ON GOING</p>
                    <p className="text-[#541168] text-[11px] not-italic">{order.priority}</p>
                  </div>
                  <button
                    onClick={() => handleFinishOrder(order.id)}
                    disabled={!allItemsFinished || order.completed}
                    className={`rounded-[10px] px-6 py-2 ${
                      order.completed
                        ? 'bg-transparent cursor-default'
                        : allItemsFinished
                          ? 'bg-[#3c044d] cursor-pointer' 
                          : 'bg-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <p className={`text-[24px] not-italic whitespace-nowrap ${
                      order.completed
                        ? 'text-[#4caf50]'
                        : allItemsFinished
                          ? 'text-gray-50'
                          : 'text-gray-50'
                    }`}>FINISHED</p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Select Cook Panel */}
      <SelectCookPanel
        isOpen={selectCookPanel.isOpen}
        orderId={selectCookPanel.orderId}
        itemId={selectCookPanel.itemId}
        itemName={selectCookPanel.itemName}
        onClose={() => setSelectCookPanel({ isOpen: false, orderId: null, itemId: null, itemName: '' })}
        onSelectCook={handleSelectCook}
        department="kitchen"
      />

      {/* Search Receipt Sidebar */}
      <SearchReceiptSidebar
        isOpen={isSidebarOpen}
        orders={orders}
        onClose={() => setIsSidebarOpen(false)}
        onGoHome={() => navigate('/home')}
      />
    </div>
  );
}