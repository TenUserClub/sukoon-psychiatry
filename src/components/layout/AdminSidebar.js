'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/availability', label: 'Availability', icon: '🕐' },
  { href: '/admin/services', label: 'Services', icon: '🏥' },
  { href: '/admin/messages', label: 'Messages', icon: '💬' },
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
        🧠 Sukoon <span>Admin</span>
      </div>

      <nav>
        {navLinks.map((link) => {
          // Exact match for /admin, startsWith for sub-routes
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
              <span>{link.icon}</span>
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
        <span>🌐</span>
        View Website
      </a>

      <button className="admin-nav-link" onClick={handleLogout} style={{ width: '100%' }}>
        <span>🚪</span>
        Logout
      </button>
    </aside>
  );
}
