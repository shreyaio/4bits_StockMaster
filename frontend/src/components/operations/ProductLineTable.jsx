import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import Button from '../common/Button';

const styles = `
.product-line-table {
  width: 100%;
  overflow-x: auto;
}

.product-line-table .table {
  width: 100%;
  border-collapse: collapse;
}

.product-line-table thead {
  background-color: var(--color-surface);
}

.product-line-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
}

.product-line-table td {
  padding: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.product-line-table tbody tr:last-child td {
  border-bottom: none;
}
`;

const ProductLineTable = ({ 
  products = [], 
  onProductChange, 
  onRemoveProduct, 
  onAddProduct,
  availableProducts = [] 
}) => {
  return (
    <>
      <style>{styles}</style>
      <div className="product-line-table">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id || index}>
                <td>
                  <select
                    value={product.productId || ''}
                    onChange={(e) => onProductChange(index, 'productId', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)'
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
                    value={product.quantity || 0}
                    onChange={(e) => onProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    min="0"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)'
                    }}
                  />
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onRemoveProduct(index)}
                    disabled={products.length === 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="secondary" onClick={onAddProduct} style={{ width: '100%' }}>
            <Plus size={16} />
            Add Product Line
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductLineTable;