/**
 * MenuChart.tsx - Visualization Component for Menu Performance
 * 
 * Displays efficiency distribution in both pie and bar chart formats.
 * Uses Recharts library for visualization.
 */

import React, { useMemo } from 'react';
import EfficiencyPieChart from './EfficiencyPieChart';
import EfficiencyBarChart from './EfficiencyBarChart';

interface MenuStat {
  menuName: string;
  department: string;
  totalOrders: number;
  avgTime: number;
  fastestTime: number;
  slowestTime: number;
  efficiencyDistribution: Record<string, number>;
}

interface MenuChartProps {
  menuStats: MenuStat[];
}

// Efficiency colors - defined once at module level
const EFFICIENCY_COLORS: Record<string, string> = {
  'Sangat Cepat': '#22C55E',  // Green
  'Cepat': '#86EFAC',         // Light green
  'Normal': '#3B82F6',        // Blue
  'Lambat': '#FB923C',        // Orange
  'Sangat Lambat': '#EF4444'  // Red
};

export default function MenuChart({ menuStats }: MenuChartProps) {
  // Calculate total efficiency distribution across all menu items
  const efficiencyData = useMemo(() => {
    const totalEfficiency = {
      'Sangat Cepat': 0,
      'Cepat': 0,
      'Normal': 0,
      'Lambat': 0,
      'Sangat Lambat': 0
    };

    menuStats.forEach(stat => {
      Object.entries(stat.efficiencyDistribution).forEach(([key, value]) => {
        totalEfficiency[key as keyof typeof totalEfficiency] += value;
      });
    });

    const totalItems = Object.values(totalEfficiency).reduce((sum, val) => sum + val, 0);

    // Prepare data for charts - show ALL categories with data (not filtered, will show all 5)
    const chartData = Object.entries(totalEfficiency)
      .map(([name, value]) => ({
        name,
        value,
        percentage: totalItems > 0 ? ((value / totalItems) * 100).toFixed(1) : '0.0'
      }))
      .filter(item => item.value > 0); // Only show categories with data

    const onTimeCount = totalEfficiency['Sangat Cepat'] + totalEfficiency['Cepat'] + totalEfficiency['Normal'];
    const lateCount = totalEfficiency['Lambat'] + totalEfficiency['Sangat Lambat'];

    return {
      chartData,
      totalItems,
      onTimeCount,
      lateCount
    };
  }, [menuStats]);

  if (menuStats.length === 0 || efficiencyData.totalItems === 0) {
    return (
      <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-8 text-center">
        <p className="text-white/60 font-['Poppins',sans-serif]">
          No menu data available for the selected filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Charts Grid: Pie Chart on Left, Bar Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Efficiency Distribution Pie Chart */}
        <EfficiencyPieChart 
          data={efficiencyData.chartData}
          totalItems={efficiencyData.totalItems}
          efficiencyColors={EFFICIENCY_COLORS}
          onTimeCount={efficiencyData.onTimeCount}
          lateCount={efficiencyData.lateCount}
        />

        {/* Right: Efficiency Distribution Bar Chart */}
        <EfficiencyBarChart 
          data={efficiencyData.chartData}
          totalItems={efficiencyData.totalItems}
          efficiencyColors={EFFICIENCY_COLORS}
          onTimeCount={efficiencyData.onTimeCount}
          lateCount={efficiencyData.lateCount}
        />
      </div>
    </div>
  );
}
