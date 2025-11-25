/**
 * menuItemsUtils.ts - Dynamic Menu Item Discovery
 * 
 * Automatically extracts menu items from existing orders and cooking logs.
 * This ensures the menu management system always reflects what's actually in your system.
 * 
 * SOURCES:
 * - /data/makananOrders.ts (Kitchen orders)
 * - /data/barOrders.ts (Bar orders)
 * - /data/snackOrders.ts (Snack orders)
 * - /data/cookingLogs.ts (Historical cooking data)
 * 
 * INTEGRATION:
 * - MenuManagement.tsx uses this to populate the menu items list
 * - Merges with user customizations from menuItemsConfig.ts
 * - Connected to efficiency tracking system
 */

import { initialOrdersData } from './makananOrders';
import { initialBarOrdersData } from './barOrders';
import { initialSnackOrdersData } from './snackOrders';
import { initialCookingLogs } from './cookingLogs';

export interface DiscoveredMenuItem {
  name: string;
  department: 'kitchen' | 'bar' | 'snack';
  sources: ('orders' | 'cooking-logs')[];
}

/**
 * Extract unique menu items from all orders
 */
function extractFromOrders(): Map<string, DiscoveredMenuItem> {
  const items = new Map<string, DiscoveredMenuItem>();

  // Kitchen orders
  initialOrdersData.forEach(order => {
    order.items.forEach(item => {
      if (!items.has(item.name)) {
        items.set(item.name, {
          name: item.name,
          department: 'kitchen',
          sources: ['orders']
        });
      } else {
        const existing = items.get(item.name)!;
        if (!existing.sources.includes('orders')) {
          existing.sources.push('orders');
        }
      }
    });
  });

  // Bar orders
  initialBarOrdersData.forEach(order => {
    order.items.forEach(item => {
      if (!items.has(item.name)) {
        items.set(item.name, {
          name: item.name,
          department: 'bar',
          sources: ['orders']
        });
      } else {
        const existing = items.get(item.name)!;
        if (!existing.sources.includes('orders')) {
          existing.sources.push('orders');
        }
      }
    });
  });

  // Snack orders
  initialSnackOrdersData.forEach(order => {
    order.items.forEach(item => {
      if (!items.has(item.name)) {
        items.set(item.name, {
          name: item.name,
          department: 'snack',
          sources: ['orders']
        });
      } else {
        const existing = items.get(item.name)!;
        if (!existing.sources.includes('orders')) {
          existing.sources.push('orders');
        }
      }
    });
  });

  return items;
}

/**
 * Extract unique menu items from cooking logs
 */
function extractFromCookingLogs(): Map<string, DiscoveredMenuItem> {
  const items = new Map<string, DiscoveredMenuItem>();

  initialCookingLogs.forEach(log => {
    if (!items.has(log.menuName)) {
      items.set(log.menuName, {
        name: log.menuName,
        department: log.department,
        sources: ['cooking-logs']
      });
    } else {
      const existing = items.get(log.menuName)!;
      if (!existing.sources.includes('cooking-logs')) {
        existing.sources.push('cooking-logs');
      }
    }
  });

  return items;
}

/**
 * Discover all menu items from orders and cooking logs
 * Merges data from both sources
 */
export function discoverAllMenuItems(): DiscoveredMenuItem[] {
  const orderItems = extractFromOrders();
  const logItems = extractFromCookingLogs();

  // Merge both sources
  const merged = new Map<string, DiscoveredMenuItem>();

  // Add order items
  orderItems.forEach((item, name) => {
    merged.set(name, item);
  });

  // Merge cooking log items
  logItems.forEach((item, name) => {
    if (merged.has(name)) {
      const existing = merged.get(name)!;
      // Merge sources
      item.sources.forEach(source => {
        if (!existing.sources.includes(source)) {
          existing.sources.push(source);
        }
      });
      // Prefer cooking log department if available (more reliable)
      if (item.sources.includes('cooking-logs')) {
        existing.department = item.department;
      }
    } else {
      merged.set(name, item);
    }
  });

  // Convert to array and sort by name
  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get menu items by department
 */
export function getMenuItemsByDepartment(department: 'kitchen' | 'bar' | 'snack'): DiscoveredMenuItem[] {
  return discoverAllMenuItems().filter(item => item.department === department);
}

/**
 * Get all unique menu item names
 */
export function getAllMenuItemNames(): string[] {
  return discoverAllMenuItems().map(item => item.name);
}

/**
 * Check if a menu item exists in the system
 */
export function menuItemExists(name: string): boolean {
  const items = discoverAllMenuItems();
  return items.some(item => item.name === name);
}

/**
 * Get department for a menu item
 */
export function getDepartmentForItem(name: string): 'kitchen' | 'bar' | 'snack' | null {
  const items = discoverAllMenuItems();
  const item = items.find(i => i.name === name);
  return item ? item.department : null;
}
