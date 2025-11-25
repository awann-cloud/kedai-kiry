/**
 * menuItemsConfig.ts - Menu Item Preset Configuration Storage
 * 
 * Stores user customizations for menu item timing presets.
 * Uses EFFICIENCY_THRESHOLDS from efficiency.ts as the base system.
 * 
 * PRESET SYSTEM:
 * - Very Fast (⚡): ≤ 50% of standard time
 * - Fast (🚀): 50-80% of standard time
 * - Standard (👍): The baseline expected time (100%)
 * - Slow (🐢): 120-200% of standard time
 * - Extremely Slow (🐌): ≥ 200% of standard time
 * 
 * STORAGE:
 * - User customizations saved to localStorage
 * - Dynamically discovered menu items merged with saved configs
 * - Default values calculated from EFFICIENCY_THRESHOLDS
 * 
 * INTEGRATION:
 * - Connected to efficiency.ts classification system
 * - Used by MenuManagement.tsx for configuration UI
 * - Feeds into cooking analytics and performance tracking
 */

import { EFFICIENCY_THRESHOLDS } from './efficiency';
import { initialCookingLogs } from './cookingLogs';

export interface TimePreset {
  name: 'very-fast' | 'fast' | 'standard' | 'slow' | 'extremely-slow';
  label: string;
  value: number; // in minutes or seconds
  unit: 'sec' | 'min';
}

export interface MenuItemConfig {
  name: string;
  department: 'kitchen' | 'bar' | 'snack';
  presets: TimePreset[];
  dataSource?: {
    sampleCount: number;
    averageSeconds: number;
  };
}

/**
 * Calculate default presets based on a standard time and efficiency thresholds
 * 
 * @param standardTimeMinutes - The expected standard cooking time in minutes
 * @returns Array of 5 presets calculated from efficiency thresholds
 */
export function calculateDefaultPresets(standardTimeMinutes: number): TimePreset[] {
  const standardSeconds = standardTimeMinutes * 60;

  // Calculate times based on EFFICIENCY_THRESHOLDS
  const veryFastSeconds = standardSeconds * EFFICIENCY_THRESHOLDS.sangatCepat.max; // 50%
  const fastSeconds = standardSeconds * ((EFFICIENCY_THRESHOLDS.cepat.min + EFFICIENCY_THRESHOLDS.cepat.max) / 2); // 65% (average of 50-80%)
  const slowSeconds = standardSeconds * ((EFFICIENCY_THRESHOLDS.lambat.min + EFFICIENCY_THRESHOLDS.lambat.max) / 2); // 160% (average of 120-200%)
  const extremelySlowSeconds = standardSeconds * EFFICIENCY_THRESHOLDS.sangatLambat.min; // 200%

  return [
    {
      name: 'very-fast',
      label: '⚡ Very Fast',
      value: Math.round(veryFastSeconds / 60 * 10) / 10, // Convert to minutes, round to 1 decimal
      unit: 'min'
    },
    {
      name: 'fast',
      label: '🚀 Fast',
      value: Math.round(fastSeconds / 60 * 10) / 10,
      unit: 'min'
    },
    {
      name: 'standard',
      label: '👍 Standard',
      value: standardTimeMinutes,
      unit: 'min'
    },
    {
      name: 'slow',
      label: '🐢 Slow',
      value: Math.round(slowSeconds / 60 * 10) / 10,
      unit: 'min'
    },
    {
      name: 'extremely-slow',
      label: '🐌 Extremely Slow',
      value: Math.round(extremelySlowSeconds / 60 * 10) / 10,
      unit: 'min'
    }
  ];
}

/**
 * Get default standard time based on department
 * These are reasonable baseline estimates
 */
export function getDefaultStandardTime(department: 'kitchen' | 'bar' | 'snack'): number {
  switch (department) {
    case 'kitchen':
      return 15; // 15 minutes for main dishes
    case 'bar':
      return 3; // 3 minutes for drinks
    case 'snack':
      return 8; // 8 minutes for snacks/appetizers
  }
}

/**
 * Calculate actual average cooking time from cooking logs
 * Returns null if no data available for this item
 */
export function calculateAverageFromLogs(menuName: string): { averageMinutes: number; sampleCount: number } | null {
  const logsForItem = initialCookingLogs.filter(log => log.menuName === menuName);
  
  if (logsForItem.length === 0) {
    return null;
  }

  // Convert all times to seconds and calculate average
  const totalSeconds = logsForItem.reduce((sum, log) => {
    return sum + (log.timeMinutes * 60) + log.timeSeconds;
  }, 0);

  const averageSeconds = totalSeconds / logsForItem.length;
  const averageMinutes = Math.round(averageSeconds / 60 * 10) / 10; // Round to 1 decimal

  return {
    averageMinutes,
    sampleCount: logsForItem.length
  };
}

/**
 * Create default config for a menu item
 * Uses actual cooking log data if available, otherwise falls back to department defaults
 */
export function createDefaultConfig(name: string, department: 'kitchen' | 'bar' | 'snack'): MenuItemConfig {
  // Try to get real data from cooking logs
  const logData = calculateAverageFromLogs(name);
  
  let standardTime: number;
  let dataSource: { sampleCount: number; averageSeconds: number } | undefined;

  if (logData && logData.sampleCount >= 1) {
    // Use actual data from cooking logs
    standardTime = logData.averageMinutes;
    dataSource = {
      sampleCount: logData.sampleCount,
      averageSeconds: logData.averageMinutes * 60
    };
  } else {
    // Fall back to department defaults
    standardTime = getDefaultStandardTime(department);
  }

  return {
    name,
    department,
    presets: calculateDefaultPresets(standardTime),
    dataSource
  };
}

/**
 * LOCALSTORAGE KEY
 */
const STORAGE_KEY = 'menuItemsConfig';

/**
 * Load saved configurations from localStorage
 */
export function loadSavedConfigs(): Map<string, MenuItemConfig> {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return new Map();

  try {
    const configs: MenuItemConfig[] = JSON.parse(saved);
    const map = new Map<string, MenuItemConfig>();
    configs.forEach(config => map.set(config.name, config));
    return map;
  } catch (e) {
    console.error('Failed to load menu configs:', e);
    return new Map();
  }
}

/**
 * Save configurations to localStorage
 */
export function saveConfigs(configs: Map<string, MenuItemConfig>): void {
  const array = Array.from(configs.values());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
}

/**
 * Get config for a specific menu item
 * Returns saved config if exists, otherwise creates default
 */
export function getConfigForItem(name: string, department: 'kitchen' | 'bar' | 'snack'): MenuItemConfig {
  const saved = loadSavedConfigs();
  if (saved.has(name)) {
    return saved.get(name)!;
  }
  return createDefaultConfig(name, department);
}

/**
 * Update config for a menu item
 */
export function updateConfigForItem(config: MenuItemConfig): void {
  const saved = loadSavedConfigs();
  saved.set(config.name, config);
  saveConfigs(saved);
}

/**
 * Delete config for a menu item (revert to default)
 */
export function deleteConfigForItem(name: string): void {
  const saved = loadSavedConfigs();
  saved.delete(name);
  saveConfigs(saved);
}

/**
 * Reset all configurations to defaults
 */
export function resetAllConfigs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Helper function to convert preset time to seconds
 */
export function presetToSeconds(preset: TimePreset): number {
  if (preset.unit === 'sec') {
    return preset.value;
  }
  return preset.value * 60; // convert minutes to seconds
}

/**
 * Get standard time for a menu item (in seconds)
 */
export function getStandardTimeForItem(config: MenuItemConfig): number {
  const standardPreset = config.presets.find(p => p.name === 'standard');
  if (!standardPreset) return 600; // Default 10 minutes if not found
  return presetToSeconds(standardPreset);
}

/**
 * Classify efficiency based on menu item config
 * Compares actual cooking time to the preset ranges
 */
export function classifyByPresets(
  cookTimeSeconds: number,
  config: MenuItemConfig
): 'very-fast' | 'fast' | 'standard' | 'slow' | 'extremely-slow' {
  const standardTime = getStandardTimeForItem(config);

  // Calculate thresholds based on EFFICIENCY_THRESHOLDS
  const veryFastMax = standardTime * EFFICIENCY_THRESHOLDS.sangatCepat.max;
  const fastMax = standardTime * EFFICIENCY_THRESHOLDS.cepat.max;
  const normalMax = standardTime * EFFICIENCY_THRESHOLDS.normal.max;
  const slowMax = standardTime * EFFICIENCY_THRESHOLDS.lambat.max;

  if (cookTimeSeconds <= veryFastMax) return 'very-fast';
  if (cookTimeSeconds <= fastMax) return 'fast';
  if (cookTimeSeconds <= normalMax) return 'standard';
  if (cookTimeSeconds <= slowMax) return 'slow';
  return 'extremely-slow';
}

/**
 * Get efficiency percentage compared to standard
 */
export function getEfficiencyPercentage(cookTimeSeconds: number, config: MenuItemConfig): number {
  const standardTime = getStandardTimeForItem(config);
  if (standardTime === 0) return 100;
  return Math.round((cookTimeSeconds / standardTime) * 100);
}