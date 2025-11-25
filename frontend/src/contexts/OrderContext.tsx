/**
 * OrderContext.tsx - Centralized Order Management System
 * 
 * This context provides a single source of truth for all orders across Kitchen, Bar, and Snack departments.
 * Any changes made in any view (department pages or checker pages) will automatically sync across ALL views.
 * 
 * FEATURES:
 * - Manages live orders for Kitchen, Bar, and Snack departments
 * - Provides update functions for changing item statuses (START, DONE, FINISHED)
 * - Supports waiter assignment and delivery tracking (Checker-only features)
 * - Automatically syncs changes across all components in real-time
 * - Real-time timer updates for in-progress items (every second)
 * 
 * DUAL WORKFLOW SUPPORT:
 * - Department Pages: Can START items, mark DONE, mark order FINISHED
 * - Checker Pages: Can do everything departments can + ASSIGN waiters + mark DELIVERED
 * 
 * USAGE:
 * 1. Wrap your app with <OrderProvider> in App.tsx
 * 2. Use the useOrders() hook to access and update orders from any component
 * 3. All updates are synchronized automatically across all pages
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initialOrdersData, type Order, type MenuItem } from '../data/makananOrders';
import { initialBarOrdersData } from '../data/barOrders';
import { initialSnackOrdersData } from '../data/snackOrders';

/**
 * Department Type
 * Represents the three main departments in the system
 */
type Department = 'kitchen' | 'bar' | 'snack' | 'all';

/**
 * OrderContext Interface
 * Defines all available functions and data from the context
 * 
 * DEPARTMENT FUNCTIONS (Kitchen/Bar/Snack pages):
 * - startItem: Change item status to 'on-their-way' and assign staff
 * - finishItem: Change item status to 'finished' 
 * - completeOrder: Mark entire order as complete (all items finished)
 * 
 * CHECKER FUNCTIONS (Checker pages only):
 * - assignWaiter: Assign waiter/waitress to completed order
 * - markDelivered: Mark order as delivered to customer
 * 
 * DATA ACCESS:
 * - getOrders: Get orders for specific department
 * - getAllOrders: Get all departments with their orders (for Checker views)
 */
interface OrderContextType {
  // Get orders for a specific department
  getOrders: (department: Department) => Order[];
  
  // Get all orders across all departments (used by Checker views)
  getAllOrders: () => { department: Department; orders: Order[] }[];
  
  // Start a menu item - assign staff and begin timer (Department & Checker)
  startItem: (department: Department, orderId: string, itemId: string, staffName: string) => void;
  
  // Finish a menu item - mark as done and stop timer (Department & Checker)
  finishItem: (department: Department, orderId: string, itemId: string) => void;
  
  // Mark entire order as complete - all items finished (Department & Checker)
  completeOrder: (department: Department, orderId: string) => void;
  
  // Assign waiter/waitress to completed order (Checker only)
  assignWaiter: (department: Department, orderId: string, waiterName: string) => void;
  
  // Mark order as delivered to customer - final step (Checker only)
  markDelivered: (department: Department, orderId: string) => void;
}

// Create the context with undefined default value
const OrderContext = createContext<OrderContextType | undefined>(undefined);

/**
 * OrderProvider Component
 * 
 * Wraps the entire application and provides centralized order management.
 * Maintains separate state for each department while allowing cross-view updates.
 * All changes made anywhere in the app will sync across all views automatically.
 */
export function OrderProvider({ children }: { children: ReactNode }) {
  // Separate state for each department - THIS IS THE LIVE DATA
  // All updates happen here and trigger re-renders everywhere
  const [kitchenOrders, setKitchenOrders] = useState<Order[]>(initialOrdersData);
  const [barOrders, setBarOrders] = useState<Order[]>(initialBarOrdersData);
  const [snackOrders, setSnackOrders] = useState<Order[]>(initialSnackOrdersData);

  /**
   * Timer Effect - Updates elapsed time for all in-progress items
   * 
   * Runs every second and updates the elapsedTime for all items
   * with status 'on-their-way' across all departments.
   * This creates the live timer effect you see on all pages.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      const updateElapsedTimes = (orders: Order[]) =>
        orders.map(order => ({
          ...order,
          items: order.items.map(item => {
            if (item.status === 'on-their-way' && item.startedTime) {
              return {
                ...item,
                elapsedTime: Math.floor((Date.now() - item.startedTime) / 1000)
              };
            }
            return item;
          })
        }));

      // Update all departments every second
      setKitchenOrders(prev => updateElapsedTimes(prev));
      setBarOrders(prev => updateElapsedTimes(prev));
      setSnackOrders(prev => updateElapsedTimes(prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Get Orders by Department
   * 
   * Returns the order array for a specific department.
   * Used by individual department pages (Kitchen, Bar, Snack).
   */
  const getOrders = (department: Department): Order[] => {
    switch (department) {
      case 'kitchen':
        return kitchenOrders;
      case 'bar':
        return barOrders;
      case 'snack':
        return snackOrders;
      case 'all':
        // Return all orders combined (for Checker view)
        return [...kitchenOrders, ...barOrders, ...snackOrders];
      default:
        return [];
    }
  };

  /**
   * Get All Orders with Department Labels
   * 
   * Returns all orders grouped by department.
   * Used by Checker page to show orders from all departments.
   */
  const getAllOrders = () => [
    { department: 'kitchen' as Department, orders: kitchenOrders },
    { department: 'bar' as Department, orders: barOrders },
    { department: 'snack' as Department, orders: snackOrders }
  ];

  /**
   * Start Item - Change status from 'not-started' to 'on-their-way'
   * 
   * Updates the item with:
   * - status: 'on-their-way'
   * - staff: assigned staff member name
   * - startedTime: current timestamp
   * - elapsedTime: initialized to 0
   */
  const startItem = (department: Department, orderId: string, itemId: string, staffName: string) => {
    const updateOrders = (orders: Order[]) =>
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      status: 'on-their-way' as const,
                      staff: staffName,
                      startedTime: Date.now(),
                      elapsedTime: 0
                    }
                  : item
              )
            }
          : order
      );

    // Update the appropriate department's orders
    switch (department) {
      case 'kitchen':
        setKitchenOrders(updateOrders);
        break;
      case 'bar':
        setBarOrders(updateOrders);
        break;
      case 'snack':
        setSnackOrders(updateOrders);
        break;
    }
  };

  /**
   * Finish Item - Change status from 'on-their-way' to 'finished'
   * 
   * Updates the item with:
   * - status: 'finished'
   * - finishedTime: current timestamp
   * - elapsedTime: final time (frozen, no longer updates)
   */
  const finishItem = (department: Department, orderId: string, itemId: string) => {
    const updateOrders = (orders: Order[]) =>
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.id === itemId && item.status === 'on-their-way'
                  ? {
                      ...item,
                      status: 'finished' as const,
                      finishedTime: Date.now()
                    }
                  : item
              )
            }
          : order
      );

    // Update the appropriate department's orders
    switch (department) {
      case 'kitchen':
        setKitchenOrders(updateOrders);
        break;
      case 'bar':
        setBarOrders(updateOrders);
        break;
      case 'snack':
        setSnackOrders(updateOrders);
        break;
    }
  };

  /**
   * Complete Order - Mark entire order as finished
   * 
   * Updates the order with:
   * - completed: true
   * - frozenTime: current total elapsed time (in seconds)
   * 
   * This prevents the order timer from continuing to count.
   */
  const completeOrder = (department: Department, orderId: string) => {
    const updateOrders = (orders: Order[]) =>
      orders.map(order => {
        if (order.id === orderId) {
          // Calculate the frozen time based on earliest started item
          const startedItems = order.items.filter(item => item.startedTime);
          const frozenTime = startedItems.length > 0
            ? Math.floor((Date.now() - Math.min(...startedItems.map(item => item.startedTime!))) / 1000)
            : 0;

          return {
            ...order,
            completed: true,
            frozenTime
          };
        }
        return order;
      });

    // Update the appropriate department's orders
    switch (department) {
      case 'kitchen':
        setKitchenOrders(updateOrders);
        break;
      case 'bar':
        setBarOrders(updateOrders);
        break;
      case 'snack':
        setSnackOrders(updateOrders);
        break;
    }
  };

  /**
   * Assign Waiter - Add waiter name to order (Checker only)
   * 
   * Updates the order with:
   * - waiter: assigned waiter name
   */
  const assignWaiter = (department: Department, orderId: string, waiterName: string) => {
    const updateOrders = (orders: Order[]) =>
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              waiter: waiterName
            }
          : order
      );

    // Update the appropriate department's orders
    switch (department) {
      case 'kitchen':
        setKitchenOrders(updateOrders);
        break;
      case 'bar':
        setBarOrders(updateOrders);
        break;
      case 'snack':
        setSnackOrders(updateOrders);
        break;
    }
  };

  /**
   * Mark Delivered - Mark order as delivered (Checker only)
   * 
   * Updates the order with:
   * - delivered: true
   * - deliveredTime: current timestamp
   */
  const markDelivered = (department: Department, orderId: string) => {
    const updateOrders = (orders: Order[]) =>
      orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              delivered: true,
              deliveredTime: Date.now()
            }
          : order
      );

    // Update the appropriate department's orders
    switch (department) {
      case 'kitchen':
        setKitchenOrders(updateOrders);
        break;
      case 'bar':
        setBarOrders(updateOrders);
        break;
      case 'snack':
        setSnackOrders(updateOrders);
        break;
    }
  };

  // Context value provided to all children
  const value: OrderContextType = {
    getOrders,
    getAllOrders,
    startItem,
    finishItem,
    completeOrder,
    assignWaiter,
    markDelivered
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

/**
 * useOrders Hook
 * 
 * Custom hook to access the OrderContext from any component.
 * Throws an error if used outside of OrderProvider.
 * 
 * USAGE:
 * const { getOrders, startItem, finishItem, completeOrder } = useOrders();
 */
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}