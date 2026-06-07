'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#doctor', label: 'About Dr. Aditi' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Don't show public navbar on admin pages
  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <nav className={`navbar navbar-glass ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C12 2 8 6 8 12c0 4 2 7 4 9 1.5 1.5 3 3 4 6 1-3 2.5-4.5 4-6 2-2 4-5 4-9 0-6-4-10-8-10z" fill="currentColor" opacity="0.2"/>
              <path d="M16 4C13 4 10 7 10 12c0 3.5 1.5 6 3.5 8 1 1 2 2.5 2.5 4.5.5-2 1.5-3.5 2.5-4.5 2-2 3.5-4.5 3.5-8 0-5-3-8-6-8z" fill="currentColor"/>
              <circle cx="16" cy="11" r="2.5" fill="white"/>
            </svg>
            Sukoon
          </Link>

          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/book" className="btn btn-primary btn-sm nav-cta">
                Book Now
              </Link>
            </div>
          </div>

          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ padding: '1rem' }}>
          <Link
            href="/book"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={() => setMobileOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
