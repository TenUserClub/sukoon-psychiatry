/**
 * HowItWorks section — 3-step visual guide explaining the booking flow.
 * Connectors between steps use dashed gradient lines (hidden on mobile).
 */
export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: '📅',
      title: 'Choose Your Session',
      description:
        'Browse our services and pick a date & time that works for you.',
    },
    {
      number: 2,
      icon: '💳',
      title: 'Pay Securely',
      description:
        'Scan UPI QR code or pay online. Quick and hassle-free.',
    },
    {
      number: 3,
      icon: '📹',
      title: 'Meet on Google Meet',
      description:
        'Join your private video consultation from anywhere in India.',
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Getting started is simple — book, pay, and connect with Dr. Bhatia
          in three easy steps.
        </p>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {/* Dashed connector between steps (not on last step) */}
              {index < steps.length - 1 && (
                <div className="step-connector" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
