import { WeeklySchedule, DaySchedule } from '../contexts/StaffContext';

/**
 * Get the current day of week as a key for WeeklySchedule
 */
export function getCurrentDayKey(): keyof WeeklySchedule {
  const days: (keyof WeeklySchedule)[] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  const dayIndex = new Date().getDay();
  return days[dayIndex];
}

/**
 * Check if current time is within a given time range
 * @param startTime - Start time in "HH:MM" format
 * @param endTime - End time in "HH:MM" format
 * @returns true if current time is between start and end time
 */
export function isCurrentTimeInRange(startTime: string, endTime: string): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const [startHours, startMins] = startTime.split(':').map(Number);
  const startMinutes = startHours * 60 + startMins;
  
  const [endHours, endMins] = endTime.split(':').map(Number);
  const endMinutes = endHours * 60 + endMins;
  
  // Handle overnight shifts (e.g., 22:00 to 06:00)
  if (endMinutes < startMinutes) {
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  }
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

/**
 * Check if staff should be active based on their schedule
 * @param schedule - Weekly schedule for the staff member
 * @returns true if staff should be active right now
 */
export function isStaffActiveBySchedule(schedule?: WeeklySchedule): boolean {
  if (!schedule) {
    return false;
  }
  
  const currentDay = getCurrentDayKey();
  const daySchedule = schedule[currentDay];
  
  if (!daySchedule.isActive) {
    return false;
  }
  
  return isCurrentTimeInRange(daySchedule.startTime, daySchedule.endTime);
}

/**
 * Get the next scheduled shift for a staff member
 * @param schedule - Weekly schedule for the staff member
 * @returns Object with day and time of next shift, or null if no upcoming shifts
 */
export function getNextScheduledShift(schedule?: WeeklySchedule): { day: string; startTime: string } | null {
  if (!schedule) {
    return null;
  }
  
  const daysOrder: (keyof WeeklySchedule)[] = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  
  const currentDayIndex = new Date().getDay();
  
  // Check days starting from tomorrow
  for (let i = 1; i <= 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7;
    const dayKey = daysOrder[dayIndex];
    const daySchedule = schedule[dayKey];
    
    if (daySchedule.isActive) {
      return {
        day: dayKey.charAt(0).toUpperCase() + dayKey.slice(1),
        startTime: daySchedule.startTime
      };
    }
  }
  
  return null;
}

/**
 * Format time from "HH:MM" to human-readable format
 * @param time - Time in "HH:MM" format
 * @returns Formatted time string
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
