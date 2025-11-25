/**
 * EfficiencyChart.tsx - Cooking Efficiency Visualization
 * 
 * Displays cooking efficiency data using Recharts.
 * Shows horizontal bar chart with efficiency classification.
 * 
 * COLORS:
 * - Sangat Cepat (Very Fast): Bright Green
 * - Cepat (Fast): Light Green
 * - Normal: Blue/Cyan
 * - Lambat (Slow): Orange
 * - Sangat Lambat (Very Slow): Red/Pink
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import type { ProcessedLog } from '../contexts/StaffContext';

interface EfficiencyChartProps {
  logs: ProcessedLog[];
}

// Color mapping for efficiency levels
const EFFICIENCY_COLORS: Record<string, string> = {
  'Sangat Cepat': '#10b981',  // Bright green
  'Cepat': '#34d399',         // Light green
  'Normal': '#3b82f6',        // Blue
  'Lambat': '#f59e0b',        // Orange
  'Sangat Lambat': '#ef4444'  // Red
};

export default function EfficiencyChart({ logs }: EfficiencyChartProps) {
  // Prepare data for chart
  // Group by employee and calculate stats
  const employeeStats = new Map<string, {
    name: string;
    totalSeconds: number;
    count: number;
    efficiency: Record<string, number>;
  }>();

  logs.forEach(log => {
    if (!employeeStats.has(log.cookName)) {
      employeeStats.set(log.cookName, {
        name: log.cookName,
        totalSeconds: 0,
        count: 0,
        efficiency: {
          'Sangat Cepat': 0,
          'Cepat': 0,
          'Normal': 0,
          'Lambat': 0,
          'Sangat Lambat': 0
        }
      });
    }

    const stats = employeeStats.get(log.cookName)!;
    stats.totalSeconds += log.totalSeconds;
    stats.count += 1;
    stats.efficiency[log.efficiency] += 1;
  });

  // Convert to chart data format
  const chartData = Array.from(employeeStats.values()).map(stats => ({
    name: stats.name,
    avgTime: Math.round(stats.totalSeconds / stats.count),
    sangatCepat: stats.efficiency['Sangat Cepat'],
    cepat: stats.efficiency['Cepat'],
    normal: stats.efficiency['Normal'],
    lambat: stats.efficiency['Lambat'],
    sangatLambat: stats.efficiency['Sangat Lambat']
  }));

  // Sort by average time (fastest first)
  chartData.sort((a, b) => a.avgTime - b.avgTime);

  if (chartData.length === 0) {
    return (
      <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-8 text-center">
        <p className="text-white/60 font-['Poppins',sans-serif]">
          No data available for the selected filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-6">
      <h3 className="text-white font-['Poppins',sans-serif] mb-4">
        Employee Cooking Efficiency Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" stroke="#fff" />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#fff"
            style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#52236b',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              fontFamily: 'Poppins, sans-serif'
            }}
          />
          <Legend 
            wrapperStyle={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px'
            }}
          />
          
          <Bar dataKey="sangatCepat" name="Sangat Cepat" stackId="a" fill={EFFICIENCY_COLORS['Sangat Cepat']} />
          <Bar dataKey="cepat" name="Cepat" stackId="a" fill={EFFICIENCY_COLORS['Cepat']} />
          <Bar dataKey="normal" name="Normal" stackId="a" fill={EFFICIENCY_COLORS['Normal']} />
          <Bar dataKey="lambat" name="Lambat" stackId="a" fill={EFFICIENCY_COLORS['Lambat']} />
          <Bar dataKey="sangatLambat" name="Sangat Lambat" stackId="a" fill={EFFICIENCY_COLORS['Sangat Lambat']} />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(EFFICIENCY_COLORS).map(([level, color]) => {
          const count = chartData.reduce((sum, data) => {
            const key = level.toLowerCase().replace(' ', '');
            const camelKey = key === 'sangatcepat' ? 'sangatCepat' : 
                           key === 'cepat' ? 'cepat' :
                           key === 'normal' ? 'normal' :
                           key === 'lambat' ? 'lambat' : 'sangatLambat';
            return sum + (data[camelKey as keyof typeof data] as number || 0);
          }, 0);

          return (
            <div key={level} className="bg-[#52236b] rounded-lg p-3 text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-white/80 text-sm font-['Poppins',sans-serif] mb-1">
                {level}
              </p>
              <p className="text-white font-['Poppins',sans-serif]">
                {count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
