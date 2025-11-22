import React from 'react';

const styles = `
.table-container {
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.table-row {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s;
  cursor: pointer;
}

.table-row:hover {
  background-color: var(--color-surface);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 1rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}
`;

const Table = ({ columns = [], data = [], onRowClick }) => {
  return (
    <>
      <style>{styles}</style>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="table-header">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="table-row"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="table-cell">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;