import { NextResponse } from 'next/server';

/**
 * Mock bookings data — 8 items with varied statuses
 */
const MOCK_BOOKINGS = [
  {
    id: 'BK-10234',
    patient_name: 'Rahul Sharma',
    patient_phone: '+91-9876543210',
    patient_email: 'rahul@email.com',
    service: 'Initial Consultation',
    appointment_date: '2024-01-15',
    appointment_time: '10:00',
    status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'razorpay',
    fee: 1000,
    notes: '',
    created_at: '2024-01-12T10:30:00Z',
  },
  {
    id: 'BK-10235',
    patient_name: 'Priya Patel',
    patient_phone: '+91-9123456789',
    patient_email: 'priya@email.com',
    service: 'Follow-up Session',
    appointment_date: '2024-01-15',
    appointment_time: '10:30',
    status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'upi_manual',
    fee: 500,
    notes: '',
    created_at: '2024-01-13T08:15:00Z',
  },
  {
    id: 'BK-10236',
    patient_name: 'Amit Kumar',
    patient_phone: '+91-9988776655',
    patient_email: '',
    service: 'Initial Consultation',
    appointment_date: '2024-01-15',
    appointment_time: '11:00',
    status: 'pending',
    payment_status: 'pending_verification',
    payment_method: 'upi_manual',
    fee: 1000,
    notes: 'UTR: 423876541298',
    created_at: '2024-01-14T14:20:00Z',
  },
  {
    id: 'BK-10237',
    patient_name: 'Sneha Gupta',
    patient_phone: '+91-9654321098',
    patient_email: 'sneha.g@email.com',
    service: 'Medication Review',
    appointment_date: '2024-01-16',
    appointment_time: '16:00',
    status: 'pending',
    payment_status: 'pending_verification',
    payment_method: 'upi_manual',
    fee: 400,
    notes: 'UTR: 998877665544',
    created_at: '2024-01-14T16:45:00Z',
  },
  {
    id: 'BK-10238',
    patient_name: 'Vikram Singh',
    patient_phone: '+91-9871234560',
    patient_email: 'vikram.s@email.com',
    service: 'Extended Session',
    appointment_date: '2024-01-16',
    appointment_time: '17:00',
    status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'razorpay',
    fee: 1500,
    notes: '',
    created_at: '2024-01-13T11:00:00Z',
  },
  {
    id: 'BK-10239',
    patient_name: 'Meera Joshi',
    patient_phone: '+91-9876501234',
    patient_email: 'meera@email.com',
    service: 'Follow-up Session',
    appointment_date: '2024-01-14',
    appointment_time: '12:00',
    status: 'completed',
    payment_status: 'paid',
    payment_method: 'razorpay',
    fee: 500,
    notes: 'Progressing well. Continue current medication.',
    created_at: '2024-01-10T09:30:00Z',
  },
  {
    id: 'BK-10240',
    patient_name: 'Arjun Reddy',
    patient_phone: '+91-9900112233',
    patient_email: '',
    service: 'Initial Consultation',
    appointment_date: '2024-01-13',
    appointment_time: '10:30',
    status: 'cancelled',
    payment_status: 'refunded',
    payment_method: 'razorpay',
    fee: 1000,
    notes: 'Patient cancelled due to travel.',
    created_at: '2024-01-09T15:00:00Z',
  },
  {
    id: 'BK-10241',
    patient_name: 'Kavita Nair',
    patient_phone: '+91-9445566778',
    patient_email: 'kavita.n@email.com',
    service: 'Free Intro Call',
    appointment_date: '2024-01-17',
    appointment_time: '11:30',
    status: 'pending',
    payment_status: 'unpaid',
    payment_method: '',
    fee: 0,
    notes: '',
    created_at: '2024-01-15T07:45:00Z',
  },
];

/**
 * GET /api/bookings
 * Returns mock bookings, optionally filtered by status and payment_status query params.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const paymentStatus = searchParams.get('payment_status');

  let filtered = [...MOCK_BOOKINGS];

  if (status && status !== 'all') {
    filtered = filtered.filter((b) => b.status === status);
  }
  if (paymentStatus && paymentStatus !== 'all') {
    filtered = filtered.filter((b) => b.payment_status === paymentStatus);
  }

  return NextResponse.json({ bookings: filtered, total: filtered.length });
}

/**
 * POST /api/bookings
 * Validates required fields and returns a mock-created booking.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { patient_name, patient_phone, appointment_date, appointment_time } = body;

    // Validation
    const errors = [];
    if (!patient_name) errors.push('patient_name is required');
    if (!patient_phone) errors.push('patient_phone is required');
    if (!appointment_date) errors.push('appointment_date is required');
    if (!appointment_time) errors.push('appointment_time is required');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    // Generate a random booking ID
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: `BK-${randomId}`,
      patient_name,
      patient_phone,
      patient_email: body.patient_email || '',
      service: body.service || 'Initial Consultation',
      appointment_date,
      appointment_time,
      status: 'pending',
      payment_status: body.payment_status || 'unpaid',
      payment_method: body.payment_method || '',
      fee: body.fee || 0,
      notes: body.notes || '',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

/**
 * PATCH /api/bookings
 * Accepts { id, ...updates } and returns a success message.
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${id} updated successfully`,
      updated_fields: Object.keys(updates),
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
