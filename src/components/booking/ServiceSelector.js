'use client';

import { DEFAULT_SERVICES } from '@/lib/constants';

export default function ServiceSelector({ selectedService, onSelect }) {
  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Select a Service</h2>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        Choose the type of consultation you need.
      </p>
      <div className="grid-2" style={{ gap: '1rem' }}>
        {DEFAULT_SERVICES.filter((s) => s.is_active).map((service) => (
          <div
            key={service.id}
            className={`service-card card-hover ${selectedService?.id === service.id ? '' : ''} ${service.fee === 0 ? 'featured' : ''}`}
            onClick={() => onSelect(service)}
            style={{
              cursor: 'pointer',
              borderColor:
                selectedService?.id === service.id
                  ? 'var(--primary)'
                  : undefined,
              boxShadow:
                selectedService?.id === service.id
                  ? 'var(--shadow-glow)'
                  : undefined,
            }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              {service.name}
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', flex: 1 }}>
              {service.description}
            </p>
            <div className="service-duration" style={{ marginBottom: '0.5rem' }}>
              🕐 {service.duration_minutes} minutes
            </div>
            <div className="service-price">
              {service.fee === 0 ? 'Free' : `₹${service.fee.toLocaleString('en-IN')}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
