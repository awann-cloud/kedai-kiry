/**
 * CheckerSnackOrders.tsx - Checker's Snack Order View
 * 
 * View-only interface for Checker to monitor snack orders.
 * Similar to SnackOrders but without cook selection functionality.
 * All updates sync through OrderContext.
 */

import { useState, useEffect } from 'react';
import StatusCirclesPaths from "./imports/StatusCirclesPaths";
import { imgGroup } from "./imports/PlaceholderSquare";
import { type MenuItem } from './data/orders';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SelectWaiterPanel from './components/SelectWaiterPanel';
import IconsProfileChecker from './imports/IconsProfileChecker';
import { useOrders } from './contexts/OrderContext';
import IconsReceiptSnack from './imports/IconsReceiptSnack';
import SearchReceiptSidebarChecker from './components/SearchReceiptSidebarChecker';
import CheckerEyeIcon from './imports/CheckerEyeIcon';

function SnackIcon({ onClick }: { onClick: () => void}) {
  return (
    <div className="w-[80px] h-[80px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
      <CheckerEyeIcon />
    </div>
  );
}

export default function CheckerSnackOrders() {
  const { getOrders, finishItem, completeOrder, assignWaiter, markDelivered } = useOrders();
  const orders = getOrders('snack');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [waiterPanel, setWaiterPanel] = useState<{
    isOpen: boolean;
    orderId: string | null;
    orderName: string;
  }>({
    isOpen: false,
    orderId: null,
    orderName: ''
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

  const handleDoneItem = (orderId: string, itemId: string) => {
    finishItem('snack', orderId, itemId);
  };

  const handleFinishOrder = (orderId: string) => {
    completeOrder('snack', orderId);
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

  const getTotalStats = () => {
    const allItems = orders.flatMap(order => order.items);
    const onGoingCount = allItems.filter(item => item.status === 'on-their-way').length;
    const notStartedCount = allItems.filter(item => item.status === 'not-started').length;
    
    const onGoingItems = allItems.filter(item => item.status === 'on-their-way' && item.startedTime);
    const longestTime = onGoingItems.length > 0
      ? Math.max(...onGoingItems.map(item => Math.floor((Date.now() - item.startedTime!) / 1000)))
      : 0;
    
    return { onGoingCount, notStartedCount, longestTime };
  };

  const stats = getTotalStats();

  const formatClock = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-[#4D236E]">
      {/* Header Section */}
      <div className="bg-[#4d236e] relative h-[100px] px-[44px] py-[10px]">
        <SnackIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[133px] not-italic text-[28px] text-white top-[17px]">Section Snack (Checker)</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[134px] not-italic text-[14px] text-white top-[62px] underline">{stats.onGoingCount} Item On Their Way</p>
        <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[281px] not-italic text-[14px] text-white top-[62px] underline">{stats.notStartedCount} Item Hasn't Started Yet</p>
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] right-[44px] not-italic text-[40px] text-white top-[26px]">{formatClock()}</p>
      </div>

      {/* Orders Section */}
      <div className="flex gap-8 overflow-x-auto pb-4 px-8 pt-4">
        {orders
          .sort((a, b) => {
            // Check if all items are finished for each order
            const aAllFinished = a.items.every(item => item.status === 'finished');
            const bAllFinished = b.items.every(item => item.status === 'finished');
            
            // Finished receipts (FINISHED button clickable) come first
            if (aAllFinished && !bAllFinished) return -1;
            if (!aAllFinished && bAllFinished) return 1;
            
            // Within same finished status, priority orders first
            if (a.priority === 'PRIORITAS' && b.priority !== 'PRIORITAS') return -1;
            if (a.priority !== 'PRIORITAS' && b.priority === 'PRIORITAS') return 1;
            
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
          
          let indicatorColor = '#FFEF63';
          if (allItemsFinished) {
            indicatorColor = '#4caf50';
          } else if (allItemsNotStarted) {
            indicatorColor = '#ff4444';
          }

          return (
            <div key={order.id} id={`order-${order.id}`} className="flex-shrink-0 w-[391px]">
              <div className="bg-[#8b6dac] rounded-[19px] overflow-hidden shadow-lg h-[633px] relative">
                {/* Receipt Statistic */}
                <div className="absolute top-[58px] left-0 right-0 bg-[#f7f7f9] rounded-[19px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[89px] z-10">
                  <div className="absolute right-[18px] top-[40px] w-[35px] h-[35px]">
                    <IconsReceiptSnack />
                  </div>
                  <p className="absolute left-[21px] top-[43px] text-[#541168] text-[15px] underline not-italic">{counts.total} ITEMS</p>
                  <p className="absolute left-[21px] top-[67px] text-[#6f839a] text-[7px] not-italic">{counts.finished} ITEMS FINISHED</p>
                  <p className="absolute left-[89px] top-[67px] text-[#6f839a] text-[7px] not-italic">{counts.toGo} ITEMS TO GO</p>
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
                    <p className="text-gray-50 not-italic font-bold text-[18px]">{order.name}</p>
                    <p className="text-white text-[11px] underline not-italic">ID ORDER: {order.orderId}</p>
                  </div>
                  <p className="text-white text-[28px] not-italic">{formatTime(orderTime)}</p>
                </div>

                {/* Scrollable Items Area */}
                <div className="absolute top-[147px] bottom-[89px] left-0 right-0 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Finished Items */}
                  {finishedItems.map((item) => (
                    <div key={item.id} className="relative w-full min-h-[130px]">
                      <div className="absolute bg-gray-50 inset-0 rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
                      <div className="relative px-[27px] pt-[20px] pb-4">
                        <div className="flex gap-2 items-start">
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[110px] break-words">{item.name}</p>
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
                      <div className="absolute right-[12.26px] top-[63px] bg-[#edbb0d] rounded-[10px] px-6 py-2.5 opacity-50">
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
                          <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-black w-[110px] break-words">{item.name}</p>
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
                      {order.delivered ? 'DELIVERED' : order.completed ? 'COMPLETED' : 'ON THEIR WAY'}
                    </p>
                    <p className="text-[#541168] text-[11px] not-italic">{order.priority}</p>
                    {order.waiter && (
                      <p className="text-[#6f839a] text-[9px] not-italic mt-1">Waiter: {order.waiter}</p>
                    )}
                  </div>
                  
                  {/* Button Logic: FINISHED → ASSIGN → DELIVERED */}
                  {!order.completed ? (
                    // FINISHED button (only when all items are finished)
                    <button
                      onClick={() => handleFinishOrder(order.id)}
                      disabled={!allItemsFinished}
                      className={`rounded-[10px] px-6 py-2 ${
                        allItemsFinished
                          ? 'bg-[#3c044d] cursor-pointer hover:bg-[#5a0670]' 
                          : 'bg-gray-400 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <p className="text-[24px] not-italic whitespace-nowrap text-gray-50">FINISHED</p>
                    </button>
                  ) : !order.waiter ? (
                    // ASSIGN button (appears after order is completed)
                    <button
                      onClick={() => setWaiterPanel({
                        isOpen: true,
                        orderId: order.id,
                        orderName: order.name
                      })}
                      className="rounded-[10px] px-6 py-2 bg-[#3c044d] cursor-pointer hover:bg-[#5a0670]"
                    >
                      <p className="text-[24px] not-italic whitespace-nowrap text-white">ASSIGN</p>
                    </button>
                  ) : !order.delivered ? (
                    // DELIVERED button (after waiter is assigned)
                    <button
                      onClick={() => markDelivered('snack', order.id)}
                      className="rounded-[10px] px-6 py-2 bg-[#8b44ac] cursor-pointer hover:bg-[#7a3b96]"
                    >
                      <p className="text-[24px] not-italic whitespace-nowrap text-white">DELIVERED</p>
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
        onClose={() => setWaiterPanel({ isOpen: false, orderId: null, orderName: '' })}
        onSelectWaiter={(waiterName) => {
          if (waiterPanel.orderId) {
            assignWaiter('snack', waiterPanel.orderId, waiterName);
          }
          setWaiterPanel({ isOpen: false, orderId: null, orderName: '' });
        }}
        orderName={waiterPanel.orderName}
        orderId={waiterPanel.orderId}
      />

      {/* Search Receipt Sidebar */}
      <SearchReceiptSidebarChecker
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        orders={orders}
        currentPage="snack"
      />
    </div>
  );
}