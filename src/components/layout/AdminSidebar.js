'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SVGIcon from '@/components/ui/SVGIcon';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'bar-chart' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'calendar' },
  { href: '/admin/availability', label: 'Availability', icon: 'clock' },
  { href: '/admin/services', label: 'Services', icon: 'stethoscope' },
  { href: '/admin/messages', label: 'Messages', icon: 'message' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('sukoon-admin-auth');
    router.push('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <SVGIcon name="brain" size={22} style={{ color: 'var(--primary-light)' }} />
        {' '}Sukoon <span>Admin</span>
      </div>

      <nav>
        {navLinks.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <SVGIcon name={link.icon} size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="admin-nav-divider" />

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="admin-nav-link"
      >
        <SVGIcon name="globe" size={18} />
        View Website
      </a>

      <button className="admin-nav-link" onClick={handleLogout} style={{ width: '100%' }}>
        <SVGIcon name="log-out" size={18} />
        Logout
      </button>
    </aside>
  );
}
