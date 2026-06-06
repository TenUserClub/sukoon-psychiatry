'use client';

import Link from 'next/link';

/**
 * Hero section — full-width landing banner with gradient background,
 * floating decorative shapes, credential badges, and CTA buttons.
 */
export default function Hero() {
  return (
    <section className="hero">
      {/* Decorative floating shapes for visual depth */}
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />

      <div className="hero-content animate-fade-in-up">
        <h1 className="hero-title">
          Find your
          <br />
          <span className="gradient-text">Sukoon</span>
        </h1>

        <p className="hero-subtitle">
          Peace of mind, one session at a time
        </p>

        <div className="hero-badges">
          <span className="hero-badge">🩺 MBBS, MD Psychiatry</span>
          <span className="hero-badge">⭐ 8+ Years Experience</span>
          <span className="hero-badge">🏥 RML Lucknow</span>
          <span className="hero-badge">🗣️ English &amp; Hindi</span>
        </div>

        <p className="hero-description">
          Expert psychiatric care and medication management from the comfort of
          your home. Book a video consultation with Dr. Aditi Bhatia today.
        </p>

        <div className="hero-cta">
          <Link href="/book" className="btn btn-primary btn-lg">
            Book Your Session →
          </Link>
          <Link href="/about" className="btn btn-outline btn-lg">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
