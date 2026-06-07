'use client';

import Link from 'next/link';
import { DEFAULT_SERVICES } from '@/lib/constants';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SVGIcon from '@/components/ui/SVGIcon';

/**
 * ServicesPreview - displays the first 4 services in a responsive grid.
 * First card is featured. Uses ScrollReveal for staggered entrance animations.
 */
export default function ServicesPreview() {
  const services = DEFAULT_SERVICES.slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive psychiatric care tailored to your needs - from
            introductory consultations to ongoing medication management.
          </p>
        </ScrollReveal>

        <div className="grid-4">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1} style={{ height: '100%' }}>
              <div
                className={`service-card card-hover${index === 0 ? ' featured' : ''}`}
              >
                <div className="service-icon">
                  <SVGIcon name={service.icon} size={24} />
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>

                <div className="service-duration" style={{ marginTop: '1rem' }}>
                  <SVGIcon name="clock" size={14} />
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
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
