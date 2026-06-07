'use client';

import { useState } from 'react';

/**
 * Mock booking data - 8 rows with mixed statuses, matching the API route's mock data.
 */
const initialBookings = [
  {
    id: 'BK-10234',
    patient_name: 'Rahul Sharma',
    patient_phone: '+91-9876543210',
    service: 'Initial Consultation',
    appointment_date: '2024-01-15',
    appointment_time: '10:00',
    status: 'confirmed',
    payment_status: 'paid',
    fee: 1000,
  },
  {
    id: 'BK-10235',
    patient_name: 'Priya Patel',
    patient_phone: '+91-9123456789',
    service: 'Follow-up Session',
    appointment_date: '2024-01-15',
    appointment_time: '10:30',
    status: 'confirmed',
    payment_status: 'paid',
    fee: 500,
  },
  {
    id: 'BK-10236',
    patient_name: 'Amit Kumar',
    patient_phone: '+91-9988776655',
    service: 'Initial Consultation',
    appointment_date: '2024-01-15',
    appointment_time: '11:00',
    status: 'pending',
    payment_status: 'pending_verification',
    fee: 1000,
  },
  {
    id: 'BK-10237',
    patient_name: 'Sneha Gupta',
    patient_phone: '+91-9654321098',
    service: 'Medication Review',
    appointment_date: '2024-01-16',
    appointment_time: '16:00',
    status: 'pending',
    payment_status: 'pending_verification',
    fee: 400,
  },
  {
    id: 'BK-10238',
    patient_name: 'Vikram Singh',
    patient_phone: '+91-9871234560',
    service: 'Extended Session',
    appointment_date: '2024-01-16',
    appointment_time: '17:00',
    status: 'confirmed',
    payment_status: 'paid',
    fee: 1500,
  },
  {
    id: 'BK-10239',
    patient_name: 'Meera Joshi',
    patient_phone: '+91-9876501234',
    service: 'Follow-up Session',
    appointment_date: '2024-01-14',
    appointment_time: '12:00',
    status: 'completed',
    payment_status: 'paid',
    fee: 500,
  },
  {
    id: 'BK-10240',
    patient_name: 'Arjun Reddy',
    patient_phone: '+91-9900112233',
    service: 'Initial Consultation',
    appointment_date: '2024-01-13',
    appointment_time: '10:30',
    status: 'cancelled',
    payment_status: 'refunded',
    fee: 1000,
  },
  {
    id: 'BK-10241',
    patient_name: 'Kavita Nair',
    patient_phone: '+91-9445566778',
    service: 'Free Intro Call',
    appointment_date: '2024-01-17',
    appointment_time: '11:30',
    status: 'pending',
    payment_status: 'unpaid',
    fee: 0,
  },
];

const STATUS_BADGE_MAP = {
  confirmed: 'success',
  pending: 'warning',
  completed: 'info',
  cancelled: 'error',
  no_show: 'default',
};

const PAYMENT_BADGE_MAP = {
  paid: 'success',
  pending_verification: 'warning',
  unpaid: 'default',
  refunded: 'info',
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatPaymentStatus(ps) {
  return ps.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (paymentFilter !== 'all' && b.payment_status !== paymentFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        b.patient_name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleVerify = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, payment_status: 'paid', status: 'confirmed' } : b
      )
    );
  };

  const handleComplete = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'completed' } : b))
    );
  };

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleNotes = (id) => {
    const note = prompt('Enter notes for booking ' + id + ':');
    if (note !== null) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, notes: note } : b))
      );
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Manage Bookings</h1>

      {/* Filter Row */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div className="input-group" style={{ minWidth: '160px', flex: '0 1 auto' }}>
          <label>Status</label>
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="input-group" style={{ minWidth: '180px', flex: '0 1 auto' }}>
          <label>Payment</label>
          <select
            className="input"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending_verification">Pending Verification</option>
            <option value="unpaid">Unpaid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div className="input-group" style={{ flex: '1 1 200px' }}>
          <label>Search</label>
          <input
            type="text"
            className="input"
            placeholder="Search by name, ID, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="admin-table" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No bookings match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.patient_name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.id}</div>
                  </td>
                  <td>{b.service}</td>
                  <td>{formatDate(b.appointment_date)}</td>
                  <td>{formatTime(b.appointment_time)}</td>
                  <td>
                    <span className={`badge badge-${STATUS_BADGE_MAP[b.status] || 'default'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${PAYMENT_BADGE_MAP[b.payment_status] || 'default'}`}>
                      {formatPaymentStatus(b.payment_status)}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      {b.payment_status === 'pending_verification' && (
                        <button
                          className="action-btn"
                          onClick={() => handleVerify(b.id)}
                          title="Verify Payment"
                        >
                          Verify
                        </button>
                      )}
                      {(b.status === 'confirmed' || b.status === 'pending') &&
                        b.status !== 'completed' && (
                          <button
                            className="action-btn"
                            onClick={() => handleComplete(b.id)}
                            title="Mark Complete"
                          >
                            Complete
                          </button>
                        )}
                      <button
                        className="action-btn"
                        onClick={() => handleNotes(b.id)}
                        title="Add Notes"
                      >
                        Notes
                      </button>
                      {b.status !== 'cancelled' && b.status !== 'completed' && (
                        <button
                          className="action-btn"
                          onClick={() => handleCancel(b.id)}
                          title="Cancel Booking"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
