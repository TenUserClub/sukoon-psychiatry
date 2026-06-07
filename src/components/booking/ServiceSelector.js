'use client';

import SVGIcon from '@/components/ui/SVGIcon';
import { DEFAULT_SERVICES } from '@/lib/constants';

export default function ServiceSelector({ selectedService, onSelect }) {
  const activeServices = DEFAULT_SERVICES.filter((s) => s.is_active);

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Select a Service</h2>
      <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
        Choose the type of consultation you need.
      </p>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '0.75rem',
          paddingBottom: '0.5rem',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {activeServices.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelect(service)}
              style={{
                minWidth: '160px',
                maxWidth: '180px',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'transparent'}`,
                background: isSelected
                  ? 'rgba(var(--primary-rgb), 0.04)'
                  : 'var(--surface)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                flexShrink: 0,
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SVGIcon name="check" size={10} style={{ color: 'white' }} />
                </div>
              )}
              <div style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>
                <SVGIcon name={service.icon} size={22} />
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3,
                }}
              >
                {service.name}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <SVGIcon name="clock" size={12} />
                {service.duration_minutes} min
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginTop: '0.35rem',
                  color: service.fee === 0 ? 'var(--primary)' : 'var(--text)',
                }}
              >
                {service.fee === 0 ? 'Free' : `₹${service.fee.toLocaleString('en-IN')}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
