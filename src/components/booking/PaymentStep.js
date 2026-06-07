'use client';

import { useState } from 'react';
import SVGIcon from '@/components/ui/SVGIcon';
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

  // Free service - no payment needed
  if (service.fee === 0) {
    return (
      <div className="payment-card" style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <SVGIcon name="check" size={28} style={{ color: '#10B981' }} />
        </div>
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
          <SVGIcon name="check" size={16} style={{ marginRight: '0.5rem' }} />
          Confirm Booking
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '0.5rem' }}>Payment</h3>
      <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Scan the QR code or use the UPI ID to pay.
      </p>

      <div className="payment-card">
        <p className="text-muted">Amount to pay</p>
        <div className="payment-amount">
          <SVGIcon name="rupee" size={20} style={{ marginRight: '0.25rem' }} />
          {service.fee.toLocaleString('en-IN')}
        </div>
        <p className="text-sm text-muted">
          for {service.name} ({service.duration_minutes} min)
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
          <UpiQrCode upiId={upiId} amount={service.fee} />
        </div>

        <div className="upi-id-display">
          <span>{upiId}</span>
          <button className="copy-btn" onClick={copyUpiId} title="Copy UPI ID">
            {copied ? (
              <SVGIcon name="check" size={16} style={{ color: '#10B981' }} />
            ) : (
              <SVGIcon name="clipboard" size={16} />
            )}
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
              onChange={(e) =>
                setUtr(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12))
              }
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
          I&apos;ve Paid - Submit Booking
        </button>

        <div className="payment-divider">or</div>

        <button
          className="btn btn-outline"
          style={{ width: '100%', opacity: 0.5 }}
          disabled
        >
          <SVGIcon name="credit-card" size={16} style={{ marginRight: '0.5rem' }} />
          Pay with Razorpay - Coming Soon
        </button>
      </div>
    </div>
  );
}
