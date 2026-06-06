'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple credential check
    if (email === 'admin@sukoonpsychiatry.in' && password === 'admin123') {
      localStorage.setItem('sukoon-admin-auth', 'true');
      router.push('/admin');
    } else {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧠</div>
        <h1>Admin Login</h1>
        <p className="text-muted">Sign in to access the Sukoon Psychiatry admin dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label>Email</label>
            <input
              type="email"
              className="input"
              placeholder="admin@sukoonpsychiatry.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label>Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div
              style={{
                color: 'var(--error)',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                padding: '0.75rem',
                background: 'rgba(199,91,91,0.08)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? <span className="btn-spinner" /> : null}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
