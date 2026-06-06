import Link from 'next/link';
import { DOCTOR_NAME, DOCTOR_BIO } from '@/lib/constants';

/**
 * Doctor profile section — 2-column layout with a circular avatar
 * placeholder on the left and credentials + bio on the right.
 */
export default function DoctorProfile() {
  const credentials = ['MBBS', 'MD-Psychiatry', '8+ Years', 'RML Lucknow'];

  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Circular avatar placeholder */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--primary), var(--primary-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                boxShadow: '0 12px 40px rgba(var(--primary-rgb), 0.25)',
              }}
              aria-hidden="true"
            >
              👩‍⚕️
            </div>
          </div>

          {/* Doctor info */}
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

            <Link href="/about" className="btn btn-ghost">
              Learn More About Dr. Bhatia →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
