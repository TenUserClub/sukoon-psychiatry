'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SVGIcon from '@/components/ui/SVGIcon';

/**
 * HowItWorks - 3-step visual guide explaining the booking flow.
 * Uses SVGIcons instead of emojis. Each step has a staggered ScrollReveal.
 * Dashed connectors between steps (hidden on mobile via CSS).
 */
const steps = [
  {
    number: 1,
    icon: 'calendar',
    title: 'Choose Your Session',
    description: 'Browse our services and pick a date & time that works for you.',
  },
  {
    number: 2,
    icon: 'credit-card',
    title: 'Pay Securely',
    description: 'Scan UPI QR code or pay online. Quick and hassle-free.',
  },
  {
    number: 3,
    icon: 'video',
    title: 'Meet on Google Meet',
    description: 'Join your private video consultation from anywhere in India.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting started is simple - book, pay, and connect with Dr. Bhatia
            in three easy steps.
          </p>
        </ScrollReveal>

        <div className="steps-container">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.15}>
              <div className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <SVGIcon name={step.icon} size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <SVGIcon name="chevron-right" size={24} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
