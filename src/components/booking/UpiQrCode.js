'use client';

import { useState, useEffect } from 'react';
import { generateUpiLink, generateUpiQrDataUrl } from '@/lib/upi';

export default function UpiQrCode({ upiId, amount }) {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generate() {
      setLoading(true);
      const link = generateUpiLink(upiId, amount);
      const dataUrl = await generateUpiQrDataUrl(link);
      setQrUrl(dataUrl);
      setLoading(false);
    }
    generate();
  }, [upiId, amount]);

  return (
    <div className="qr-container">
      {loading ? (
        <div
          style={{
            width: 200,
            height: 200,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: 'var(--radius)',
          }}
        />
      ) : qrUrl ? (
        <img src={qrUrl} alt="UPI QR Code" style={{ width: 200, height: 200 }} />
      ) : (
        <p className="text-muted">Failed to generate QR code</p>
      )}
      <p className="text-sm text-muted" style={{ marginTop: '0.75rem', textAlign: 'center' }}>
        Scan with any UPI app - GPay, PhonePe, Paytm
      </p>
    </div>
  );
}
