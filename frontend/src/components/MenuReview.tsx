/**
 * MenuReview.tsx - Menu Performance Analytics Component
 * 
 * Analyzes menu item performance including cooking times, popularity, and efficiency.
 * Similar to CookingAnalytics but focuses on menu items rather than employees.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaff, type AnalyticsFilters as FilterType } from '../contexts/StaffContext';
import MenuFilters from './MenuFilters';
import MenuChart from './MenuChart';
import { Download, Database, ExternalLink, ChevronLeft, ChevronRight, Calendar, SlidersHorizontal } from 'lucide-react';
import SparkleDecorationPaths from "../imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "../imports/SparkleIcon";

export default function MenuReview() {
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
  const [activeQuickFilter, setActiveQuickFilter] = useState<'today' | 'week' | 'month' | 'year' | null>(null);

  // Show advanced filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPages = 5;

  // Quick filter functions
  const handleQuickFilter = (period: 'today' | 'week' | 'month' | 'year') => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate: Date;
    
    if (period === 'today') {
      startDate = today;
    } else if (period === 'week') {
      const day = now.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - day);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    setFilters(prev => ({
      ...prev,
      startDate: formatDate(startDate),
      endDate: formatDate(now)
    }));
    
    setActiveQuickFilter(period);
    setCurrentPage(1);
  };

  // Clear quick filter
  const clearQuickFilter = () => {
    setActiveQuickFilter(null);
  };

  // Get processed logs based on current filters
  const processedLogs = useMemo(() => {
    return getProcessedLogs(filters);
  }, [filters, getProcessedLogs]);

  // Calculate menu-specific statistics
  const menuStats = useMemo(() => {
    const stats = new Map<string, {
      menuName: string;
      department: string;
      totalOrders: number;
      avgTime: number;
      fastestTime: number;
      slowestTime: number;
      efficiencyDistribution: Record<string, number>;
    }>();

    processedLogs.forEach(log => {
      if (!stats.has(log.menuName)) {
        stats.set(log.menuName, {
          menuName: log.menuName,
          department: log.department || 'Unknown',
          totalOrders: 0,
          avgTime: 0,
          fastestTime: Infinity,
          slowestTime: 0,
          efficiencyDistribution: {
            'Sangat Cepat': 0,
            'Cepat': 0,
            'Normal': 0,
            'Lambat': 0,
            'Sangat Lambat': 0
          }
        });
      }

      const stat = stats.get(log.menuName)!;
      stat.totalOrders++;
      stat.avgTime += log.totalSeconds;
      stat.fastestTime = Math.min(stat.fastestTime, log.totalSeconds);
      stat.slowestTime = Math.max(stat.slowestTime, log.totalSeconds);
      stat.efficiencyDistribution[log.efficiency]++;
    });

    // Calculate averages
    stats.forEach(stat => {
      stat.avgTime = stat.avgTime / stat.totalOrders;
    });

    return Array.from(stats.values()).sort((a, b) => b.totalOrders - a.totalOrders);
  }, [processedLogs]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handle CSV export
  const handleExport = () => {
    exportToCSV(processedLogs);
  };

  // Calculate pagination
  const maxDisplayableRecords = maxPages * itemsPerPage;
  const displayableStats = menuStats.slice(0, maxDisplayableRecords);
  const totalPages = Math.min(Math.ceil(displayableStats.length / itemsPerPage), maxPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStats = displayableStats.slice(startIndex, endIndex);
  const hasMoreRecords = menuStats.length > maxDisplayableRecords;

  return (
    <div className="space-y-6" data-name="menu-review-section">
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
          MENU REVIEW
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
            <button
              onClick={() => handleQuickFilter('year')}
              className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                activeQuickFilter === 'year'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white'
              }`}
            >
              This Year
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
          <MenuFilters filters={filters} onFiltersChange={(newFilters) => { setFilters(newFilters); clearQuickFilter(); }} />
        </div>
      )}

      {/* Results Summary */}
      <div className="bg-[rgba(126,42,126,0)] rounded-lg p-4">
        <p className="text-white/80 font-['Poppins',sans-serif] underline underline">
          Analyzing <span className="text-white font-medium">{menuStats.length}</span> menu items from <span className="text-white font-medium">{processedLogs.length}</span> orders
          <span className="text-white/60 text-sm ml-2">
            ({showRealDataOnly ? 'Real data from completed orders' : 'Mock + Real data'})
          </span>
        </p>
      </div>

      {/* Chart */}
      <MenuChart menuStats={menuStats} />

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