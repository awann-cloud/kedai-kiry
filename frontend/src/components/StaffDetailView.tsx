import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, Calendar, Clock, CheckCircle, XCircle, Edit2, Save, Trash2, User, History, CalendarDays, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useStaff } from '../contexts/StaffContext';
import { WeeklySchedule } from '../contexts/StaffContext';
import WeeklyScheduleEditor from './WeeklyScheduleEditor';

interface StaffDetailViewProps {
  staffId: string;
  staffName: string;
  staffDepartment: string;
  staffPosition: string;
  isActive: boolean;
  schedule?: WeeklySchedule;
  notes?: string;
  onClose: () => void;
  onScheduleUpdate: (staffId: string, schedule: WeeklySchedule) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleActive?: () => void;
  onNotesUpdate?: (staffId: string, notes: string) => void;
}

export default function StaffDetailView({
  staffId,
  staffName,
  staffDepartment,
  staffPosition,
  isActive,
  schedule,
  notes,
  onClose,
  onScheduleUpdate,
  onEdit,
  onDelete,
  onToggleActive,
  onNotesUpdate
}: StaffDetailViewProps) {
  const navigate = useNavigate();
  const { getProcessedLogs, exportToCSV, updateCookingLog, getDeliveryRecordsForWaiter, getWaiterStats } = useStaff();
  
  // Editing schedule state
  const [editingSchedule, setEditingSchedule] = useState(false);
  
  // Sidebar navigation state
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');
  
  // Filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Notes editing state
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState(notes || '');

  // Work history editing state
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editedLogData, setEditedLogData] = useState<any>(null);

  // Check if this is a waiter/waitress (Checker department)
  const isWaiter = staffDepartment === 'Checker';

  // Get work history from context - filter by staff name (for cooks)
  const workHistoryLogs = useMemo(() => {
    if (isWaiter) return []; // Waiters don't have cooking logs
    
    const allLogs = getProcessedLogs();
    return allLogs
      .filter(log => log.cookName === staffName)
      .map((log, index) => {
        const date = new Date(log.timestamp);
        const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        return {
          id: `cook-${log.id}-${index}`, // Add unique prefix and index
          originalId: log.id,
          date: dateStr,
          time: timeStr,
          menuItem: log.menuName,
          status: 'Completed', // All finished items are completed
          duration: `${log.timeMinutes}m ${log.timeSeconds}s`,
          orderId: `ORD-${log.id.slice(-4).toUpperCase()}`
        };
      });
  }, [getProcessedLogs, staffName, isWaiter]);

  // Get delivery history for waiters
  const deliveryHistoryLogs = useMemo(() => {
    if (!isWaiter) return []; // Only for waiters
    
    const deliveryRecords = getDeliveryRecordsForWaiter(staffName);
    return deliveryRecords.map((record, index) => {
      const date = new Date(record.timestamp);
      const dateStr = date.toLocaleDateString('en-CA');
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      const minutes = Math.floor(record.deliveryTime / 60);
      const seconds = record.deliveryTime % 60;
      
      return {
        id: `delivery-${record.itemId}-${index}`, // Add unique prefix and index
        originalId: record.itemId,
        date: dateStr,
        time: timeStr,
        menuItem: record.itemName,
        status: 'Delivered',
        duration: `${minutes}m ${seconds}s`,
        orderId: record.orderId,
        department: record.department
      };
    });
  }, [getDeliveryRecordsForWaiter, staffName, isWaiter]);

  // Get waiter statistics
  const waiterStats = useMemo(() => {
    if (!isWaiter) return { totalDeliveries: 0, averageDeliveryTime: 0 };
    return getWaiterStats(staffName);
  }, [getWaiterStats, staffName, isWaiter]);

  // Mock current work data
  const currentWork = isActive ? {
    orderId: 'ORD-2024-1234',
    tableNumber: '12',
    menuItem: 'Nasi Goreng Special',
    startTime: '14:30',
    department: staffDepartment
  } : null;

  // Statistics data - different for waiters vs cooks
  const stats = isWaiter ? {
    totalDeliveries: waiterStats.totalDeliveries,
    averageTime: Math.floor(waiterStats.averageDeliveryTime),
    todayDeliveries: deliveryHistoryLogs.filter(log => {
      const today = new Date().toLocaleDateString('en-CA');
      return log.date === today;
    }).length,
    thisWeekDeliveries: deliveryHistoryLogs.filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    }).length
  } : {
    closedWorks: 847,
    grandSchedule: 1200,
    recentSchedule: 89,
    todayWorks: 12
  };

  // Mock performance data
  const performanceData = [
    { date: '15 Nov', completed: 45, pending: 5, absent: 0 },
    { date: '16 Nov', completed: 52, pending: 3, absent: 0 },
    { date: '17 Nov', completed: 48, pending: 7, absent: 0 },
    { date: '18 Nov', completed: 55, pending: 2, absent: 0 },
    { date: '19 Nov', completed: 50, pending: 4, absent: 0 },
    { date: '20 Nov', completed: 58, pending: 1, absent: 0 },
    { date: '21 Nov', completed: 62, pending: 3, absent: 0 }
  ];

  // Mock order status data
  const orderStatusData = [
    { name: 'Completed Orders', value: 847, color: '#10B981' },
    { name: 'Pending Orders', value: 23, color: '#F59E0B' },
    { name: 'Cancelled', value: 5, color: '#EF4444' }
  ];

  // Calculate pagination - use appropriate logs based on staff type
  const historyLogs = isWaiter ? deliveryHistoryLogs : workHistoryLogs;
  const totalPages = Math.ceil(historyLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = historyLogs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, statusFilter]);

  const handleViewCurrentWork = () => {
    if (currentWork) {
      // Navigate to checker page with the specific order
      const checkerPath = staffDepartment === 'Kitchen' ? '/checkermakananorders' :
                         staffDepartment === 'Bar' ? '/checkerbarorders' :
                         staffDepartment === 'Snack' ? '/checkersnackorders' : '/checkerorders';
      navigate(checkerPath);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Time', 'Menu Item', 'Status', 'Duration', 'Order ID'];
    const rows = workHistoryLogs.map(log => [
      log.originalId || log.id,
      log.date,
      log.time,
      log.menuItem,
      log.status,
      log.duration,
      log.orderId
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${staffName.replace(/\s+/g, '_')}_work_history.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditSchedule = () => {
    setEditingSchedule(true);
  };

  const handleSaveSchedule = (updatedSchedule: WeeklySchedule) => {
    setEditingSchedule(false);
    if (onScheduleUpdate) {
      onScheduleUpdate(staffId, updatedSchedule);
    }
  };

  const handleCancelEdit = () => {
    setEditingSchedule(false);
  };

  const handleEditNotes = () => {
    setEditingNotes(true);
  };

  const handleSaveNotes = () => {
    setEditingNotes(false);
    if (onNotesUpdate) {
      onNotesUpdate(staffId, notesText);
    }
  };

  const handleCancelNotesEdit = () => {
    setEditingNotes(false);
    setNotesText(notes || '');
  };

  return (
    <div className="fixed inset-0 bg-[#4a1e69] z-50 overflow-y-auto">
      <div className="min-h-screen flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#3c044d] p-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Profile Section */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-3">
              {staffName.charAt(0)}
            </div>
            <h2 className="text-white text-center font-semibold">{staffName}</h2>
            <p className="text-white/70 text-sm text-center">{staffPosition}</p>
            <p className="text-white/70 text-xs text-center mt-1">ID: {staffId}</p>
            
            {/* Account Status Toggle */}
            {onToggleActive && (
              <button
                onClick={onToggleActive}
                className={`w-full mt-3 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  isActive 
                    ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border-2 border-green-600/50' 
                    : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border-2 border-red-600/50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-sm font-semibold">{isActive ? 'Active' : 'Inactive'}</span>
              </button>
            )}
          </div>

          {/* Notes Section in Sidebar */}
          <div className="mb-6 bg-[#541168] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-semibold">Notes</h3>
              {!editingNotes ? (
                <button
                  onClick={handleEditNotes}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={handleCancelNotesEdit}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {editingNotes ? (
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add notes here..."
                className="bg-[#3c044d] text-white px-3 py-2 rounded-lg w-full h-24 border border-purple-400/30 focus:outline-none focus:border-purple-400 resize-none text-sm"
              />
            ) : (
              <div className="text-white/70 text-xs whitespace-pre-wrap max-h-24 overflow-y-auto">
                {notesText || 'No notes available'}
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:bg-[#541168] hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'history' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:bg-[#541168] hover:text-white'
              }`}
            >
              <History className="w-5 h-5" />
              <span>{isWaiter ? 'Delivery History' : 'Work History'}</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-white/70 hover:bg-[#541168] hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header - Only show for Overview and Settings tabs */}
          {activeTab !== 'history' && (
            <div className="mb-6">
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-white text-2xl font-semibold mb-2">
                      {activeTab === 'overview' && 'Staff Overview'}
                      {activeTab === 'settings' && 'Settings'}
                    </h1>
                    <p className="text-white/70 text-sm">
                      {activeTab === 'overview' && 'View performance statistics and current work status'}
                      {activeTab === 'settings' && 'Manage staff account settings'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeTab === 'settings' && onEdit && (
                      <button
                        onClick={onEdit}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Staff
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Currently Working Section */}
          {activeTab === 'overview' && currentWork && (
            <div className="bg-[#3c044d] rounded-[10px] p-6 mb-6">
              <h2 className="text-white text-lg mb-4">Currently Working on</h2>
              <div className="bg-[#541168] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold mb-1">{currentWork.menuItem}</div>
                  <div className="text-white/70 text-sm">
                    Order #{currentWork.orderId} • Table {currentWork.tableNumber} • Started at {currentWork.startTime}
                  </div>
                </div>
                <button
                  onClick={handleViewCurrentWork}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'overview' && !currentWork && isActive && (
            <div className="bg-[#3c044d] rounded-[10px] p-6 mb-6">
              <h2 className="text-white text-lg mb-4">Currently Working on</h2>
              <div className="bg-[#541168] rounded-lg p-4 text-center">
                <div className="text-white/70">No active orders at the moment</div>
              </div>
            </div>
          )}

          {/* Dashboard Stats */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              {isWaiter ? (
                <>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Total Deliveries</div>
                    <div className="text-white text-4xl font-semibold">{stats.totalDeliveries}</div>
                  </div>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Avg Time</div>
                    <div className="text-white text-4xl font-semibold">
                      {Math.floor(stats.averageTime / 60)}:{String(stats.averageTime % 60).padStart(2, '0')}
                    </div>
                    <div className="text-white/50 text-xs mt-1">minutes</div>
                  </div>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Today</div>
                    <div className="text-white text-4xl font-semibold">{stats.todayDeliveries}</div>
                  </div>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">This Week</div>
                    <div className="text-white text-4xl font-semibold">{stats.thisWeekDeliveries}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Closed Works</div>
                    <div className="text-white text-4xl font-semibold">{stats.closedWorks}</div>
                  </div>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Grand Schedule</div>
                    <div className="text-white text-4xl font-semibold">{stats.grandSchedule}</div>
                  </div>
                  <div className="bg-[#3c044d] rounded-[10px] p-6">
                    <div className="text-white/70 text-sm mb-2">Recent Schedule</div>
                    <div className="text-white text-4xl font-semibold">{stats.recentSchedule}</div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Performance Chart and Order Status */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Performance Chart */}
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                <h3 className="text-white text-lg mb-4">Weekly Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#3c044d', border: '1px solid rgba(255,255,255,0.2)' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Order Status Pie Chart */}
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                <h3 className="text-white text-lg mb-4">Order Status</h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        label
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Raw Data Section */}
          {activeTab === 'history' && (
            <>
              {/* Header with Breadcrumb */}
              <div className="bg-[#3c044d] rounded-[10px] px-6 py-4 mb-6 flex items-center justify-between">
                <h1 className="text-white text-2xl">Raw Database</h1>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleExportCSV}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span>Staff</span>
                    <span>/</span>
                    <span>{staffName}</span>
                    <span>/</span>
                    <span className="text-white">{isWaiter ? 'Delivery History' : 'Work History'}</span>
                  </div>
                </div>
              </div>

              {/* Data Table Section */}
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/70" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-[#541168] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm"
                    />
                    <span className="text-white/70">to</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-[#541168] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#541168] text-white px-4 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div className="text-white/70 text-sm ml-auto">
                    Showing {workHistoryLogs.length} records
                  </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-white text-left px-4 py-3 text-sm">ID</th>
                        <th className="text-white text-left px-4 py-3 text-sm">Date</th>
                        <th className="text-white text-left px-4 py-3 text-sm">Time</th>
                        <th className="text-white text-left px-4 py-3 text-sm">Menu Item</th>
                        {isWaiter && <th className="text-white text-left px-4 py-3 text-sm">Dept</th>}
                        <th className="text-white text-left px-4 py-3 text-sm">Status</th>
                        <th className="text-white text-left px-4 py-3 text-sm">Duration</th>
                        <th className="text-white text-left px-4 py-3 text-sm">Order ID</th>
                        {!isWaiter && (
                          <th className="text-white/70 text-center px-2 py-3 w-10">
                            <Edit2 className="w-3 h-3 mx-auto" />
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLogs.map((log, index) => (
                        <tr key={log.id} className={index !== paginatedLogs.length - 1 ? 'border-b border-white/10' : ''}>
                          {editingLogId === log.id ? (
                            // Edit Mode
                            <>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.originalId || log.id}</td>
                              <td className="px-4 py-3">
                                <input
                                  type="date"
                                  value={editedLogData.date}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, date: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="time"
                                  value={editedLogData.time}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, time: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={editedLogData.menuItem}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, menuItem: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={editedLogData.status}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, status: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                >
                                  <option value="Completed">Completed</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={editedLogData.duration}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, duration: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                  placeholder="12m 30s"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={editedLogData.orderId}
                                  onChange={(e) => setEditedLogData({ ...editedLogData, orderId: e.target.value })}
                                  className="bg-[#541168] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-sm w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      // Parse the duration back to minutes and seconds
                                      const durationMatch = editedLogData.duration.match(/(\d+)m\s*(\d+)s/);
                                      const minutes = durationMatch ? parseInt(durationMatch[1]) : 0;
                                      const seconds = durationMatch ? parseInt(durationMatch[2]) : 0;
                                      
                                      // Parse the date and time to create a timestamp
                                      const timestamp = new Date(`${editedLogData.date}T${editedLogData.time}`).getTime();
                                      
                                      // Update in the global context
                                      updateCookingLog(editingLogId, {
                                        id: log.id,
                                        menuName: editedLogData.menuItem,
                                        cookName: staffName,
                                        timeMinutes: minutes,
                                        timeSeconds: seconds,
                                        timestamp: timestamp,
                                        department: staffDepartment.toLowerCase()
                                      });
                                      
                                      setEditingLogId(null);
                                      setEditedLogData(null);
                                    }}
                                    className="text-green-400 hover:text-green-300 transition-colors"
                                    title="Save"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      // Cancel editing
                                      setEditingLogId(null);
                                      setEditedLogData(null);
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    title="Cancel"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            // View Mode
                            <>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.originalId || log.id}</td>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.date}</td>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.time}</td>
                              <td className="text-white px-4 py-3 text-sm">{log.menuItem}</td>
                              {isWaiter && (
                                <td className="text-white/80 px-4 py-3 text-sm">
                                  <span className={`inline-flex px-2 py-1 rounded text-xs ${
                                    log.department === 'kitchen' ? 'bg-purple-600/20 text-purple-400' :
                                    log.department === 'bar' ? 'bg-blue-600/20 text-blue-400' :
                                    'bg-orange-600/20 text-orange-400'
                                  }`}>
                                    {log.department?.toUpperCase() || 'N/A'}
                                  </span>
                                </td>
                              )}
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                  log.status === 'Completed' || log.status === 'Delivered' ? 'bg-green-600/20 text-green-400' :
                                  log.status === 'Pending' ? 'bg-yellow-600/20 text-yellow-400' :
                                  'bg-red-600/20 text-red-400'
                                }`}>
                                  {(log.status === 'Completed' || log.status === 'Delivered') ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                  {log.status}
                                </span>
                              </td>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.duration}</td>
                              <td className="text-white/80 px-4 py-3 text-sm">{log.orderId}</td>
                              {!isWaiter && (
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => {
                                      setEditingLogId(log.id);
                                      setEditedLogData({ ...log });
                                    }}
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <div className="text-white/70 text-sm">
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Account Status Section */}
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-lg mb-1">Account Status</h3>
                    <p className="text-white/70 text-sm">Toggle staff availability status</p>
                  </div>
                  {onToggleActive && (
                    <button
                      onClick={onToggleActive}
                      className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                        isActive 
                          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border-2 border-green-600/50' 
                          : 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border-2 border-red-600/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          isActive ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        <span className="font-semibold">{isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                      <span className="text-xs opacity-70">Click to {isActive ? 'Deactivate' : 'Activate'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Schedule Management Section */}
              <div className="bg-[#3c044d] rounded-[10px] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white text-lg mb-1">Weekly Schedule</h3>
                    <p className="text-white/70 text-sm">Manage work schedule for this staff member</p>
                  </div>
                  <button
                    onClick={handleEditSchedule}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    {schedule ? 'Edit Schedule' : 'Create Schedule'}
                  </button>
                </div>

                {/* Display Schedule */}
                {schedule ? (
                  <div className="grid grid-cols-7 gap-2 mt-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="bg-[#541168] rounded-lg p-3">
                        <div className="text-white text-sm font-semibold mb-2">{day.slice(0, 3)}</div>
                        <div className="text-white/70 text-xs">
                          {schedule[day.toLowerCase() as keyof WeeklySchedule]?.isWorking ? (
                            <>
                              <div className="text-green-400 mb-1">● Working</div>
                              <div>
                                {schedule[day.toLowerCase() as keyof WeeklySchedule]?.startTime || '--:--'} - 
                                {schedule[day.toLowerCase() as keyof WeeklySchedule]?.endTime || '--:--'}
                              </div>
                            </>
                          ) : (
                            <div className="text-red-400">● Off</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#541168] rounded-lg p-4 text-center mt-4">
                    <div className="text-white/70">No schedule set for this staff member</div>
                  </div>
                )}
              </div>

              {/* Danger Zone Section */}
              {onDelete && (
                <div className="bg-[#3c044d] rounded-[10px] p-6 border-2 border-red-600/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-lg mb-1">Danger Zone</h3>
                      <p className="text-white/70 text-sm">Once you delete a staff member, there is no going back. Please be certain.</p>
                    </div>
                    <button
                      onClick={onDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Staff
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Weekly Schedule Editor */}
          {editingSchedule && (
            <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-6">
              <div className="bg-[#3c044d] rounded-[10px] p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-white text-lg mb-4">Edit Weekly Schedule</h3>
                <WeeklyScheduleEditor
                  initialSchedule={schedule}
                  onSave={handleSaveSchedule}
                  onCancel={handleCancelEdit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}