import { Resend } from 'resend';
import { CLINIC_NAME, DOCTOR_NAME } from './constants';

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === 're_xxxxx') return null;
  return new Resend(key);
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@sukoonpsychiatry.in';

export async function sendBookingConfirmation(booking) {
  try {
    const resend = getResendClient();
    if (!resend) { console.log('[Email] Resend not configured, skipping.'); return; }
    if (!booking.patient_email) return;

    await resend.emails.send({
      from: `${CLINIC_NAME} <${fromEmail}>`,
      to: booking.patient_email,
      subject: `Booking Confirmed - ${CLINIC_NAME}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#4A7C6F;">✅ Booking Confirmed</h2>
          <p>Hi ${booking.patient_name},</p>
          <p>Your appointment with ${DOCTOR_NAME} is booked!</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <tr><td style="padding:8px 0;color:#666;">📋 Service</td><td style="padding:8px 0;font-weight:600;">${booking.service_name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">📅 Date</td><td style="padding:8px 0;font-weight:600;">${booking.appointment_date}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">🕐 Time</td><td style="padding:8px 0;font-weight:600;">${booking.appointment_time} IST</td></tr>
            <tr><td style="padding:8px 0;color:#666;">💰 Amount</td><td style="padding:8px 0;font-weight:600;">₹${booking.payment_amount}</td></tr>
          </table>
          <p style="color:#666;font-size:14px;">We'll send you the Google Meet link once payment is verified.</p>
          <p style="margin-top:24px;">- ${CLINIC_NAME}</p>
        </div>
      `,
    });
    console.log('[Email] Booking confirmation sent to', booking.patient_email);
  } catch (err) {
    console.error('[Email] Failed to send booking confirmation:', err.message);
  }
}

export async function sendPaymentVerified(booking) {
  try {
    const resend = getResendClient();
    if (!resend || !booking.patient_email) return;

    await resend.emails.send({
      from: `${CLINIC_NAME} <${fromEmail}>`,
      to: booking.patient_email,
      subject: `Payment Verified - ${CLINIC_NAME}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#4A7C6F;">✅ Payment Verified</h2>
          <p>Hi ${booking.patient_name},</p>
          <p>Your payment of ₹${booking.payment_amount} has been verified!</p>
          ${booking.meeting_link ? `<p>📹 <strong>Join your session:</strong> <a href="${booking.meeting_link}">${booking.meeting_link}</a></p>` : ''}
          <p>📅 ${booking.appointment_date} at ${booking.appointment_time}</p>
          <p style="margin-top:24px;">See you soon!<br/>- ${DOCTOR_NAME}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send payment verified:', err.message);
  }
}

export async function sendBookingReminder(booking) {
  try {
    const resend = getResendClient();
    if (!resend || !booking.patient_email) return;

    await resend.emails.send({
      from: `${CLINIC_NAME} <${fromEmail}>`,
      to: booking.patient_email,
      subject: `Reminder: Appointment in 1 hour - ${CLINIC_NAME}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <h2 style="color:#4A7C6F;">⏰ Appointment Reminder</h2>
          <p>Hi ${booking.patient_name},</p>
          <p>Your appointment with ${DOCTOR_NAME} is in 1 hour.</p>
          ${booking.meeting_link ? `<p>📹 <a href="${booking.meeting_link}">Join Google Meet</a></p>` : ''}
          <p>🕐 ${booking.appointment_time}</p>
          <p style="margin-top:24px;">- ${CLINIC_NAME}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[Email] Failed to send reminder:', err.message);
  }
}
