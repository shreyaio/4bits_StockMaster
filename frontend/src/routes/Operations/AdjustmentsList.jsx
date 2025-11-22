import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import StatusPill from "../../components/common/StatusPill";

const AdjustmentsList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["adjustments", search],
    queryFn: () => operationsApi.getAdjustments(search),
  });

  if (isLoading) return <div className="p-6">Loading adjustments...</div>;

  const openAdjustmentForm = (id) => {
    window.location.href = `/operations/adjustment/${id}`;
  };

  return (
    <div className="p-6 w-full">
      <div className="flex-between mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Inventory Adjustment
        </h1>

        <div className="flex items-center gap-3">
          <input
            className="p-2 border rounded-lg"
            placeholder="Search adjustments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => openAdjustmentForm("new")}
            className="btn btn-primary"
          >
            NEW
          </button>
        </div>
      </div>

      <div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Product</th>
              <th>Location</th>
              <th>Counted Qty</th>
              <th>Difference</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr
                key={row._id}
                onClick={() => openAdjustmentForm(row._id)}
                className="hover:bg-[rgba(43,134,255,0.06)] cursor-pointer"
              >
                <td className="p-4 font-medium">{row.reference}</td>
                <td className="p-4">{row.productName}</td>
                <td className="p-4">{row.locationName}</td>
                <td className="p-4">{row.countedQty}</td>
                <td
                  className={`p-4 font-semibold ${
                    row.difference < 0
                      ? "text-[var(--danger)]"
                      : row.difference > 0
                      ? "text-[var(--success)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {row.difference}
                </td>
                <td className="p-4">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="p-6 text-center text-[var(--muted)]">
            No adjustments found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdjustmentsList;
