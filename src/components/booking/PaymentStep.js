'use client';

import { useState } from 'react';
import UpiQrCode from './UpiQrCode';
import { CLINIC_UPI_ID } from '@/lib/constants';

export default function PaymentStep({ service, onPaymentComplete }) {
  const [utr, setUtr] = useState('');
  const [copied, setCopied] = useState(false);

  const upiId = CLINIC_UPI_ID;

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  // Free service — no payment needed
  if (service.fee === 0) {
    return (
      <div className="payment-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2>No Payment Required</h2>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          This is a free introductory call. No payment is needed.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() =>
            onPaymentComplete({ method: 'free', status: 'confirmed' })
          }
        >
          ✅ Confirm Booking
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Payment</h2>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        Scan the QR code or use the UPI ID to pay.
      </p>

      <div className="payment-card">
        <p className="text-muted">Amount to pay</p>
        <div className="payment-amount">₹{service.fee.toLocaleString('en-IN')}</div>
        <p className="text-sm text-muted">
          for {service.name} ({service.duration_minutes} min)
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
          <UpiQrCode upiId={upiId} amount={service.fee} />
        </div>

        <div className="upi-id-display">
          <span>{upiId}</span>
          <button className="copy-btn" onClick={copyUpiId} title="Copy UPI ID">
            {copied ? '✅' : '📋'}
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div className="input-group">
            <label>UTR / Transaction Reference Number</label>
            <input
              type="text"
              className="input"
              placeholder="Enter 12-digit UTR number"
              value={utr}
              onChange={(e) => setUtr(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12))}
              maxLength={12}
            />
            <span className="text-sm text-muted">
              Find this in your UPI app under transaction details
            </span>
          </div>
        </div>

        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={utr.length < 10}
          onClick={() =>
            onPaymentComplete({
              method: 'upi_manual',
              utr,
              status: 'pending_verification',
            })
          }
        >
          I&apos;ve Paid — Submit Booking
        </button>

        <div className="payment-divider">or</div>

        <button className="btn btn-outline" style={{ width: '100%', opacity: 0.5 }} disabled>
          💳 Pay with Razorpay — Coming Soon
        </button>
      </div>
    </div>
  );
}
