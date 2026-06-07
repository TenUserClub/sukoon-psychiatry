'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SVGIcon from '@/components/ui/SVGIcon';

const faqData = [
  {
    question: 'What is the difference between a psychiatrist and psychologist?',
    answer:
      'A psychiatrist is a medical doctor (MBBS + MD) who can diagnose mental health conditions AND prescribe medication. A psychologist provides therapy but cannot prescribe. Dr. Bhatia is a fully qualified psychiatrist.',
  },
  {
    question: 'How does online consultation work?',
    answer:
      'After booking, you receive a Google Meet link. At your appointment time, click the link to join a private video call. You need stable internet and a quiet space.',
  },
  {
    question: 'Is my information confidential?',
    answer:
      'Absolutely. All consultations and records are strictly confidential, following medical ethics guidelines. Your privacy is our top priority.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI payments (GPay, PhonePe, Paytm) via QR code, as well as credit/debit cards and net banking through our secure payment gateway.',
  },
  {
    question: 'Can you prescribe medication online?',
    answer:
      'Yes. As a licensed psychiatrist (MBBS, MD), Dr. Bhatia can prescribe medication during teleconsultations, per Telemedicine Practice Guidelines of India.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer:
      'Please contact us at least 24 hours before your appointment. Reach us via WhatsApp or email.',
  },
];

/**
 * FAQ accordion - expands/collapses answers on click.
 * Only one answer is open at a time; clicking the open item closes it.
 * Uses SVGIcon chevron-down that rotates 180deg when open.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <ScrollReveal>
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-subtitle">
        Have questions? We have answers. If you don&apos;t find what you&apos;re
        looking for, feel free to reach out.
      </p>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item${openIndex === index ? ' open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <span
                className="faq-icon"
                style={{
                  display: 'inline-flex',
                  transition: 'transform 0.3s ease',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <SVGIcon name="chevron-down" size={20} />
              </span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
