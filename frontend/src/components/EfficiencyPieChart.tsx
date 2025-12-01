/**
 * EfficiencyPieChart.tsx - Pie chart showing cooking efficiency distribution
 */

import React, { useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface EfficiencyData {
  name: string;
  value: number;
  percentage: string;
}

interface EfficiencyPieChartProps {
  data: EfficiencyData[];
  totalItems: number;
  efficiencyColors: Record<string, string>;
  onTimeCount: number;
  lateCount: number;
}

// Custom tooltip component - memoized outside to prevent recreation
const PieTooltip = React.memo(({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  
  return (
    <div className="bg-[#52236b] p-3 rounded-lg border border-purple-400/30">
      <p className="text-white font-['Poppins',sans-serif] mb-1">
        {payload[0].name}
      </p>
      <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
        Count: {payload[0].value}
      </p>
      <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
        Percentage: {payload[0].payload.percentage}%
      </p>
    </div>
  );
});

PieTooltip.displayName = 'PieTooltip';

const EfficiencyPieChart = React.memo(({ 
  data, 
  totalItems, 
  efficiencyColors,
  onTimeCount,
  lateCount 
}: EfficiencyPieChartProps) => {
  // Memoize the custom label renderer
  const renderCustomLabel = useCallback(({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600 }}
      >
        {`${percentage}%`}
      </text>
    );
  }, []);

  // Memoize percentage calculations
  const onTimePercentage = useMemo(() => 
    totalItems > 0 ? ((onTimeCount / totalItems) * 100).toFixed(1) : '0.0',
    [onTimeCount, totalItems]
  );

  const latePercentage = useMemo(() => 
    totalItems > 0 ? ((lateCount / totalItems) * 100).toFixed(1) : '0.0',
    [lateCount, totalItems]
  );

  return (
    <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-6">
      <h3 className="text-white font-['Poppins',sans-serif] mb-4 text-center">
        Cooking Efficiency Distribution
      </h3>
      <p className="text-white/60 text-sm font-['Poppins',sans-serif] mb-6 text-center">
        Total items cooked: {totalItems}
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={110}
            dataKey="value"
            animationDuration={800}
            animationBegin={0}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={efficiencyColors[entry.name]} />
            ))}
          </Pie>
          <Tooltip content={PieTooltip} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: efficiencyColors[entry.name] }}
            />
            <span className="text-white/80 text-xs font-['Poppins',sans-serif]">
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/60 text-xs font-['Poppins',sans-serif] mb-1">
            On Time or Faster
          </p>
          <p className="text-green-400 font-['Poppins',sans-serif]">
            {onTimePercentage}%
          </p>
          <p className="text-white/60 text-xs font-['Poppins',sans-serif] mt-1">
            {onTimeCount} items
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs font-['Poppins',sans-serif] mb-1">
            Late or Very Late
          </p>
          <p className="text-red-400 font-['Poppins',sans-serif]">
            {latePercentage}%
          </p>
          <p className="text-white/60 text-xs font-['Poppins',sans-serif] mt-1">
            {lateCount} items
          </p>
        </div>
      </div>
    </div>
  );
});

EfficiencyPieChart.displayName = 'EfficiencyPieChart';

export default EfficiencyPieChart;
