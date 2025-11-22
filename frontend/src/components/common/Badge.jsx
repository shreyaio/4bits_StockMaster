import React from 'react';

const styles = `
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.badge-primary {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.badge-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
}

.badge-gray {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}
`;

const Badge = ({ children, variant = 'primary', className = '' }) => {
  return (
    <>
      <style>{styles}</style>
      <span className={`badge badge-${variant} ${className}`}>
        {children}
      </span>
    </>
  );
};

export default Badge;