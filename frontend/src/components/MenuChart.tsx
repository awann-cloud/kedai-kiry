/**
 * MenuChart.tsx - Visualization Component for Menu Performance
 * 
 * Displays bar charts showing:
 * - Top menu items by order count
 * - Average cooking times per menu item
 * - Efficiency distribution per menu item
 * 
 * Uses Recharts library for visualization.
 */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

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

export default function MenuChart({ menuStats }: MenuChartProps) {
  // Prepare data for top 10 most ordered items
  const top10Items = menuStats.slice(0, 10).map(stat => ({
    name: stat.menuName.length > 15 ? stat.menuName.substring(0, 15) + '...' : stat.menuName,
    fullName: stat.menuName,
    orders: stat.totalOrders,
    avgTime: Math.round(stat.avgTime),
    department: stat.department
  }));

  // Department colors
  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case 'makanan': return '#FB923C'; // Orange
      case 'bar': return '#FBBF24'; // Yellow
      case 'snack': return '#2DD4BF'; // Teal
      default: return '#A78BFA'; // Purple
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#52236b] p-3 rounded-lg border border-purple-400/30">
          <p className="text-white font-['Poppins',sans-serif] mb-1">
            {payload[0].payload.fullName}
          </p>
          <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
            Orders: {payload[0].value}
          </p>
          <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
            Avg Time: {Math.floor(payload[0].payload.avgTime / 60)}:{(payload[0].payload.avgTime % 60).toString().padStart(2, '0')}
          </p>
          <p className="text-white/80 text-sm font-['Poppins',sans-serif] capitalize">
            Dept: {payload[0].payload.department}
          </p>
        </div>
      );
    }
    return null;
  };

  // Prepare data for average cooking time chart
  const avgTimeData = menuStats.slice(0, 10).map(stat => ({
    name: stat.menuName.length > 15 ? stat.menuName.substring(0, 15) + '...' : stat.menuName,
    fullName: stat.menuName,
    seconds: Math.round(stat.avgTime),
    minutes: Math.round(stat.avgTime / 60 * 10) / 10,
    department: stat.department
  }));

  const TimeTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const totalSeconds = payload[0].value;
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return (
        <div className="bg-[#52236b] p-3 rounded-lg border border-purple-400/30">
          <p className="text-white font-['Poppins',sans-serif] mb-1">
            {payload[0].payload.fullName}
          </p>
          <p className="text-white/80 text-sm font-['Poppins',sans-serif]">
            Avg Time: {mins}:{secs.toString().padStart(2, '0')}
          </p>
          <p className="text-white/80 text-sm font-['Poppins',sans-serif] capitalize">
            Dept: {payload[0].payload.department}
          </p>
        </div>
      );
    }
    return null;
  };

  if (menuStats.length === 0) {
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
      {/* Top Menu Items by Order Count */}
      <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-6">
        <h3 className="text-white font-['Poppins',sans-serif] mb-4">
          Top Menu Items by Orders
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top10Items}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.6)"
              style={{ fontFamily: 'Poppins', fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              style={{ fontFamily: 'Poppins', fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
              {top10Items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getDepartmentColor(entry.department)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex gap-4 justify-center mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FB923C]" />
            <span className="text-white/80 text-sm font-['Poppins',sans-serif]">Makanan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FBBF24]" />
            <span className="text-white/80 text-sm font-['Poppins',sans-serif]">Bar (Minuman)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2DD4BF]" />
            <span className="text-white/80 text-sm font-['Poppins',sans-serif]">Snack</span>
          </div>
        </div>
      </div>

      {/* Average Cooking Time Chart */}
      <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-6">
        <h3 className="text-white font-['Poppins',sans-serif] mb-4">
          Average Cooking Time (Top 10)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={avgTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.6)"
              style={{ fontFamily: 'Poppins', fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              style={{ fontFamily: 'Poppins', fontSize: '12px' }}
              label={{ value: 'Seconds', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins' } }}
            />
            <Tooltip content={<TimeTooltip />} />
            <Bar dataKey="seconds" fill="#8B5CF6" radius={[8, 8, 0, 0]}>
              {avgTimeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getDepartmentColor(entry.department)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Most Popular Item */}
        <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4">
          <h4 className="text-white/60 text-sm font-['Poppins',sans-serif] mb-2">
            Most Popular
          </h4>
          <p className="text-white font-['Poppins',sans-serif]">
            {menuStats[0]?.menuName || 'N/A'}
          </p>
          <p className="text-white/60 text-sm font-['Poppins',sans-serif] mt-1">
            {menuStats[0]?.totalOrders || 0} orders
          </p>
        </div>

        {/* Fastest Item */}
        <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4">
          <h4 className="text-white/60 text-sm font-['Poppins',sans-serif] mb-2">
            Fastest Average Time
          </h4>
          {(() => {
            const fastest = [...menuStats].sort((a, b) => a.avgTime - b.avgTime)[0];
            const mins = Math.floor(fastest?.avgTime / 60 || 0);
            const secs = Math.floor(fastest?.avgTime % 60 || 0);
            return (
              <>
                <p className="text-white font-['Poppins',sans-serif]">
                  {fastest?.menuName || 'N/A'}
                </p>
                <p className="text-green-400 text-sm font-['Poppins',sans-serif] mt-1">
                  {mins}:{secs.toString().padStart(2, '0')} avg
                </p>
              </>
            );
          })()}
        </div>

        {/* Slowest Item */}
        <div className="bg-[rgba(126,42,126,0.3)] rounded-lg p-4">
          <h4 className="text-white/60 text-sm font-['Poppins',sans-serif] mb-2">
            Slowest Average Time
          </h4>
          {(() => {
            const slowest = [...menuStats].sort((a, b) => b.avgTime - a.avgTime)[0];
            const mins = Math.floor(slowest?.avgTime / 60 || 0);
            const secs = Math.floor(slowest?.avgTime % 60 || 0);
            return (
              <>
                <p className="text-white font-['Poppins',sans-serif]">
                  {slowest?.menuName || 'N/A'}
                </p>
                <p className="text-red-400 text-sm font-['Poppins',sans-serif] mt-1">
                  {mins}:{secs.toString().padStart(2, '0')} avg
                </p>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
