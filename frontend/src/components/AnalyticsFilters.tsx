/**
 * AnalyticsFilters.tsx - Filter Bar Component for Cooking Analytics
 * 
 * Horizontal filter bar with 5 filters:
 * 1. Employee dropdown
 * 2. Menu Item dropdown
 * 3. Efficiency dropdown
 * 4. Start Date input
 * 5. End Date input
 * 
 * Styled to match the purple theme of the application.
 */

import React from 'react';
import { useStaff, type AnalyticsFilters as FilterType } from '../contexts/StaffContext';

interface AnalyticsFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export default function AnalyticsFilters({ filters, onFiltersChange }: AnalyticsFiltersProps) {
  const { getEmployeeNames, getMenuItems, getEfficiencyLevels } = useStaff();

  const employees = ['All Employees', ...getEmployeeNames()];
  const menuItems = ['All Dishes', ...getMenuItems()];
  const efficiencyLevels = ['All Efficiency', ...getEfficiencyLevels()];

  const handleChange = (field: keyof FilterType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="flex gap-3 items-end flex-wrap">
      {/* Employee Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-white/80 text-xs font-['Poppins',sans-serif]">
          Employee
        </label>
        <select
          value={filters.employee}
          onChange={(e) => handleChange('employee', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
        >
          {employees.map((emp) => (
            <option key={emp} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>

      {/* Menu Item Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-white/80 text-xs font-['Poppins',sans-serif]">
          Menu Item
        </label>
        <select
          value={filters.menuItem}
          onChange={(e) => handleChange('menuItem', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
        >
          {menuItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Efficiency Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-white/80 text-xs font-['Poppins',sans-serif]">
          Efficiency
        </label>
        <select
          value={filters.efficiency}
          onChange={(e) => handleChange('efficiency', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
        >
          {efficiencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date Filter */}
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-white/80 text-xs font-['Poppins',sans-serif]">
          Start Date
        </label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          placeholder="mm/dd/yyyy"
          className="bg-[#52236b] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
        />
      </div>

      {/* End Date Filter */}
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-white/80 text-xs font-['Poppins',sans-serif]">
          End Date
        </label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          placeholder="mm/dd/yyyy"
          className="bg-[#52236b] text-white px-3 py-2 rounded-lg border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif] text-sm"
        />
      </div>
    </div>
  );
}