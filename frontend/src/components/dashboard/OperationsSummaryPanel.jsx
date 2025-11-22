// src/components/dashboard/OperationsSummaryPanel.jsx
import React from "react";

const OperationsSummaryPanel = ({
  title,
  data = {},
  onClick,
}) => {
  const {
    total = 0,
    toProcess = 0,
    waiting = 0,
    ready = 0,
    late = 0,
  } = data;

  return (
    <div
      className="rounded-xl shadow-md p-4 bg-[var(--surface)] cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="flex-between mb-2">
        <h2 className="text-[16px] font-semibold text-[var(--text)]">
          {title}
        </h2>
        <span className="text-xs text-[var(--muted)]">
          {total} operations
        </span>
      </div>

      <div className="flex gap-4 mt-2 text-sm">
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--text)]">
            {toProcess}
          </span>
          <span className="text-[var(--muted)]">
            {title === "Receipts" ? "To Receive" : "To Deliver"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-[var(--text)]">
            {waiting}
          </span>
          <span className="text-[var(--muted)]">Waiting</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-[var(--primary)]">
            {ready}
          </span>
          <span className="text-[var(--muted)]">Ready</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-[var(--danger)]">
            {late}
          </span>
          <span className="text-[var(--muted)]">Late</span>
        </div>
      </div>
    </div>
  );
};

export default OperationsSummaryPanel;
