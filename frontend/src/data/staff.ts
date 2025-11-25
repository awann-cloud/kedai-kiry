/**
 * STAFF DATABASE
 * 
 * Worker class hierarchy and staff data for the Kitchen Order Management System.
 * 
 * DUAL WORKFLOW SUPPORT:
 * - Department Staff (Kitchen/Bar/Snack): Assigned to menu items when order preparation starts
 * - Waitstaff: Assigned by Checker section to deliver completed orders to customers
 * 
 * USAGE:
 * - Department pages use SelectCookPanel to assign KitchenStaff/BarStaff/SnackStaff
 * - Checker pages use SelectWaiterPanel to assign Waitress after order completion
 * - getStaffByDepartment() helper returns appropriate staff array for each department
 */

/**
 * Worker Superclass
 * 
 * Abstract base class that all staff types inherit from.
 * Implements common properties and behavior for all workers.
 * Uses TypeScript's object-oriented features for proper class hierarchy.
 */
export abstract class Worker {
  id: string;                                           // Unique identifier for the worker
  name: string;                                         // Worker's full name
  position: string;                                     // Job title/position
  available: boolean;                                   // Whether the worker is currently available for assignments
  department: 'kitchen' | 'bar' | 'snack' | 'waitress'; // Department the worker belongs to

  constructor(id: string, name: string, position: string, available: boolean, department: 'kitchen' | 'bar' | 'snack' | 'waitress') {
    this.id = id;
    this.name = name;
    this.position = position;
    this.available = available;
    this.department = department;
  }

  // Abstract method that must be implemented by each subclass
  // Returns a display-friendly title for the worker's role
  abstract getDisplayTitle(): string;
}

/**
 * KitchenStaff Class
 * 
 * Represents kitchen workers who prepare food orders.
 * Used in OrdersKitchen and CheckerOrdersMakanan pages.
 * Extends Worker with kitchen-specific department assignment.
 */
export class KitchenStaff extends Worker {
  constructor(id: string, name: string, position: string, available: boolean) {
    super(id, name, position, available, 'kitchen'); // Automatically sets department to 'kitchen'
  }

  getDisplayTitle(): string {
    return 'Kitchen Staff';
  }
}

/**
 * BarStaff Class
 * 
 * Represents bar workers who prepare beverages and drinks.
 * Used in OrdersBar and CheckerOrdersBar pages.
 * Extends Worker with bar-specific department assignment.
 */
export class BarStaff extends Worker {
  constructor(id: string, name: string, position: string, available: boolean) {
    super(id, name, position, available, 'bar'); // Automatically sets department to 'bar'
  }

  getDisplayTitle(): string {
    return 'Bar Staff';
  }
}

/**
 * SnackStaff Class
 * 
 * Represents snack workers who prepare quick snacks and light items.
 * Used in OrdersSnack and CheckerOrdersSnacktsx pages.
 * Extends Worker with snack-specific department assignment.
 */
export class SnackStaff extends Worker {
  constructor(id: string, name: string, position: string, available: boolean) {
    super(id, name, position, available, 'snack'); // Automatically sets department to 'snack'
  }

  getDisplayTitle(): string {
    return 'Snack Staff';
  }
}

/**
 * Waitress Class
 * 
 * Represents waitstaff who deliver completed orders to customers.
 * ONLY used in Checker section pages via SelectWaiterPanel.
 * Assigned AFTER department completes order preparation.
 * Extends Worker with waitress-specific department assignment.
 */
export class Waitress extends Worker {
  constructor(id: string, name: string, position: string, available: boolean) {
    super(id, name, position, available, 'waitress'); // Automatically sets department to 'waitress'
  }

  getDisplayTitle(): string {
    return 'Waitress';
  }
}

/**
 * Get Staff By Department
 * 
 * Utility function to retrieve staff members based on their department.
 * Used by SelectCookPanel to show relevant staff for each section.
 * 
 * @param department - The department to filter by ('kitchen' | 'bar' | 'snack' | 'waitress')
 * @returns Array of Worker objects for the specified department
 */
export function getStaffByDepartment(department: 'kitchen' | 'bar' | 'snack' | 'waitress'): Worker[] {
  switch (department) {
    case 'kitchen':
      return KITCHEN_STAFF;
    case 'bar':
      return BAR_STAFF;
    case 'snack':
      return SNACK_STAFF;
    case 'waitress':
      return WAITSTAFF;
    default:
      return []; // Return empty array if invalid department
  }
}

/**
 * KITCHEN DEPARTMENT STAFF
 * 
 * Array of all kitchen workers with their availability status
 */
export const KITCHEN_STAFF: KitchenStaff[] = [
  new KitchenStaff('k1', 'Chef Anton', 'Head Chef', true),      // Currently available
  new KitchenStaff('k2', 'Chef Maria', 'Sous Chef', false),     // Currently unavailable
  new KitchenStaff('k3', 'Chef David', 'Line Cook', true),      // Currently available
  new KitchenStaff('k4', 'Chef Sarah', 'Prep Cook', true),      // Currently available
];

/**
 * BAR DEPARTMENT STAFF
 * 
 * Array of all bar workers with their availability status
 */
export const BAR_STAFF: BarStaff[] = [
  new BarStaff('b1', 'Alex Johnson', 'Head Bartender', true),   // Currently available
  new BarStaff('b2', 'Nina Patel', 'Bartender', true),          // Currently available
  new BarStaff('b3', 'Mike Chen', 'Bartender', false),          // Currently unavailable
  new BarStaff('b4', 'Lisa Wong', 'Bar Back', true),            // Currently available
];

/**
 * SNACK DEPARTMENT STAFF
 * 
 * Array of all snack workers with their availability status
 */
export const SNACK_STAFF: SnackStaff[] = [
  new SnackStaff('s1', 'Emma Davis', 'Snack Lead', true),       // Currently available
  new SnackStaff('s2', 'James Wilson', 'Snack Prep', true),     // Currently available
  new SnackStaff('s3', 'Sofia Garcia', 'Snack Prep', false),    // Currently unavailable
  new SnackStaff('s4', 'Oliver Brown', 'Snack Assistant', true),// Currently available
];

/**
 * WAITSTAFF
 * 
 * Array of all waiters/waitresses with their availability status
 */
export const WAITSTAFF: Waitress[] = [
  new Waitress('w1', 'Ashley Martinez', 'Senior Waitress', true), // Currently available
  new Waitress('w2', 'Jessica Lee', 'Waitress', true),            // Currently available
  new Waitress('w3', 'Rachel Kim', 'Waitress', false),            // Currently unavailable
  new Waitress('w4', 'Sophia Anderson', 'Waitress', true),        // Currently available
];