'use client';

import Link from 'next/link';
import SVGIcon from '@/components/ui/SVGIcon';
import { generateBookingShareLink } from '@/lib/whatsapp-links';

export default function BookingConfirmation({ booking }) {
  const handleAddToCalendar = () => {
    // booking.isoDate is in format "yyyy-MM-dd"
    const start = new Date(`${booking.isoDate}T${booking.time}:00`);
    const end = new Date(start.getTime() + (booking.duration || 30) * 60000);

    const formatICS = (d) =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICS(start)}`,
      `DTEND:${formatICS(end)}`,
      `SUMMARY:Sukoon Psychiatry - ${booking.serviceName || 'Consultation'}`,
      'DESCRIPTION:Video consultation with Dr. Aditi Bhatia',
      'LOCATION:Google Meet (link will be shared)',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sukoon-appointment.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappLink = generateBookingShareLink({
    id: booking.id,
    serviceName: booking.serviceName,
    date: booking.date,
    time: booking.time,
    amount: booking.amount,
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="confirmation-check">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 style={{ marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        {booking.status === 'pending_verification'
          ? "Your booking is confirmed. Payment verification is pending - we'll send you the Google Meet link once verified."
          : booking.amount === 0
          ? "Your free intro call is confirmed! We'll share the Google Meet link soon."
          : "Your booking and payment are confirmed. We'll send the Google Meet link shortly."}
      </p>

      <div className="card" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="stethoscope" size={13} />
              Service
            </p>
            <p className="font-semibold">{booking.serviceName}</p>
          </div>
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="clipboard" size={13} />
              Booking ID
            </p>
            <p className="font-semibold">{booking.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="calendar" size={13} />
              Date
            </p>
            <p className="font-semibold">{booking.date}</p>
          </div>
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="clock" size={13} />
              Time
            </p>
            <p className="font-semibold">{booking.time} IST</p>
          </div>
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="rupee" size={13} />
              Amount
            </p>
            <p className="font-semibold">
              {booking.amount === 0 ? 'Free' : `₹${booking.amount}`}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SVGIcon name="shield" size={13} />
              Status
            </p>
            <span
              className={`badge ${
                booking.status === 'pending_verification'
                  ? 'badge-warning'
                  : 'badge-success'
              }`}
            >
              {booking.status === 'pending_verification'
                ? 'Payment Pending Verification'
                : 'Confirmed'}
            </span>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <SVGIcon name="whatsapp" size={18} style={{ marginRight: '0.5rem' }} />
          Share on WhatsApp
        </a>
        <button className="btn btn-outline" onClick={handleAddToCalendar}>
          <SVGIcon name="calendar" size={16} style={{ marginRight: '0.5rem' }} />
          Add to Calendar
        </button>
        <Link href="/" className="btn btn-ghost">
          <SVGIcon name="arrow-right" size={16} style={{ marginRight: '0.5rem' }} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
