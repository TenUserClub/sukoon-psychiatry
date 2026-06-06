'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/layout/AdminSidebar';

/**
 * Admin layout — wraps all /admin/* pages with sidebar navigation.
 * Checks localStorage for auth; redirects to /admin/login if unauthenticated.
 * The public Navbar/Footer already hide themselves on /admin/* routes.
 */
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAuthed = localStorage.getItem('sukoon-admin-auth') === 'true';

    // Allow the login page to render without auth
    if (pathname === '/admin/login') {
      setAuthed(true); // Let it through — the login page is public
      setChecking(false);
      return;
    }

    if (!isAuthed) {
      router.push('/admin/login');
    } else {
      setAuthed(true);
    }
    setChecking(false);
  }, [pathname, router]);

  // Show nothing while checking auth (prevents flash)
  if (checking) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
        }}
      >
        <span className="btn-spinner" style={{
          width: 32,
          height: 32,
          border: '3px solid rgba(var(--primary-rgb),0.2)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      </div>
    );
  }

  if (!authed) return null;

  // Login page gets a clean layout without the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
