// routes/Operations/ReceiptForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

const ReceiptForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id && id !== 'new');

  // Form state
  const [formData, setFormData] = useState({
    reference: '',
    receiveFrom: '',
    responsible: '',
    scheduleDate: '',
    status: 'draft'
  });

  const [products, setProducts] = useState([
    { id: 1, productId: '', productName: '', quantity: 0 }
  ]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock products list - Replace with API call
  const availableProducts = [
    { id: 'DESK001', name: 'Desk' },
    { id: 'CHAIR001', name: 'Office Chair' },
    { id: 'STEEL001', name: 'Steel Rods' },
    { id: 'TABLE001', name: 'Conference Table' }
  ];

  // Load existing receipt data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Replace with actual API call
      setLoading(true);
      setTimeout(() => {
        setFormData({
          reference: 'WH/IN/0001',
          receiveFrom: 'Azure Interior',
          responsible: 'Dazzling Squid',
          scheduleDate: '2025-11-22',
          status: 'draft'
        });
        setProducts([
          { id: 1, productId: 'DESK001', productName: 'Desk', quantity: 6 }
        ]);
        setLoading(false);
      }, 500);
    } else {
      // Auto-generate reference for new receipt
      setFormData(prev => ({ ...prev, reference: generateReference() }));
    }
  }, [id, isEditMode]);

  // Generate auto-incremented reference
  const generateReference = () => {
    // In production, this should come from backend
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `WH/IN/${year}${month}001`;
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle product line changes
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    
    // Auto-fill product name when product is selected
    if (field === 'productId') {
      const selectedProduct = availableProducts.find(p => p.id === value);
      updatedProducts[index].productName = selectedProduct ? selectedProduct.name : '';
    }
    
    setProducts(updatedProducts);
  };

  // Add new product line
  const addProductLine = () => {
    setProducts([...products, { 
      id: Date.now(), 
      productId: '', 
      productName: '', 
      quantity: 0 
    }]);
  };

  // Remove product line
  const removeProductLine = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.receiveFrom.trim()) {
      newErrors.receiveFrom = 'Receive From is required';
    }
    if (!formData.scheduleDate) {
      newErrors.scheduleDate = 'Schedule Date is required';
    }
    
    // Validate products
    const hasEmptyProduct = products.some(p => !p.productId || p.quantity <= 0);
    if (hasEmptyProduct) {
      newErrors.products = 'All products must have a selection and quantity > 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save as draft
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // API call to save receipt
      const payload = {
        ...formData,
        products: products.filter(p => p.productId)
      };
      console.log('Saving receipt:', payload);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate('/operations/receipts');
      }, 1000);
    } catch (error) {
      console.error('Error saving receipt:', error);
      setLoading(false);
    }
  };

  // Validate receipt (move to Ready/Done)
  const handleValidate = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // API call to validate receipt
      console.log('Validating receipt');
      
      setTimeout(() => {
        setLoading(false);
        navigate('/operations/receipts');
      }, 1000);
    } catch (error) {
      console.error('Error validating receipt:', error);
      setLoading(false);
    }
  };

  // Print receipt
  const handlePrint = () => {
    window.print();
  };

  // Cancel and go back
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Unsaved changes will be lost.')) {
      navigate('/operations/receipts');
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button 
          className="btn btn-surface" 
          onClick={() => navigate('/operations/receipts')}
          style={{ marginBottom: '16px', padding: '6px 12px' }}
        >
          <ArrowLeft size={16} style={{ marginRight: '6px' }} />
          Back
        </button>
        
        <div className="flex-between" style={{ marginBottom: '8px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text)' }}>
            Receipt
          </h1>
          
          {/* Status Indicator */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className={`status-pill status-${formData.status}`}>
              {formData.status}
            </span>
            <select 
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              style={{ minWidth: '120px' }}
            >
              <option value="draft">Draft</option>
              <option value="ready">Ready</option>
              <option value="done">Done</option>
            </select>
            <span style={{ color: 'var(--muted)', fontSize: '20px' }}>...</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={handleValidate} disabled={loading}>
            Validate
          </button>
          <button className="btn btn-surface" onClick={handlePrint}>
            Print
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="card">
        {/* Reference */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text)' }}>
            {formData.reference}
          </h2>
        </div>

        {/* Form Fields Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Receive From */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '6px',
              color: 'var(--text)'
            }}>
              Receive From
              <span style={{ textDecoration: 'underline', color: 'var(--primary)' }}>_</span>
            </label>
            <input
              type="text"
              name="receiveFrom"
              value={formData.receiveFrom}
              onChange={handleInputChange}
              placeholder="Enter supplier name"
              style={{
                width: '100%',
                borderColor: errors.receiveFrom ? 'var(--danger)' : '#d6d9de'
              }}
            />
            {errors.receiveFrom && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {errors.receiveFrom}
              </span>
            )}
          </div>

          {/* Schedule Date */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '6px',
              color: 'var(--text)'
            }}>
              Schedule Date
              <span style={{ textDecoration: 'underline', color: 'var(--primary)' }}>_</span>
            </label>
            <input
              type="date"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleInputChange}
              style={{
                width: '100%',
                borderColor: errors.scheduleDate ? 'var(--danger)' : '#d6d9de'
              }}
            />
            {errors.scheduleDate && (
              <span style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px', display: 'block' }}>
                {errors.scheduleDate}
              </span>
            )}
          </div>

          {/* Responsible */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '6px',
              color: 'var(--text)'
            }}>
              Responsible
              <span style={{ textDecoration: 'underline', color: 'var(--primary)' }}>_</span>
            </label>
            <input
              type="text"
              name="responsible"
              value={formData.responsible}
              onChange={handleInputChange}
              placeholder="Auto-filled with current user"
              style={{ width: '100%' }}
            />
            <span style={{ 
              fontSize: '12px', 
              color: 'var(--muted)', 
              marginTop: '4px', 
              display: 'block',
              fontStyle: 'italic'
            }}>
              Auto fill with the current logged in users.
            </span>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: 'var(--text)'
          }}>
            Products
          </h3>

          {/* Products Table */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            marginBottom: '12px'
          }}>
            <table style={{ marginBottom: 0 }}>
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th style={{ width: '50%' }}>Product</th>
                  <th style={{ width: '30%' }}>Quantity</th>
                  <th style={{ width: '20%', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} style={{ background: 'white' }}>
                    <td>
                      <select
                        value={product.productId}
                        onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                        style={{ 
                          width: '100%',
                          border: '1px solid #e5e7eb',
                          padding: '8px'
                        }}
                      >
                        <option value="">Select Product</option>
                        {availableProducts.map(p => (
                          <option key={p.id} value={p.id}>
                            [{p.id}] {p.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="0"
                        style={{ 
                          width: '100%',
                          border: '1px solid #e5e7eb',
                          padding: '8px'
                        }}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => removeProductLine(index)}
                        disabled={products.length === 1}
                        className="btn"
                        style={{
                          padding: '6px 10px',
                          background: products.length === 1 ? 'var(--gray)' : 'var(--danger)',
                          color: 'white',
                          cursor: products.length === 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Button */}
          <button 
            className="btn btn-surface" 
            onClick={addProductLine}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} />
            New Product
          </button>

          {errors.products && (
            <span style={{ 
              fontSize: '12px', 
              color: 'var(--danger)', 
              marginTop: '8px', 
              display: 'block' 
            }}>
              {errors.products}
            </span>
          )}
        </div>

        {/* Save Button at Bottom */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={loading}
            style={{ minWidth: '120px' }}
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save size={16} style={{ marginRight: '6px' }} />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Flow Info - Right Side Notes */}
      <div style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'var(--surface)',
        padding: '16px',
        borderRadius: 'var(--radius)',
        border: '2px dashed var(--primary)',
        maxWidth: '250px',
        fontSize: '12px',
        lineHeight: '1.6'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: 'var(--text)' }}>Status Flow:</strong>
        </div>
        <div style={{ color: 'var(--muted)' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Draft</strong> - Initial Stage
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Ready</strong> - Ready to Receive
          </div>
          <div>
            <strong>Done</strong> - Received
          </div>
        </div>
        <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
        <div style={{ color: 'var(--muted)', fontSize: '11px' }}>
          • Click <strong>Validate</strong> to mark as Done
          <br />
          • Once Done, stock increases automatically
        </div>
      </div>
    </div>
  );
};

export default ReceiptForm;