import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, TrendingUp, Shield, BarChart3 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            📦 StockMaster IMS
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
            Inventory Management System
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Complete solution for managing inventory, warehouses, receipts, deliveries, and real-time stock tracking
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          padding: '60px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <Package size={48} style={{ color: 'var(--primary)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Real-Time Tracking
            </h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Track inventory across multiple warehouses and locations in real-time
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <TrendingUp size={48} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Smart Analytics
            </h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Get insights on stock levels, movements, and forecasting
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <Shield size={48} style={{ color: 'var(--accent)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Secure & Reliable
            </h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Role-based access control and complete audit trail
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
            <BarChart3 size={48} style={{ color: 'var(--danger)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Comprehensive Reports
            </h3>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Generate detailed reports and export data easily
            </p>
          </div>
        </div>

        {/* Key Features List */}
        <div style={{
          padding: '0 40px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--primary)' }}>
              ✓ Operations Management
            </h4>
            <ul style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Receipts (Incoming Stock)</li>
              <li>Deliveries (Outgoing Stock)</li>
              <li>Internal Transfers</li>
              <li>Stock Adjustments</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--primary)' }}>
              ✓ Warehouse Features
            </h4>
            <ul style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Multi-warehouse support</li>
              <li>Location-based tracking</li>
              <li>Reorder level management</li>
              <li>Low stock alerts</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--primary)' }}>
              ✓ Reporting & Analytics
            </h4>
            <ul style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Stock movement history</li>
              <li>Fast-moving items analysis</li>
              <li>Warehouse breakdown</li>
              <li>Activity feed & audit logs</li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{
          padding: '0 40px 60px',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/auth/login')}
            style={{
              fontSize: '16px',
              padding: '14px 40px',
              minWidth: '160px'
            }}
          >
            Login
          </button>
          <button
            className="btn btn-surface"
            onClick={() => navigate('/auth/signup')}
            style={{
              fontSize: '16px',
              padding: '14px 40px',
              minWidth: '160px'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div style={{
          background: 'var(--surface)',
          padding: '20px 40px',
          textAlign: 'center',
          fontSize: '14px',
          color: 'var(--muted)'
        }}>
          © 2025 StockMaster IMS. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Home;
