import { CLINIC_NAME } from './constants';

/**
 * Generate a WhatsApp share link for booking details.
 */
export function generateBookingShareLink(booking) {
  const text = [
    `✅ Booking Confirmed!`,
    ``,
    `🏥 ${CLINIC_NAME}`,
    `👩‍⚕️ Dr. Aditi Bhatia`,
    `📋 ${booking.serviceName || 'Consultation'}`,
    `📅 ${booking.date}`,
    `🕐 ${booking.time} IST`,
    `💰 ₹${booking.amount || 0}`,
    ``,
    `Booking ID: ${booking.id || 'N/A'}`,
  ].join('\n');

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Generate a WhatsApp contact link with a pre-filled message.
 */
export function generateContactLink(phoneNumber, message) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a general inquiry WhatsApp link.
 */
export function generateWhatsAppCTA(phoneNumber) {
  return generateContactLink(
    phoneNumber,
    "Hi Dr. Bhatia, I'd like to inquire about a consultation."
  );
}
