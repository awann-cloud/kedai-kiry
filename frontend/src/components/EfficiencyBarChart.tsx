/**
 * EfficiencyBarChart.tsx - Bar chart showing cooking efficiency distribution
 */

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface EfficiencyData {
  name: string;
  value: number;
  percentage: string;
}

interface EfficiencyBarChartProps {
  data: EfficiencyData[];
  totalItems: number;
  efficiencyColors: Record<string, string>;
  onTimeCount: number;
  lateCount: number;
}

// Custom tooltip component - memoized outside to prevent recreation
const BarTooltip = React.memo(({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  
  return (
    <div className="bg-[#52236b] p-3 rounded-lg border border-purple-400/30">
      <p className="text-white font-['Poppins',sans-serif] mb-1">
        {payload[0].payload.name}
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

BarTooltip.displayName = 'BarTooltip';

const EfficiencyBarChart = React.memo(({ 
  data, 
  totalItems, 
  efficiencyColors,
  onTimeCount,
  lateCount 
}: EfficiencyBarChartProps) => {
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontFamily: 'Poppins', fontSize: '12px' }}
            angle={-20}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontFamily: 'Poppins', fontSize: '12px' }}
            label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins' } }}
          />
          <Tooltip content={BarTooltip} />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={800}
            animationBegin={0}
            isAnimationActive={false}
            label={{ 
              position: 'top', 
              fill: 'white', 
              style: { fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600 } 
            }}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={efficiencyColors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
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

EfficiencyBarChart.displayName = 'EfficiencyBarChart';

export default EfficiencyBarChart;
