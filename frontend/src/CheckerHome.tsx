/**
 * CheckerHome.tsx - Checker Section Selection Page
 * 
 * Landing page for Checker department that displays 4 section options:
 * - MAKANAN (Kitchen/Food)
 * - BAR (Beverages)
 * - SNACK (Snacks)
 * - ALL (All departments combined)
 * 
 * Each section is represented by a clickable card with:
 * - Purple background card (#643f7f)
 * - White icon in the center
 * - White label button at the bottom
 * 
 * Features:
 * - Decorative sparkle icon at top center
 * - Dark purple background (#4d236e)
 * - Centered flex layout with gap of 50px (1/5th of card width)
 * - Click to navigate to respective department pages
 */

import { useState, useEffect } from 'react';
import CheckerDepartmentIconPaths from "./imports/CheckerDepartmentIcon";
import { imgGroup, imgGroup1, imgGroup2 } from "./imports/BackgroundPlaceholders";
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIcon";
import { useNavigate } from 'react-router-dom';
import { useOrders } from './contexts/OrderContext';
import SnackIconSmall from './imports/SnackIconSmall';
import HomeSnackIcon from './imports/HomeSnackIcon';
import CheckerEyeIcon from './imports/CheckerEyeIcon';

/**
 * BackButton Component
 * Eye icon button to navigate back to home - positioned to match other checker pages
 */
function BackButton() {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/home')}
      className="absolute left-[44px] top-[10px] size-[80px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <CheckerEyeIcon />
    </div>
  );
}

/**
 * ButtonMakanan Component
 * Food/Kitchen department card with food icon (plate, fork, knife)
 */
function ButtonMakanan() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/checkermakananorders')}
    >
      {/* Purple card background */}
      <div className="bg-[#643f7f] h-[348px] rounded-[20px] w-[245px]" data-name="Makanan" />
      
      {/* White label button */}
      <div className="absolute bg-white bottom-[13px] left-[39px] rounded-[10px] h-[52px] w-[167px] flex items-center justify-center">
        <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[24px]">MAKANAN</p>
      </div>
      
      {/* Food Icon - Plate with fork and knife */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[95px] -mt-6">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 124">
          <g id="Food Iocn">
            <mask height="124" id="mask0_food" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="145" x="0" y="0">
              <g id="303cbfc917">
                <path d="M0 0H144.674V124H0V0Z" fill="white" id="Vector" />
              </g>
            </mask>
            <g mask="url(#mask0_food)">
              <g id="Group">
                <path d={CheckerDepartmentIconPaths.p366b400} fill="#FCDFFF" id="Vector_2" />
              </g>
              <path d={CheckerDepartmentIconPaths.p1519d700} fill="#FCDFFF" id="Vector_3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * ButtonBar Component
 * Bar/Beverage department card with drink glass icon
 */
function ButtonBar() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/checkerbarorders')}
    >
      {/* Purple card background */}
      <div className="bg-[#643f7f] h-[348px] rounded-[20px] w-[245px]" data-name="BAR" />
      
      {/* White label button */}
      <div className="absolute bg-white bottom-[13px] left-[39px] rounded-[10px] h-[52px] w-[167px] flex items-center justify-center">
        <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[24px]">BAR</p>
      </div>
      
      {/* Bar Icon - Drink glass */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[95px] -mt-6">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 74 117">
          <g id="Bar Icon">
            <path d={CheckerDepartmentIconPaths.p1090bb00} fill="#FCDFFF" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * ButtonSnack Component
 * Snack department card with burger and fries icon
 */
function ButtonSnack() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/checkersnackorders')}
    >
      {/* Purple card background */}
      <div className="bg-[#643f7f] h-[348px] rounded-[20px] w-[245px]" data-name="Snack" />
      
      {/* White label button */}
      <div className="absolute bg-white bottom-[13px] left-[39px] rounded-[10px] h-[52px] w-[167px] flex items-center justify-center">
        <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[24px]">SNACK</p>
      </div>
      
      {/* Snack Logo - Burger and fries */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95px] h-[95px] -mt-6" data-name="Logo snack">
        <HomeSnackIcon />
      </div>
    </div>
  );
}

/**
 * ButtonAll Component
 * ALL section card with sparkle icon - shows all departments combined
 */
function ButtonAll() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/checkerorders')} // Navigate to checker orders (all departments)
    >
      {/* Purple card background */}
      <div className="bg-[#643f7f] h-[348px] rounded-[20px] w-[245px]" data-name="All" />
      
      {/* White label button */}
      <div className="absolute bg-white bottom-[13px] left-[39px] rounded-[10px] h-[52px] w-[167px] flex items-center justify-center">
        <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[24px]">ALL</p>
      </div>
      
      {/* Sparkle Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[125px] -mt-6">
        <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 78 96">
            <g id="Group">
              <path d={SparkleDecorationPaths.p231aba80} fill="#FCDFFF" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * PickASectionHeader Component
 * "PICK A SECTION TO CHECK" text header
 */
function PickASectionHeader() {
  return (
    <div className="absolute left-[54px] top-[140px]" data-name="Pick a Section Header">
      {/* Text */}
      <div className="whitespace-nowrap">
        <p className="font-['Poppins:Bold',sans-serif] text-[35px] text-white leading-normal flex items-center gap-3">
          <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
            <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                <g>
                  <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                </g>
              </svg>
            </span>
          </span>
          PICK A SECTION TO CHECK
        </p>
      </div>
    </div>
  );
}

/**
 * CheckerHome Component - Main Export
 * 
 * Displays the section selection screen for Checker with 4 options.
 * Cards are centered with gap of 50px (1/5th of card width).
 */
export default function CheckerHome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { getAllOrders } = useOrders();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatClock = () => {
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Calculate receipts ready to assign
  const getReceiptsToAssign = () => {
    const allDepartmentOrders = getAllOrders();
    let count = 0;

    // Count receipts that are either:
    // 1. All items finished (can press FINISHED button)
    // 2. Already finished status (can press ASSIGN button)
    allDepartmentOrders.forEach(({ department, orders }) => {
      orders.forEach(order => {
        // Check if order is finished (has ASSIGN button available)
        if (order.status === 'finished' && !order.assignedWaiter) {
          count++;
        }
        // Check if all items are finished (can press FINISHED button)
        else if (order.status !== 'finished' && order.items.every(item => item.status === 'finished')) {
          count++;
        }
      });
    });

    return count;
  };

  const receiptsToAssign = getReceiptsToAssign();

  return (
    <div className="bg-[#4d236e] relative w-full h-screen" data-name="Checker Home - Section Selection">
      {/* Back button */}
      <BackButton />
      
      {/* Section Checker text beside back button */}
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[133px] not-italic text-[28px] text-white top-[17px]">Section Checker</p>
      
      {/* Receipt to Assign - positioned like "Item On Going" */}
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Poppins:Regular',sans-serif] leading-[normal] left-[134px] not-italic text-[14px] text-white top-[62px] underline">{receiptsToAssign} Receipt to Assign</p>
      
      {/* Clock - matching position from other checker pages */}
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] right-[44px] not-italic text-[40px] text-white top-[26px]">{formatClock()}</p>
      
      {/* Pick a Section Header with Sparkle */}
      <PickASectionHeader />
      
      {/* Centered container for all 4 cards */}
      <div className="absolute top-[265px] left-1/2 -translate-x-1/2 flex gap-[50px]">
        <ButtonAll />
        <ButtonMakanan />
        <ButtonBar />
        <ButtonSnack />
      </div>
    </div>
  );
}