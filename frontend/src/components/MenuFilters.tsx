/**
 * MenuFilters.tsx - Filter Bar Component for Menu Review Analytics
 * 
 * Horizontal filter bar with filters focused on menu analysis:
 * 1. Department dropdown (Kitchen/Bar/Snack/All)
 * 2. Menu Item dropdown
 * 3. Efficiency dropdown
 * 4. Start Date input
 * 5. End Date input
 * 
 * Styled to match the purple theme of the application.
 */

import React from 'react';
import { useStaff, type AnalyticsFilters as FilterType } from '../contexts/StaffContext';

interface MenuFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export default function MenuFilters({ filters, onFiltersChange }: MenuFiltersProps) {
  const { getMenuItems, getEfficiencyLevels } = useStaff();

  const departments = ['All Departments', 'makanan', 'bar', 'snack'];
  const menuItems = ['All Dishes', ...getMenuItems()];
  const efficiencyLevels = ['All Efficiency', ...getEfficiencyLevels()];

  const handleChange = (field: keyof FilterType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="flex gap-4 items-center flex-wrap bg-[rgba(126,42,126,0.3)] p-4 rounded-lg">
      {/* Menu Item Filter - Prioritized for menu analysis */}
      <div className="flex flex-col gap-1 min-w-[200px]">
        <label className="text-white/80 text-sm font-['Poppins',sans-serif]">
          Menu Item
        </label>
        <select
          value={filters.menuItem}
          onChange={(e) => handleChange('menuItem', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-md border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif]"
        >
          {menuItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Efficiency Filter */}
      <div className="flex flex-col gap-1 min-w-[180px]">
        <label className="text-white/80 text-sm font-['Poppins',sans-serif]">
          Performance
        </label>
        <select
          value={filters.efficiency}
          onChange={(e) => handleChange('efficiency', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-md border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif]"
        >
          {efficiencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-white/80 text-sm font-['Poppins',sans-serif]">
          Start Date
        </label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-md border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif]"
        />
      </div>

      {/* End Date Filter */}
      <div className="flex flex-col gap-1 min-w-[160px]">
        <label className="text-white/80 text-sm font-['Poppins',sans-serif]">
          End Date
        </label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange('endDate', e.target.value)}
          className="bg-[#52236b] text-white px-3 py-2 rounded-md border border-purple-400/30 focus:outline-none focus:border-purple-400 font-['Poppins',sans-serif]"
        />
      </div>

      {/* Clear All Filters Button */}
      {(filters.menuItem !== 'All Dishes' || 
        filters.efficiency !== 'All Efficiency' || 
        filters.startDate || 
        filters.endDate) && (
        <button
          onClick={() => onFiltersChange({
            employee: 'All Employees',
            menuItem: 'All Dishes',
            efficiency: 'All Efficiency',
            startDate: '',
            endDate: ''
          })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors font-['Poppins',sans-serif] mt-6"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
