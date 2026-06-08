'use client';

import Link from 'next/link';
import { DOCTOR_NAME, DOCTOR_BIO } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SVGIcon from '@/components/ui/SVGIcon';

/**
 * DoctorProfile - two-column layout with circular avatar placeholder (initials)
 * on the left and credentials + bio on the right. Uses ScrollReveal directional animations.
 */
export default function DoctorProfile() {
  const credentials = ['MBBS', 'MD-Psychiatry', '8+ Years'];

  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Circular avatar placeholder with initials */}
          <ScrollReveal direction="left">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                {/* Decorative outer ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -12,
                    borderRadius: '50%',
                    border: '2px dashed var(--primary-light)',
                    opacity: 0.3,
                  }}
                  aria-hidden="true"
                />
                {/* Main avatar circle */}
                <div
                  style={{
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 40px rgba(var(--primary-rgb), 0.25)',
                  }}
                  aria-hidden="true"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '4.5rem',
                      color: 'white',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    AB
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Doctor info */}
          <ScrollReveal direction="right">
            <div>
              <h2>{DOCTOR_NAME}</h2>

              <div
                className="flex flex-wrap gap-2"
                style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
              >
                {credentials.map((cred) => (
                  <span key={cred} className="badge badge-info">
                    {cred}
                  </span>
                ))}
              </div>

              <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {DOCTOR_BIO}
              </p>

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
