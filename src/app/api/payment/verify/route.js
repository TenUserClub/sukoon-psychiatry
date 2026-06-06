import { NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/razorpay';

/**
 * POST /api/payment/verify
 * Verifies payment based on the payment method:
 * - upi_manual: Marks as pending_verification (UTR submitted for manual check)
 * - razorpay: Verifies the Razorpay signature cryptographically
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { payment_method } = body;

    // UPI manual payment — UTR submitted, awaiting admin verification
    if (payment_method === 'upi_manual') {
      const { utr_number, booking_id } = body;

      if (!utr_number) {
        return NextResponse.json({ error: 'UTR number is required' }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        payment_status: 'pending_verification',
        message: 'UTR submitted for verification. Your booking will be confirmed once payment is verified by the clinic.',
        booking_id: booking_id || null,
        utr_number,
      });
    }

    // Razorpay payment verification
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing Razorpay verification fields (razorpay_order_id, razorpay_payment_id, razorpay_signature)' },
        { status: 400 }
      );
    }

    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isValid) {
      return NextResponse.json({
        success: true,
        payment_status: 'paid',
        message: 'Payment verified successfully',
        razorpay_payment_id,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Payment verification failed — invalid signature' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
