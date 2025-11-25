/**
 * PIN CODES DATABASE
 * 
 * Centralized PIN authentication configuration for all department entry pages.
 * Each department has its own PIN code for access control.
 * 
 * SECURITY NOTE:
 * - In a production environment, PINs should be hashed and stored securely
 * - This is a simplified demonstration system for a local kitchen management app
 * - For real deployment, implement proper authentication with backend validation
 * 
 * USAGE:
 * Import and use getPinForDepartment() function in PIN entry pages:
 * - PinEntryMakanan.tsx (Kitchen)
 * - PinEntryBar.tsx (Bar)
 * - PinEntrySnack.tsx (Snack)
 * - PinEntryChecker.tsx (Checker)
 */

/**
 * Department type definition
 */
export type Department = 'kitchen' | 'bar' | 'snack' | 'checker';

/**
 * PIN configuration interface
 */
interface PinConfig {
  department: Department;
  pin: string;
  description: string;
}

/**
 * PIN codes for each department
 * 
 * CUSTOMIZATION:
 * To change a department's PIN, simply update the pin value below.
 * All PIN entry pages will automatically use the new PIN.
 */
const PIN_CODES: PinConfig[] = [
  {
    department: 'kitchen',
    pin: '1111',
    description: 'Kitchen/Makanan department PIN'
  },
  {
    department: 'bar',
    pin: '1111',
    description: 'Bar department PIN'
  },
  {
    department: 'snack',
    pin: '1111',
    description: 'Snack department PIN'
  },
  {
    department: 'checker',
    pin: '1111',
    description: 'Checker section PIN'
  }
];

/**
 * Get PIN code for a specific department
 * 
 * @param department - The department to get PIN for
 * @returns The PIN code as a string
 * 
 * @example
 * const correctPin = getPinForDepartment('kitchen'); // Returns '1111'
 */
export function getPinForDepartment(department: Department): string {
  const config = PIN_CODES.find(config => config.department === department);
  
  if (!config) {
    console.error(`PIN not found for department: ${department}`);
    return '0000'; // Fallback PIN
  }
  
  return config.pin;
}

/**
 * Validate a PIN for a specific department
 * 
 * @param department - The department to validate PIN for
 * @param enteredPin - The PIN entered by the user
 * @returns true if PIN is correct, false otherwise
 * 
 * @example
 * const isValid = validatePin('kitchen', '1111'); // Returns true
 */
export function validatePin(department: Department, enteredPin: string): boolean {
  const correctPin = getPinForDepartment(department);
  return enteredPin === correctPin;
}

/**
 * Get all department PINs (for admin/configuration purposes)
 * 
 * @returns Array of all PIN configurations
 */
export function getAllPinConfigs(): PinConfig[] {
  return [...PIN_CODES];
}
