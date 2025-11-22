import React from 'react';

const styles = `
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.select-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  width: 100%;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

.select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.select:disabled {
  background-color: var(--color-surface);
  cursor: not-allowed;
}

.select-error {
  border-color: var(--color-danger);
}

.select-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.select-error-text {
  font-size: var(--font-size-xs);
  color: var(--color-danger);
}

.text-danger {
  color: var(--color-danger);
  margin-left: 0.25rem;
}
`;

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = 'Select...',
  className = '',
  ...props
}) => {
  return (
    <>
      <style>{styles}</style>
      <div className="select-wrapper">
        {label && (
          <label htmlFor={name} className="select-label">
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`select ${error ? 'select-error' : ''} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="select-error-text">{error}</span>}
      </div>
    </>
  );
};

export default Select;