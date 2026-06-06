'use client';

import { useState } from 'react';

export default function BookingForm({ details, onChange }) {
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
  };

  const handleChange = (field, value) => {
    onChange(field, value);
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    if (field === 'name' && !details.name?.trim()) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
    }
    if (field === 'phone') {
      if (!details.phone?.trim()) {
        setErrors((prev) => ({ ...prev, phone: 'Phone number is required' }));
      } else if (!validatePhone(details.phone)) {
        setErrors((prev) => ({ ...prev, phone: 'Enter a valid Indian phone number' }));
      }
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Your Details</h2>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        Tell us a bit about yourself so we can prepare for your session.
      </p>

      <div className="flex-col gap-3">
        <div className="input-group">
          <label>Full Name *</label>
          <input
            type="text"
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="Enter your full name"
            value={details.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            className={`input ${errors.phone ? 'input-error' : ''}`}
            placeholder="+91 XXXXXXXXXX"
            value={details.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="input-group">
          <label>Email (optional but recommended)</label>
          <input
            type="email"
            className="input"
            placeholder="your@email.com"
            value={details.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Age (optional)</label>
          <input
            type="number"
            className="input"
            placeholder="e.g. 30"
            min="1"
            max="120"
            value={details.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            style={{ maxWidth: '150px' }}
          />
        </div>

        <div className="input-group">
          <label>
            What brings you here? (optional)
          </label>
          <textarea
            className="textarea"
            placeholder="Brief description of your concern..."
            maxLength={500}
            rows={4}
            value={details.concern || ''}
            onChange={(e) => handleChange('concern', e.target.value)}
          />
          <span className="text-sm text-muted" style={{ textAlign: 'right' }}>
            {(details.concern || '').length}/500
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(var(--primary-rgb), 0.05)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>🔒</span>
        <span className="text-sm text-muted">
          Your information is kept strictly confidential and protected under medical ethics guidelines.
        </span>
      </div>
    </div>
  );
}
