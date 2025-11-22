import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, AlertTriangle, TrendingUp, TrendingDown, 
  FileText, Truck, ArrowRightLeft, Activity,
  Search, Filter, Download, Eye, Edit, Plus,
  Bell, LogOut, User, Settings, ChevronDown
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Search and filter states
  const [searchProduct, setSearchProduct] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lowStockOnly, setLowStockOnly] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/auth/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Mock data - replace with API calls
  const kpiData = {
    totalProducts: 1247,
    lowStockCount: 23,
    pendingReceipts: 8,
    pendingDeliveries: 12,
    scheduledTransfers: 5
  };

  const products = [
    { id: 1, sku: 'DESK001', name: 'Office Desk', category: 'Furniture', uom: 'pcs', totalQty: 45, reorderLevel: 10, lowStock: false, warehouse: 'WH/Stock1' },
    { id: 2, sku: 'CHAIR001', name: 'Office Chair', category: 'Furniture', uom: 'pcs', totalQty: 8, reorderLevel: 15, lowStock: true, warehouse: 'WH/Stock1' },
    { id: 3, sku: 'DESK002', name: 'Standing Desk', category: 'Furniture', uom: 'pcs', totalQty: 12, reorderLevel: 5, lowStock: false, warehouse: 'WH/Stock2' },
    { id: 4, sku: 'LAP001', name: 'Laptop Dell', category: 'Electronics', uom: 'pcs', totalQty: 3, reorderLevel: 10, lowStock: true, warehouse: 'WH/Stock1' },
    { id: 5, sku: 'MON001', name: 'Monitor 24"', category: 'Electronics', uom: 'pcs', totalQty: 25, reorderLevel: 8, lowStock: false, warehouse: 'WH/Stock2' },
  ];

  const lowStockItems = products.filter(p => p.lowStock).map(p => ({
    ...p,
    suggestedPO: (p.reorderLevel - p.totalQty) + 20
  }));

  const pendingReceipts = [
    { id: 1, receiptNo: 'WH/IN/0001', supplier: 'Azure Interior', expectedDate: '2025-11-23', warehouse: 'WH/Stock1', status: 'draft', totalLines: 3 },
    { id: 2, receiptNo: 'WH/IN/0002', supplier: 'Tech Supplies Co', expectedDate: '2025-11-24', warehouse: 'WH/Stock2', status: 'waiting', totalLines: 5 },
    { id: 3, receiptNo: 'WH/IN/0003', supplier: 'Office Depot', expectedDate: '2025-11-22', warehouse: 'WH/Stock1', status: 'ready', totalLines: 2 },
  ];

  const pendingDeliveries = [
    { id: 1, deliveryNo: 'WH/OUT/0001', customer: 'ABC Corp', warehouse: 'WH/Stock1', status: 'ready', dueDate: '2025-11-23' },
    { id: 2, deliveryNo: 'WH/OUT/0002', customer: 'XYZ Ltd', warehouse: 'WH/Stock2', status: 'waiting', dueDate: '2025-11-25' },
  ];

  const transfers = [
    { id: 1, transferNo: 'WH/TRF/0001', from: 'WH/Stock1', to: 'WH/Stock2', scheduledDate: '2025-11-24', status: 'draft', itemsCount: 4 },
    { id: 2, transferNo: 'WH/TRF/0002', from: 'WH/Stock2', to: 'WH/Stock1', scheduledDate: '2025-11-25', status: 'ready', itemsCount: 2 },
  ];

  const stockLedger = [
    { id: 1, date: '2025-11-22 14:30', txnType: 'Receipt', txnNo: 'WH/IN/0001', product: 'Office Desk', delta: '+6', balance: 45, warehouse: 'WH/Stock1', location: 'A1', user: 'Parthiv' },
    { id: 2, date: '2025-11-22 13:15', txnType: 'Delivery', txnNo: 'WH/OUT/0001', product: 'Office Chair', delta: '-3', balance: 8, warehouse: 'WH/Stock1', location: 'B2', user: 'Shreya' },
    { id: 3, date: '2025-11-22 11:00', txnType: 'Adjustment', txnNo: 'WH/ADJ/0001', product: 'Laptop Dell', delta: '-2', balance: 3, warehouse: 'WH/Stock1', location: 'C3', user: 'Admin' },
  ];

  const warehouseBreakdown = [
    { warehouse: 'WH/Stock1', totalStock: 456, lowStockCount: 15, locationCount: 8 },
    { warehouse: 'WH/Stock2', totalStock: 791, lowStockCount: 8, locationCount: 12 },
  ];

  const topMovers = [
    { id: 1, product: 'Office Chair', sku: 'CHAIR001', qtySold: 145, turnoverRate: '12.3%' },
    { id: 2, product: 'Laptop Dell', sku: 'LAP001', qtySold: 89, turnoverRate: '8.9%' },
    { id: 3, product: 'Monitor 24"', sku: 'MON001', qtySold: 67, turnoverRate: '6.7%' },
  ];

  const activities = [
    { id: 1, action: 'Receipt WH/IN/0001 validated', user: 'Parthiv Patel', time: '10 mins ago', type: 'receipt' },
    { id: 2, action: 'Delivery WH/OUT/0002 shipped', user: 'Shreya Shah', time: '25 mins ago', type: 'delivery' },
    { id: 3, action: 'Stock adjustment for DESK001', user: 'Admin', time: '1 hour ago', type: 'adjustment' },
    { id: 4, action: 'Transfer WH/TRF/0001 created', user: 'Parthiv Patel', time: '2 hours ago', type: 'transfer' },
  ];

  const alerts = [
    { id: 1, type: 'danger', message: 'CHAIR001 is critically low (8 units)', time: '5 mins ago' },
    { id: 2, type: 'warning', message: 'Receipt WH/IN/0003 overdue by 2 days', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'LAP001 below reorder level', time: '3 hours ago' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ fontSize: '18px', color: 'var(--muted)' }}>Loading...</div>
      </div>
    );
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchProduct.toLowerCase()) || 
                         p.sku.toLowerCase().includes(searchProduct.toLowerCase());
    const matchesWarehouse = warehouseFilter === 'all' || p.warehouse === warehouseFilter;
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesLowStock = !lowStockOnly || p.lowStock;
    return matchesSearch && matchesWarehouse && matchesCategory && matchesLowStock;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Navigation */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>📦</div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)' }}>
            StockMaster Dashboard
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Bell size={20} style={{ color: 'var(--muted)', cursor: 'pointer' }} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--danger)',
              color: 'white',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}>3</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
            <ChevronDown size={16} style={{ color: 'var(--muted)' }} />
          </div>
          
          <button
            className="btn btn-surface"
            onClick={handleLogout}
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Total Products</div>
              <Package size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{kpiData.totalProducts}</div>
            <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>
              <TrendingUp size={12} style={{ display: 'inline', marginRight: '4px' }} />
              +12% from last month
            </div>
          </div>

          <div className="card" style={{ padding: '20px', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Low Stock</div>
              <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--danger)' }}>{kpiData.lowStockCount}</div>
            <div style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>
              Requires attention
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Pending Receipts</div>
              <FileText size={20} style={{ color: 'var(--warning)' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{kpiData.pendingReceipts}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
              Awaiting validation
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Pending Deliveries</div>
              <Truck size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{kpiData.pendingDeliveries}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
              Ready to ship
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '500' }}>Scheduled Transfers</div>
              <ArrowRightLeft size={20} style={{ color: 'var(--accent)' }} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{kpiData.scheduledTransfers}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
              Internal movements
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
          <div className="flex-between" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Products Inventory</h2>
            <button className="btn btn-primary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} />
              Add Product
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
            
            <select value={warehouseFilter} onChange={(e) => setWarehouseFilter(e.target.value)} style={{ minWidth: '150px' }}>
              <option value="all">All Warehouses</option>
              <option value="WH/Stock1">WH/Stock1</option>
              <option value="WH/Stock2">WH/Stock2</option>
            </select>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ minWidth: '150px' }}>
              <option value="all">All Categories</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={lowStockOnly}
                onChange={(e) => setLowStockOnly(e.target.checked)}
              />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Low Stock Only</span>
            </label>

            <button className="btn btn-surface" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={16} />
              Export
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>UoM</th>
                  <th>Total Qty</th>
                  <th>Reorder Level</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.uom}</td>
                    <td style={{ fontWeight: '600' }}>{product.totalQty}</td>
                    <td>{product.reorderLevel}</td>
                    <td>
                      {product.lowStock ? (
                        <span className="status-pill" style={{ background: 'var(--danger)', color: 'white' }}>Low Stock</span>
                      ) : (
                        <span className="status-pill" style={{ background: 'var(--success)', color: 'white' }}>In Stock</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-surface" style={{ padding: '4px 8px', fontSize: '12px' }}>
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-surface" style={{ padding: '4px 8px', fontSize: '12px' }}>
                          <Edit size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Low Stock Table */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
              Low / Out of Stock Items
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Reorder</th>
                    <th>Suggested PO</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: '600', fontSize: '13px' }}>{item.sku}</td>
                      <td style={{ fontSize: '13px' }}>{item.name}</td>
                      <td style={{ color: 'var(--danger)', fontWeight: '600', fontSize: '13px' }}>{item.totalQty}</td>
                      <td style={{ fontSize: '13px' }}>{item.reorderLevel}</td>
                      <td style={{ fontSize: '13px' }}>{item.suggestedPO} {item.uom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} />
              Alerts & Notifications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {alerts.map(alert => (
                <div key={alert.id} style={{
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  background: alert.type === 'danger' ? '#fee' : '#fffbeb',
                  borderLeft: `4px solid ${alert.type === 'danger' ? 'var(--danger)' : 'var(--warning)'}`
                }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>{alert.message}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Receipts */}
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Pending Receipts</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Receipt No</th>
                  <th>Supplier</th>
                  <th>Expected Date</th>
                  <th>Warehouse</th>
                  <th>Status</th>
                  <th>Total Lines</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingReceipts.map(receipt => (
                  <tr key={receipt.id}>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{receipt.receiptNo}</td>
                    <td>{receipt.supplier}</td>
                    <td>{receipt.expectedDate}</td>
                    <td>{receipt.warehouse}</td>
                    <td><span className={`status-pill status-${receipt.status}`}>{receipt.status}</span></td>
                    <td>{receipt.totalLines}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                        Receive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Deliveries */}
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Pending Deliveries</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Delivery No</th>
                  <th>Customer</th>
                  <th>Warehouse</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeliveries.map(delivery => (
                  <tr key={delivery.id}>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{delivery.deliveryNo}</td>
                    <td>{delivery.customer}</td>
                    <td>{delivery.warehouse}</td>
                    <td><span className={`status-pill status-${delivery.status}`}>{delivery.status}</span></td>
                    <td>{delivery.dueDate}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                        Ship
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Internal Transfers */}
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Internal Transfers Schedule</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Transfer No</th>
                  <th>From → To</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                  <th>Items Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map(transfer => (
                  <tr key={transfer.id}>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{transfer.transferNo}</td>
                    <td>{transfer.from} → {transfer.to}</td>
                    <td>{transfer.scheduledDate}</td>
                    <td><span className={`status-pill status-${transfer.status}`}>{transfer.status}</span></td>
                    <td>{transfer.itemsCount}</td>
                    <td>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                        Execute
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Ledger / Move History */}
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Stock Movement History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Txn Type</th>
                  <th>Txn No</th>
                  <th>Product</th>
                  <th>Delta</th>
                  <th>Balance</th>
                  <th>Warehouse</th>
                  <th>Location</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {stockLedger.map(entry => (
                  <tr key={entry.id}>
                    <td style={{ fontSize: '13px' }}>{entry.date}</td>
                    <td style={{ fontSize: '13px' }}>{entry.txnType}</td>
                    <td style={{ fontWeight: '600', fontSize: '13px', color: 'var(--primary)' }}>{entry.txnNo}</td>
                    <td style={{ fontSize: '13px' }}>{entry.product}</td>
                    <td style={{ 
                      fontWeight: '600', 
                      fontSize: '13px',
                      color: entry.delta.startsWith('+') ? 'var(--success)' : 'var(--danger)' 
                    }}>{entry.delta}</td>
                    <td style={{ fontSize: '13px' }}>{entry.balance}</td>
                    <td style={{ fontSize: '13px' }}>{entry.warehouse}</td>
                    <td style={{ fontSize: '13px' }}>{entry.location}</td>
                    <td style={{ fontSize: '13px' }}>{entry.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          {/* Warehouse Breakdown */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Warehouse Stock Breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {warehouseBreakdown.map((wh, idx) => (
                <div key={idx} style={{
                  padding: '16px',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e8f4ff'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}
                >
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{wh.warehouse}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <div>
                      <div className="text-muted">Total Stock</div>
                      <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--primary)' }}>{wh.totalStock}</div>
                    </div>
                    <div>
                      <div className="text-muted">Low Stock Items</div>
                      <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--danger)' }}>{wh.lowStockCount}</div>
                    </div>
                    <div>
                      <div className="text-muted">Locations</div>
                      <div style={{ fontSize: '20px', fontWeight: '600' }}>{wh.locationCount}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Movers */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Top Movers (Last 30 Days)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Qty Sold</th>
                    <th>Turnover</th>
                  </tr>
                </thead>
                <tbody>
                  {topMovers.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontSize: '13px' }}>{item.product}</td>
                      <td style={{ fontSize: '13px', fontWeight: '600' }}>{item.sku}</td>
                      <td style={{ fontSize: '13px', fontWeight: '600', color: 'var(--success)' }}>{item.qtySold}</td>
                      <td style={{ fontSize: '13px' }}>{item.turnoverRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} />
              Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activities.map(activity => (
                <div key={activity.id} style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: activity.type === 'receipt' ? 'var(--success)' : 
                               activity.type === 'delivery' ? 'var(--primary)' : 
                               activity.type === 'adjustment' ? 'var(--warning)' : 'var(--accent)',
                    marginTop: '6px',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', marginBottom: '4px' }}>{activity.action}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      by {activity.user} · {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
