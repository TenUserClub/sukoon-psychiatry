'use client';

import Link from 'next/link';
import SVGIcon from '@/components/ui/SVGIcon';

/**
 * Hero section - two-column grid (from CSS .hero) with text left and
 * decorative SVG illustration right. Staggered entrance animations,
 * credential badges with SVGIcons, and CTA buttons.
 */
export default function Hero() {
  return (
    <section className="hero">
      {/* Left column - text content */}
      <div className="hero-content">
        {/* Top pill label */}
        <div style={{ animationDelay: '0s' }} className="animate-fade-in-up">
          <span className="hero-label">
            Online Psychiatry
          </span>
        </div>

        {/* Title */}
        <div style={{ animationDelay: '0.15s' }} className="animate-fade-in-up">
          <h1 className="hero-title">
            Find your
            <br />
            <span className="gradient-text">Sukoon</span>
          </h1>

          <p className="hero-subtitle">Peace of mind, one session at a time</p>
        </div>

        {/* Badges */}
        <div style={{ animationDelay: '0.3s' }} className="animate-fade-in-up">
          <div className="hero-badges">
            <span className="hero-badge">
              <SVGIcon name="stethoscope" size={16} /> MBBS, MD Psychiatry
            </span>
            <span className="hero-badge">
              <SVGIcon name="star" size={16} /> 8+ Years
            </span>
            <span className="hero-badge">
              <SVGIcon name="map-pin" size={16} /> RML Lucknow
            </span>
            <span className="hero-badge">
              <SVGIcon name="globe" size={16} /> English &amp; Hindi
            </span>
          </div>

          <p className="hero-description">
            Expert psychiatric care and medication management from the comfort of
            your home. Book a video consultation with Dr. Aditi Bhatia today.
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ animationDelay: '0.45s' }} className="animate-fade-in-up">
          <div className="hero-cta">
            <Link href="/book" className="btn btn-primary btn-lg">
              Book Your Session
              <SVGIcon name="arrow-right" size={18} />
            </Link>
            <Link href="/#doctor" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Right column - decorative SVG illustration */}
      <div className="hero-illustration" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', maxWidth: 420, height: 'auto' }}
          aria-hidden="true"
        >
          {/* Background large circle */}
          <circle cx="200" cy="200" r="160" fill="var(--primary)" opacity="0.06" />

          {/* Layered organic blobs */}
          <ellipse cx="180" cy="170" rx="110" ry="100" fill="var(--primary-light)" opacity="0.1" />
          <ellipse cx="230" cy="230" rx="90" ry="80" fill="var(--secondary)" opacity="0.1" />

          {/* Floating circle - animated */}
          <circle cx="120" cy="100" r="40" fill="var(--primary)" opacity="0.12">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -12; 0 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Accent blob */}
          <circle cx="310" cy="130" r="30" fill="var(--accent)" opacity="0.2">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -8; 0 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Central organic shape */}
          <path
            d="M200 80 C260 80 320 140 320 200 C320 260 260 320 200 320 C140 320 80 260 80 200 C80 140 140 80 200 80Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.15"
          />

          {/* Inner decorative ring */}
          <circle cx="200" cy="200" r="100" fill="none" stroke="var(--primary-light)" strokeWidth="1" opacity="0.2" strokeDasharray="6 4" />

          {/* Floating small circles */}
          <circle cx="280" cy="280" r="18" fill="var(--secondary)" opacity="0.15">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -10; 0 0"
              dur="7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="90" cy="280" r="14" fill="var(--primary)" opacity="0.1">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -6; 0 0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Curved calming paths */}
          <path
            d="M100 250 Q150 200 200 220 Q250 240 300 190"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.2"
            strokeLinecap="round"
          />
          <path
            d="M120 180 Q170 150 220 170 Q270 190 340 160"
            fill="none"
            stroke="var(--primary-light)"
            strokeWidth="1.5"
            opacity="0.15"
            strokeLinecap="round"
          />

          {/* Soft dots */}
          <circle cx="160" cy="300" r="6" fill="var(--accent)" opacity="0.25" />
          <circle cx="340" cy="220" r="8" fill="var(--primary)" opacity="0.1" />
          <circle cx="70" cy="180" r="5" fill="var(--secondary)" opacity="0.2" />

          {/* Soft centre - abstract brain/mind */}
          <circle cx="200" cy="200" r="50" fill="var(--surface)" opacity="0.6" />
          <path
            d="M200 165 C190 165 180 172 180 182 C180 188 183 193 188 196 C185 200 184 206 184 210 C184 220 190 228 200 228 C210 228 216 220 216 210 C216 206 215 200 212 196 C217 193 220 188 220 182 C220 172 210 165 200 165Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.35"
          />
          <line x1="200" y1="165" x2="200" y2="228" stroke="var(--primary)" strokeWidth="1.5" opacity="0.25" />
        </svg>
      </div>
    </section>
  );
}
