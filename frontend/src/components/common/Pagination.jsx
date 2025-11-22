import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const styles = `
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.pagination-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  background: white;
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
}

.pagination-button:hover:not(:disabled) {
  background-color: var(--color-surface);
  border-color: var(--color-primary);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: 0 1rem;
}
`;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true
}) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <style>{styles}</style>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              className="pagination-button"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span style={{ padding: '0 0.5rem' }}>...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span style={{ padding: '0 0.5rem' }}>...</span>}
            <button
              className="pagination-button"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={16} />
        </button>

        {showInfo && (
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>
    </>
  );
};

export default Pagination;