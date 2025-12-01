/**
 * CookingAnalytics.tsx - Main Analytics Component
 * 
 * Combines filters, chart, and CSV export functionality.
 * This is the main component that gets added to AdminHome.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaff, type AnalyticsFilters as FilterType } from '../contexts/StaffContext';
import AnalyticsFilters from './AnalyticsFilters';
import EfficiencyChart from './EfficiencyChart';
import { Download, Database, ExternalLink, ChevronLeft, ChevronRight, Calendar, SlidersHorizontal } from 'lucide-react';
import SparkleDecorationPaths from "../imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "../imports/SparkleIconMask";
import CheckerDepartmentIconPaths from "../imports/CheckerDepartmentIcon";
import HomeSnackIcon from '../imports/HomeSnackIcon';

export default function CookingAnalytics() {
  const navigate = useNavigate();
  const { getProcessedLogs, exportToCSV, showRealDataOnly, toggleDataSource } = useStaff();

  // Filter state
  const [filters, setFilters] = useState<FilterType>({
    employee: 'All Employees',
    menuItem: 'All Dishes',
    efficiency: 'All Efficiency',
    startDate: '',
    endDate: ''
  });

  // Quick filter state
  const [activeQuickFilter, setActiveQuickFilter] = useState<'yesterday' | 'today' | 'week' | 'month' | null>(null);

  // Show advanced filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPages = 5;

  // Quick filter functions
  const handleQuickFilter = (period: 'yesterday' | 'today' | 'week' | 'month') => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate: Date;
    let endDate: Date = now;
    
    if (period === 'yesterday') {
      // Yesterday only
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      endDate = new Date(today);
      endDate.setDate(today.getDate() - 1);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'today') {
      // Today only
      startDate = today;
      endDate = now;
    } else if (period === 'week') {
      // Start of current week (Sunday)
      const day = now.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - day);
    } else { // month
      // Start of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    setFilters(prev => ({
      ...prev,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    }));
    
    setActiveQuickFilter(period);
    setCurrentPage(1); // Reset to first page
  };

  // Clear quick filter
  const clearQuickFilter = () => {
    setActiveQuickFilter(null);
  };

  // Get processed logs based on current filters
  const processedLogs = useMemo(() => {
    return getProcessedLogs(filters);
  }, [filters, getProcessedLogs]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle CSV export
  const handleExport = () => {
    exportToCSV(processedLogs);
  };

  // Calculate pagination
  const maxDisplayableRecords = maxPages * itemsPerPage; // 50 records max
  const displayableLogs = processedLogs.slice(0, maxDisplayableRecords);
  const totalPages = Math.min(Math.ceil(displayableLogs.length / itemsPerPage), maxPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = displayableLogs.slice(startIndex, endIndex);
  const hasMoreRecords = processedLogs.length > maxDisplayableRecords;

  return (
    <div className="space-y-6" data-name="cooking-efficiency-section">
      {/* Pick a Section Header */}
      <div>
        <p className="font-['Poppins:Bold',sans-serif] text-[24px] text-white leading-normal flex items-center gap-3">
          <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
            <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                <g>
                  <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                </g>
              </svg>
            </span>
          </span>
          PICK A SECTION
        </p>
      </div>

      {/* Department Cards */}
      <div className="flex gap-6 justify-center">
        {/* ALL Button */}
        <div 
          className="relative cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/checkerorders')}
        >
          <div className="bg-[#643f7f] h-[250px] rounded-[20px] w-[180px]" />
          <div className="absolute bg-white bottom-[13px] left-[27px] rounded-[10px] h-[45px] w-[126px] flex items-center justify-center">
            <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[20px]">ALL</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75px] h-[95px] -mt-4">
            <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 78 96">
                <g>
                  <path d={SparkleDecorationPaths.p231aba80} fill="#FCDFFF" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* MAKANAN Button */}
        <div 
          className="relative cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/checkermakananorders')}
        >
          <div className="bg-[#643f7f] h-[250px] rounded-[20px] w-[180px]" />
          <div className="absolute bg-white bottom-[13px] left-[27px] rounded-[10px] h-[45px] w-[126px] flex items-center justify-center">
            <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[20px]">MAKANAN</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[70px] -mt-4">
            <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 124">
              <g>
                <mask height="124" id="mask0_food_admin" maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} width="145" x="0" y="0">
                  <g>
                    <path d="M0 0H144.674V124H0V0Z" fill="white" />
                  </g>
                </mask>
                <g mask="url(#mask0_food_admin)">
                  <g>
                    <path d={CheckerDepartmentIconPaths.p366b400} fill="#FCDFFF" />
                  </g>
                  <path d={CheckerDepartmentIconPaths.p1519d700} fill="#FCDFFF" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* BAR Button */}
        <div 
          className="relative cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/checkerbarorders')}
        >
          <div className="bg-[#643f7f] h-[250px] rounded-[20px] w-[180px]" />
          <div className="absolute bg-white bottom-[13px] left-[27px] rounded-[10px] h-[45px] w-[126px] flex items-center justify-center">
            <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[20px]">BAR</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45px] h-[70px] -mt-4">
            <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 74 117">
              <g>
                <path d={CheckerDepartmentIconPaths.p1090bb00} fill="#FCDFFF" />
              </g>
            </svg>
          </div>
        </div>

        {/* SNACK Button */}
        <div 
          className="relative cursor-pointer transition-transform hover:scale-105" 
          onClick={() => navigate('/checkersnackorders')}
        >
          <div className="bg-[#643f7f] h-[250px] rounded-[20px] w-[180px]" />
          <div className="absolute bg-white bottom-[13px] left-[27px] rounded-[10px] h-[45px] w-[126px] flex items-center justify-center">
            <p className="font-['Poppins:Bold',sans-serif] text-[#3c044d] text-[20px]">SNACK</p>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] -mt-4">
            <HomeSnackIcon />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mt-[88px]">
        <h2 className="font-['Poppins:Bold',sans-serif] text-[24px] text-white leading-normal flex items-center gap-3">
          <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
            <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                <g>
                  <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                </g>
              </svg>
            </span>
          </span>
          EMPLOYEES COOKING EFFICIENCY
        </h2>
        
        <div className="flex items-center gap-3">
          {/* Data Source Toggle */}
          <button
            onClick={toggleDataSource}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] ${
              showRealDataOnly 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            {showRealDataOnly ? 'Real Data Only' : 'All Data (Mock + Real)'}
          </button>
          
          {/* CSV Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif]"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Quick Date Filters with Advanced Filter Button */}
      <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-white/60" />
          <span className="text-white/80 font-['Poppins',sans-serif] text-sm">Quick Filters:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickFilter('yesterday')}
              className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                activeQuickFilter === 'yesterday'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => handleQuickFilter('today')}
              className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                activeQuickFilter === 'today'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => handleQuickFilter('week')}
              className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                activeQuickFilter === 'week'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => handleQuickFilter('month')}
              className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                activeQuickFilter === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
              }`}
            >
              This Month
            </button>
            {activeQuickFilter && (
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, startDate: '', endDate: '' }));
                  clearQuickFilter();
                }}
                className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[rgba(126,42,126,0.46)] hover:bg-red-600 text-white"
              >
                Clear
              </button>
            )}
          </div>
          {activeQuickFilter && (
            <span className="text-white/60 font-['Poppins',sans-serif] text-xs">
              {filters.startDate} to {filters.endDate}
            </span>
          )}
          {/* Show Advanced Filters Button */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] ml-auto"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
              Advanced Filters:
            </span>
          </div>
          <AnalyticsFilters filters={filters} onFiltersChange={(newFilters) => { setFilters(newFilters); clearQuickFilter(); }} />
        </div>
      )}

      {/* Results Summary */}
      <div className="bg-[rgba(126,42,126,0)] rounded-lg p-4">
        <p className="text-white/80 font-['Poppins',sans-serif]">
          Showing <span className="text-white font-medium">{processedLogs.length}</span> cooking records
          <span className="text-white/60 text-sm ml-2">
            ({showRealDataOnly ? 'Real data from completed orders' : 'Mock + Real data'})
          </span>
        </p>
      </div>

      {/* Chart */}
      <EfficiencyChart logs={processedLogs} />

      {/* See More Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/raw-database')}
          className="flex items-center gap-2 bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors font-['Poppins',sans-serif]"
        >
          See More Details
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}