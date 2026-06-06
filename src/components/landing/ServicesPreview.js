import Link from 'next/link';
import { DEFAULT_SERVICES } from '@/lib/constants';

/**
 * Services preview section — displays the first 4 services in a
 * responsive grid with featured highlight on the free intro call.
 */
export default function ServicesPreview() {
  const services = DEFAULT_SERVICES.slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive psychiatric care tailored to your needs — from
          introductory consultations to ongoing medication management.
        </p>

        <div className="grid-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card card-hover${index === 0 ? ' featured' : ''}`}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>

              <div className="service-duration" style={{ marginTop: '1rem' }}>
                <span>🕐</span>
                <span>{service.duration_minutes} minutes</span>
              </div>

              <div className="service-price">
                {service.fee === 0 ? (
                  'Free'
                ) : (
                  <>
                    ₹{service.fee}
                    <span> / session</span>
                  </>
                )}
              </div>

              <Link
                href={`/book?service=${service.id}`}
                className="btn btn-outline btn-sm"
                style={{ marginTop: '1.25rem', alignSelf: 'flex-start' }}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/services" className="btn btn-ghost">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
