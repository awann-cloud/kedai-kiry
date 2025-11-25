/**
 * INITIAL SNACK ORDERS DATA
 * 
 * Template data for snack orders loaded at app startup.
 * This data is read ONCE and then stored in OrderContext as live state.
 * 
 * IMPORTANT: 
 * - This is READ-ONLY template data
 * - The actual LIVE data lives in /contexts/OrderContext.tsx
 * - All updates happen in OrderContext and sync across all pages
 * - Changes to this file require app refresh to take effect
 * 
 * WORKFLOW:
 * - Snack department prepares items (START → DONE → FINISHED)
 * - Checker section assigns waiter and marks delivered
 * - All changes sync across OrdersSnack, CheckerOrdersSnacktsx, and CheckerOrdersAll
 */

import { Order } from './orders';

export const initialSnackOrdersData: Order[] = [
  {
    "id": "s1",
    "name": "Table 3",
    "orderId": "SNK-091125-201",
    "priority": "NORMAL",
    "items": [
      {
        "id": "s1-1",
        "name": "French Fries",
        "quantity": 2,
        "notes": "Extra crispy",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s1-2",
        "name": "Onion Rings",
        "quantity": 1,
        "notes": "",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "s2",
    "name": "Table 7",
    "orderId": "SNK-091125-202",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "s2-1",
        "name": "Chicken Wings",
        "quantity": 3,
        "notes": "BBQ sauce",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s2-2",
        "name": "Mozzarella Sticks",
        "quantity": 2,
        "notes": "Marinara sauce",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "s3",
    "name": "Lounge Area",
    "orderId": "SNK-091125-203",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "s3-1",
        "name": "Nachos Supreme",
        "quantity": 1,
        "notes": "Extra cheese, jalapeños on the side",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s3-2",
        "name": "Potato Wedges",
        "quantity": 2,
        "notes": "Sour cream dip",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "s4",
    "name": "Table 15",
    "orderId": "SNK-091125-204",
    "priority": "NORMAL",
    "items": [
      {
        "id": "s4-1",
        "name": "Spring Rolls",
        "quantity": 4,
        "notes": "Vegetarian",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s4-2",
        "name": "Samosas",
        "quantity": 3,
        "notes": "Spicy",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "s5",
    "name": "Table 9",
    "orderId": "SNK-091125-205",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "s5-1",
        "name": "Chips and Salsa",
        "quantity": 2,
        "notes": "Medium salsa",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s5-2",
        "name": "Guacamole and Chips",
        "quantity": 1,
        "notes": "Fresh avocado",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "s5-3",
        "name": "Quesadilla",
        "quantity": 1,
        "notes": "Chicken, no peppers",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "s6",
    "name": "Table 11",
    "orderId": "SNK-091125-206",
    "priority": "NORMAL",
    "items": [
      {
        "id": "s6-1",
        "name": "Popcorn Chicken",
        "quantity": 3,
        "notes": "Honey mustard",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  }
];