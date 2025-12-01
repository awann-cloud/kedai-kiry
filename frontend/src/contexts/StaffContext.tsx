/**
 * StaffContext.tsx - Staff Performance & Cooking Analytics Context
 * 
 * Manages cooking time logs and provides analytics calculations.
 * Integrates with OrderContext to automatically collect real cooking data.
 * 
 * FEATURES:
 * - Stores cooking time logs (menu, cook, time)
 * - Automatically collects data from finished order items
 * - Calculates efficiency metrics per dish and per cook
 * - Provides filtering capabilities
 * - Exports data to CSV
 * - Manages staff availability and departments
 * 
 * EFFICIENCY CLASSIFICATION ALGORITHM:
 * 1. Convert time to seconds: (minutes × 60) + seconds
 * 2. Group logs by dish name
 * 3. Calculate average time per dish
 * 4. Compare individual time to average:
 *    - Sangat Cepat (Very Fast): ≤ 0.5 × average
 *    - Cepat (Fast): > 0.5 × average and < 0.8 × average
 *    - Normal: 0.8 × average to 1.2 × average
 *    - Lambat (Slow): > 1.2 × average and < 2 × average
 *    - Sangat Lambat (Very Slow): ≥ 2 × average
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialCookingLogs, type CookingLog } from '../data/cookingLogs';
import { useOrders } from './OrderContext';
import { 
  classifyEfficiency, 
  getPercentageOfAverage,
  type EfficiencyLevel,
  getConfigForItem,
  getStandardTimeForItem,
  classifyByPresets,
  type MenuItemConfig
} from '../data/menuItemEfficiency';
import { KITCHEN_STAFF, BAR_STAFF, SNACK_STAFF, WAITSTAFF, Worker } from '../data/staff';

// Re-export EfficiencyLevel for external use
export type { EfficiencyLevel };

/**
 * Processed cooking log with efficiency classification
 */
export interface ProcessedLog extends CookingLog {
  totalSeconds: number;      // Converted time in seconds
  efficiency: EfficiencyLevel; // Classification based on dish average
  percentageOfAverage: number; // Individual time ÷ dish average
}

/**
 * Weekly schedule for a staff member
 */
export interface DaySchedule {
  isActive: boolean;      // Whether staff works this day
  startTime: string;      // Format: "HH:MM" (24-hour)
  endTime: string;        // Format: "HH:MM" (24-hour)
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

/**
 * Delivery record for waiter/waitress performance tracking
 */
export interface DeliveryRecord {
  itemId: string;              // Menu item ID
  itemName: string;            // Name of the item delivered
  orderId: string;             // Order ID
  deliveryTime: number;        // Time taken to deliver in seconds
  timestamp: number;           // When delivery was completed (milliseconds since epoch)
  department: string;          // Which department (kitchen/bar/snack)
}

/**
 * Staff member with schedule and delivery analytics
 */
export interface StaffMember {
  id: string;
  name: string;
  department: string;
  position?: string;
  isActive: boolean;
  schedule?: WeeklySchedule;
  deliveryRecords?: DeliveryRecord[];  // For waiters/waitresses only
  totalDeliveries?: number;            // Total number of deliveries
  averageDeliveryTime?: number;        // Average delivery time in seconds
}

/**
 * Filter options for analytics
 */
export interface AnalyticsFilters {
  employee: string;          // 'All Employees' or specific employee name
  menuItem: string;          // 'All Dishes' or specific dish name
  efficiency: string;        // 'All Efficiency' or specific efficiency level
  startDate: string;         // Start date (mm/dd/yyyy format)
  endDate: string;           // End date (mm/dd/yyyy format)
}

/**
 * Context interface
 */
interface StaffContextType {
  // Raw cooking logs (both mock and real)
  cookingLogs: CookingLog[];
  
  // Filtered and processed logs
  getProcessedLogs: (filters?: AnalyticsFilters) => ProcessedLog[];
  
  // Get unique values for filter dropdowns
  getEmployeeNames: () => string[];
  getMenuItems: () => string[];
  getEfficiencyLevels: () => EfficiencyLevel[];
  
  // Export to CSV
  exportToCSV: (logs: ProcessedLog[]) => void;
  
  // Add new log (automatically called when items finish)
  addCookingLog: (log: CookingLog) => void;
  
  // Update existing log
  updateCookingLog: (logId: string, updatedLog: CookingLog) => void;
  
  // Toggle between showing all data or real data only
  showRealDataOnly: boolean;
  toggleDataSource: () => void;
  
  // Staff management
  staff: Worker[];
  updateStaffAvailability: (staffId: string, isAvailable: boolean) => void;
  getStaffByDepartment: (department: 'kitchen' | 'bar' | 'snack' | 'waitress') => Worker[];
  
  // Delivery tracking (for waiters/waitresses)
  addDeliveryRecord: (waiterName: string, record: DeliveryRecord) => void;
  getDeliveryRecordsForWaiter: (waiterName: string) => DeliveryRecord[];
  getWaiterStats: (waiterName: string) => { totalDeliveries: number; averageDeliveryTime: number };
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

/**
 * Convert time to total seconds
 */
function convertToSeconds(minutes: number, seconds: number): number {
  return (minutes * 60) + seconds;
}

/**
 * StaffProvider Component
 */
export function StaffProvider({ children }: { children: ReactNode }) {
  const [cookingLogs, setCookingLogs] = useState<CookingLog[]>(initialCookingLogs);
  const [showRealDataOnly, setShowRealDataOnly] = useState(false);
  const [trackedItems, setTrackedItems] = useState<Set<string>>(new Set());
  
  // Initialize staff state from localStorage or data files
  const [staff, setStaff] = useState<Worker[]>(() => {
    const savedStaff = localStorage.getItem('staffAvailability');
    if (savedStaff) {
      try {
        return JSON.parse(savedStaff);
      } catch (e) {
        console.error('Failed to parse saved staff data:', e);
      }
    }
    // Default initialization
    return [
      ...KITCHEN_STAFF,
      ...BAR_STAFF,
      ...SNACK_STAFF,
      ...WAITSTAFF
    ];
  });
  
  // Save staff state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('staffAvailability', JSON.stringify(staff));
  }, [staff]);
  
  // Access OrderContext to monitor finished items
  const { getAllOrders } = useOrders();

  /**
   * Effect: Monitor OrderContext for finished items and collect cooking data
   * 
   * This runs whenever orders change and automatically creates cooking logs
   * for newly finished items that haven't been tracked yet.
   */
  useEffect(() => {
    const allDepartments = getAllOrders();
    
    allDepartments.forEach(({ department, orders }) => {
      orders.forEach(order => {
        order.items.forEach(item => {
          // Check if item is finished and we haven't tracked it yet
          if (
            item.status === 'finished' && 
            item.startedTime && 
            item.finishedTime &&
            item.staff &&
            !trackedItems.has(item.id)
          ) {
            // Calculate cooking time
            const totalSeconds = Math.floor((item.finishedTime - item.startedTime) / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            // Create cooking log with startedAt, finishedAt, and waiter
            const newLog: CookingLog = {
              id: `real-${item.id}`,
              menuName: item.name,
              cookName: item.staff,
              timeMinutes: minutes,
              timeSeconds: seconds,
              timestamp: item.finishedTime,
              department: department,
              startedAt: item.startedTime,
              finishedAt: item.finishedTime,
              waiter: item.waiter || undefined // Will be populated when checker assigns waiter
            };
            
            // Add to logs and mark as tracked
            setCookingLogs(prev => [...prev, newLog]);
            setTrackedItems(prev => new Set(prev).add(item.id));
          }
          
          // Update cooking log with waiter info when waiter is assigned (not delivered yet)
          if (
            item.status === 'finished' &&
            item.waiter &&
            !trackedItems.has(`waiter-assigned-${item.id}`)
          ) {
            // Update the cooking log with waiter name
            setCookingLogs(prev => prev.map(log => 
              log.id === `real-${item.id}` 
                ? { ...log, waiter: item.waiter }
                : log
            ));
            
            // Mark as tracked so we don't update again
            setTrackedItems(prev => new Set(prev).add(`waiter-assigned-${item.id}`));
          }
          
          // ⭐ NEW FEATURE (Post v732) - Track delivered items for waiter performance
          // Automatically detects when items are marked as delivered and records delivery analytics
          if (
            item.itemDelivered &&
            item.waiter &&
            item.deliveryStartTime &&
            item.deliveryFinishedTime &&
            item.deliveryElapsedTime !== undefined &&
            !trackedItems.has(`delivery-${item.id}`)
          ) {
            // Create delivery record for waiter performance tracking
            const deliveryRecord: DeliveryRecord = {
              itemId: item.id,
              itemName: item.name,
              orderId: order.orderId,
              deliveryTime: item.deliveryElapsedTime,
              timestamp: item.deliveryFinishedTime,
              department: department
            };
            
            // Add to waiter's delivery records (for analytics)
            addDeliveryRecord(item.waiter, deliveryRecord);
            
            // ⭐ NEW FEATURE (Post v732) - Update cooking log with delivery timing data
            // This enables Raw Database to show accurate delivery times separate from cooking times
            // Links delivery performance to the original cooking log entry
            setCookingLogs(prev => prev.map(log => 
              log.id === `real-${item.id}` 
                ? { 
                    ...log, 
                    deliveryStartTime: item.deliveryStartTime,
                    deliveryFinishedTime: item.deliveryFinishedTime,
                    deliveryElapsedTime: item.deliveryElapsedTime
                  }
                : log
            ));
            
            // Mark as tracked so we don't record this delivery multiple times
            setTrackedItems(prev => new Set(prev).add(`delivery-${item.id}`));
          }
        });
      });
    });
  }, [getAllOrders, trackedItems]);

  /**
   * Toggle between showing all data (mock + real) or real data only
   */
  const toggleDataSource = () => {
    setShowRealDataOnly(prev => !prev);
  };

  /**
   * Get processed logs with efficiency classification
   * Applies filters if provided
   */
  const getProcessedLogs = (filters?: AnalyticsFilters): ProcessedLog[] => {
    // Filter data source based on toggle
    let filteredLogs = showRealDataOnly
      ? cookingLogs.filter(log => log.id.startsWith('real-'))
      : [...cookingLogs];

    // Apply filters
    if (filters) {
      if (filters.employee !== 'All Employees') {
        filteredLogs = filteredLogs.filter(log => log.cookName === filters.employee);
      }
      
      if (filters.menuItem !== 'All Dishes') {
        filteredLogs = filteredLogs.filter(log => log.menuName === filters.menuItem);
      }
      
      if (filters.startDate) {
        const startTime = new Date(filters.startDate).getTime();
        filteredLogs = filteredLogs.filter(log => log.timestamp >= startTime);
      }
      
      if (filters.endDate) {
        const endTime = new Date(filters.endDate).getTime();
        filteredLogs = filteredLogs.filter(log => log.timestamp <= endTime);
      }
    }

    // Step 1: Convert all times to seconds
    const logsWithSeconds = filteredLogs.map(log => ({
      ...log,
      totalSeconds: convertToSeconds(log.timeMinutes, log.timeSeconds)
    }));

    // Step 2: Calculate efficiency using menu item configs (NOT dish averages)
    const processedLogs: ProcessedLog[] = logsWithSeconds.map(log => {
      // Get the menu item config
      const config = getConfigForItem(log.menuName, log.department as 'kitchen' | 'bar' | 'snack');
      
      // Get the standard time from the menu item config
      const standardTime = getStandardTimeForItem(config);
      
      // Classify efficiency based on the configured presets
      const efficiencyKey = classifyByPresets(log.totalSeconds, config);
      
      // Map English keys to Indonesian labels
      const efficiencyMap = {
        'very-fast': 'Sangat Cepat',
        'fast': 'Cepat',
        'standard': 'Normal',
        'slow': 'Lambat',
        'extremely-slow': 'Sangat Lambat'
      } as const;
      
      const efficiency = efficiencyMap[efficiencyKey];
      
      // Calculate percentage relative to the configured standard time
      const percentageOfAverage = getPercentageOfAverage(log.totalSeconds, standardTime);

      return {
        ...log,
        efficiency,
        percentageOfAverage
      };
    });

    // Step 3: Apply efficiency filter if specified
    if (filters?.efficiency && filters.efficiency !== 'All Efficiency') {
      return processedLogs.filter(log => log.efficiency === filters.efficiency);
    }

    return processedLogs;
  };

  /**
   * Get unique employee names for filter dropdown
   */
  const getEmployeeNames = (): string[] => {
    const uniqueNames = new Set(cookingLogs.map(log => log.cookName));
    return Array.from(uniqueNames).sort();
  };

  /**
   * Get unique menu items for filter dropdown
   */
  const getMenuItems = (): string[] => {
    const uniqueItems = new Set(cookingLogs.map(log => log.menuName));
    return Array.from(uniqueItems).sort();
  };

  /**
   * Get efficiency levels for filter dropdown
   */
  const getEfficiencyLevels = (): EfficiencyLevel[] => {
    return ['Sangat Cepat', 'Cepat', 'Normal', 'Lambat', 'Sangat Lambat'];
  };

  /**
   * Export logs to CSV file
   */
  const exportToCSV = (logs: ProcessedLog[]) => {
    // Create CSV header
    const headers = [
      'Cook Name',
      'Menu Item',
      'Time (Minutes)',
      'Time (Seconds)',
      'Total Seconds',
      'Efficiency',
      'Percentage of Average',
      'Department',
      'Date'
    ];

    // Create CSV rows
    const rows = logs.map(log => [
      log.cookName,
      log.menuName,
      log.timeMinutes,
      log.timeSeconds,
      log.totalSeconds,
      log.efficiency,
      `${(log.percentageOfAverage * 100).toFixed(1)}%`,
      log.department,
      new Date(log.timestamp).toLocaleDateString()
    ]);

    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `cooking-analytics-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Add new cooking log (automatically called when items finish)
   */
  const addCookingLog = (log: CookingLog) => {
    setCookingLogs(prev => [...prev, log]);
  };

  /**
   * Update existing cooking log
   */
  const updateCookingLog = (logId: string, updatedLog: CookingLog) => {
    setCookingLogs(prev => prev.map(log => (log.id === logId ? updatedLog : log)));
  };

  /**
   * Update staff availability
   */
  const updateStaffAvailability = (staffId: string, isAvailable: boolean) => {
    setStaff(prev => prev.map(worker => {
      if (worker.id === staffId) {
        return { ...worker, available: isAvailable };
      }
      return worker;
    }));
  };

  /**
   * Get staff by department
   */
  const getStaffByDepartment = (department: 'kitchen' | 'bar' | 'snack' | 'waitress'): Worker[] => {
    return staff.filter(worker => worker.department.toLowerCase() === department);
  };

  /**
   * Delivery records state (for waiters/waitresses)
   * Stores delivery performance data
   */
  const [deliveryRecords, setDeliveryRecords] = useState<Map<string, DeliveryRecord[]>>(() => {
    const saved = localStorage.getItem('deliveryRecords');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return new Map(Object.entries(parsed));
      } catch (e) {
        console.error('Failed to parse delivery records:', e);
      }
    }
    return new Map();
  });

  // Save delivery records to localStorage
  useEffect(() => {
    const recordsObj = Object.fromEntries(deliveryRecords);
    localStorage.setItem('deliveryRecords', JSON.stringify(recordsObj));
  }, [deliveryRecords]);

  /**
   * Add delivery record for a waiter
   */
  const addDeliveryRecord = (waiterName: string, record: DeliveryRecord) => {
    setDeliveryRecords(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(waiterName) || [];
      newMap.set(waiterName, [...existing, record]);
      return newMap;
    });
  };

  /**
   * Get delivery records for a specific waiter
   */
  const getDeliveryRecordsForWaiter = (waiterName: string): DeliveryRecord[] => {
    return deliveryRecords.get(waiterName) || [];
  };

  /**
   * Get waiter statistics (total deliveries, average time)
   */
  const getWaiterStats = (waiterName: string) => {
    const records = getDeliveryRecordsForWaiter(waiterName);
    const totalDeliveries = records.length;
    const averageDeliveryTime = totalDeliveries > 0
      ? records.reduce((sum, r) => sum + r.deliveryTime, 0) / totalDeliveries
      : 0;
    
    return { totalDeliveries, averageDeliveryTime };
  };

  const value: StaffContextType = {
    cookingLogs,
    getProcessedLogs,
    getEmployeeNames,
    getMenuItems,
    getEfficiencyLevels,
    exportToCSV,
    addCookingLog,
    updateCookingLog,
    showRealDataOnly,
    toggleDataSource,
    staff,
    updateStaffAvailability,
    getStaffByDepartment,
    addDeliveryRecord,
    getDeliveryRecordsForWaiter,
    getWaiterStats
  };

  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
}

/**
 * useStaff Hook
 * 
 * Access staff analytics from any component
 */
export function useStaff() {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
}