/**
 * Home.tsx - Department Selection Page
 * 
 * Landing page that displays 4 department options:
 * - MAKANAN (Kitchen/Food)
 * - BAR (Beverages)
 * - SNACK (Snacks)
 * - CHECKER (Quality Check/Inspection)
 * 
 * Each department is represented by a clickable card with:
 * - Purple background card (#643f7f)
 * - White icon in the center
 * - White label button at the bottom
 * 
 * Features:
 * - Decorative sparkle icon at top center
 * - Dark purple background (#4d236e)
 * - Centered flex layout with gap of 50px (1/5th of card width)
 * - Click to navigate to respective department pages
 * - Sign out button in top-left corner
 */

import CheckerDepartmentIconPaths from "./imports/CheckerDepartmentIcon";
import { imgGroup, imgGroup1, imgGroup2 } from "./imports/BackgroundPlaceholders";
import { useNavigate } from 'react-router-dom';
import HomeSnackIcon from './imports/HomeSnackIcon';
import { LogOut } from 'lucide-react';

/**
 * ButtonMakanan Component
 * Food/Kitchen department card with food icon (plate, fork, knife)
 */
function ButtonMakanan() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/pin')}
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
      onClick={() => navigate('/minuman')}
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
      onClick={() => navigate('/snack')}
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
 * ButtonChecker Component
 * Checker/Quality Control department card with eye icon
 */
function ButtonChecker() {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative cursor-pointer transition-transform hover:scale-105" 
      onClick={() => navigate('/checker')} // Navigate to checker PIN entry
    >
      {/* Purple card background */}
      <div className="bg-[#643f7f] h-[348px] rounded-[20px] w-[245px]" data-name="Checker" />
      
      {/* White label button */}
      <div className="absolute bg-white bottom-[13px] left-[39px] rounded-[10px] h-[52px] w-[167px] flex items-center justify-center">
        <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[24px]">CHECKER</p>
      </div>
      
      {/* Eye Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[185px] h-[105px] -mt-6">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 146 82">
          <g id="Clip path group">
            <mask height="82" id="mask0_checker" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="146" x="0" y="0">
              <g id="31007a1e86">
                <path d="M0 0H146V81.3421H0V0Z" fill="white" id="Vector" />
              </g>
            </mask>
            <g mask="url(#mask0_checker)">
              <g id="Group">
                <path d={CheckerDepartmentIconPaths.p1c877780} fill="#FCDFFF" id="Vector_2" />
              </g>
              <path d={CheckerDepartmentIconPaths.p28141a80} fill="#FCDFFF" id="Vector_3" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * SparkleBlue Component
 * Decorative sparkle icon displayed at top center of the page
 */
function SparkleBlue() {
  return (
    <>
      <div className="absolute inset-[2.38%_45.16%_79.38%_45.23%]" data-name="SPARKLE BLUE">
        <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat transition-transform hover:scale-105" style={{ maskImage: `url('${imgGroup2}')` }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126 149">
            <g id="Group">
              <path d={CheckerDepartmentIconPaths.p250f68f0} fill="#B7C9FF" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Title text below sparkle */}
      <div className="absolute top-[22.8%] left-1/2 -translate-x-1/2">
        <p className="font-['Poppins',sans-serif] text-[clamp(18px,2.34vw,24px)] text-[#FCDFFF] text-center whitespace-nowrap">
          Kitchen Display & Performance System
        </p>
      </div>
    </>
  );
}

/**
 * Home Component - Main Export
 * 
 * Displays the department selection screen with 4 options.
 * Cards are centered with gap of 50px (1/5th of card width).
 */
export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#4d236e] relative w-full h-screen" data-name="Home - Department Selection">
      {/* Sign Out Button - Top Left Corner */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all active:scale-95"
      >
        <LogOut className="size-5" />
        <span className="font-['Poppins',sans-serif]">Sign Out</span>
      </button>
      
      {/* Centered container for all 4 cards */}
      <div className="absolute top-[265px] left-1/2 -translate-x-1/2 flex gap-[50px]">
        <ButtonMakanan />
        <ButtonBar />
        <ButtonSnack />
        <ButtonChecker />
      </div>
      
      {/* Decorative sparkle at top */}
      <SparkleBlue />
    </div>
  );
}
