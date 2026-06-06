'use client';

import { useState } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91-9876543210',
    message:
      'I would like to know more about the initial consultation process and fees.',
    is_read: false,
    created_at: '2024-01-15T10:30:00',
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@email.com',
    phone: '+91-9123456789',
    message:
      'Can I book a session for my mother? She has been dealing with anxiety issues.',
    is_read: false,
    created_at: '2024-01-14T14:20:00',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: '',
    phone: '+91-9988776655',
    message:
      'Is online consultation as effective as in-person? I am based in Delhi.',
    is_read: true,
    created_at: '2024-01-13T09:15:00',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    email: 'sneha.g@email.com',
    phone: '+91-9654321098',
    message:
      'Thank you for the wonderful session Dr. Bhatia. I am feeling much better already.',
    is_read: true,
    created_at: '2024-01-12T16:45:00',
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered =
    filter === 'unread' ? messages.filter((m) => !m.is_read) : messages;

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const getWhatsAppLink = (phone, name) => {
    const cleaned = phone.replace(/[^0-9+]/g, '');
    return `https://wa.me/${cleaned}?text=${encodeURIComponent(
      `Hi ${name}, this is Dr. Aditi Bhatia from Sukoon Psychiatry. Thank you for reaching out!`
    )}`;
  };

  return (
    <div>
      <h1 className="admin-page-title">Contact Messages</h1>

      {/* Filter tabs */}
      <div className="flex gap-2" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
          onClick={() => setFilter('all')}
        >
          All ({messages.length})
        </button>
        <button
          className={`btn ${filter === 'unread' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</p>
          <p className="text-muted">No messages to show.</p>
        </div>
      ) : (
        <div className="flex-col gap-2">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className="card"
              style={{
                borderLeft: msg.is_read
                  ? '3px solid transparent'
                  : '3px solid var(--primary)',
                cursor: 'pointer',
              }}
              onClick={() =>
                setExpanded(expanded === msg.id ? null : msg.id)
              }
            >
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <div className="flex items-center gap-2">
                  <h4 style={{ fontSize: '1rem' }}>{msg.name}</h4>
                  {!msg.is_read && (
                    <span className="badge badge-info">New</span>
                  )}
                </div>
                <span className="text-sm text-muted">
                  {formatDate(msg.created_at)}
                </span>
              </div>

              <div className="flex gap-3 text-sm text-muted" style={{ marginBottom: '0.5rem' }}>
                {msg.email && <span>📧 {msg.email}</span>}
                <span>📞 {msg.phone}</span>
              </div>

              <p
                className="text-sm"
                style={{
                  color: 'var(--text)',
                  overflow: expanded === msg.id ? 'visible' : 'hidden',
                  whiteSpace: expanded === msg.id ? 'normal' : 'nowrap',
                  textOverflow: expanded === msg.id ? 'unset' : 'ellipsis',
                }}
              >
                {msg.message}
              </p>

              {expanded === msg.id && (
                <div
                  className="flex gap-2"
                  style={{ marginTop: '1rem' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!msg.is_read && (
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => markAsRead(msg.id)}
                    >
                      ✅ Mark as Read
                    </button>
                  )}
                  <a
                    href={getWhatsAppLink(msg.phone, msg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                  >
                    💬 Reply via WhatsApp
                  </a>
                  {msg.email && (
                    <a
                      href={`mailto:${msg.email}`}
                      className="btn btn-outline btn-sm"
                    >
                      📧 Email
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
