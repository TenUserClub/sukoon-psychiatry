import QRCode from 'qrcode';

/**
 * Generate a UPI deep link.
 */
export function generateUpiLink(upiId, amount, name = 'Sukoon Psychiatry') {
  const params = new URLSearchParams({
    pa: upiId,
    pn: name,
    cu: 'INR',
  });
  if (amount > 0) params.set('am', String(amount));
  return `upi://pay?${params.toString()}`;
}

/**
 * Generate a QR code as a data URL from a UPI link.
 */
export async function generateUpiQrDataUrl(upiLink) {
  try {
    return await QRCode.toDataURL(upiLink, {
      width: 250,
      margin: 2,
      color: { dark: '#2C3E3A', light: '#FFFFFF' },
    });
  } catch (err) {
    console.error('QR generation error:', err);
    return null;
  }
}
