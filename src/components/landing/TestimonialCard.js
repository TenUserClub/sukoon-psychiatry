'use client';

import { useState, useEffect, useCallback } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    text: 'Dr. Bhatia is incredibly understanding and patient. She made me feel comfortable from the very first session. My anxiety has improved significantly.',
    author: 'A.K., 28',
  },
  {
    text: 'I was skeptical about online therapy, but the experience was seamless. Dr. Bhatia is thorough and genuinely cares about her patients.',
    author: 'R.S., 35',
  },
  {
    text: "After years of struggling, I finally found the right help. Dr. Bhatia's approach is holistic and her medication management is excellent.",
    author: 'P.M., 42',
  },
];

/**
 * TestimonialCard - auto-rotates through patient testimonials every 5 seconds.
 * Smooth CSS transitions on opacity + transform between testimonials.
 * Uses a styled CSS quotation mark instead of emoji.
 */
export default function TestimonialCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToIndex = useCallback((index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToNext = useCallback(() => {
    goToIndex((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goToIndex]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const active = testimonials[activeIndex];

  return (
    <ScrollReveal>
      <div className="testimonials-container">
        <div
          className="testimonial-card"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div
            className="testimonial-quote"
            aria-hidden="true"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '3rem',
              color: 'var(--primary-light)',
              lineHeight: 1,
              marginBottom: '0.5rem',
              userSelect: 'none',
            }}
          >
            &ldquo;
          </div>
          <p className="testimonial-text">{active.text}</p>
          <p className="testimonial-author">&mdash; {active.author}</p>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot${index === activeIndex ? ' active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
