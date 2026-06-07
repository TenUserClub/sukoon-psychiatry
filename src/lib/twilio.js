import twilio from 'twilio';
import { CLINIC_NAME, DOCTOR_NAME } from './constants';

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || sid === 'ACxxxxx') return null;
  return twilio(sid, token);
}

const fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

export async function sendWhatsAppMessage(to, body) {
  try {
    const client = getTwilioClient();
    if (!client) { console.log('[Twilio] Not configured, skipping.'); return null; }
    const cleanTo = to.replace(/[^0-9+]/g, '');
    const msg = await client.messages.create({
      body,
      from: fromNumber,
      to: `whatsapp:${cleanTo}`,
    });
    console.log('[Twilio] WhatsApp sent:', msg.sid);
    return msg;
  } catch (err) {
    console.error('[Twilio] Failed:', err.message);
    return null;
  }
}

export async function sendBookingConfirmationWhatsApp(booking) {
  const body = [
    `✅ Booking Confirmed - ${CLINIC_NAME}`,
    ``,
    `Hi ${booking.patient_name},`,
    `Your appointment with ${DOCTOR_NAME} is booked!`,
    ``,
    `📋 ${booking.service_name}`,
    `📅 ${booking.appointment_date}`,
    `🕐 ${booking.appointment_time}`,
    `💰 ₹${booking.payment_amount} - ${booking.payment_status === 'paid' ? 'Paid' : 'Pending Verification'}`,
    ``,
    `Booking ID: ${booking.id}`,
    ``,
    `We'll send you the Google Meet link once payment is verified.`,
    ``,
    `- ${CLINIC_NAME}`,
  ].join('\n');

  return sendWhatsAppMessage(booking.patient_phone, body);
}

export async function sendPaymentVerifiedWhatsApp(booking) {
  const body = [
    `✅ Payment Verified - ${CLINIC_NAME}`,
    ``,
    `Hi ${booking.patient_name},`,
    `Your payment of ₹${booking.payment_amount} has been verified!`,
    ``,
    `📹 Join your session here:`,
    booking.meeting_link || '(Link will be shared soon)',
    ``,
    `📅 ${booking.appointment_date} at ${booking.appointment_time}`,
    ``,
    `See you soon!`,
    `- ${DOCTOR_NAME}`,
  ].join('\n');

  return sendWhatsAppMessage(booking.patient_phone, body);
}
