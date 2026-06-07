'use client';

import { useState } from 'react';
import SVGIcon from '@/components/ui/SVGIcon';
import { DEFAULT_SERVICES } from '@/lib/constants';

export default function AdminServicesPage() {
  const [services, setServices] = useState(
    DEFAULT_SERVICES.map((s) => ({ ...s }))
  );
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showNew, setShowNew] = useState(false);
  const [newService, setNewService] = useState({
    name: '', description: '', duration_minutes: 30, fee: 0, icon: 'stethoscope', is_active: true,
  });

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditData({ ...service });
  };

  const saveEdit = () => {
    setServices((prev) =>
      prev.map((s) => (s.id === editingId ? { ...s, ...editData } : s))
    );
    setEditingId(null);
  };

  const addService = () => {
    const id = 'srv-' + Date.now();
    setServices((prev) => [
      ...prev,
      { ...newService, id, sort_order: prev.length },
    ]);
    setNewService({ name: '', description: '', duration_minutes: 30, fee: 0, icon: 'stethoscope', is_active: true });
    setShowNew(false);
  };

  const toggleActive = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
    );
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          Manage Services
        </h1>
        <button className="btn btn-primary" onClick={() => setShowNew(!showNew)}>
          {showNew ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {showNew && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>New Service</h3>
          <div className="grid-2 gap-2" style={{ marginBottom: '1rem' }}>
            <div className="input-group">
              <label>Icon (name)</label>
              <input className="input" value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                style={{ maxWidth: 80 }} />
            </div>
            <div className="input-group">
              <label>Name</label>
              <input className="input" value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Duration (min)</label>
              <input type="number" className="input" value={newService.duration_minutes}
                onChange={(e) => setNewService({ ...newService, duration_minutes: Number(e.target.value) })} />
            </div>
            <div className="input-group">
              <label>Fee (₹)</label>
              <input type="number" className="input" value={newService.fee}
                onChange={(e) => setNewService({ ...newService, fee: Number(e.target.value) })} />
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label>Description</label>
            <textarea className="textarea" value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          </div>
          <button className="btn btn-primary" onClick={addService} disabled={!newService.name}>
            Add Service
          </button>
        </div>
      )}

      <div className="grid-2" style={{ gap: '1rem' }}>
        {services.map((service) => (
          <div key={service.id} className="card" style={{ opacity: service.is_active ? 1 : 0.6 }}>
            {editingId === service.id ? (
              <div>
                <div className="grid-2 gap-2" style={{ marginBottom: '0.75rem' }}>
                  <div className="input-group">
                    <label>Icon</label>
                    <input className="input" value={editData.icon}
                      onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                      style={{ maxWidth: 80 }} />
                  </div>
                  <div className="input-group">
                    <label>Name</label>
                    <input className="input" value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <label>Duration</label>
                    <input type="number" className="input" value={editData.duration_minutes}
                      onChange={(e) => setEditData({ ...editData, duration_minutes: Number(e.target.value) })} />
                  </div>
                  <div className="input-group">
                    <label>Fee (₹)</label>
                    <input type="number" className="input" value={editData.fee}
                      onChange={(e) => setEditData({ ...editData, fee: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="input-group" style={{ marginBottom: '0.75rem' }}>
                  <label>Description</label>
                  <textarea className="textarea" value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={saveEdit}>Save</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '1.5rem' }}><SVGIcon name={service.icon} size={24} /></span>
                    <h3 style={{ fontSize: '1.1rem' }}>{service.name}</h3>
                  </div>
                  <span className={`badge ${service.is_active ? 'badge-success' : 'badge-default'}`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-muted" style={{ marginBottom: '0.75rem' }}>
                  {service.description}
                </p>
                <div className="flex-between text-sm" style={{ marginBottom: '1rem' }}>
                  <span><SVGIcon name="clock" size={14} /> {service.duration_minutes} min</span>
                  <span className="font-bold" style={{ color: 'var(--primary)' }}>
                    {service.fee === 0 ? 'Free' : `₹${service.fee}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="action-btn" onClick={() => startEdit(service)}>Edit</button>
                  <button className="action-btn" onClick={() => toggleActive(service.id)}>
                    {service.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
