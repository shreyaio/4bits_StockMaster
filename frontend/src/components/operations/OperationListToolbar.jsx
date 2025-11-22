import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const styles = `
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.toolbar-left {
  display: flex;
  gap: 0.5rem;
}

.toolbar-right {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-container {
  min-width: 300px;
}
`;

const OperationListToolbar = ({ 
  onNew, 
  searchValue, 
  onSearchChange, 
  rightContent 
}) => {
  return (
    <>
      <style>{styles}</style>
      <div className="toolbar">
        <div className="toolbar-left">
          <Button variant="primary" onClick={onNew}>
            <Plus size={16} />
            NEW
          </Button>
        </div>
        <div className="toolbar-right">
          {rightContent}
          <div className="search-container">
            <Input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OperationListToolbar;