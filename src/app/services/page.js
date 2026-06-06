import Link from 'next/link';
import { DEFAULT_SERVICES } from '@/lib/constants';

export const metadata = {
  title: 'Our Services',
  description:
    'Explore psychiatric services offered by Sukoon Psychiatry — from free intro calls to extended consultations. Transparent fees in INR.',
};

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Our Services</h1>
          <p className="hero-subtitle animate-fade-in-up delay-1">
            Transparent, affordable psychiatric care — choose the session that
            fits your needs.
          </p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section">
        <div className="container">
          <div className="services-page-grid">
            {DEFAULT_SERVICES.filter((s) => s.is_active).map((service) => (
              <div
                key={service.id}
                className={`service-card card-hover${
                  service.fee === 0 ? ' featured' : ''
                }`}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 style={{ marginBottom: '0.5rem' }}>{service.name}</h3>
                <p
                  className="text-muted"
                  style={{ marginBottom: '1rem', lineHeight: 1.7 }}
                >
                  {service.description}
                </p>

                <div className="service-duration mb-2">
                  <span>⏱</span>
                  {service.duration_minutes} minutes
                </div>

                <div className="service-price">
                  {service.fee === 0 ? (
                    'FREE'
                  ) : (
                    <>
                      ₹{service.fee}
                      <span> / session</span>
                    </>
                  )}
                </div>

                <Link
                  href={`/book?service=${service.id}`}
                  className="btn btn-primary mt-3"
                  style={{ alignSelf: 'stretch', textAlign: 'center' }}
                >
                  {service.fee === 0 ? 'Book Free Call' : 'Book Now'}
                </Link>
              </div>
            ))}
          </div>

          <p
            className="text-center text-muted mt-5"
            style={{ fontSize: '0.9rem' }}
          >
            💡 All fees are in <strong>INR (₹)</strong> and are payable via UPI
            before the session. Online payment gateway (Razorpay) coming soon.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <h2>Not Sure Which Service You Need?</h2>
        <p>
          Start with a free introductory call — no commitment, no judgement.
        </p>
        <Link href="/book?service=srv-free-intro" className="btn btn-lg">
          Book Your Free Intro Call
        </Link>
      </section>
    </>
  );
}
