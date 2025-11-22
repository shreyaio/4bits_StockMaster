// src/components/filters/OperationsFilterBar.jsx
import React from "react";

const docTypes = [
  { label: "All documents", value: "" },
  { label: "Receipts", value: "receipt" },
  { label: "Delivery", value: "delivery" },
  { label: "Internal Transfers", value: "transfer" },
  { label: "Adjustments", value: "adjustment" },
];

const statuses = [
  { label: "All status", value: "" },
  { label: "Draft", value: "DRAFT" },
  { label: "Waiting", value: "WAITING" },
  { label: "Ready", value: "READY" },
  { label: "Done", value: "DONE" },
  { label: "Canceled", value: "CANCELED" },
];

const OperationsFilterBar = ({ filters, onChange }) => {
  const update = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <select
        className="p-2 border rounded-lg text-sm"
        value={filters.docType || ""}
        onChange={(e) => update("docType", e.target.value)}
      >
        {docTypes.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded-lg text-sm"
        value={filters.status || ""}
        onChange={(e) => update("status", e.target.value)}
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <input
        className="p-2 border rounded-lg text-sm"
        placeholder="Warehouse (code or name)"
        value={filters.warehouse || ""}
        onChange={(e) => update("warehouse", e.target.value)}
      />

      <input
        className="p-2 border rounded-lg text-sm"
        placeholder="Product category"
        value={filters.category || ""}
        onChange={(e) => update("category", e.target.value)}
      />
    </div>
  );
};

export default OperationsFilterBar;
