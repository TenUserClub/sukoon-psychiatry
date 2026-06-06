import Link from 'next/link';
import { CLINIC_NAME, CLINIC_EMAIL, CLINIC_PHONE, CLINIC_ADDRESS, EMERGENCY_HELPLINES } from '@/lib/constants';
import { generateWhatsAppCTA } from '@/lib/whatsapp-links';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-col">
          <div className="footer-logo">🧠 {CLINIC_NAME}</div>
          <p>सुकून — peace of mind</p>
          <p style={{ marginTop: '0.75rem' }}>
            Compassionate, evidence-based psychiatric care from the comfort of your home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About Dr. Bhatia</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/book" className="footer-link">Book Now</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${CLINIC_EMAIL}`} className="footer-link">📧 {CLINIC_EMAIL}</a>
          <a href={`tel:${CLINIC_PHONE}`} className="footer-link">📞 {CLINIC_PHONE}</a>
          <a
            href={generateWhatsAppCTA(CLINIC_PHONE)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            💬 Chat on WhatsApp
          </a>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>📍 {CLINIC_ADDRESS}</p>
        </div>

        {/* Emergency Helplines */}
        <div className="footer-col">
          <h4>🆘 Emergency Helplines</h4>
          <p style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>
            If you or someone you know is in crisis:
          </p>
          {EMERGENCY_HELPLINES.map((h) => (
            <div key={h.name} className="emergency-item">
              <span>{h.name}</span>
              <span>
                <a href={`tel:${h.phone}`} style={{ color: 'inherit' }}>
                  {h.phone}
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {CLINIC_NAME}. All rights reserved. | Made with ❤️ for mental health
      </div>
    </footer>
  );
}
