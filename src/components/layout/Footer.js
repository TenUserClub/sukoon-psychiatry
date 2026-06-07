import Link from 'next/link';
import SVGIcon from '@/components/ui/SVGIcon';
import { CLINIC_NAME, CLINIC_EMAIL, CLINIC_PHONE, CLINIC_ADDRESS, EMERGENCY_HELPLINES } from '@/lib/constants';
import { generateWhatsAppCTA } from '@/lib/whatsapp-links';

/**
 * Footer - site-wide footer with brand, quick links, contact info, and emergency helplines.
 * All emojis replaced with SVGIcon components. Server component.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-col">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SVGIcon name="brain" size={20} />
            <span>{CLINIC_NAME}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic' }}>
            Peace of mind
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Compassionate, evidence-based psychiatric care from the comfort of your home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/#doctor" className="footer-link">About Dr. Bhatia</Link>
          <Link href="/#services" className="footer-link">Services</Link>
          <Link href="/book" className="footer-link">Book Session</Link>
          <Link href="/#contact" className="footer-link">Contact</Link>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${CLINIC_EMAIL}`} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SVGIcon name="mail" size={16} />
            <span>{CLINIC_EMAIL}</span>
          </a>
          <a href={`tel:${CLINIC_PHONE}`} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SVGIcon name="phone" size={16} />
            <span>{CLINIC_PHONE}</span>
          </a>
          <a
            href={generateWhatsAppCTA(CLINIC_PHONE)}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <SVGIcon name="whatsapp" size={16} />
            <span>Chat on WhatsApp</span>
          </a>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <SVGIcon name="map-pin" size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
            <span>{CLINIC_ADDRESS}</span>
          </p>
        </div>

        {/* Emergency Helplines */}
        <div className="footer-col">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SVGIcon name="alert-circle" size={16} />
            <span>Emergency Helplines</span>
          </h4>
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
        &copy; {new Date().getFullYear()} {CLINIC_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
