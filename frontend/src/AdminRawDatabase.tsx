import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useStaff,
  type AnalyticsFilters as FilterType,
} from "./contexts/StaffContext";
import { useOrders } from "./contexts/OrderContext";
import AnalyticsFilters from "./components/AnalyticsFilters";
import { AdminRetractableSidebar } from "./components/AdminRetractableSidebar";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Users,
  UtensilsCrossed,
  BarChart3,
  AlertTriangle,
  Database,
  Calendar,
  Search,
  SlidersHorizontal,
  Receipt
} from "lucide-react";
import { getEfficiencyLevels, getAllSavedConfigs } from "./data/menuItemEfficiency";
import SparkleDecorationPaths from "./imports/SparkleDecoration";
import { imgGroup as sparkleImgGroup } from "./imports/SparkleIcon";

export default function AdminRawDatabase() {
  const navigate = useNavigate();
  const {
    getProcessedLogs,
    exportToCSV,
    showRealDataOnly,
    toggleDataSource,
    getEmployeeNames,
    getMenuItems,
  } = useStaff();
  const { getAllOrders } = useOrders();
  
  const [filters, setFilters] = useState<FilterType>({
    employee: "All Employees",
    menuItem: "All Dishes",
    efficiency: "All Efficiency",
    startDate: "",
    endDate: "",
  });

  // Category state
  const [activeCategory, setActiveCategory] = useState<
    "employee" | "menu" | "config" | "receipt"
  >("employee");

  // Get orders data for receipt view
  const allDepartments = getAllOrders();
  const allOrders = allDepartments.flatMap(dept => dept.orders);

  // Receipt view mode state
  const [receiptViewMode, setReceiptViewMode] = useState<"table" | "card">("card");

  // Quick filter state
  const [activeQuickFilter, setActiveQuickFilter] = useState<
    "week" | "month" | "year" | null
  >(null);

  // Advanced filter states
  const [departmentFilter, setDepartmentFilter] =
    useState<string>("All Departments");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRangeFilter, setTimeRangeFilter] =
    useState<string>("All Times");
  const [sortBy, setSortBy] = useState<
    "date" | "time" | "efficiency" | "menu"
  >("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [showPageJump, setShowPageJump] = useState(false);
  const [pageJumpInput, setPageJumpInput] = useState("");
  const [customItemsPerPage, setCustomItemsPerPage] =
    useState("");
  const [isCustomItemsPerPage, setIsCustomItemsPerPage] =
    useState(false);
  const maxVisiblePages = 5;

  // Quick filter functions
  const handleQuickFilter = (
    period: "week" | "month" | "year",
  ) => {
    const now = new Date();
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    let startDate: Date;

    if (period === "week") {
      // Start of current week (Sunday)
      const day = now.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - day);
    } else if (period === "month") {
      // Start of current month
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      );
    } else {
      // year
      // Start of current year
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(
        2,
        "0",
      );
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFilters((prev) => ({
      ...prev,
      startDate: formatDate(startDate),
      endDate: formatDate(now),
    }));

    setActiveQuickFilter(period);
  };

  // Clear quick filter
  const clearQuickFilter = () => {
    setActiveQuickFilter(null);
  };

  // Get and apply all filters
  let processedLogs = getProcessedLogs(filters);

  // Apply advanced filters
  if (departmentFilter !== "All Departments") {
    processedLogs = processedLogs.filter(
      (log) =>
        log.department?.toLowerCase() ===
        departmentFilter.toLowerCase(),
    );
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    processedLogs = processedLogs.filter(
      (log) =>
        log.menuName.toLowerCase().includes(query) ||
        log.cookName.toLowerCase().includes(query) ||
        log.department?.toLowerCase().includes(query),
    );
  }

  if (timeRangeFilter !== "All Times") {
    processedLogs = processedLogs.filter((log) => {
      const date = new Date(log.timestamp);
      const hour = date.getHours();

      if (timeRangeFilter === "Morning")
        return hour >= 6 && hour < 12;
      if (timeRangeFilter === "Afternoon")
        return hour >= 12 && hour < 18;
      if (timeRangeFilter === "Evening")
        return hour >= 18 || hour < 6;
      return true;
    });
  }

  // Apply sorting
  processedLogs = [...processedLogs].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "date":
        comparison = a.timestamp - b.timestamp;
        break;
      case "time":
        comparison = a.totalSeconds - b.totalSeconds;
        break;
      case "efficiency":
        const efficiencyOrder = [
          "Sangat Cepat",
          "Cepat",
          "Normal",
          "Lambat",
          "Sangat Lambat",
        ];
        comparison =
          efficiencyOrder.indexOf(a.efficiency) -
          efficiencyOrder.indexOf(b.efficiency);
        break;
      case "menu":
        comparison = a.menuName.localeCompare(b.menuName);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Calculate pagination
  const actualTotalPages = Math.ceil(
    processedLogs.length / itemsPerPage,
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = processedLogs.slice(
    startIndex,
    endIndex,
  );
  const totalRecords = processedLogs.length;

  // Page jump handler
  const handlePageJump = () => {
    const pageNum = parseInt(pageJumpInput);
    if (pageNum >= 1 && pageNum <= actualTotalPages) {
      setCurrentPage(pageNum);
      setShowPageJump(false);
      setPageJumpInput("");
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (actualTotalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= actualTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(
        actualTotalPages - 1,
        currentPage + 1,
      );

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < actualTotalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(actualTotalPages)) {
        pages.push(actualTotalPages);
      }
    }

    return pages;
  };

  const handleExport = () => {
    exportToCSV(processedLogs);
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "Sangat Cepat":
        return "bg-green-500";
      case "Cepat":
        return "bg-green-400";
      case "Normal":
        return "bg-blue-500";
      case "Lambat":
        return "bg-orange-500";
      case "Sangat Lambat":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#4a1e69] flex">
      {/* Admin Sidebar */}
      <AdminRetractableSidebar activePage="database" />

      {/* Main Content */}
      <div className="flex-1 ml-[76px] p-8">
        {/* Header */}
        <div className="bg-[#3c044d] rounded-[10px] px-6 py-4 mb-6 flex items-center justify-between">
          <h1 className="font-['Poppins:Bold',sans-serif] text-[24px] text-white leading-normal flex items-center gap-3">
            <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
              <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                  <g>
                    <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                  </g>
                </svg>
              </span>
            </span>
            RAW DATABASE
          </h1>
          <div className="flex items-center gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>Home</span>
              <span>/</span>
              <span className="text-white">Raw Database</span>
            </div>
          </div>
        </div>

        {/* View Mode Toggle with Data Controls */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-white/60 font-['Poppins',sans-serif] text-sm">
              View:
            </span>
            <div className="inline-flex bg-[rgba(126,42,126,0.3)] rounded-lg p-1">
              <button
                onClick={() => {
                  setActiveCategory("employee");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-md transition-all font-['Poppins',sans-serif] text-sm flex items-center gap-2 ${
                  activeCategory === "employee"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                Employee
              </button>
              <button
                onClick={() => {
                  setActiveCategory("menu");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-md transition-all font-['Poppins',sans-serif] text-sm flex items-center gap-2 ${
                  activeCategory === "menu"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Menu
              </button>
              <button
                onClick={() => {
                  setActiveCategory("receipt");
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-md transition-all font-['Poppins',sans-serif] text-sm flex items-center gap-2 ${
                  activeCategory === "receipt"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Receipt className="w-4 h-4" />
                Receipt
              </button>
              {/* Removed Config button */}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Data Source Toggle */}
            <button
              onClick={toggleDataSource}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                showRealDataOnly
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              {showRealDataOnly
                ? "Real Data Only"
                : "All Data (Mock + Real)"}
            </button>

            {/* CSV Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Quick Date Filters */}
        <div className="bg-[rgba(60,4,77,0.3)] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
              Quick Filters:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleQuickFilter("week")}
                className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                  activeQuickFilter === "week"
                    ? "bg-purple-600 text-white"
                    : "bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => handleQuickFilter("month")}
                className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                  activeQuickFilter === "month"
                    ? "bg-purple-600 text-white"
                    : "bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => handleQuickFilter("year")}
                className={`px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                  activeQuickFilter === "year"
                    ? "bg-purple-600 text-white"
                    : "bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white"
                }`}
              >
                This Year
              </button>
              {activeQuickFilter && (
                <button
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      startDate: "",
                      endDate: "",
                    }));
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
              onClick={() =>
                setShowAdvancedFilters(!showAdvancedFilters)
              }
              className="flex items-center gap-2 bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] ml-auto"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showAdvancedFilters ? "Hide" : "Show"} Advanced
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-4 h-4 text-white/60" />
                <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
                  Advanced Filters:
                </span>
              </div>

              {/* Standard Filters Row */}
              <div className="flex flex-wrap gap-2 pb-3 border-b border-white/10">
                <AnalyticsFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => {
                    setFilters(newFilters);
                    clearQuickFilter();
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Additional Filters Row */}
              <div className="flex flex-wrap gap-2">
                {/* Department Filter */}
                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                >
                  <option value="All Departments">
                    All Departments
                  </option>
                  <option value="makanan">
                    Makanan (Kitchen)
                  </option>
                  <option value="bar">Bar (Minuman)</option>
                  <option value="snack">Snack</option>
                </select>

                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search menu, cook, or department..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400 placeholder-white/40"
                  />
                </div>

                {/* Time Range Filter */}
                <select
                  value={timeRangeFilter}
                  onChange={(e) => {
                    setTimeRangeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                >
                  <option value="All Times">All Times</option>
                  <option value="Morning">
                    Morning (6AM-12PM)
                  </option>
                  <option value="Afternoon">
                    Afternoon (12PM-6PM)
                  </option>
                  <option value="Evening">
                    Evening (6PM-12AM)
                  </option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(
                      e.target.value as
                        | "date"
                        | "time"
                        | "efficiency"
                        | "menu",
                    );
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                >
                  <option value="date">Sort by: Date</option>
                  <option value="time">
                    Sort by: Cooking Time
                  </option>
                  <option value="efficiency">
                    Sort by: Efficiency
                  </option>
                  <option value="menu">
                    Sort by: Menu Item
                  </option>
                </select>

                {/* Sort Order */}
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as "asc" | "desc",
                    )
                  }
                  className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                >
                  <option value="desc">↓ Descending</option>
                  <option value="asc">↑ Ascending</option>
                </select>

                {/* Clear All Filters */}
                {(filters.employee !== "All Employees" ||
                  filters.menuItem !== "All Dishes" ||
                  filters.efficiency !== "All Efficiency" ||
                  filters.startDate ||
                  filters.endDate ||
                  departmentFilter !== "All Departments" ||
                  searchQuery ||
                  timeRangeFilter !== "All Times" ||
                  sortBy !== "date" ||
                  sortOrder !== "desc") && (
                  <button
                    onClick={() => {
                      setFilters({
                        employee: "All Employees",
                        menuItem: "All Dishes",
                        efficiency: "All Efficiency",
                        startDate: "",
                        endDate: "",
                      });
                      setDepartmentFilter("All Departments");
                      setSearchQuery("");
                      setTimeRangeFilter("All Times");
                      setSortBy("date");
                      setSortOrder("desc");
                      clearQuickFilter();
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-red-600 hover:bg-red-700 text-white"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section Heading - Only show for employee view */}
        {activeCategory === "employee" && (
          <h3 className="text-white font-['Poppins',sans-serif] mb-4 flex items-center gap-3 text-[24px] font-bold">
            <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
              <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                  <g>
                    <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                  </g>
                </svg>
              </span>
            </span>
            Employee Performance Records
          </h3>
        )}

        {/* Section Heading - Only show for menu view */}
        {activeCategory === "menu" && (
          <h3 className="text-white font-['Poppins',sans-serif] mb-4 flex items-center gap-3 text-[24px] font-bold">
            <span className="w-[32px] h-[32px] flex-shrink-0 inline-block relative">
              <span className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${sparkleImgGroup}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 96">
                  <g>
                    <path d={SparkleDecorationPaths.p231aba80} fill="#B7C9FF" />
                  </g>
                </svg>
              </span>
            </span>
            Menu Item Performance Records
          </h3>
        )}

        {/* Data Table with Integrated Summary */}
        <div className="bg-[rgba(60,4,77,0.76)] rounded-lg p-6">
          {/* Results Summary Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <p className="text-white/80 font-['Poppins',sans-serif] text-[16px]">
              Showing{" "}
              <span className="text-white font-medium">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="text-white font-medium">
                {Math.min(endIndex, totalRecords)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {totalRecords}
              </span>{" "}
              cooking records
              <span className="text-white/60 text-sm ml-2 text-[15px]">
                (
                {showRealDataOnly
                  ? "Real data from completed orders"
                  : "Mock + Real data"}
                )
              </span>
            </p>
            <div className="flex items-center gap-4">
              {/* Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
                  Items per page:
                </span>
                <select
                  value={isCustomItemsPerPage ? "custom" : itemsPerPage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "custom") {
                      setIsCustomItemsPerPage(true);
                    } else {
                      setIsCustomItemsPerPage(false);
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                >
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value="custom">Custom</option>
                </select>
                {isCustomItemsPerPage && (
                  <input
                    type="number"
                    value={customItemsPerPage}
                    onChange={(e) => setCustomItemsPerPage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const num = parseInt(customItemsPerPage);
                        if (num > 0 && num <= 1000) {
                          setItemsPerPage(num);
                          setCurrentPage(1);
                          setIsCustomItemsPerPage(false);
                          setCustomItemsPerPage("");
                        }
                      } else if (e.key === "Escape") {
                        setIsCustomItemsPerPage(false);
                        setCustomItemsPerPage("");
                      }
                    }}
                    placeholder="Enter number"
                    min={1}
                    max={1000}
                    className="w-28 px-3 py-1.5 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm bg-[#52236b] text-white border border-purple-400/30 focus:outline-none focus:border-purple-400"
                    autoFocus
                  />
                )}
              </div>

              {/* Pagination Controls */}
              {actualTotalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(1, prev - 1),
                      )
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
                    Page {currentPage} of {actualTotalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(actualTotalPages, prev + 1),
                      )
                    }
                    disabled={currentPage === actualTotalPages}
                    className="p-2 rounded-lg bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Receipt View Mode Toggle - Only show for receipt category */}
          {activeCategory === "receipt" && (
            <div className="mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="inline-flex bg-[rgba(126,42,126,0.3)] rounded-lg p-1 ml-auto">
                  <button
                    onClick={() => setReceiptViewMode("table")}
                    className={`px-4 py-1.5 rounded-md transition-all font-['Poppins',sans-serif] text-sm flex items-center gap-2 ${
                      receiptViewMode === "table"
                        ? "bg-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    Table View
                  </button>
                  <button
                    onClick={() => setReceiptViewMode("card")}
                    className={`px-4 py-1.5 rounded-md transition-all font-['Poppins',sans-serif] text-sm flex items-center gap-2 ${
                      receiptViewMode === "card"
                        ? "bg-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    Card View
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Content */}
          {processedLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 font-['Poppins',sans-serif] text-lg">
                No cooking records found with the current
                filters.
              </p>
            </div>
          ) : activeCategory === "employee" ? (
            // Employee Focused View
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        #
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Cook Name
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Department
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Date & Time
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Menu Item
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Cooking Time
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Efficiency
                      </th>
                      <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLogs.map((log, index) => {
                      const date = new Date(log.timestamp);
                      const dateStr =
                        date.toLocaleDateString("id-ID");
                      const timeStr = date.toLocaleTimeString(
                        "id-ID",
                        { hour: "2-digit", minute: "2-digit" },
                      );

                      return (
                        <tr
                          key={log.id}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                            {startIndex + index + 1}
                          </td>
                          <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                            {log.cookName}
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                              {log.department}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                            {dateStr}
                            <br />
                            <span className="text-white/60">
                              {timeStr}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                            {log.menuName}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                            {log.timeMinutes}m {log.timeSeconds}s
                            <span className="text-white/40 text-xs ml-1">
                              ({log.totalSeconds}s)
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] text-white ${getEfficiencyColor(log.efficiency)}`}
                            >
                              {log.efficiency}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-white/10 rounded-full h-2 max-w-[80px]">
                                <div
                                  className={`h-2 rounded-full ${getEfficiencyColor(log.efficiency)}`}
                                  style={{
                                    width: `${Math.min(log.percentageOfAverage * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-white/80 font-['Poppins',sans-serif] text-sm">
                                {(
                                  log.percentageOfAverage * 100
                                ).toFixed(0)}
                                %
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : activeCategory === "menu" ? (
            // Menu Focused View
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      #
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Menu Item
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Department
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Date & Time
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Prepared By
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Prep Time
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Speed Rating
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      vs Standard
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log, index) => {
                    const date = new Date(log.timestamp);
                    const dateStr =
                      date.toLocaleDateString("id-ID");
                    const timeStr = date.toLocaleTimeString(
                      "id-ID",
                      { hour: "2-digit", minute: "2-digit" },
                    );

                    return (
                      <tr
                        key={log.id}
                        className="border-b border-white/10 hover:bg-white/5"
                      >
                        <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                          {startIndex + index + 1}
                        </td>
                        <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                          {log.menuName}
                        </td>
                        <td className="py-3 px-2">
                          <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                            {log.department}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                          {dateStr}
                          <br />
                          <span className="text-white/60">
                            {timeStr}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                          {log.cookName}
                        </td>
                        <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {log.timeMinutes}m{" "}
                              {log.timeSeconds}s
                            </span>
                            <span className="text-white/40 text-xs">
                              ({log.totalSeconds} seconds)
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] text-white ${getEfficiencyColor(log.efficiency)}`}
                          >
                            {log.efficiency}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-['Poppins',sans-serif] text-sm font-medium ${
                                log.percentageOfAverage < 0.8
                                  ? "text-green-400"
                                  : log.percentageOfAverage <
                                      1.0
                                    ? "text-blue-400"
                                    : log.percentageOfAverage <
                                        1.3
                                      ? "text-orange-400"
                                      : "text-red-400"
                              }`}
                            >
                              {(
                                log.percentageOfAverage * 100
                              ).toFixed(0)}
                              %
                            </span>
                            <span className="text-white/60 text-xs">
                              {log.percentageOfAverage < 1.0
                                ? "↓ faster"
                                : "↑ slower"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : activeCategory === "receipt" ? (
            // Receipt View
            <>
              {allOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/60 font-['Poppins',sans-serif] text-lg">
                    No orders found
                  </p>
                </div>
              ) : receiptViewMode === "card" ? (
                // Card View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allOrders.map((order) => (
                    <div key={order.orderId} className="bg-[#541168] border border-purple-400/20 rounded-lg p-4">
                      {/* Order Header */}
                      <div className="border-b border-white/10 pb-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-['Poppins',sans-serif]">
                            {order.orderId}
                          </h3>
                          <span className="text-xs text-white/60 font-['Poppins',sans-serif] capitalize">
                            {order.items[0]?.name ? 
                              allDepartments.find(d => d.orders.includes(order))?.department 
                              : 'Unknown'}
                          </span>
                        </div>
                        {order.assignedWaiter && (
                          <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
                            Waiter: {order.assignedWaiter}
                          </p>
                        )}
                        {order.deliveredAt && (
                          <p className="text-green-400 text-xs font-['Poppins',sans-serif] mt-1">
                            Delivered: {order.deliveredAt}
                          </p>
                        )}
                      </div>

                      {/* Items List */}
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-white text-sm font-['Poppins',sans-serif]">
                              {item.name}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded font-['Poppins',sans-serif] ${
                              item.status === 'finished' 
                                ? 'bg-green-400/20 text-green-400'
                                : item.status === 'on-their-way'
                                ? 'bg-blue-400/20 text-blue-400'
                                : 'bg-white/10 text-white/60'
                            }`}>
                              {item.status === 'finished' ? 'Done' : 
                               item.status === 'on-their-way' ? 'Cooking' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Table View
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          #
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Order ID
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Department
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Waiter
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Items
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Status
                        </th>
                        <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                          Delivered
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.map((order, index) => {
                        const department = allDepartments.find(d => d.orders.includes(order))?.department || 'Unknown';
                        const allFinished = order.items.every(item => item.status === 'finished');
                        const anyInProgress = order.items.some(item => item.status === 'on-their-way');
                        const orderStatus = allFinished ? 'Completed' : anyInProgress ? 'In Progress' : 'Pending';
                        
                        return (
                          <tr
                            key={order.orderId}
                            className="border-b border-white/10 hover:bg-white/5"
                          >
                            <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                              {index + 1}
                            </td>
                            <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                              {order.orderId}
                            </td>
                            <td className="py-3 px-2">
                              <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                                {department}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                              {order.assignedWaiter || '-'}
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex flex-col gap-1">
                                {order.items.map((item, idx) => (
                                  <span key={idx} className="text-white/80 text-sm font-['Poppins',sans-serif]">
                                    {item.name}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] ${
                                orderStatus === 'Completed' 
                                  ? 'bg-green-400/20 text-green-400'
                                  : orderStatus === 'In Progress'
                                  ? 'bg-blue-400/20 text-blue-400'
                                  : 'bg-white/10 text-white/60'
                              }`}>
                                {orderStatus}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                              {order.deliveredAt ? (
                                <span className="text-green-400">{order.deliveredAt}</span>
                              ) : (
                                <span className="text-white/40">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            // Config Focused View
            <div className="overflow-x-auto">
              <h3 className="text-white font-['Poppins',sans-serif] mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Saved Configurations
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      #
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Config Name
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Department
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Data Source
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Standard
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Very Fast
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Fast
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Slow
                    </th>
                    <th className="text-left text-white font-['Poppins',sans-serif] pb-3 px-2">
                      Extremely Slow
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getAllSavedConfigs().length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-white/60 font-['Poppins',sans-serif]">
                        No custom configurations saved yet. Configure items in Menu Management.
                      </td>
                    </tr>
                  ) : (
                    getAllSavedConfigs().map((config, index) => {
                      const standardPreset = config.presets.find(p => p.name === 'standard');
                      const veryFastPreset = config.presets.find(p => p.name === 'very-fast');
                      const fastPreset = config.presets.find(p => p.name === 'fast');
                      const slowPreset = config.presets.find(p => p.name === 'slow');
                      const extremelySlowPreset = config.presets.find(p => p.name === 'extremely-slow');

                      return (
                        <tr
                          key={config.name}
                          className="border-b border-white/10 hover:bg-white/5"
                        >
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                            {index + 1}
                          </td>
                          <td className="py-3 px-2 text-white font-['Poppins',sans-serif] font-medium">
                            {config.name}
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-block px-2 py-1 rounded text-xs font-['Poppins',sans-serif] bg-purple-600/40 text-white capitalize">
                              {config.department}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm font-['Poppins',sans-serif]">
                            {config.dataSource ? (
                              <div className="flex items-center gap-1">
                                <BarChart3 className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-white/80">
                                  {config.dataSource.sampleCount} log{config.dataSource.sampleCount > 1 ? 's' : ''}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                                <span className="text-yellow-400">Default</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif]">
                            {standardPreset && (
                              <span className="font-medium">
                                {standardPreset.value}{standardPreset.unit}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                            {veryFastPreset && `${veryFastPreset.value}${veryFastPreset.unit}`}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                            {fastPreset && `${fastPreset.value}${fastPreset.unit}`}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                            {slowPreset && `${slowPreset.value}${slowPreset.unit}`}
                          </td>
                          <td className="py-3 px-2 text-white/80 font-['Poppins',sans-serif] text-sm">
                            {extremelySlowPreset && `${extremelySlowPreset.value}${extremelySlowPreset.unit}`}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {actualTotalPages > 1 && (
          <div className="mt-6">
            <div className="bg-[rgba(60,4,77,0.46)] rounded-lg p-4">
              <div className="flex items-center justify-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(1, prev - 1),
                    )
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (typeof page === "number") {
                        setCurrentPage(page);
                      } else {
                        // Show page jump dialog when clicking "..."
                        setShowPageJump(true);
                      }
                    }}
                    className={`min-w-[40px] px-3 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] text-sm ${
                      page === currentPage
                        ? "bg-purple-600 text-white"
                        : typeof page === "number"
                          ? "bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white"
                          : "bg-transparent hover:bg-purple-600/30 text-white/80"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(actualTotalPages, prev + 1),
                    )
                  }
                  disabled={currentPage === actualTotalPages}
                  className="p-2 rounded-lg bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/20 mx-2"></div>

                {/* Go to Page Button */}
                <button
                  onClick={() => setShowPageJump(true)}
                  className="px-4 py-2 rounded-lg bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white transition-colors font-['Poppins',sans-serif] text-sm"
                >
                  Go to Page
                </button>
              </div>
            </div>
          </div>
        )}
         
        {/* Efficiency Summary Stats */}
        {processedLogs.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-5 gap-4">
              {getEfficiencyLevels().map((efficiency) => {
                const count = processedLogs.filter(
                  (log) => log.efficiency === efficiency,
                ).length;
                const percentage = (
                  (count / processedLogs.length) *
                  100
                ).toFixed(1);

                return (
                  <div
                    key={efficiency}
                    className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${getEfficiencyColor(efficiency)} mb-2`}
                    ></div>
                    <p className="text-white/60 font-['Poppins',sans-serif] text-sm mb-1">
                      {efficiency}
                    </p>
                    <p className="text-white font-['Poppins',sans-serif] text-2xl">
                      {count}
                    </p>
                    <p className="text-white/40 font-['Poppins',sans-serif] text-xs">
                      {percentage}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Page Jump Dialog */}
        {showPageJump && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#3c044d] border-2 border-purple-400 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-white font-['Poppins',sans-serif] text-xl mb-4">
                Jump to Page
              </h3>
              <p className="text-white/80 font-['Poppins',sans-serif] text-sm mb-4">
                Enter a page number between 1 and{" "}
                {actualTotalPages}
              </p>
              <input
                type="number"
                value={pageJumpInput}
                onChange={(e) =>
                  setPageJumpInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePageJump();
                  } else if (e.key === "Escape") {
                    setShowPageJump(false);
                    setPageJumpInput("");
                  }
                }}
                min={1}
                max={actualTotalPages}
                placeholder={`Page 1-${actualTotalPages}`}
                className="w-full bg-[#52236b] text-white px-4 py-3 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handlePageJump}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif]"
                >
                  Go to Page
                </button>
                <button
                  onClick={() => {
                    setShowPageJump(false);
                    setPageJumpInput("");
                  }}
                  className="flex-1 bg-[rgba(126,42,126,0.46)] hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors font-['Poppins',sans-serif]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}