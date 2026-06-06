'use client';

import { useMemo } from 'react';
import { getAvailableSlots } from '@/lib/slots';

export default function TimeSlotPicker({ selectedDate, selectedTime, onSelectTime, duration = 30 }) {
  const slots = useMemo(() => {
    if (!selectedDate) return { morning: [], afternoon: [] };
    return getAvailableSlots(selectedDate, duration);
  }, [selectedDate, duration]);

  if (!selectedDate) {
    return <p className="text-muted">Please select a date first.</p>;
  }

  const noSlots = slots.morning.length === 0 && slots.afternoon.length === 0;

  if (noSlots) {
    return (
      <div className="card text-center" style={{ padding: '2rem' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>😔</p>
        <p className="text-muted">No available slots for this date. Please try another day.</p>
      </div>
    );
  }

  return (
    <div>
      {slots.morning.length > 0 && (
        <>
          <div className="time-period-label">🌅 Morning</div>
          <div className="time-slots-grid">
            {slots.morning.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => onSelectTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {slots.afternoon.length > 0 && (
        <>
          <div className="time-period-label">🌇 Afternoon</div>
          <div className="time-slots-grid">
            {slots.afternoon.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => onSelectTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
