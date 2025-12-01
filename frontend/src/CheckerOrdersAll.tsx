/**
 * CheckerAllOrders.tsx - Checker All Orders View
 * 
 * Displays ALL orders from ALL departments (Kitchen, Bar, Snack) in one combined view.
 * Similar to CheckerMakananOrders but shows receipts from all departments merged together.
 * All updates sync through OrderContext.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import StatusCirclesPaths from "./imports/StatusCirclesPaths";
import { imgGroup } from "./imports/PlaceholderSquare";
import { type MenuItem, type Order } from './data/orders';
import { useOrders } from './contexts/OrderContext';
import SelectWaiterPanel from './components/SelectWaiterPanel';
import IconsReceiptMakanan from './imports/IconsReceiptMakanan';
import IconsReceiptBar from './imports/IconsReceiptBar';
import IconReceiptBarNew from './imports/IconReceiptBarNew';
import IconsReceiptSnack from './imports/IconsReceiptSnack';
import SearchReceiptSidebarChecker from './components/SearchReceiptSidebarChecker';
import CheckerEyeIcon from './imports/CheckerEyeIcon';

/**
 * Eye Icon Component
 * Clickable icon to open the sidebar
 */
function EyeIcon({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="size-[80px] cursor-pointer hover:opacity-80 transition-opacity" 
      onClick={onClick}
    >
      <CheckerEyeIcon />
    </div>
  );
}

/**
 * Get Department Badge Info
 */
function getDepartmentBadge(department: string): { label: string; color: string } {
  switch (department) {
    case 'kitchen':
      return { label: 'MAKANAN', color: '#61428C' };
    case 'bar':
      return { label: 'BAR', color: '#2196F3' };
    case 'snack':
      return { label: 'SNACK', color: '#FF9800' };
    default:
      return { label: department.toUpperCase(), color: '#757575' };
  }
}

// Extended Order type with department info
type OrderWithDepartment = Order & { department: 'kitchen' | 'bar' | 'snack' };

export default function CheckerAllOrders() {
  const { getAllOrders, finishItem, completeOrder, assignWaiter, assignWaiterToItem, markItemDelivered, markDelivered } = useOrders();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [waiterPanel, setWaiterPanel] = useState<{
    isOpen: boolean;
    department: 'kitchen' | 'bar' | 'snack' | null;
    orderId: string | null;
    orderName: string;
    itemId?: string | null;  // Optional: for per-item assignment
    itemName?: string;        // Optional: for per-item assignment
  }>({
    isOpen: false,
    department: null,
    orderId: null,
    orderName: '',
    itemId: null,
    itemName: ''
  });

  // Check if sidebar should be open from URL params
  useEffect(() => {
    if (searchParams.get('sidebar') === 'open') {
      setIsSidebarOpen(true);
      // Remove the query param to clean up URL
      searchParams.delete('sidebar');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleDoneItem = (department: 'kitchen' | 'bar' | 'snack', orderId: string, itemId: string) => {
    finishItem(department, orderId, itemId);
  };

  const handleFinishOrder = (department: 'kitchen' | 'bar' | 'snack', orderId: string) => {
    completeOrder(department, orderId);
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

  // Combine all orders from all departments into one array
  const allDepartmentOrders = getAllOrders();
  const allOrders: OrderWithDepartment[] = [];
  
  allDepartmentOrders.forEach(({ department, orders }) => {
    orders.forEach(order => {
      allOrders.push({ ...order, department: department as 'kitchen' | 'bar' | 'snack' });
    });
  });

  const getTotalStats = () => {
    const allItems = allOrders.flatMap(order => order.items);
    const onGoingCount = allItems.filter(item => item.status === 'on-their-way').length;
    const notStartedCount = allItems.filter(item => item.status === 'not-started').length;
    
    return { onGoingCount, notStartedCount };
  };

  const stats = getTotalStats();

  const formatClock = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // ⭐ NEW: Double-tap and Long-press handlers for finished items
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleItemInteraction = (department: 'kitchen' | 'bar' | 'snack', order: OrderWithDepartment, item: MenuItem) => {
    // Jangan buka panel jika item sudah ada waiter
    if (item.waiter) return;

    setWaiterPanel({
      isOpen: true,
      department: department,
      orderId: order.id,
      orderName: order.name,
      itemId: item.id,
      itemName: item.name
    });
  };

  const handleItemClick = (department: 'kitchen' | 'bar' | 'snack', order: OrderWithDepartment, item: MenuItem) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    // Double tap detection (within 300ms)
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      handleItemInteraction(department, order, item);
      lastTapRef.current = 0; // Reset after successful double tap
    } else {
      lastTapRef.current = now;
    }
  };

  const handleItemTouchStart = (department: 'kitchen' | 'bar' | 'snack', order: OrderWithDepartment, item: MenuItem) => {
    // Long press detection (500ms)
    longPressTimerRef.current = setTimeout(() => {
      handleItemInteraction(department, order, item);
    }, 500);
  };

  const handleItemTouchEnd = () => {
    // Cancel long press if touch ends early
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-[#4D236E]">
      {/* Header Section */}
      <div className="bg-[#4d236e] relative h-[100px] px-[44px] py-[10px]">
        <EyeIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[133px] not-italic text-[28px] text-white top-[17px]">All Orders (Checker)</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[134px] not-italic text-[14px] text-white top-[62px] underline">{stats.onGoingCount} Item On Their Way</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[281px] not-italic text-[14px] text-white top-[62px] underline">{stats.notStartedCount} Item Hasn't Started Yet</p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] right-[44px] not-italic text-[40px] text-white top-[26px]">{formatClock()}</p>
      </div>

      {/* Orders Section - All departments combined */}
      <div className="flex gap-8 overflow-x-auto pb-4 px-8 pt-4">
        {allOrders
          .sort((a, b) => {
            // Categorize orders by their status
            const aAllFinished = a.items.every(item => item.status === 'finished');
            const bAllFinished = b.items.every(item => item.status === 'finished');
            const aAllNotStarted = a.items.every(item => item.status === 'not-started');
            const bAllNotStarted = b.items.every(item => item.status === 'not-started');
            
            // Determine order category (1=finished, 2=ongoing, 3=not-started)
            // IMPORTANT: Check in order: finished → ongoing → not-started
            // An order is "ongoing" if it's NOT all finished AND NOT all not-started
            let aCategory: number;
            let bCategory: number;
            
            if (aAllFinished) {
              aCategory = 1; // All items finished
            } else if (aAllNotStarted) {
              aCategory = 3; // All items not started
            } else {
              aCategory = 2; // Some items started/ongoing (mixed state)
            }
            
            if (bAllFinished) {
              bCategory = 1; // All items finished
            } else if (bAllNotStarted) {
              bCategory = 3; // All items not started
            } else {
              bCategory = 2; // Some items started/ongoing (mixed state)
            }
            
            // Sort by category first (finished → ongoing → not-started)
            if (aCategory !== bCategory) return aCategory - bCategory;
            
            // Within same category, apply TRUE FIFO with priority exception
            
            // FINISHED ORDERS: Priority bypasses FIFO, then strict FIFO by completion time (earliest first)
            if (aAllFinished && bAllFinished) {
              // Priority orders always come first
              if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
              if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
              
              // TRUE FIFO: Get the LAST item to finish (completion time of the entire receipt)
              // Earlier completion = appears first (FIFO)
              const aCompletionTime = Math.max(...a.items.map(item => item.finishedTime || 0));
              const bCompletionTime = Math.max(...b.items.map(item => item.finishedTime || 0));
              return aCompletionTime - bCompletionTime; // Ascending order = earlier finishes first
            }
            
            // ONGOING ORDERS: Priority bypasses FIFO, then strict FIFO by first started time
            if (aCategory === 2 && bCategory === 2) {
              // Priority orders always come first
              if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
              if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
              
              // TRUE FIFO: Get the FIRST item to start (when cooking began)
              // Earlier start = appears first (FIFO)
              const aStartTime = Math.min(...a.items.filter(item => item.startedTime).map(item => item.startedTime || Infinity));
              const bStartTime = Math.min(...b.items.filter(item => item.startedTime).map(item => item.startedTime || Infinity));
              return aStartTime - bStartTime; // Ascending order = earlier starts first
            }
            
            // NOT-STARTED ORDERS: Priority bypasses FIFO, then FIFO by order creation time
            if (aAllNotStarted && bAllNotStarted) {
              // Priority orders always come first
              if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
              if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
              
              // TRUE FIFO: Use order ID for chronological ordering (assuming sequential IDs)
              return a.orderId.localeCompare(b.orderId);
            }
            
            return 0;
          })
          .map((order) => {
          const counts = getItemCounts(order.items);
          const orderTime = order.frozenTime !== undefined ? order.frozenTime : getOrderElapsedTime(order.items);
          const notStartedItems = order.items.filter(item => item.status === 'not-started');
          const onTheirWayItems = order.items.filter(item => item.status === 'on-their-way');
          const finishedItems = order.items.filter(item => item.status === 'finished');
          const allItemsFinished = order.items.every(item => item.status === 'finished');
          const allItemsNotStarted = order.items.every(item => item.status === 'not-started');
          
          // ⭐ Check if all finished items have waiters assigned
          const allFinishedItemsHaveWaiters = finishedItems.length > 0 && finishedItems.every(item => item.waiter);
          
          // ⭐ Check if ALL items (regardless of status) have waiters assigned
          const allItemsHaveWaiters = order.items.every(item => item.waiter);
          
          let indicatorColor = '#FFEF63';
          if (allItemsFinished) {
            indicatorColor = '#4caf50';
          } else if (allItemsNotStarted) {
            indicatorColor = '#ff4444';
          }

          const deptBadge = getDepartmentBadge(order.department);

          return (
            <div key={`${order.department}-${order.id}`} id={`order-${order.id}`} className="flex-shrink-0 w-[391px]">
              <div className="bg-[#8b6dac] rounded-[19px] overflow-hidden shadow-lg h-[633px] relative">
                {/* Receipt Statistic */}
                <div className="absolute top-[58px] left-0 right-0 bg-[#f7f7f9] rounded-[19px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[89px] z-10">
                  {order.department === 'kitchen' && (
                    <div className="absolute right-[13px] top-[40px] w-[48px] h-[41px]">
                      <IconsReceiptMakanan />
                    </div>
                  )}
                  {order.department === 'bar' && (
                    <div className="absolute right-[13px] top-[40px] w-[22px] h-[35px]">
                      <IconReceiptBarNew />
                    </div>
                  )}
                  {order.department === 'snack' && (
                    <div className="absolute right-[13px] top-[40px] w-[48px] h-[41px]">
                      <IconsReceiptSnack />
                    </div>
                  )}
                  <p className="absolute left-[21px] top-[43px] text-[#541168] text-[15px] underline not-italic">{counts.total} ITEMS</p>
                  <p className="absolute left-[21px] top-[67px] text-[#6f839a] text-[8px] not-italic">{counts.finished} ITEMS FINISHED</p>
                  <p className="absolute left-[97px] top-[67px] text-[#6f839a] text-[8px] not-italic">{counts.toGo} ITEMS TO GO</p>
                </div>

                {/* Receipt Info */}
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
                    <div className="flex items-center gap-2">
                      <p className="text-gray-50 not-italic font-bold text-[18px]">{order.name}</p>
                      {/* Department Badge */}
                      <div 
                        className="px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: deptBadge.color }}
                      >
                        <p className="font-['Poppins:Bold',sans-serif] text-[10px] text-white">{deptBadge.label}</p>
                      </div>
                    </div>
                    <p className="text-white text-[11px] underline not-italic">ID ORDER: {order.orderId}</p>
                  </div>
                  <p className="text-white text-[28px] not-italic">{formatTime(orderTime)}</p>
                </div>

                {/* Scrollable Items Area */}
                <div className="absolute top-[147px] bottom-[89px] left-0 right-0 overflow-y-auto px-4 py-4 space-y-6">
                  {/* Finished Items */}
                  {finishedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`relative w-full ${item.itemDelivered ? 'min-h-[155px]' : item.waiter ? 'min-h-[155px]' : 'min-h-[155px]'} ${!item.waiter ? 'cursor-pointer select-none' : ''}`}
                      onClick={() => handleItemClick(order.department, order, item)}
                      onTouchStart={() => handleItemTouchStart(order.department, order, item)}
                      onTouchEnd={handleItemTouchEnd}
                      onTouchCancel={handleItemTouchEnd}
                      onMouseDown={() => handleItemTouchStart(order.department, order, item)}
                      onMouseUp={handleItemTouchEnd}
                      onMouseLeave={handleItemTouchEnd}
                    >
                      {/* Background card */}
                      <div className="absolute bg-gray-50 inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      
                      {/* PHASE 1: NO WAITER ASSIGNED - Original "HOLD TO ASSIGN EARLY" Design */}
                      {!item.waiter && (
                        <>
                          <div className="relative px-[27px] pt-[20px] pb-[12px]">
                            <div className="flex gap-2 items-start">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[110px] break-words">{item.name}</p>
                              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                            </div>
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 w-[166px] break-words">{item.notes}</p>
                            
                            {/* Hold to assign early - positioned under notes */}
                            <p
                              onClick={() => setWaiterPanel({
                                isOpen: true,
                                department: order.department,
                                orderId: order.id,
                                orderName: order.name,
                                itemId: item.id,
                                itemName: item.name
                              })}
                              className="[text-underline-position:from-font] decoration-solid font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#3c044d] text-[11px] mt-1 underline cursor-pointer hover:text-[#5a0670] transition-colors inline-block"
                            >
                              HOLD TO ASSIGN EARLY
                            </p>
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
                        </>
                      )}
                      
                      {/* PHASE 2: WAITER ASSIGNED BUT NOT DELIVERED - Yellow DELIVERED Button */}
                      {item.waiter && !item.itemDelivered && (
                        <>
                          {/* Left side content with proper spacing */}
                          <div className="relative px-[27px] pt-[26px] pb-[15px]">
                            <div className="flex gap-2 items-start">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black max-w-[110px] break-words">{item.name}</p>
                              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                            </div>
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 max-w-[166px] break-words">{item.notes}</p>
                            
                            {/* Waiter name - with margin top for spacing */}
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-[9px] mt-3">
                              {item.waiter}
                            </p>
                            
                            {/* Delivery timer - with small margin top */}
                            {item.deliveryElapsedTime !== undefined && (
                              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#3c044d] text-[28px] mt-1">
                                {formatTime(item.deliveryElapsedTime)}
                              </p>
                            )}
                          </div>
                          
                          {/* Cook time - Top Right */}
                          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] right-[25.26px] not-italic text-[#6f839a] text-[20px] text-right top-[33px]">
                            {formatTime(item.elapsedTime)}
                          </p>
                          
                          {/* Cook staff name - Below cook time */}
                          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] right-[25.26px] not-italic text-[#6f839a] text-[10px] text-right top-[58px]">
                            {item.staff}
                          </p>
                          
                          {/* DELIVERED button - Bottom Right (Yellow) */}
                          <button
                            onClick={() => {
                              markItemDelivered(order.department as any, order.id, item.id);
                            }}
                            className="absolute bg-[#edbb0d] hover:bg-[#d4a60b] rounded-[10px] right-[17.26px] bottom-[15px] px-6 py-2 transition-colors"
                          >
                            <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#44391e] text-[16px] text-center whitespace-nowrap">
                              DELIVERED
                            </p>
                          </button>
                        </>
                      )}
                      
                      {/* PHASE 3: ITEM DELIVERED - Figma Design with Green Timer */}
                      {item.waiter && item.itemDelivered && (
                        <>
                          {/* Left side content with proper spacing */}
                          <div className="relative px-[27px] pt-[26px] pb-[15px]">
                            <div className="flex gap-2 items-start">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black max-w-[110px] break-words">{item.name}</p>
                              <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                            </div>
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 max-w-[166px] break-words">{item.notes}</p>
                            
                            {/* Delivered by waiter - with margin top for spacing */}
                            <p className="font-['Poppins:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] text-[#6f839a] text-[10px] mt-3" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
                              ✓ DELIVERED BY: {item.waiter}
                            </p>
                          </div>
                          
                          {/* Cook time - Top Right (GREEN) */}
                          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic right-[12.26px] text-[#00783e] text-[28px] text-right top-[25px] w-[98.739px]">
                            {formatTime(item.elapsedTime)}
                          </p>
                          
                          {/* Cook staff info - Right side */}
                          <div className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#6f839a] text-right right-[12.26px] top-[63px]">
                            <p className="text-[10px] mb-[2px]">{item.staff}</p>
                            <p className="text-[8px] mb-[2px]">
                              STARTED IN: {item.startedTime ? new Date(item.startedTime).toLocaleTimeString() : 'XX:XX'}
                            </p>
                            <p className="text-[8px]">
                              FINISHED IN: {item.finishedTime ? new Date(item.finishedTime).toLocaleTimeString() : 'XX:XX'}
                            </p>
                          </div>
                        </>
                      )}
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
                      <div className="absolute right-[12.26px] top-[63px] bg-[#edbb0d] rounded-[10px] px-6 py-2.5 opacity-70">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#44391e] text-[18px]">COOKING</p>
                      </div>
                    </div>
                  ))}

                  {/* Not Started Items - No START button for checker */}
                  {notStartedItems.map((item) => (
                    <div key={item.id} className="relative w-full min-h-[95px]">
                      <div className="absolute bg-[#f7f7f9] inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      <div className="relative px-[27px] pt-[28px] pb-4">
                        <div className="flex gap-2 items-start">
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[17px] text-black w-[110px] break-words">{item.name}</p>
                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[44px] flex-shrink-0">{item.quantity}X</p>
                        </div>
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[13px] text-black mt-2 w-[166px] break-words">{item.notes}</p>
                      </div>
                      <div className="absolute right-[12.26px] top-[28px] bg-[#880608] rounded-[10px] px-6 py-2.5 opacity-50">
                        <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[18px] text-white">WAITING</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Receipt Status */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#f7f7f9] rounded-[19px] p-4 h-[89px] flex items-center justify-between">
                  <div>
                    <p className="text-[#3c044d] not-italic">
                      {order.delivered ? 'DELIVERED' : order.completed ? 'COMPLETED' : 'ON GOING'}
                    </p>
                    <p className="text-[#541168] text-[11px] not-italic">{order.priority}</p>
                    {(() => {
                      const waiters = Array.from(new Set(order.items.filter(item => item.waiter).map(item => item.waiter)));
                      if (waiters.length === 0) return null;
                      const displayWaiters = waiters.length > 3 
                        ? `${waiters.slice(0, 3).join(', ')}, etc` 
                        : waiters.join(', ');
                      return (
                        <p className="text-[#6f839a] text-[9px] not-italic mt-1">Waiter: {displayWaiters}</p>
                      );
                    })()}
                  </div>
                  
                  {/* Button Logic: FINISHED → ASSIGN → DELIVERED */}
                  {!order.completed && !allFinishedItemsHaveWaiters ? (
                    // FINISHED button (only when all items are finished, unless all already have waiters assigned)
                    <button
                      onClick={() => handleFinishOrder(order.department, order.id)}
                      disabled={!allItemsFinished}
                      className={`rounded-[10px] px-6 py-2 ${
                        allItemsFinished
                          ? 'bg-[#3c044d] cursor-pointer hover:bg-[#5a0670]' 
                          : 'bg-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <p className="text-[20px] not-italic whitespace-nowrap text-gray-50">FINISHED</p>
                    </button>
                  ) : order.completed && !allFinishedItemsHaveWaiters ? (
                    // ASSIGN ALL button (appears after order is completed, skipped if all items already have waiters)
                    <button
                      onClick={() => setWaiterPanel({
                        isOpen: true,
                        department: order.department,
                        orderId: order.id,
                        orderName: order.name,
                        itemId: null,
                        itemName: ''
                      })}
                      className="rounded-[10px] px-6 py-2 bg-[#3c044d] cursor-pointer hover:bg-[#5a0670]"
                    >
                      <p className="text-[20px] not-italic whitespace-nowrap text-white">ASSIGN ALL</p>
                    </button>
                  ) : !order.delivered ? (
                    // All Delivered button (grey/disabled when not all items have waiters)
                    <button
                      onClick={() => {
                        if (order.department && allItemsHaveWaiters) {
                          markDelivered(order.department, order.id);
                        }
                      }}
                      disabled={!allItemsHaveWaiters}
                      className={`rounded-[10px] px-6 py-2 ${
                        allItemsHaveWaiters
                          ? 'bg-[#8b44ac] cursor-pointer hover:bg-[#7a3b96]'
                          : 'bg-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <p className="text-[20px] not-italic whitespace-nowrap text-gray-50">FINISHED</p>
                    </button>
                  ) : (
                    // Disabled DELIVERED state
                    <button
                      disabled
                      className="rounded-[10px] px-6 py-2 bg-transparent cursor-default"
                    >
                      <p className="text-[24px] not-italic whitespace-nowrap text-[#4caf50]">DELIVERED</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Waiter Panel */}
      <SelectWaiterPanel
        isOpen={waiterPanel.isOpen}
        onClose={() => setWaiterPanel({ isOpen: false, department: null, orderId: null, orderName: '', itemId: null, itemName: '' })}
        onSelectWaiter={(waiterName) => {
          if (waiterPanel.department && waiterPanel.orderId) {
            // If itemId is present, assign to specific item; otherwise assign to entire order
            if (waiterPanel.itemId) {
              assignWaiterToItem(waiterPanel.department, waiterPanel.orderId, waiterPanel.itemId, waiterName);
            } else {
              assignWaiter(waiterPanel.department, waiterPanel.orderId, waiterName);
            }
          }
          setWaiterPanel({ isOpen: false, department: null, orderId: null, orderName: '', itemId: null, itemName: '' });
        }}
        orderName={waiterPanel.itemId ? `${waiterPanel.orderName} - ${waiterPanel.itemName}` : waiterPanel.orderName}
        orderId={waiterPanel.orderId}
      />

      {/* Search Receipt Sidebar Checker */}
      <SearchReceiptSidebarChecker
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        orders={allOrders}
        currentPage="all"
      />
    </div>
  );
}