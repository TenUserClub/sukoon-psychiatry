'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
  startOfDay,
  isWeekend,
  isToday,
} from 'date-fns';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BookingCalendar({ selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startOffset = getDay(monthStart);
  const today = startOfDay(new Date());

  const isDisabled = (day) => {
    return isBefore(startOfDay(day), today) || isWeekend(day);
  };

  return (
    <div>
      <div className="calendar-header">
        <button className="calendar-nav" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          ← Prev
        </button>
        <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
        <button className="calendar-nav" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          Next →
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty" />
        ))}

        {days.map((day) => {
          const disabled = isDisabled(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);

          return (
            <button
              key={day.toISOString()}
              className={`calendar-day ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${isTodayDate ? 'today' : ''}`}
              onClick={() => !disabled && onSelectDate(day)}
              disabled={disabled}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
