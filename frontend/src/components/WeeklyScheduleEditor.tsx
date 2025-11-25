import React, { useState } from 'react';
import { Clock, Check, X, Save, XCircle } from 'lucide-react';
import { WeeklySchedule, DaySchedule } from '../contexts/StaffContext';

interface WeeklyScheduleEditorProps {
  initialSchedule?: WeeklySchedule;
  onSave: (schedule: WeeklySchedule) => void;
  onCancel: () => void;
}

const DEFAULT_SCHEDULE: WeeklySchedule = {
  monday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  tuesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  wednesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  thursday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  friday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  saturday: { isActive: false, startTime: '09:00', endTime: '17:00' },
  sunday: { isActive: false, startTime: '09:00', endTime: '17:00' }
};

const DAYS = [
  { key: 'monday' as keyof WeeklySchedule, label: 'Monday' },
  { key: 'tuesday' as keyof WeeklySchedule, label: 'Tuesday' },
  { key: 'wednesday' as keyof WeeklySchedule, label: 'Wednesday' },
  { key: 'thursday' as keyof WeeklySchedule, label: 'Thursday' },
  { key: 'friday' as keyof WeeklySchedule, label: 'Friday' },
  { key: 'saturday' as keyof WeeklySchedule, label: 'Saturday' },
  { key: 'sunday' as keyof WeeklySchedule, label: 'Sunday' }
];

export default function WeeklyScheduleEditor({ initialSchedule, onSave, onCancel }: WeeklyScheduleEditorProps) {
  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule || DEFAULT_SCHEDULE);

  const handleDayToggle = (day: keyof WeeklySchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isActive: !prev[day].isActive
      }
    }));
  };

  const handleTimeChange = (day: keyof WeeklySchedule, field: 'startTime' | 'endTime', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  return (
    <div>
      {/* Days in horizontal line */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {DAYS.map(({ key, label }) => {
          const daySchedule = schedule[key];
          return (
            <div key={key} className="bg-[#541168] rounded-lg p-4 min-w-[140px] flex-shrink-0">
              <div className="flex flex-col items-center gap-3">
                {/* Day Toggle */}
                <button
                  onClick={() => handleDayToggle(key)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    daySchedule.isActive
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600/50 hover:bg-red-600'
                  }`}
                  title={daySchedule.isActive ? 'Active' : 'Inactive'}
                >
                  {daySchedule.isActive ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <X className="w-5 h-5 text-white/70" />
                  )}
                </button>

                {/* Day Label */}
                <div className={`text-center text-sm ${daySchedule.isActive ? 'text-white' : 'text-white/50'}`}>
                  {label}
                </div>

                {/* Time Inputs */}
                {daySchedule.isActive ? (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/70" />
                      <input
                        type="time"
                        value={daySchedule.startTime}
                        onChange={(e) => handleTimeChange(key, 'startTime', e.target.value)}
                        className="bg-[#3c044d] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-xs w-full"
                      />
                    </div>
                    <span className="text-white/70 text-xs">to</span>
                    <input
                      type="time"
                      value={daySchedule.endTime}
                      onChange={(e) => handleTimeChange(key, 'endTime', e.target.value)}
                      className="bg-[#3c044d] text-white px-2 py-1 rounded border border-purple-400/30 focus:outline-none focus:border-purple-400 text-xs w-full"
                    />
                  </div>
                ) : (
                  <div className="text-white/50 text-xs text-center">Not scheduled</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={onCancel}
          className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors border border-red-400/30"
        >
          <XCircle className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={() => onSave(schedule)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Schedule
        </button>
      </div>
    </div>
  );
}