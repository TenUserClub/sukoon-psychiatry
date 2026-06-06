'use client';

import { useState, useEffect, useCallback } from 'react';

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
 * TestimonialCard — auto-rotates through patient testimonials every 5 seconds.
 * Users can also click dot indicators to jump to a specific testimonial.
 */
export default function TestimonialCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const active = testimonials[activeIndex];

  return (
    <div className="testimonials-container">
      <div className="testimonial-card animate-fade-in" key={activeIndex}>
        <div className="testimonial-quote">&ldquo;</div>
        <p className="testimonial-text">{active.text}</p>
        <p className="testimonial-author">— {active.author}</p>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
