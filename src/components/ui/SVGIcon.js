'use client';

/**
 * SVGIcon - Clean inline SVG icon system replacing all emojis.
 * Each icon uses currentColor for automatic theme compatibility.
 * Usage: <SVGIcon name="stethoscope" size={20} />
 */

const icons = {
  stethoscope: (
    <>
      <path d="M6 9V4a1 1 0 0 1 1-1h1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 9V4a1 1 0 0 0-1-1h-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14a4 4 0 0 1-4-4V9h8v1a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="14" r="1.5" fill="currentColor" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="12 6 12 12 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="16 10 22 6 22 18 16 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  ),
  'credit-card': (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92Z" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="22 7 12 13 2 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  'chevron-down': (
    <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-right': (
    <polyline points="9 6 15 12 9 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  brain: (
    <>
      <path d="M12 2a5 5 0 0 0-4.78 3.53A4 4 0 0 0 4 9.5a4.5 4.5 0 0 0 .68 7.25A3.5 3.5 0 0 0 8 22h1V12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2a5 5 0 0 1 4.78 3.53A4 4 0 0 1 20 9.5a4.5 4.5 0 0 1-.68 7.25A3.5 3.5 0 0 1 16 22h-1V12" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 2h6a1 1 0 0 1 1 1v1H8V3a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  pill: (
    <>
      <path d="M10.5 1.5l-8 8a4.95 4.95 0 0 0 7 7l8-8a4.95 4.95 0 0 0-7-7Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="6.5" y1="9.5" x2="14.5" y2="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="translate(2, 5)" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="19" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 15h2a3 3 0 0 1 3 3v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  'arrow-right': (
    <>
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <polyline points="12 5 19 12 12 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" fill="currentColor" />
  ),
  'music-note': (
    <>
      <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  'volume-on': (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'volume-off': (
    <>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'alert-circle': (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  'log-out': (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline points="16 17 21 12 16 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'bar-chart': (
    <>
      <line x1="12" y1="20" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="20" x2="18" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  rupee: (
    <>
      <line x1="6" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 4c0 0 0 12 8 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 4c-4 0-6 2-6 4s2 4 6 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

export default function SVGIcon({ name, size = 24, className = '', style = {} }) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`svg-icon ${className}`}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
