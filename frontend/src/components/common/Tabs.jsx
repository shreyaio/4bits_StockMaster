import React from 'react';

const styles = `
.tabs-container {
  width: 100%;
}

.tabs-list {
  display: flex;
  border-bottom: 2px solid var(--color-border);
  gap: 0.5rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-button:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

.tab-button.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-content {
  padding: 1.5rem 0;
}
`;

const Tabs = ({ tabs = [], activeTab, onChange, children }) => {
  return (
    <>
      <style>{styles}</style>
      <div className="tabs-container">
        <div className="tabs-list">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab-button ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{children}</div>
      </div>
    </>
  );
};

export default Tabs;