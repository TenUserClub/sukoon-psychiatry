'use client';

import SVGIcon from '@/components/ui/SVGIcon';

/**
 * Admin Dashboard - Overview page with stats, today's schedule, and recent activity.
 */
export default function AdminDashboardPage() {
  const stats = [
    { icon: 'calendar', label: "Today's Appointments", value: '3' },
    { icon: 'bell', label: 'Pending Verifications', value: '2' },
    { icon: 'bar-chart', label: 'This Week', value: '12' },
    { icon: 'rupee', label: 'Monthly Revenue', value: '₹15,000' },
  ];

  const todaySchedule = [
    {
      time: '10:00 AM',
      name: 'Rahul Sharma',
      service: 'Initial Consultation',
      status: 'confirmed',
    },
    {
      time: '10:30 AM',
      name: 'Priya Patel',
      service: 'Follow-up Session',
      status: 'confirmed',
    },
    {
      time: '11:00 AM',
      name: 'Amit Kumar',
      service: 'Initial Consultation',
      status: 'pending',
    },
  ];

  const recentActivity = [
    { icon: 'check', text: 'Payment verified for Rahul Sharma (BK-10234)', time: '2 hours ago' },
    { icon: 'calendar', text: 'New booking by Kavita Nair - Free Intro Call', time: '3 hours ago' },
    { icon: 'alert-circle', text: 'Booking cancelled by Arjun Reddy (BK-10240)', time: '5 hours ago' },
    { icon: 'rupee', text: 'Refund processed for Arjun Reddy - ₹1,000', time: '5 hours ago' },
    { icon: 'clipboard', text: 'Session completed for Meera Joshi - Follow-up notes added', time: '1 day ago' },
  ];

  const statusBadge = (status) => {
    const map = {
      confirmed: { variant: 'success', label: 'Confirmed' },
      pending: { variant: 'warning', label: 'Pending' },
      completed: { variant: 'info', label: 'Completed' },
      cancelled: { variant: 'error', label: 'Cancelled' },
    };
    const s = map[status] || { variant: 'default', label: status };
    return <span className={`badge badge-${s.variant}`}>{s.label}</span>;
  };

  return (
    <div>
      <h1 className="admin-page-title">Welcome back, Dr. Bhatia</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon">
              <SVGIcon name={stat.icon} size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          Today&apos;s Schedule
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {todaySchedule.map((appt, i) => (
            <div
              key={i}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--primary)',
                    minWidth: '80px',
                  }}
                >
                  {appt.time}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{appt.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {appt.service}
                  </div>
                </div>
              </div>
              {statusBadge(appt.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          Recent Activity
        </h3>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {recentActivity.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                borderBottom:
                  i < recentActivity.length - 1
                    ? '1px solid rgba(0,0,0,0.04)'
                    : 'none',
              }}
            >
              <span style={{ flexShrink: 0, color: 'var(--primary)' }}>
                <SVGIcon name={item.icon} size={18} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem' }}>{item.text}</div>
              </div>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
