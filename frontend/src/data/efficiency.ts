/**
 * EFFICIENCY CLASSIFICATION CONFIGURATION
 * 
 * Centralized configuration for cooking efficiency classification system.
 * Defines efficiency levels and the thresholds used to classify cooking times.
 * 
 * CLASSIFICATION ALGORITHM:
 * 1. Convert cooking time to seconds: (minutes × 60) + seconds
 * 2. Group logs by dish name
 * 3. Calculate average time per dish
 * 4. Compare individual cook time to dish average using thresholds below
 * 
 * USAGE:
 * - StaffContext.tsx: Uses thresholds for efficiency classification
 * - RawDatabase.tsx: Uses efficiency levels for display and filtering
 * - EfficiencyChart.tsx: Uses levels for chart visualization
 * - Admin dashboard: Uses for analytics and reporting
 */

/**
 * Efficiency level type definition
 * Matches the EfficiencyLevel type in StaffContext.tsx
 */
export type EfficiencyLevel = 
  | 'Sangat Cepat'    // Very Fast
  | 'Cepat'           // Fast
  | 'Normal'          // Normal
  | 'Lambat'          // Slow
  | 'Sangat Lambat';  // Very Slow

/**
 * Efficiency level configuration with metadata
 */
interface EfficiencyConfig {
  level: EfficiencyLevel;
  label: string;              // English label
  labelIndonesian: string;    // Indonesian label
  color: string;              // Color for charts/visualization
  description: string;        // Description of performance level
}

/**
 * All efficiency levels with metadata
 * Order matters - this defines the sequence shown in filters and charts
 */
export const EFFICIENCY_LEVELS: EfficiencyConfig[] = [
  {
    level: 'Sangat Cepat',
    label: 'Very Fast',
    labelIndonesian: 'Sangat Cepat',
    color: '#4ade80',  // Bright green
    description: 'Cook time ≤ 50% of average'
  },
  {
    level: 'Cepat',
    label: 'Fast',
    labelIndonesian: 'Cepat',
    color: '#86efac',  // Light green
    description: 'Cook time between 50% and 80% of average'
  },
  {
    level: 'Normal',
    label: 'Normal',
    labelIndonesian: 'Normal',
    color: '#60a5fa',  // Blue/Cyan
    description: 'Cook time between 80% and 120% of average'
  },
  {
    level: 'Lambat',
    label: 'Slow',
    labelIndonesian: 'Lambat',
    color: '#fb923c',  // Orange
    description: 'Cook time between 120% and 200% of average'
  },
  {
    level: 'Sangat Lambat',
    label: 'Very Slow',
    labelIndonesian: 'Sangat Lambat',
    color: '#f87171',  // Red/Pink
    description: 'Cook time ≥ 200% of average'
  }
];

/**
 * Efficiency classification thresholds
 * 
 * CUSTOMIZATION:
 * To adjust classification sensitivity, modify these multipliers.
 * All values are multiplied by the dish's average cooking time.
 * 
 * Example: If average time for "Nasi Goreng" is 300 seconds:
 * - Sangat Cepat: ≤ 150 seconds (0.5 × 300)
 * - Cepat: 151-239 seconds (0.5-0.8 × 300)
 * - Normal: 240-359 seconds (0.8-1.2 × 300)
 * - Lambat: 360-599 seconds (1.2-2.0 × 300)
 * - Sangat Lambat: ≥ 600 seconds (2.0 × 300)
 */
export const EFFICIENCY_THRESHOLDS = {
  sangatCepat: {
    max: 0.5,           // ≤ 50% of average = Very Fast
  },
  cepat: {
    min: 0.5,           // > 50% of average
    max: 0.8,           // < 80% of average = Fast
  },
  normal: {
    min: 0.8,           // ≥ 80% of average
    max: 1.2,           // ≤ 120% of average = Normal
  },
  lambat: {
    min: 1.2,           // > 120% of average
    max: 2.0,           // < 200% of average = Slow
  },
  sangatLambat: {
    min: 2.0,           // ≥ 200% of average = Very Slow
  }
} as const;

/**
 * Get array of efficiency level names only
 * Used for filter dropdowns and iteration
 * 
 * @returns Array of efficiency level strings
 * 
 * @example
 * const levels = getEfficiencyLevels();
 * // Returns: ['Sangat Cepat', 'Cepat', 'Normal', 'Lambat', 'Sangat Lambat']
 */
export function getEfficiencyLevels(): EfficiencyLevel[] {
  return EFFICIENCY_LEVELS.map(config => config.level);
}

/**
 * Get color for a specific efficiency level
 * 
 * @param level - The efficiency level
 * @returns Hex color code for the level
 * 
 * @example
 * const color = getEfficiencyColor('Sangat Cepat'); // Returns '#4ade80'
 */
export function getEfficiencyColor(level: EfficiencyLevel): string {
  const config = EFFICIENCY_LEVELS.find(c => c.level === level);
  return config?.color || '#9ca3af'; // Gray fallback
}

/**
 * Get full configuration for a specific efficiency level
 * 
 * @param level - The efficiency level
 * @returns Full configuration object or undefined
 * 
 * @example
 * const config = getEfficiencyConfig('Normal');
 * // Returns: { level: 'Normal', label: 'Normal', color: '#60a5fa', ... }
 */
export function getEfficiencyConfig(level: EfficiencyLevel): EfficiencyConfig | undefined {
  return EFFICIENCY_LEVELS.find(c => c.level === level);
}

/**
 * Classify cooking time based on average time for the dish
 * 
 * @param cookTime - Individual cook time in seconds
 * @param averageTime - Average cook time for this dish in seconds
 * @returns Efficiency level classification
 * 
 * @example
 * classifyEfficiency(150, 300); // Returns 'Sangat Cepat' (50% of average)
 * classifyEfficiency(240, 300); // Returns 'Normal' (80% of average)
 * classifyEfficiency(700, 300); // Returns 'Sangat Lambat' (233% of average)
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
 * 
 * @param cookTime - Individual cook time in seconds
 * @param averageTime - Average cook time for this dish in seconds
 * @returns Percentage as a number (e.g., 150 for 150%)
 * 
 * @example
 * getPercentageOfAverage(450, 300); // Returns 150
 */
export function getPercentageOfAverage(cookTime: number, averageTime: number): number {
  if (averageTime === 0) return 100;
  return (cookTime / averageTime) * 100;
}
