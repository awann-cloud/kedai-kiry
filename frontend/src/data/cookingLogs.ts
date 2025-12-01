/**
 * cookingLogs.ts - Cooking Time Log Data
 * 
 * Stores historical cooking data for analytics and efficiency tracking.
 * Each log entry records: menu item, cook name, time taken, and timestamp.
 * 
 * TIME FORMAT:
 * - timeMinutes: Number of minutes
 * - timeSeconds: Number of seconds (0-59)
 * - Total seconds = (timeMinutes × 60) + timeSeconds
 * 
 * EFFICIENCY CLASSIFICATION:
 * Based on comparison to dish average:
 * - Sangat Cepat (Very Fast): ≤ 0.5 × average
 * - Cepat (Fast): > 0.5 × average and < 0.8 × average
 * - Normal: 0.8 × average to 1.2 × average
 * - Lambat (Slow): > 1.2 × average and < 2 × average
 * - Sangat Lambat (Very Slow): ≥ 2 × average
 */

export interface CookingLog {
  id: string;
  menuName: string;        // Name of the dish
  cookName: string;        // Name of the cook who prepared it
  timeMinutes: number;     // Minutes portion of cooking time
  timeSeconds: number;     // Seconds portion of cooking time (0-59)
  timestamp: number;       // When the dish was cooked (milliseconds since epoch)
  department: 'kitchen' | 'bar' | 'snack'; // Which department
  startedAt?: number;      // Timestamp when cooking started (milliseconds since epoch)
  finishedAt?: number;     // Timestamp when cooking finished (milliseconds since epoch)
  waiter?: string;         // Name of waiter/waitress assigned by checker (optional)
  
  // ⭐ NEW FEATURE - Delivery Timing Tracking (Post v732)
  // These fields track waiter delivery performance separately from cooking times
  // POPULATED BY: StaffContext monitoring effect when items are marked as delivered
  // ENABLES: Raw Database page to display delivery analytics alongside cooking analytics
  // UPDATED (29 Nov 2025): Auto-populated when "All Delivered" is pressed via OrderContext.markDelivered()
  deliveryStartTime?: number;    // Timestamp when waiter was assigned (milliseconds since epoch)
  deliveryFinishedTime?: number; // Timestamp when delivery was completed (milliseconds since epoch)
  deliveryElapsedTime?: number;  // Total delivery time in seconds (deliveryFinishedTime - deliveryStartTime)
}

/**
 * MOCK COOKING LOGS DATA
 * 
 * Realistic cooking time data across multiple employees and dishes.
 * Includes variation to demonstrate efficiency classification.
 */
export const initialCookingLogs: CookingLog[] = [
  // Juwita Mayasari - Kitchen (Fast cook)
  {
    id: 'log-1',
    menuName: 'Nasi Goreng',
    cookName: 'Juwita Mayasari',
    timeMinutes: 8,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 7, // 7 days ago
    department: 'kitchen'
  },
  {
    id: 'log-2',
    menuName: 'Ayam Bakar',
    cookName: 'Juwita Mayasari',
    timeMinutes: 15,
    timeSeconds: 20,
    timestamp: Date.now() - 86400000 * 7,
    department: 'kitchen'
  },
  {
    id: 'log-3',
    menuName: 'Nasi Goreng',
    cookName: 'Juwita Mayasari',
    timeMinutes: 7,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 6,
    department: 'kitchen'
  },
  {
    id: 'log-4',
    menuName: 'Rendang',
    cookName: 'Juwita Mayasari',
    timeMinutes: 25,
    timeSeconds: 10,
    timestamp: Date.now() - 86400000 * 6,
    department: 'kitchen'
  },
  {
    id: 'log-5',
    menuName: 'Soto Ayam',
    cookName: 'Juwita Mayasari',
    timeMinutes: 12,
    timeSeconds: 0,
    timestamp: Date.now() - 86400000 * 5,
    department: 'kitchen'
  },

  // Budi Santoso - Kitchen (Average cook)
  {
    id: 'log-6',
    menuName: 'Nasi Goreng',
    cookName: 'Budi Santoso',
    timeMinutes: 10,
    timeSeconds: 15,
    timestamp: Date.now() - 86400000 * 7,
    department: 'kitchen'
  },
  {
    id: 'log-7',
    menuName: 'Ayam Bakar',
    cookName: 'Budi Santoso',
    timeMinutes: 18,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 6,
    department: 'kitchen'
  },
  {
    id: 'log-8',
    menuName: 'Nasi Goreng',
    cookName: 'Budi Santoso',
    timeMinutes: 11,
    timeSeconds: 0,
    timestamp: Date.now() - 86400000 * 5,
    department: 'kitchen'
  },
  {
    id: 'log-9',
    menuName: 'Rendang',
    cookName: 'Budi Santoso',
    timeMinutes: 30,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 4,
    department: 'kitchen'
  },
  {
    id: 'log-10',
    menuName: 'Soto Ayam',
    cookName: 'Budi Santoso',
    timeMinutes: 14,
    timeSeconds: 20,
    timestamp: Date.now() - 86400000 * 3,
    department: 'kitchen'
  },

  // Siti Rahayu - Kitchen (Slow cook)
  {
    id: 'log-11',
    menuName: 'Nasi Goreng',
    cookName: 'Siti Rahayu',
    timeMinutes: 14,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 7,
    department: 'kitchen'
  },
  {
    id: 'log-12',
    menuName: 'Ayam Bakar',
    cookName: 'Siti Rahayu',
    timeMinutes: 22,
    timeSeconds: 15,
    timestamp: Date.now() - 86400000 * 6,
    department: 'kitchen'
  },
  {
    id: 'log-13',
    menuName: 'Nasi Goreng',
    cookName: 'Siti Rahayu',
    timeMinutes: 13,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 5,
    department: 'kitchen'
  },
  {
    id: 'log-14',
    menuName: 'Rendang',
    cookName: 'Siti Rahayu',
    timeMinutes: 35,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 4,
    department: 'kitchen'
  },
  {
    id: 'log-15',
    menuName: 'Mie Goreng',
    cookName: 'Siti Rahayu',
    timeMinutes: 9,
    timeSeconds: 50,
    timestamp: Date.now() - 86400000 * 3,
    department: 'kitchen'
  },

  // Ahmad Fauzi - Bar (Fast bartender)
  {
    id: 'log-16',
    menuName: 'Es Teh Manis',
    cookName: 'Ahmad Fauzi',
    timeMinutes: 2,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 7,
    department: 'bar'
  },
  {
    id: 'log-17',
    menuName: 'Jus Alpukat',
    cookName: 'Ahmad Fauzi',
    timeMinutes: 4,
    timeSeconds: 15,
    timestamp: Date.now() - 86400000 * 6,
    department: 'bar'
  },
  {
    id: 'log-18',
    menuName: 'Es Jeruk',
    cookName: 'Ahmad Fauzi',
    timeMinutes: 2,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 5,
    department: 'bar'
  },
  {
    id: 'log-19',
    menuName: 'Es Teh Manis',
    cookName: 'Ahmad Fauzi',
    timeMinutes: 2,
    timeSeconds: 20,
    timestamp: Date.now() - 86400000 * 4,
    department: 'bar'
  },

  // Dewi Lestari - Bar (Average bartender)
  {
    id: 'log-20',
    menuName: 'Es Teh Manis',
    cookName: 'Dewi Lestari',
    timeMinutes: 3,
    timeSeconds: 10,
    timestamp: Date.now() - 86400000 * 7,
    department: 'bar'
  },
  {
    id: 'log-21',
    menuName: 'Jus Alpukat',
    cookName: 'Dewi Lestari',
    timeMinutes: 5,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 6,
    department: 'bar'
  },
  {
    id: 'log-22',
    menuName: 'Es Jeruk',
    cookName: 'Dewi Lestari',
    timeMinutes: 3,
    timeSeconds: 40,
    timestamp: Date.now() - 86400000 * 5,
    department: 'bar'
  },

  // Rudi Hermawan - Snack (Fast)
  {
    id: 'log-23',
    menuName: 'Tahu Goreng',
    cookName: 'Rudi Hermawan',
    timeMinutes: 5,
    timeSeconds: 20,
    timestamp: Date.now() - 86400000 * 7,
    department: 'snack'
  },
  {
    id: 'log-24',
    menuName: 'Kerupuk',
    cookName: 'Rudi Hermawan',
    timeMinutes: 3,
    timeSeconds: 10,
    timestamp: Date.now() - 86400000 * 6,
    department: 'snack'
  },
  {
    id: 'log-25',
    menuName: 'Tahu Goreng',
    cookName: 'Rudi Hermawan',
    timeMinutes: 5,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 5,
    department: 'snack'
  },

  // Nina Kusuma - Snack (Slow)
  {
    id: 'log-26',
    menuName: 'Tahu Goreng',
    cookName: 'Nina Kusuma',
    timeMinutes: 8,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 7,
    department: 'snack'
  },
  {
    id: 'log-27',
    menuName: 'Kerupuk',
    cookName: 'Nina Kusuma',
    timeMinutes: 5,
    timeSeconds: 20,
    timestamp: Date.now() - 86400000 * 6,
    department: 'snack'
  },

  // More varied data for better analytics
  {
    id: 'log-28',
    menuName: 'Gado-gado',
    cookName: 'Juwita Mayasari',
    timeMinutes: 10,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 4,
    department: 'kitchen'
  },
  {
    id: 'log-29',
    menuName: 'Bakso Spesial',
    cookName: 'Budi Santoso',
    timeMinutes: 12,
    timeSeconds: 15,
    timestamp: Date.now() - 86400000 * 3,
    department: 'kitchen'
  },
  {
    id: 'log-30',
    menuName: 'Sate Ayam',
    cookName: 'Siti Rahayu',
    timeMinutes: 20,
    timeSeconds: 0,
    timestamp: Date.now() - 86400000 * 2,
    department: 'kitchen'
  },
  {
    id: 'log-31',
    menuName: 'Nasi Goreng',
    cookName: 'Juwita Mayasari',
    timeMinutes: 8,
    timeSeconds: 0,
    timestamp: Date.now() - 86400000 * 1,
    department: 'kitchen'
  },
  {
    id: 'log-32',
    menuName: 'Ayam Bakar',
    cookName: 'Budi Santoso',
    timeMinutes: 17,
    timeSeconds: 45,
    timestamp: Date.now() - 86400000 * 1,
    department: 'kitchen'
  },
  {
    id: 'log-33',
    menuName: 'Es Teh Manis',
    cookName: 'Ahmad Fauzi',
    timeMinutes: 2,
    timeSeconds: 15,
    timestamp: Date.now() - 86400000 * 1,
    department: 'bar'
  },
  {
    id: 'log-34',
    menuName: 'Jus Alpukat',
    cookName: 'Dewi Lestari',
    timeMinutes: 5,
    timeSeconds: 0,
    timestamp: Date.now() - 86400000 * 1,
    department: 'bar'
  },
  {
    id: 'log-35',
    menuName: 'Tahu Goreng',
    cookName: 'Rudi Hermawan',
    timeMinutes: 5,
    timeSeconds: 30,
    timestamp: Date.now() - 86400000 * 1,
    department: 'snack'
  },
];
