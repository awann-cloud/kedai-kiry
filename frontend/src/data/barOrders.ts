/**
 * INITIAL BAR ORDERS DATA
 * 
 * Template data for bar/beverage orders loaded at app startup.
 * This data is read ONCE and then stored in OrderContext as live state.
 * 
 * IMPORTANT: 
 * - This is READ-ONLY template data
 * - The actual LIVE data lives in /contexts/OrderContext.tsx
 * - All updates happen in OrderContext and sync across all pages
 * - Changes to this file require app refresh to take effect
 * 
 * WORKFLOW:
 * - Bar department prepares drinks (START → DONE → FINISHED)
 * - Checker section assigns waiter and marks delivered
 * - All changes sync across OrdersBar, CheckerOrdersBar, and CheckerOrdersAll
 */

import { Order } from './orders';

export const initialBarOrdersData: Order[] = [
  {
    "id": "b1",
    "name": "Table 5",
    "orderId": "BAR-091125-101",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "b1-1",
        "name": "Mojito",
        "quantity": 2,
        "notes": "Extra mint",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b1-2",
        "name": "Margarita",
        "quantity": 1,
        "notes": "Frozen, no salt",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "b2",
    "name": "Table 12",
    "orderId": "BAR-091125-102",
    "priority": "NORMAL",
    "items": [
      {
        "id": "b2-1",
        "name": "Orange Juice",
        "quantity": 3,
        "notes": "Fresh squeezed",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b2-2",
        "name": "Iced Coffee",
        "quantity": 2,
        "notes": "No sugar",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "b3",
    "name": "VIP Room",
    "orderId": "BAR-091125-103",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "b3-1",
        "name": "Whiskey Sour",
        "quantity": 1,
        "notes": "Premium whiskey",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b3-2",
        "name": "Old Fashioned",
        "quantity": 2,
        "notes": "Extra cherry",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b3-3",
        "name": "Cosmopolitan",
        "quantity": 1,
        "notes": "",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "b4",
    "name": "Bar Counter",
    "orderId": "BAR-091125-104",
    "priority": "NORMAL",
    "items": [
      {
        "id": "b4-1",
        "name": "Beer",
        "quantity": 4,
        "notes": "Cold",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b4-2",
        "name": "Peanuts",
        "quantity": 2,
        "notes": "",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  },
  {
    "id": "b5",
    "name": "Table 8",
    "orderId": "BAR-091125-105",
    "priority": "PRIORITAS",
    "items": [
      {
        "id": "b5-1",
        "name": "Piña Colada",
        "quantity": 2,
        "notes": "Extra pineapple",
        "status": "not-started",
        "elapsedTime": 0
      },
      {
        "id": "b5-2",
        "name": "Daiquiri",
        "quantity": 1,
        "notes": "Strawberry",
        "status": "not-started",
        "elapsedTime": 0
      }
    ]
  }
];