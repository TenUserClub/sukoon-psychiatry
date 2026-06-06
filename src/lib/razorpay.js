import Razorpay from 'razorpay';
import crypto from 'crypto';

function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || keyId === 'rzp_test_xxxxx') return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export async function createOrder(amount, currency = 'INR', receipt = '') {
  try {
    const rz = getRazorpayInstance();
    if (!rz) {
      console.log('[Razorpay] Not configured, returning mock order.');
      return { id: 'order_mock_' + Date.now(), amount, currency, status: 'created' };
    }
    return await rz.orders.create({
      amount: amount * 100, // Razorpay expects paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    });
  } catch (err) {
    console.error('[Razorpay] Order creation failed:', err.message);
    throw err;
  }
}

export function verifyPayment(orderId, paymentId, signature) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
}
