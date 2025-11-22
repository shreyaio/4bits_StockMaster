import React from 'react';
import StatusPill from '../common/StatusPill';

const styles = `
.kanban-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.kanban-column {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 1rem;
  min-height: 400px;
}

.kanban-column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-border);
}

.kanban-column-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  text-transform: capitalize;
}

.kanban-column-count {
  background-color: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  min-width: 1.5rem;
  text-align: center;
}

.kanban-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kanban-card {
  background-color: white;
  border-radius: var(--radius-md);
  padding: 1rem;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--color-border);
}

.kanban-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.kanban-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.kanban-card-reference {
  font-weight: 600;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
}

.kanban-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.kanban-card-row {
  display: flex;
  justify-content: space-between;
}

.kanban-card-label {
  font-weight: 500;
}

.kanban-empty {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: 2rem 1rem;
}
`;

const KanbanBoard = ({ items = [], onCardClick, groupByStatus = true }) => {
  const statuses = ['draft', 'waiting', 'ready', 'done'];
  
  const groupedItems = statuses.reduce((acc, status) => {
    acc[status] = items.filter(item => item.status === status);
    return acc;
  }, {});

  return (
    <>
      <style>{styles}</style>
      <div className="kanban-board">
        {statuses.map(status => (
          <div key={status} className="kanban-column">
            <div className="kanban-column-header">
              <span className="kanban-column-title">{status}</span>
              <span className="kanban-column-count">
                {groupedItems[status].length}
              </span>
            </div>
            <div className="kanban-cards">
              {groupedItems[status].length > 0 ? (
                groupedItems[status].map(item => (
                  <div
                    key={item.id}
                    className="kanban-card"
                    onClick={() => onCardClick && onCardClick(item)}
                  >
                    <div className="kanban-card-header">
                      <span className="kanban-card-reference">{item.reference}</span>
                      <StatusPill status={item.status} />
                    </div>
                    <div className="kanban-card-info">
                      {item.from && (
                        <div className="kanban-card-row">
                          <span className="kanban-card-label">From:</span>
                          <span>{item.from}</span>
                        </div>
                      )}
                      {item.to && (
                        <div className="kanban-card-row">
                          <span className="kanban-card-label">To:</span>
                          <span>{item.to}</span>
                        </div>
                      )}
                      {item.scheduleDate && (
                        <div className="kanban-card-row">
                          <span className="kanban-card-label">Date:</span>
                          <span>{item.scheduleDate}</span>
                        </div>
                      )}
                      {item.responsible && (
                        <div className="kanban-card-row">
                          <span className="kanban-card-label">Responsible:</span>
                          <span>{item.responsible}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="kanban-empty">
                  No items in {status}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;