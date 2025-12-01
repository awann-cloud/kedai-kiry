/**
 * WaiterContext.tsx - Waiter Assignment & Delivery Tracking System
 * 
 * ⭐ NEW FEATURE (Post v732)
 * 
 * This context manages all waiter-related functionality added after Figma version 732.
 * Separated from OrderContext to maintain clean separation of concerns.
 * 
 * FEATURES:
 * - Per-item waiter assignment (assign waiter to individual menu items)
 * - Bulk waiter assignment (assign waiter to all items in an order)
 * - Delivery timer tracking (separate from cooking time)
 * - Per-item delivery completion tracking
 * - Automatic delivery elapsed time updates (every second)
 * 
 * WORKFLOW:
 * 1. Checker assigns waiter to item(s) → deliveryStartTime recorded, timer starts
 * 2. Timer updates deliveryElapsedTime every second until delivery complete
 * 3. Checker marks item delivered → deliveryFinishedTime recorded, final time calculated
 * 4. StaffContext automatically tracks delivery records for analytics
 * 
 * INTEGRATION:
 * - Works on top of OrderContext (uses existing order management)
 * - Integrates with StaffContext for delivery performance tracking
 * - Used by Checker pages for waiter assignment and delivery management
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useOrders } from './OrderContext';

/**
 * Department Type
 */
type Department = 'kitchen' | 'bar' | 'snack';

/**
 * WaiterContext Interface
 * Defines all waiter and delivery management functions
 */
interface WaiterContextType {
  // Assign waiter to a specific menu item and start delivery timer
  assignWaiterToItem: (department: Department, orderId: string, itemId: string, waiterName: string) => void;
  
  // Assign waiter to all finished items in an order and start delivery timers
  assignWaiterToOrder: (department: Department, orderId: string, waiterName: string) => void;
  
  // Mark specific item as delivered and record final delivery time
  markItemDelivered: (department: Department, orderId: string, itemId: string) => void;
  
  // Mark entire order as delivered (legacy support)
  markOrderDelivered: (department: Department, orderId: string) => void;
}

// Create the context
const WaiterContext = createContext<WaiterContextType | undefined>(undefined);

/**
 * WaiterProvider Component
 * 
 * Wraps the application and provides waiter assignment and delivery tracking.
 * Must be used inside OrderProvider to access order data.
 */
export function WaiterProvider({ children }: { children: ReactNode }) {
  const orderContext = useOrders();

  /**
   * ⭐ DELIVERY TIMER EFFECT (Post v732)
   * 
   * Updates delivery elapsed time for all items with assigned waiters
   * Runs every second for real-time delivery timer display
   * 
   * NOTE: This is handled by OrderContext's timer effect for now.
   * If we need more complex delivery timing logic in the future,
   * we can move it here and update orders through OrderContext API.
   */
  useEffect(() => {
    // Timer logic currently handled by OrderContext
    // This effect is a placeholder for future delivery-specific logic
    return () => {};
  }, []);

  /**
   * ⭐ ASSIGN WAITER TO ITEM (Post v732)
   * 
   * Assigns a waiter to a specific menu item and starts the delivery timer.
   * This enables per-item delivery tracking instead of per-order tracking.
   * 
   * Flow:
   * 1. Set waiter name on item
   * 2. Record deliveryStartTime (current timestamp)
   * 3. Initialize deliveryElapsedTime to 0
   * 4. Timer automatically updates every second via OrderContext
   */
  const assignWaiterToItem = (
    department: Department,
    orderId: string,
    itemId: string,
    waiterName: string
  ) => {
    // Delegate to OrderContext which has direct state access
    orderContext.assignWaiterToItem(department, orderId, itemId, waiterName);
  };

  /**
   * ⭐ ASSIGN WAITER TO ORDER (Post v732)
   * 
   * Assigns a waiter to ALL finished items in an order.
   * Starts delivery timer for each item simultaneously.
   * 
   * Used by "ASSIGN ALL" button in Checker interface.
   * 
   * Flow:
   * 1. Set waiter name on all items in order
   * 2. Record deliveryStartTime for each item
   * 3. Initialize deliveryElapsedTime to 0 for each item
   * 4. Timers automatically update every second via OrderContext
   */
  const assignWaiterToOrder = (
    department: Department,
    orderId: string,
    waiterName: string
  ) => {
    // Delegate to OrderContext which has direct state access
    orderContext.assignWaiter(department, orderId, waiterName);
  };

  /**
   * ⭐ MARK ITEM DELIVERED (Post v732)
   * 
   * Marks a specific item as delivered and records final delivery time.
   * This completes the per-item delivery workflow.
   * 
   * Flow:
   * 1. Set itemDelivered = true
   * 2. Record deliveryFinishedTime (current timestamp)
   * 3. Calculate final deliveryElapsedTime
   * 4. StaffContext automatically detects and records delivery performance
   */
  const markItemDelivered = (
    department: Department,
    orderId: string,
    itemId: string
  ) => {
    // Delegate to OrderContext which has direct state access
    orderContext.markItemDelivered(department, orderId, itemId);
  };

  /**
   * MARK ORDER DELIVERED (Legacy Support)
   * 
   * Marks entire order as delivered.
   * Kept for backward compatibility with order-level delivery tracking.
   */
  const markOrderDelivered = (
    department: Department,
    orderId: string
  ) => {
    // Delegate to OrderContext which has direct state access
    orderContext.markDelivered(department, orderId);
  };

  // Context value provided to all children
  const value: WaiterContextType = {
    assignWaiterToItem,
    assignWaiterToOrder,
    markItemDelivered,
    markOrderDelivered
  };

  return <WaiterContext.Provider value={value}>{children}</WaiterContext.Provider>;
}

/**
 * useWaiter Hook
 * 
 * Custom hook to access the WaiterContext from any component.
 * Throws an error if used outside of WaiterProvider.
 * 
 * USAGE:
 * const { assignWaiterToItem, markItemDelivered } = useWaiter();
 */
export function useWaiter() {
  const context = useContext(WaiterContext);
  if (context === undefined) {
    throw new Error('useWaiter must be used within a WaiterProvider');
  }
  return context;
}
