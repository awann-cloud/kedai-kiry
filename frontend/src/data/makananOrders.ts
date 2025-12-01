/**
 * MenuItem Interface
 * 
 * Represents a single item within an order.
 * Tracks the item's progression through the kitchen workflow:
 * "not-started" → "on-their-way" (being prepared) → "finished" (ready)
 */
export interface MenuItem {
  id: string;                                            // Unique identifier for the menu item (e.g., "item-1", "item-2")
  name: string;                                          // Name of the dish/item
  quantity: number;                                      // Number of portions ordered
  notes: string;                                         // Special instructions or customizations
  status: 'not-started' | 'on-their-way' | 'finished';  // Current workflow status
  staff?: string;                                        // Name of staff member assigned (set when item is started)
  startedTime?: number;                                  // Timestamp when item was started (milliseconds since epoch)
  finishedTime?: number;                                 // Timestamp when item was completed (milliseconds since epoch)
  elapsedTime: number;                                   // Running elapsed time in seconds (updates every second via OrderContext)
  
  // ⭐ NEW FEATURE - Per-Item Waiter Assignment (Post v732)
  // Allows checker to assign waiters to individual items instead of entire receipts
  // WORKFLOW: Checker clicks item name → SelectWaiterPanel → assigns waiter to specific item
  waiter?: string;                                       // Name of waiter/waitress assigned to this specific item (Checker only)
  itemDelivered?: boolean;                               // Whether this specific item has been delivered (Checker only)
  
  // ⭐ NEW FEATURE - Delivery Timing Tracking (Post v732)
  // Tracks waiter delivery performance separately from cooking times
  // AUTO-UPDATED: Timer runs every second in OrderContext, stops when itemDelivered = true
  // UPDATED (29 Nov 2025): Auto-set when "All Delivered" button is pressed via markDelivered()
  deliveryStartTime?: number;                            // Timestamp when waiter was assigned (milliseconds since epoch)
  deliveryFinishedTime?: number;                         // Timestamp when item was delivered (milliseconds since epoch)
  deliveryElapsedTime?: number;                          // Running delivery elapsed time in seconds (updates every second)
}

/**
 * Order Interface
 * 
 * Represents a complete customer order containing one or more menu items.
 * Orders are displayed as receipt cards in the UI and progress through a dual workflow:
 * 
 * DEPARTMENT WORKFLOW (Kitchen/Bar/Snack):
 * 1. Items start as "not-started"
 * 2. Staff clicks START → assigns cook/bartender → item becomes "on-their-way"
 * 3. Staff clicks DONE → item becomes "finished"
 * 4. All items finished → staff clicks FINISHED → order marked completed
 * 
 * CHECKER WORKFLOW (After department completes):
 * 5. Checker sees "Assign" button → assigns waiter/waitress
 * 6. Checker clicks "Delivered" → order delivered to customer
 */
export interface Order {
  id: string;            // Unique identifier for the order
  name: string;          // Customer or location name (e.g., table number, customer name)
  orderId: string;       // Display ID for the order (e.g., "POS-091125-38")
  priority: string;      // Order priority level ("NORMAL" or "PRIORITAS" - priority orders shown first)
  items: MenuItem[];     // Array of menu items in this order
  frozenTime?: number;   // Frozen time when order is marked as completed (seconds) - stops timer
  completed?: boolean;   // Whether the order has been marked as finished by department
  assignedWaiter?: string; // Name of waiter/waitress assigned by checker
  waiter?: string;       // Alias for assignedWaiter (same purpose)
  delivered?: boolean;   // Whether the order has been delivered to customer (final step)
  deliveredTime?: number; // Timestamp when order was delivered (milliseconds since epoch)
}

/**
 * INITIAL KITCHEN/MAKANAN ORDERS DATA
 * 
 * Template data for kitchen orders loaded at app startup.
 * This data is read ONCE and then stored in OrderContext as live state.
 * 
 * IMPORTANT: 
 * - This is READ-ONLY template data
 * - The actual LIVE data lives in /contexts/OrderContext.tsx
 * - All updates happen in OrderContext and sync across all pages
 * - Changes to this file require app refresh to take effect
 * 
 * IN PRODUCTION:
 * - Replace with API calls to MySQL database
 * - Fetch fresh data on page load
 * - Use WebSockets for real-time updates
 * 
 * UI DISPLAY:
 * - Orders are sorted with PRIORITAS first, then NORMAL (FIFO)
 * - Each order shows as a receipt card with all items grouped by status
 */
export const initialOrdersData: Order[] = [
  {
    "id": "1",
    "name": "Kedai Kiry",
    "orderId": "POS-091125-38",
    "priority": "NORMAL",
    "items": [
      {
        "id": "1-1",
        "name": "Ayam 3 Rasa Kiry",
        "quantity": 1,
        "notes": "",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "1-2",
        "name": "Ayam Garang Asam",
        "quantity": 1,
        "notes": "",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "2",
    "name": "Nama Order",
    "orderId": "POS-091125-39",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "2-1",
        "name": "Nasi Goreng",
        "quantity": 2,
        "notes": "Extra pedas",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "2-2",
        "name": "Ayam Bakar",
        "quantity": 1,
        "notes": "Tanpa sambal",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "2-3",
        "name": "Es Teh Manis",
        "quantity": 3,
        "notes": "Gula sedikit",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "2-4",
        "name": "Soto Ayam",
        "quantity": 2,
        "notes": "Pakai jeruk nipis",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "3",
    "name": "Nama Order",
    "orderId": "POS-091125-40",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "3-1",
        "name": "Mie Goreng",
        "quantity": 2,
        "notes": "Extra sayur",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "3-2",
        "name": "Jus Alpukat",
        "quantity": 1,
        "notes": "Tanpa gula",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "4",
    "name": "Nama Order",
    "orderId": "POS-091125-41",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "4-1",
        "name": "Gado-gado",
        "quantity": 1,
        "notes": "Bumbu kacang terpisah",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "5",
    "name": "Nama Order",
    "orderId": "POS-091125-42",
    "priority": "NORMAL",
    "items": [
      {
        "id": "5-1",
        "name": "Rendang",
        "quantity": 3,
        "notes": "Extra bumbu",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "5-2",
        "name": "Nasi Putih",
        "quantity": 3,
        "notes": "Panas",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "5-3",
        "name": "Kerupuk",
        "quantity": 3,
        "notes": "Ekstra banyak",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "6",
    "name": "Nama Order",
    "orderId": "POS-091125-43",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "6-1",
        "name": "Bakso Spesial",
        "quantity": 2,
        "notes": "Kuah panas, mie tambah",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "6-2",
        "name": "Nasi Goreng Kambing Spesial Premium Extra Pedas",
        "quantity": 1,
        "notes": "Extra bawang goreng",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "6-3",
        "name": "Es Jeruk",
        "quantity": 2,
        "notes": "Tanpa es",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "6-4",
        "name": "Tahu Goreng",
        "quantity": 1,
        "notes": "Crispy",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "7",
    "name": "Nama Order",
    "orderId": "POS-091125-44",
    "priority": "NORMAL",
    "items": [
      {
        "id": "7-1",
        "name": "Sate Ayam",
        "quantity": 4,
        "notes": "Bumbu kacang extra",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "7-2",
        "name": "Lontong",
        "quantity": 4,
        "notes": "Hangat",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "8",
    "name": "Nama Order",
    "orderId": "POS-091125-45",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "8-1",
        "name": "Nasi Uduk",
        "quantity": 1,
        "notes": "Komplit",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "8-2",
        "name": "Ayam Goreng",
        "quantity": 1,
        "notes": "Krispi",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  }
];
