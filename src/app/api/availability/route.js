import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/slots';

/**
 * GET /api/availability?date=YYYY-MM-DD
 * Returns available time slots for the given date, split into morning and afternoon.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    return NextResponse.json({ error: 'date query parameter is required (YYYY-MM-DD)' }, { status: 400 });
  }

  // Parse and validate the date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 });
  }

  const slots = getAvailableSlots(date);

  return NextResponse.json({
    date: dateStr,
    slots: {
      morning: slots.morning,
      afternoon: slots.afternoon,
    },
  });
}

/**
 * POST /api/availability
 * Mock endpoint for updating availability settings.
 */
export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Availability updated',
  });
}
