/**
 * SearchReceiptSidebar.tsx - Receipt Search Sidebar
 * 
 * A sliding sidebar that appears from the left when clicking the Makanan profile icon.
 * Shows all receipts with search functionality and expandable menu items.
 */

import { useState } from 'react';
import { type Order, type MenuItem } from '../data/makananOrders';
import { useNavigate } from 'react-router-dom';
import CookChefIconPaths from "../imports/CookChefIcon";
import StatusCirclesPaths from "../imports/StatusCirclesPaths";
import { imgGroup } from "../imports/PlaceholderSquare";
import ReceiptCardIconPaths from "../imports/ReceiptCardIconPaths";
import { imgGroup as imgGroupArrow, imgGroup1 } from "../imports/ReceiptCardMasks";
import HomeButtonPaths from "../imports/HomeButtonPaths";
import HomeKitchenIcon from "../imports/HomeKitchenIcon";

interface SearchReceiptSidebarProps {
  isOpen: boolean;
  orders: Order[];
  onClose: () => void;
  onGoHome: () => void;
}

export default function SearchReceiptSidebar({
  isOpen,
  orders,
  onClose,
  onGoHome
}: SearchReceiptSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  // Calculate statistics
  const allItems = orders.flatMap(order => order.items);
  const onGoingCount = allItems.filter(item => item.status === 'on-their-way').length;
  const notStartedCount = allItems.filter(item => item.status === 'not-started').length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getOrderElapsedTime = (order: Order) => {
    const startedItem = order.items.find(item => item.startedTime);
    if (!startedItem) return 0;
    return order.frozenTime !== undefined ? order.frozenTime : Math.floor((Date.now() - startedItem.startedTime!) / 1000);
  };

  const getIndicatorColor = (order: Order) => {
    const allFinished = order.items.every(item => item.status === 'finished');
    const allNotStarted = order.items.every(item => item.status === 'not-started');
    
    if (allFinished) return '#4caf50'; // green
    if (allNotStarted) return '#EC6567'; // red
    return '#FFEF63'; // yellow
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    if (!searchQuery.trim()) return true;
    
    // Search in order name
    if (order.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    
    // Search in order ID
    if (order.orderId.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    
    // Search in menu items
    return order.items.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Count matching items when searching
  const getMatchingItemsCount = () => {
    if (!searchQuery.trim()) return 0;
    
    let count = 0;
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          count++;
        }
      });
    });
    return count;
  };

  const matchingItemsCount = getMatchingItemsCount();

  // Handle search - expand first matching order if searching for menu item
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setExpandedOrderIds(new Set());
      return;
    }

    // Find ALL orders that contain matching menu items
    const matchingOrderIds = orders
      .filter(order =>
        order.items.some(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      )
      .map(order => order.id);

    if (matchingOrderIds.length > 0) {
      setExpandedOrderIds(new Set(matchingOrderIds));
      
      // Scroll to the first expanded order after a short delay
      setTimeout(() => {
        const element = document.getElementById(`sidebar-order-${matchingOrderIds[0]}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  // Handle receipt click - navigate to that receipt in main view
  const handleReceiptClick = (orderId: string) => {
    onClose();
    // Scroll to the receipt in the main view
    setTimeout(() => {
      const element = document.getElementById(`order-${orderId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 300);
  };

  // Toggle expanded state
  const toggleExpand = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent receipt click navigation
    setExpandedOrderIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Handle home button click
  const handleHomeClick = () => {
    onClose();
    onGoHome();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full w-[440px] bg-[#4c226c] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-[#4d226c] h-[100px] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)] relative">
          {/* Food Profile Icon */}
          <div className="absolute left-[33px] size-[70px] top-[15px] cursor-pointer" onClick={onClose}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
              <g>
                <circle cx="40" cy="40" fill="#61428C" r="40" />
                <g>
                  <mask height="50" id="mask0_9_95_sidebar" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="58" x="11" y="17">
                    <g>
                      <path d={CookChefIconPaths.pb41c280} fill="white" />
                    </g>
                  </mask>
                  <g mask="url(#mask0_9_95_sidebar)">
                    <g>
                      <path d={CookChefIconPaths.pdb93600} fill="white" />
                    </g>
                    <path d={CookChefIconPaths.p242b800} fill="white" />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Section Title */}
          <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[117px] not-italic text-[20px] text-white top-[24px]">
            Section Makanan
          </p>

          {/* Statistics */}
          <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[117px] not-italic text-[10px] text-white top-[57px] underline">
            {onGoingCount} Item On Going
          </p>
          

          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className="absolute right-[34px] top-[32px] w-[41px] h-[36px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 36">
              <g>
                <path d={HomeButtonPaths.p383e5e00} fill="#F9FAFB" />
                <path d={HomeButtonPaths.p13ce4980} fill="#F9FAFB" />
              </g>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-[41px] pt-[32px] pb-[16px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full h-[50px] bg-gray-50 rounded-[18px] px-6 text-[14px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-3 text-center">
              <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-white/80 text-left">
                Found <span className="font-['Poppins:Bold',sans-serif] text-white">{matchingItemsCount}</span> items for <span className="font-['Poppins:Bold',sans-serif] text-white">"{searchQuery}"</span>
              </p>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="h-[calc(100vh-198px)] overflow-y-auto px-[26px] space-y-6 pb-8">
          {filteredOrders.map((order) => {
            const indicatorColor = getIndicatorColor(order);
            const isExpanded = expandedOrderIds.has(order.id);
            const itemCount = order.items.length;

            return (
              <div 
                key={order.id} 
                id={`sidebar-order-${order.id}`}
                className="relative"
              >
                {/* Receipt Card */}
                <div className="relative shadow-[0px_8px_12px_0px_rgba(0,0,0,0.4)]">
                  {/* Top Section */}
                  <div 
                    onClick={() => handleReceiptClick(order.id)}
                    className="bg-[#3c044d] rounded-none cursor-pointer hover:bg-[#4a0560] transition-colors h-[80px] relative"
                  >
                    {/* Indicator */}
                    {order.priority === 'NORMAL' ? (
                      <div 
                        className="absolute left-[30px] top-[28px] w-[24px] h-[24px] rounded-full" 
                        style={{ backgroundColor: indicatorColor }}
                      />
                    ) : (
                      <div className="absolute left-[18px] top-[16px] w-[48px] h-[48px] mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${imgGroup1}')` }}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
                          <path d={ReceiptCardIconPaths.p3e5c6d00} fill={indicatorColor} />
                        </svg>
                      </div>
                    )}

                    {/* Order Info */}
                    <div className="absolute left-[73px] top-[20px]">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[16px] text-gray-50 max-w-[140px] truncate">
                        {order.name}
                      </p>
                      <p className="[text-underline-position:from-font] decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[8px] text-white underline mt-1">
                        ID ORDER: {order.orderId}
                      </p>
                    </div>

                    {/* Food Icon */}
                    <div className="absolute left-[197px] top-[22px] w-[40px] h-[35px]">
                      <HomeKitchenIcon />
                    </div>

                    {/* Timer */}
                    <p className="absolute right-[17px] top-[26px] font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[28px] text-white">
                      {formatTime(getOrderElapsedTime(order))}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div 
                    onClick={(e) => toggleExpand(order.id, e)}
                    className="bg-[#3c044d] h-[35px] relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer hover:bg-[#4a0560] transition-colors"
                  >
                    <p 
                      onClick={(e) => toggleExpand(order.id, e)}
                      className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[30px] not-italic text-[14px] text-gray-50 top-[8px] underline cursor-pointer"
                    >
                      {itemCount} Items
                    </p>
                    
                    {/* Unfurl Arrow Button */}
                    <button
                      onClick={(e) => toggleExpand(order.id, e)}
                      className="absolute right-[17px] top-[8.75px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className={`w-[10px] h-[17.5px] mask-alpha mask-intersect mask-no-clip mask-no-repeat transition-transform ${isExpanded ? 'rotate-90' : '-rotate-90'}`} style={{ maskImage: `url('${imgGroupArrow}')` }}>
                        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 10 18">
                          <g>
                            <path d={ReceiptCardIconPaths.p2a48fd00} fill="#F9FAFB" />
                          </g>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Expanded Menu Items */}
                {isExpanded && (
                  <div className="bg-[#3c044d] mt-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                    <div className="px-[24px] py-[16px] space-y-3 max-h-[300px] overflow-y-auto">
                      {order.items.map((item) => {
                        const itemColor = item.status === 'finished' 
                          ? '#4caf50' 
                          : item.status === 'on-their-way'
                            ? '#FFEF63'
                            : '#EC6567';

                        // Highlight searched items
                        const isSearched = searchQuery && 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase());

                        return (
                          <div 
                            key={item.id} 
                            onClick={() => handleReceiptClick(order.id)}
                            className={`flex items-start gap-3 p-2 cursor-pointer hover:bg-white/5 transition-colors ${isSearched ? 'bg-white/10 rounded' : ''}`}
                          >
                            {/* Status Indicator */}
                            <div 
                              className="w-[14px] h-[14px] rounded-full flex-shrink-0 mt-1" 
                              style={{ backgroundColor: itemColor }}
                            />

                            {/* Item Name */}
                            <p className="flex-1 font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[12px] text-white">
                              {item.name}
                            </p>

                            {/* Quantity */}
                            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[12px] text-white flex-shrink-0">
                              {item.quantity}X
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* No results message */}
          {filteredOrders.length === 0 && searchQuery && (
            <div className="text-center text-white/60 text-[14px] py-8">
              No orders or items found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}