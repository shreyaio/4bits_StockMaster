import React, { useState } from 'react';

export default function WarehouseDetails() {
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    address: ''
  });
  
  const [status] = useState('Draft');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving warehouse:', formData);
  };

  const handleDiscard = () => {
    setFormData({ name: '', shortCode: '', address: '' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          min-height: 100vh;
          font-family: "Inter", sans-serif;
          background: var(--bg);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
        }

        button {
          cursor: pointer;
          border: none;
          outline: none;
        }

        input, select, textarea {
          outline: none;
          border: 1px solid #e5e7eb;
          font-size: 14px;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        :root {
          --bg: #ffffff;
          --surface: #F5F8FB;  
          --primary: #2B86FF;
          --primary-600: #1f6fe6;
          --accent: #F6C84C;
          --muted: #9AA8B2;
          --text: #0E2433;
          --danger: #E04545;
          --success: #2FB76B;
          --warning: #E8B500;
          --gray: #C3CBD2;
          --radius: 10px;
          --shadow: 0 4px 12px rgba(8,34,49,0.05);
        }

        .page-container {
          padding: 24px;
          width: 100%;
        }

        .card {
          background: var(--surface);
          padding: 16px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }

        .btn {
          padding: 8px 18px;
          border-radius: var(--radius);
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }
        .btn-primary:hover {
          background: var(--primary-600);
        }

        .btn-surface {
          background: var(--surface);
          color: var(--text);
        }

        .btn-danger {
          background: var(--danger);
          color: white;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        th {
          padding: 14px;
          text-align: left;
          font-weight: 500;
          color: var(--muted);
          border-bottom: 1px solid #e5e7eb;
        }

        td {
          padding: 14px;
          color: var(--text);
          border-bottom: 1px solid #edf0f3;
        }

        tr:hover {
          background: rgba(43, 134, 255, 0.06);
          transition: 0.15s ease-in-out;
        }

        .status-pill {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          text-transform: capitalize;
        }

        .status-draft { background: var(--gray); color: var(--text); }
        .status-waiting { background: var(--warning); color: #000; }
        .status-ready { background: var(--primary); color: white; }
        .status-done { background: var(--success); color: white; }
        .status-cancelled { background: var(--muted); color: white; }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--surface);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--primary);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--primary-600);
        }

        input, select, textarea {
          padding: 10px;
          border-radius: var(--radius);
          border: 1px solid #d6d9de;
          background: white;
          width: 100%;
          font-family: inherit;
          color: var(--text);
          font-size: 14px;
        }

        input:focus, select:focus, textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(43, 134, 255, 0.18);
          outline: none;
        }

        input::placeholder, textarea::placeholder {
          color: #9ca3af;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .flex-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-muted { color: var(--muted); }
        .text-danger { color: var(--danger); }
        .text-success { color: var(--success); }
        .text-primary { color: var(--primary); }

        .navbar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 24px;
        }

        .nav-item {
          padding: 8px 16px;
          border-radius: var(--radius);
          font-size: 14px;
          font-weight: 500;
          transition: 0.2s;
          background: transparent;
          color: var(--muted);
        }

        .nav-item:hover {
          background: var(--surface);
          color: var(--text);
        }

        .nav-item.active {
          background: var(--surface);
          color: var(--primary);
          font-weight: 600;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 8px;
        }

        .form-helper {
          font-size: 12px;
          color: var(--muted);
          margin-top: 6px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 20px;
        }

        .breadcrumb span:hover {
          color: var(--primary);
          cursor: pointer;
        }

        .card-header {
          background: white;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          border-radius: var(--radius) var(--radius) 0 0;
        }

        .card-body {
          background: white;
          padding: 24px;
        }

        .card-footer {
          background: var(--surface);
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          border-radius: 0 0 var(--radius) var(--radius);
        }

        .info-banner {
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: var(--radius);
          padding: 14px;
          display: flex;
          gap: 12px;
        }

        .info-icon {
          width: 20px;
          height: 20px;
          background: var(--warning);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }

        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          transition: 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Top Navigation Bar */}
        <nav className="navbar">
          <div className="flex-between">
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--primary)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '700'
                }}>
                  📦
                </div>
                <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)' }}>
                  Stock Master
                </span>
              </div>
              
              {/* Navigation */}
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="nav-item">Dashboard</button>
                <button className="nav-item active">Operations</button>
                <button className="nav-item">Products</button>
                <button className="nav-item">Move History</button>
                <button className="nav-item">Settings</button>
              </div>
            </div>
            
            {/* Profile */}
            <div style={{
              width: '36px',
              height: '36px',
              background: 'var(--primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              JD
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <span>Operations</span>
            <span>/</span>
            <span>Warehouses</span>
            <span>/</span>
            <span style={{ color: 'var(--text)', fontWeight: '600' }}>New Warehouse</span>
          </div>

          {/* Page Header */}
          <div className="flex-between" style={{ marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)', marginBottom: '4px' }}>
                Warehouse
              </h1>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Manage warehouse details and location information
              </p>
            </div>
            
            <div>
              <span className={`status-pill status-${status.toLowerCase()}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Main Card */}
          <div className="card" style={{ background: 'white', padding: 0 }}>
            {/* Card Header */}
            <div className="card-header">
              <div className="flex-between">
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)' }}>
                    General Information
                  </h2>
                  <p className="text-muted" style={{ fontSize: '12px', marginTop: '2px' }}>
                    Enter basic warehouse details
                  </p>
                </div>
                <span className="text-muted" style={{ fontSize: '12px' }}>
                  Last updated: Today at 2:45 PM
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Name Field */}
                <div>
                  <label className="form-label">
                    Warehouse Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Main Distribution Center"
                  />
                  <p className="form-helper">
                    The full name of your warehouse facility
                  </p>
                </div>

                {/* Short Code Field */}
                <div>
                  <label className="form-label">
                    Short Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.shortCode}
                    onChange={(e) => handleInputChange('shortCode', e.target.value.toUpperCase())}
                    placeholder="e.g., WH-01"
                    maxLength={10}
                    style={{ maxWidth: '320px', fontFamily: 'monospace' }}
                  />
                  <p className="form-helper">
                    Unique identifier for quick reference (max 10 characters)
                  </p>
                </div>

                {/* Address Field */}
                <div>
                  <label className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={4}
                    placeholder="Enter complete warehouse address"
                  />
                  <p className="form-helper">
                    Complete physical address including city and postal code
                  </p>
                </div>

                {/* Info Banner */}
                <div className="info-banner">
                  <div className="info-icon">!</div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#92400e', marginBottom: '4px' }}>
                      Important
                    </p>
                    <p style={{ fontSize: '12px', color: '#78350f' }}>
                      Changes to warehouse details will affect all associated inventory locations and stock moves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="card-footer">
              <div className="flex-between">
                <button className="btn btn-surface" onClick={handleDiscard}>
                  Discard
                </button>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-surface">
                    Save as Draft
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save & Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px', 
            marginTop: '24px' 
          }}>
            <StatCard 
              title="Total Locations"
              value="24"
              change="+3 this month"
              positive
            />
            <StatCard 
              title="Active Products"
              value="1,847"
              change="+127 this week"
              positive
            />
            <StatCard 
              title="Recent Moves"
              value="562"
              change="Last 7 days"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, change, positive }) {
  return (
    <div className="stat-card">
      <div style={{ marginBottom: '12px' }}>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          color: 'var(--muted)', 
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title}
        </span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>
        {value}
      </div>
      <div className={positive ? 'text-success' : 'text-muted'} style={{ fontSize: '12px', fontWeight: '500' }}>
        {change}
      </div>
    </div>
  );
}