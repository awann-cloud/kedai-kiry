/**
 * menuItemEfficiency.ts - Sistem Efisiensi & Klasifikasi Menu Item
 * 
 * SISTEM GABUNGAN:
 * - Threshold klasifikasi efisiensi (formerly efficiency.ts)
 * - Konfigurasi preset menu item (formerly menuItemsConfig.ts)
 * - Menghubungkan cooking logs dengan timing presets
 * - Kustomisasi user disimpan ke localStorage
 * 
 * KLASIFIKASI EFISIENSI:
 * - Sangat Cepat (Very Fast): ≤ 50% dari standar
 * - Cepat (Fast): 50-80% dari standar
 * - Normal: 80-120% dari standar
 * - Lambat (Slow): 120-200% dari standar
 * - Sangat Lambat (Very Slow): ≥ 200% dari standar
 * 
 * SISTEM PRESET:
 * - Very Fast (⚡): ≤ 50% dari waktu standar
 * - Fast (🚀): 50-80% dari waktu standar
 * - Standard (👍): Waktu baseline yang diharapkan (100%)
 * - Slow (🐢): 120-200% dari waktu standar
 * - Extremely Slow (🐌): ≥ 200% dari waktu standar
 * 
 * PENYIMPANAN:
 * - Kustomisasi user disimpan ke localStorage
 * - Menu items yang ter-discover secara dinamis digabung dengan saved configs
 * - Nilai default dihitung dari cooking logs aktual
 */

import { initialCookingLogs } from './cookingLogs';

// ============================================================================
// EFFICIENCY CLASSIFICATION TYPES & CONFIG
// ============================================================================

/**
 * Definisi tipe efficiency level
 */
export type EfficiencyLevel = 
  | 'Sangat Cepat'    // Very Fast
  | 'Cepat'           // Fast
  | 'Normal'          // Normal
  | 'Lambat'          // Slow
  | 'Sangat Lambat';  // Very Slow

/**
 * Konfigurasi efficiency level dengan metadata
 */
interface EfficiencyConfig {
  level: EfficiencyLevel;
  label: string;              // Label English
  labelIndonesian: string;    // Label Indonesia
  color: string;              // Warna untuk charts/visualisasi
  description: string;        // Deskripsi level performa
}

/**
 * Semua efficiency levels dengan metadata
 * Urutan penting - ini menentukan sequence yang ditampilkan di filters dan charts
 */
export const EFFICIENCY_LEVELS: EfficiencyConfig[] = [
  {
    level: 'Sangat Cepat',
    label: 'Very Fast',
    labelIndonesian: 'Sangat Cepat',
    color: '#4ade80',  // Hijau terang
    description: 'Waktu masak ≤ 50% dari rata-rata'
  },
  {
    level: 'Cepat',
    label: 'Fast',
    labelIndonesian: 'Cepat',
    color: '#86efac',  // Hijau muda
    description: 'Waktu masak antara 50% dan 80% dari rata-rata'
  },
  {
    level: 'Normal',
    label: 'Normal',
    labelIndonesian: 'Normal',
    color: '#60a5fa',  // Biru/Cyan
    description: 'Waktu masak antara 80% dan 120% dari rata-rata'
  },
  {
    level: 'Lambat',
    label: 'Slow',
    labelIndonesian: 'Lambat',
    color: '#fb923c',  // Oranye
    description: 'Waktu masak antara 120% dan 200% dari rata-rata'
  },
  {
    level: 'Sangat Lambat',
    label: 'Very Slow',
    labelIndonesian: 'Sangat Lambat',
    color: '#f87171',  // Merah/Pink
    description: 'Waktu masak ≥ 200% dari rata-rata'
  }
];

/**
 * Threshold klasifikasi efisiensi
 * 
 * KUSTOMISASI:
 * Untuk menyesuaikan sensitivitas klasifikasi, modifikasi multiplier ini.
 * Semua nilai dikalikan dengan rata-rata waktu memasak hidangan.
 */
export const EFFICIENCY_THRESHOLDS = {
  sangatCepat: {
    max: 0.5,           // ≤ 50% dari rata-rata = Very Fast
  },
  cepat: {
    min: 0.5,           // > 50% dari rata-rata
    max: 0.8,           // < 80% dari rata-rata = Fast
  },
  normal: {
    min: 0.8,           // ≥ 80% dari rata-rata
    max: 1.2,           // ≤ 120% dari rata-rata = Normal
  },
  lambat: {
    min: 1.2,           // > 120% dari rata-rata
    max: 2.0,           // < 200% dari rata-rata = Slow
  },
  sangatLambat: {
    min: 2.0,           // ≥ 200% dari rata-rata = Very Slow
  }
} as const;

// ============================================================================
// MENU ITEM PRESET TYPES & CONFIG
// ============================================================================

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
 * LOCALSTORAGE KEY
 */
const STORAGE_KEY = 'menuItemsConfig';

// ============================================================================
// EFFICIENCY CLASSIFICATION FUNCTIONS
// ============================================================================

/**
 * Get array of efficiency level names only
 */
export function getEfficiencyLevels(): EfficiencyLevel[] {
  return EFFICIENCY_LEVELS.map(config => config.level);
}

/**
 * Get color for a specific efficiency level
 */
export function getEfficiencyColor(level: EfficiencyLevel): string {
  const config = EFFICIENCY_LEVELS.find(c => c.level === level);
  return config?.color || '#9ca3af'; // Gray fallback
}

/**
 * Get full configuration for a specific efficiency level
 */
export function getEfficiencyConfig(level: EfficiencyLevel): EfficiencyConfig | undefined {
  return EFFICIENCY_LEVELS.find(c => c.level === level);
}

/**
 * Classify cooking time based on average time for the dish
 */
export function classifyEfficiency(cookTime: number, averageTime: number): EfficiencyLevel {
  if (averageTime === 0) return 'Normal'; // Prevent division by zero
  
  const ratio = cookTime / averageTime;
  
  if (ratio <= EFFICIENCY_THRESHOLDS.sangatCepat.max) {
    return 'Sangat Cepat';
  } else if (ratio < EFFICIENCY_THRESHOLDS.cepat.max) {
    return 'Cepat';
  } else if (ratio <= EFFICIENCY_THRESHOLDS.normal.max) {
    return 'Normal';
  } else if (ratio < EFFICIENCY_THRESHOLDS.lambat.max) {
    return 'Lambat';
  } else {
    return 'Sangat Lambat';
  }
}

/**
 * Get percentage of average for display purposes
 */
export function getPercentageOfAverage(cookTime: number, averageTime: number): number {
  if (averageTime === 0) return 100;
  return (cookTime / averageTime) * 100;
}

// ============================================================================
// MENU ITEM PRESET CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate default presets based on a standard time and efficiency thresholds
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

// ============================================================================
// LOCALSTORAGE PERSISTENCE FUNCTIONS
// ============================================================================

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
 * Get all saved configurations as array
 */
export function getAllSavedConfigs(): MenuItemConfig[] {
  return Array.from(loadSavedConfigs().values());
}

// ============================================================================
// CLASSIFICATION & CONVERSION HELPERS
// ============================================================================

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