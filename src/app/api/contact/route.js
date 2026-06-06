import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Receives a contact form submission. Validates name and message are present.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    const errors = [];
    if (!name || !name.trim()) errors.push('Name is required');
    if (!message || !message.trim()) errors.push('Message is required');

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    // In production this would save to DB and/or send email notifications
    return NextResponse.json({
      success: true,
      message: 'Message received. We will get back to you shortly.',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
