import {
  format, addMinutes, parse, isBefore, isToday, isWeekend, startOfDay
} from 'date-fns';
import { WORKING_HOURS, SLOT_DURATION } from './constants';

/**
 * Generate time slot strings between start and end times.
 */
export function generateTimeSlots(startTime, endTime, durationMinutes = SLOT_DURATION) {
  const slots = [];
  const baseDate = new Date(2024, 0, 1);
  let current = parse(startTime, 'HH:mm', baseDate);
  const end = parse(endTime, 'HH:mm', baseDate);

  while (isBefore(current, end)) {
    slots.push(format(current, 'HH:mm'));
    current = addMinutes(current, durationMinutes);
  }
  return slots;
}

/**
 * Get available slots for a given date.
 * For now uses hardcoded working hours; will integrate with Supabase later.
 */
export function getAvailableSlots(date, serviceDuration = SLOT_DURATION) {
  if (!isDateAvailable(date)) return { morning: [], afternoon: [] };

  const morningSlots = generateTimeSlots(
    WORKING_HOURS.morning.start,
    WORKING_HOURS.morning.end,
    serviceDuration
  );
  const afternoonSlots = generateTimeSlots(
    WORKING_HOURS.afternoon.start,
    WORKING_HOURS.afternoon.end,
    serviceDuration
  );

  // Filter past slots if the date is today
  if (isToday(date)) {
    const now = new Date();
    const filterPast = (slot) => {
      const [h, m] = slot.split(':').map(Number);
      const slotDate = new Date(date);
      slotDate.setHours(h, m, 0, 0);
      return slotDate > now;
    };
    return {
      morning: morningSlots.filter(filterPast),
      afternoon: afternoonSlots.filter(filterPast),
    };
  }

  return { morning: morningSlots, afternoon: afternoonSlots };
}

/**
 * Check if a date is available for booking (Mon-Fri, not in the past).
 */
export function isDateAvailable(date) {
  const d = new Date(date);
  if (isWeekend(d)) return false;
  if (isBefore(startOfDay(d), startOfDay(new Date()))) return false;
  return true;
}
