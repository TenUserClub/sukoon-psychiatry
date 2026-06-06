'use client';

import { useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOT_DURATIONS = [15, 20, 30, 45, 60];

/**
 * Generate time slot labels from startHour to endHour in 30-min intervals.
 */
function generateTimeLabels(startHour, endHour, intervalMins = 30) {
  const labels = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += intervalMins) {
      const hour12 = h % 12 || 12;
      const ampm = h >= 12 ? 'PM' : 'AM';
      labels.push({
        key: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        label: `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`,
      });
    }
  }
  return labels;
}

/**
 * Create initial availability grid.
 * Mon–Fri 10AM–1PM and 4PM–7PM are active; rest are off.
 */
function buildInitialGrid() {
  const grid = {};
  const allSlots = generateTimeLabels(9, 19);

  DAYS.forEach((day) => {
    grid[day] = {};
    allSlots.forEach((slot) => {
      const h = parseInt(slot.key.split(':')[0], 10);
      const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day);
      const isMorning = h >= 10 && h < 13;
      const isAfternoon = h >= 16 && h < 19;
      grid[day][slot.key] = isWeekday && (isMorning || isAfternoon);
    });
  });
  return grid;
}

export default function AdminAvailabilityPage() {
  const [grid, setGrid] = useState(buildInitialGrid);
  const [slotDuration, setSlotDuration] = useState(30);
  const [blockedDates, setBlockedDates] = useState([
    { date: '2024-01-26', reason: 'Republic Day — National Holiday' },
  ]);
  const [blockDate, setBlockDate] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [saved, setSaved] = useState(false);

  const timeSlots = generateTimeLabels(9, 19);

  const toggleSlot = (day, slotKey) => {
    setGrid((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slotKey]: !prev[day][slotKey],
      },
    }));
    setSaved(false);
  };

  const handleBlockDate = () => {
    if (!blockDate) return;
    setBlockedDates((prev) => [
      ...prev,
      { date: blockDate, reason: blockReason || 'No reason provided' },
    ]);
    setBlockDate('');
    setBlockReason('');
  };

  const removeBlockedDate = (date) => {
    setBlockedDates((prev) => prev.filter((d) => d.date !== date));
  };

  const handleSave = () => {
    setSaved(true);
    // In production, this would POST to /api/availability
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="admin-page-title">Manage Availability</h1>

      {/* Slot Duration Selector */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="input-group" style={{ maxWidth: '200px' }}>
          <label>Slot Duration</label>
          <select
            className="input"
            value={slotDuration}
            onChange={(e) => setSlotDuration(Number(e.target.value))}
          >
            {SLOT_DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d} minutes
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weekly Availability Grid */}
      <div className="card" style={{ overflowX: 'auto', marginBottom: '2rem', padding: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Weekly Schedule</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '700px' }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  width: '90px',
                }}
              >
                Time
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  style={{
                    textAlign: 'center',
                    padding: '0.5rem 0.25rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: ['Sat', 'Sun'].includes(day) ? 'var(--error)' : 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.key}>
                <td
                  style={{
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {slot.label}
                </td>
                {DAYS.map((day) => {
                  const isActive = grid[day]?.[slot.key];
                  return (
                    <td key={day} style={{ textAlign: 'center', padding: '0.2rem' }}>
                      <button
                        onClick={() => toggleSlot(day, slot.key)}
                        style={{
                          width: '100%',
                          height: '28px',
                          borderRadius: 'var(--radius-sm)',
                          border: isActive
                            ? '2px solid var(--primary)'
                            : '2px solid rgba(0,0,0,0.06)',
                          background: isActive
                            ? 'rgba(var(--primary-rgb), 0.15)'
                            : 'transparent',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                        title={`${day} ${slot.label} — ${isActive ? 'Available' : 'Unavailable'}`}
                        aria-label={`${day} ${slot.label} ${isActive ? 'Available' : 'Unavailable'}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Block Date Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Block Date</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="input-group" style={{ flex: '0 1 200px' }}>
            <label>Date</label>
            <input
              type="date"
              className="input"
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ flex: '1 1 250px' }}>
            <label>Reason</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Holiday, Personal leave"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleBlockDate}
            disabled={!blockDate}
            style={{ alignSelf: 'flex-end', marginBottom: '2px' }}
          >
            Block This Date
          </button>
        </div>

        {/* Blocked Dates List */}
        {blockedDates.length > 0 && (
          <div style={{ marginTop: '1.25rem' }}>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Blocked Dates
            </div>
            {blockedDates.map((bd) => (
              <div
                key={bd.date}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(199,91,91,0.06)',
                  marginBottom: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {new Date(bd.date + 'T00:00:00').toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {bd.reason}
                  </span>
                </div>
                <button
                  onClick={() => removeBlockedDate(bd.date)}
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--error)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    fontWeight: 600,
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <button className="btn btn-primary" onClick={handleSave}>
        {saved ? '✓ Saved Successfully' : 'Save Changes'}
      </button>
    </div>
  );
}
