import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  department: 'Kitchen' | 'Bar' | 'Snack' | 'Checker';
  pin: string;
  isActive: boolean;
  gender?: 'Male' | 'Female';
  joinDate?: string;
}

interface AddEditStaffModalProps {
  staff: StaffMember | null;
  onSave: (staff: StaffMember) => void;
  onClose: () => void;
}

export default function AddEditStaffModal({ staff, onSave, onClose }: AddEditStaffModalProps) {
  const [formData, setFormData] = useState<StaffMember>({
    id: staff?.id || '',
    name: staff?.name || '',
    department: staff?.department || 'Kitchen',
    pin: staff?.pin || '',
    isActive: staff?.isActive ?? true,
    gender: staff?.gender || 'Male',
    joinDate: staff?.joinDate || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (staff) {
      setFormData(staff);
    }
  }, [staff]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.pin.trim()) {
      newErrors.pin = 'PIN is required';
    } else if (!/^\d{4}$/.test(formData.pin)) {
      newErrors.pin = 'PIN must be 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof StaffMember, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#3c044d] rounded-[10px] w-full max-w-md p-6 shadow-2xl border border-purple-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">
            {staff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-[#4a1e69] text-white px-4 py-2 rounded-[10px] border border-purple-500/20 focus:border-purple-500 focus:outline-none"
              placeholder="Enter staff name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Department</label>
            <select
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value as StaffMember['department'])}
              className="w-full bg-[#4a1e69] text-white px-4 py-2 rounded-[10px] border border-purple-500/20 focus:border-purple-500 focus:outline-none"
            >
              <option value="Kitchen">Kitchen</option>
              <option value="Bar">Bar</option>
              <option value="Snack">Snack</option>
              <option value="Checker">Checker</option>
            </select>
          </div>

          {/* PIN */}
          <div>
            <label className="block text-white/80 text-sm mb-2">PIN (4 digits)</label>
            <input
              type="text"
              value={formData.pin}
              onChange={(e) => handleChange('pin', e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full bg-[#4a1e69] text-white px-4 py-2 rounded-[10px] border border-purple-500/20 focus:border-purple-500 focus:outline-none"
              placeholder="Enter 4-digit PIN"
              maxLength={4}
            />
            {errors.pin && (
              <p className="text-red-400 text-xs mt-1">{errors.pin}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value as 'Male' | 'Female')}
              className="w-full bg-[#4a1e69] text-white px-4 py-2 rounded-[10px] border border-purple-500/20 focus:border-purple-500 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Join Date</label>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleChange('joinDate', e.target.value)}
              className="w-full bg-[#4a1e69] text-white px-4 py-2 rounded-[10px] border border-purple-500/20 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleChange('isActive', e.target.checked)}
              className="w-4 h-4 rounded border-purple-500/20 bg-[#4a1e69] checked:bg-purple-600"
            />
            <label htmlFor="isActive" className="text-white/80 text-sm">
              Active Staff Member
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#541168] hover:bg-[#6b1583] text-white py-2 rounded-[10px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-[10px] transition-colors shadow-lg"
            >
              {staff ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
