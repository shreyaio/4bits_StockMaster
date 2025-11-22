import React from 'react';

const styles = `
.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: capitalize;
}

.status-draft {
  background-color: #f3f4f6;
  color: var(--color-status-draft);
}

.status-waiting {
  background-color: #fef3c7;
  color: #92400e;
}

.status-ready {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-done {
  background-color: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background-color: #f3f4f6;
  color: var(--color-status-cancelled);
}
`;

const StatusPill = ({ status, className = '' }) => {
  return (
    <>
      <style>{styles}</style>
      <span className={`status-pill status-${status.toLowerCase()} ${className}`}>
        {status}
      </span>
    </>
  );
};

export default StatusPill;