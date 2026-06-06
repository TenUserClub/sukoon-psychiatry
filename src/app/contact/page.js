'use client';

import { useState } from 'react';
import {
  CLINIC_PHONE,
  CLINIC_EMAIL,
  CLINIC_ADDRESS,
  CLINIC_WHATSAPP,
  EMERGENCY_HELPLINES,
} from '@/lib/constants';
import { generateWhatsAppCTA } from '@/lib/whatsapp-links';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
      setForm({ name: '', email: '', phone: '', message: '' });

      // Reset toast after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      {/* Toast notification */}
      {status === 'sent' && (
        <div className="toast toast-success animate-fade-in-up">
          ✅ Message sent successfully! We&apos;ll get back to you shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="toast toast-error animate-fade-in-up">
          ❌ {errorMsg || 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Contact Us</h1>
          <p className="hero-subtitle animate-fade-in-up delay-1">
            We&apos;d love to hear from you. Reach out via the form below or
            through any of our channels.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* ── LEFT: Contact Form ── */}
            <div className="contact-form-col animate-fade-in-up">
              <div className="card" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Send a Message</h2>
                <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                  Fill out the form and we&apos;ll respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <label htmlFor="contact-name">
                      Full Name <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="input"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group mb-4">
                    <label htmlFor="contact-message">
                      Message <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="textarea"
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg${
                      status === 'sending' ? ' btn-loading' : ''
                    }`}
                    disabled={status === 'sending'}
                    style={{ width: '100%' }}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="btn-spinner" /> Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ── RIGHT: Contact Info ── */}
            <div className="contact-info-col animate-fade-in-up delay-2">
              {/* Info card */}
              <div className="card mb-3" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.25rem' }}>Clinic Information</h3>

                <div className="contact-info-row">
                  <span className="contact-info-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p className="text-muted text-sm">{CLINIC_ADDRESS}</p>
                  </div>
                </div>

                <div className="contact-info-row">
                  <span className="contact-info-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <p className="text-muted text-sm">
                      <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-row">
                  <span className="contact-info-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p className="text-muted text-sm">
                      <a href={`tel:${CLINIC_PHONE}`}>{CLINIC_PHONE}</a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp button */}
                <a
                  href={generateWhatsAppCTA(CLINIC_WHATSAPP)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn mt-3"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  💬 Chat on WhatsApp
                </a>
              </div>

              {/* Working hours */}
              <div className="card mb-3" style={{ padding: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>🕐 Working Hours</h4>
                <div className="working-hours-row">
                  <span>Monday — Friday</span>
                  <strong>10:00 AM — 1:00 PM</strong>
                </div>
                <div className="working-hours-row">
                  <span>Monday — Friday</span>
                  <strong>4:00 PM — 7:00 PM</strong>
                </div>
                <div className="working-hours-row" style={{ color: 'var(--error)' }}>
                  <span>Saturday — Sunday</span>
                  <strong>Closed</strong>
                </div>
              </div>

              {/* Map */}
              <div
                className="card"
                style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}
              >
                <iframe
                  title="Sukoon Psychiatry Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.3!2d80.946!3d26.856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRML+Hospital+Lucknow!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="250"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY HELPLINES ── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="section-title">🆘 Emergency Helplines</h2>
          <p className="section-subtitle">
            If you or someone you know is in crisis, please reach out
            immediately.
          </p>

          <div className="card" style={{ padding: '1.75rem' }}>
            {EMERGENCY_HELPLINES.map((line) => (
              <div key={line.name} className="emergency-item">
                <span>{line.name}</span>
                <span>
                  <a href={`tel:${line.phone}`}>{line.phone}</a>
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-muted mt-3" style={{ fontSize: '0.85rem' }}>
            These helplines are available 24/7 and are free to call.
          </p>
        </div>
      </section>
    </>
  );
}
