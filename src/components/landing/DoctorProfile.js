'use client';

import Link from 'next/link';
import Image from 'next/image';
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
                {/* Decorative offset frame */}
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    left: -24,
                    width: '100%',
                    height: '100%',
                    borderRadius: '1.5rem',
                    border: '2px solid var(--primary)',
                    opacity: 0.15,
                    zIndex: -1,
                  }}
                  aria-hidden="true"
                />
                {/* Main avatar image */}
                <div
                  style={{
                    width: 320,
                    height: 400,
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 12px 40px rgba(var(--primary-rgb), 0.25)',
                  }}
                  aria-hidden="true"
                >
                  <Image 
                    src="/dr-aditi.jpg" 
                    alt="Dr. Aditi Bhatia" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    priority
                  />
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
