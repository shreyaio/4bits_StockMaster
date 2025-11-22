import React from 'react';
import { Trash2 } from 'lucide-react';
import Button from '../common/Button';

const styles = `
.product-line-row {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.product-line-row:last-child {
  border-bottom: none;
}
`;

const ProductLineRow = ({ 
  product, 
  index, 
  onProductChange, 
  onRemove, 
  availableProducts = [],
  disabled = false 
}) => {
  return (
    <>
      <style>{styles}</style>
      <div className="product-line-row">
        <select
          value={product.productId || ''}
          onChange={(e) => onProductChange(index, 'productId', e.target.value)}
          disabled={disabled}
          style={{
            padding: '0.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
            width: '100%'
          }}
        >
          <option value="">Select Product</option>
          {availableProducts.map(p => (
            <option key={p.id} value={p.id}>
              [{p.id}] {p.name}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          value={product.quantity || 0}
          onChange={(e) => onProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
          disabled={disabled}
          min="0"
          style={{
            padding: '0.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-sm)',
            width: '100%'
          }}
        />
        
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(index)}
          disabled={disabled}
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </>
  );
};

export default ProductLineRow;