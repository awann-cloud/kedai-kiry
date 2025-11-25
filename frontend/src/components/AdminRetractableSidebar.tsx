import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Settings, ChevronRight as AdminSidebarIconRetractable, UtensilsCrossed } from "lucide-react";
import AdminSidebarIconHome from "../imports/AdminSidebarIconHome";
import AdminSidebarIconStaff from "../imports/AdminSidebarIconStaff";
import AdminSidebarIconDatabase from "../imports/AdminSidebarIconDatabase";

interface AdminRetractableSidebarProps {
  activePage?: "home" | "staff" | "database" | "menu" | "notifications" | "settings";
}

export function AdminRetractableSidebar({ activePage }: AdminRetractableSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out flex flex-col z-50 ${
        isExpanded ? "w-[240px] bg-[rgba(60,4,77,1)]" : "w-[76px] bg-[rgba(60,4,77,0.46)]"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center pt-[20px] bg-[rgba(0,0,0,0)]">
        {/* Retractable Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all"
        >
          <div className="w-[19px] h-[19px] flex items-center justify-center flex-shrink-0">
            <AdminSidebarIconRetractable
              className="w-[19px] h-[19px] transition-transform duration-300"
              style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
              stroke="white"
              strokeWidth={2.5}
            />
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Collapse</span>
          )}
        </button>

        {/* Divider */}
        <div className="w-[calc(100%-16px)] h-px bg-[#A587CE] my-3" />

        {/* Search Button */}
        <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="15.5"
                y1="15.5"
                x2="19.5"
                y2="19.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Search</span>
          )}
        </button>

        {/* Divider */}
        <div className="w-[calc(100%-16px)] h-px bg-[#A587CE] mt-3" />
      </div>

      {/* Middle Section */}
      <div className="flex flex-col mt-6 flex-1">
        {/* HomeAdmin Button */}
        <button
          onClick={() => navigate("/admin")}
          className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all ${
            activePage === "home" ? "bg-[rgba(255,255,255,0.1)]" : ""
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full scale-95">
              <AdminSidebarIconHome />
            </div>
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Home</span>
          )}
        </button>

        {/* Staff/User Button */}
        <button
          onClick={() => navigate('/staff-management')}
          className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all ${
            activePage === "staff" ? "bg-[rgba(255,255,255,0.1)]" : ""
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full scale-[0.85]">
              <AdminSidebarIconStaff />
            </div>
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Staff</span>
          )}
        </button>

        {/* Raw Database Button */}
        <button
          onClick={() => navigate('/raw-database')}
          className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all ${
            activePage === "database" ? "bg-[rgba(255,255,255,0.1)]" : ""
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full scale-[0.85]">
              <AdminSidebarIconDatabase />
            </div>
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Raw Database</span>
          )}
        </button>

        {/* Menu Button */}
        <button
          onClick={() => navigate('/menu-management')}
          className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all ${
            activePage === "menu" ? "bg-[rgba(255,255,255,0.1)]" : ""
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-5 h-5" strokeWidth={2} stroke="white" />
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Menu</span>
          )}
        </button>

        {/* Settings */}

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col pb-[20px]">
        {/* Divider */}
        <div className="w-[calc(100%-16px)] h-px bg-[#A587CE] mb-3 mx-auto" />

        {/* Settings Button */}
        <button
          onClick={() => navigate('/admin-settings')}
          className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all ${
            activePage === "settings" ? "bg-[rgba(255,255,255,0.1)]" : ""
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <Settings className="w-5 h-5" strokeWidth={2} stroke="white" />
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Settings</span>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.15)] transition-all"
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <LogOut className="w-5 h-5" strokeWidth={2} stroke="white" />
          </div>
          {isExpanded && (
            <span className="text-white text-sm whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}