import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import Table from "../../components/common/Table";
import { StatusPill } from "../../components/common/StatusPill";

const MoveHistory = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["move-history", search],
    queryFn: () => operationsApi.getMoveHistory(search),
  });

  if (isLoading) return <div className="p-6">Loading move history...</div>;

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Move History
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => console.log("Kanban view toggle")}
            className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]"
          >
            <span>📦</span>
          </button>

          <button
            onClick={() => console.log("Search toggle")}
            className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]"
          >
            🔍
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-600)] transition"
            onClick={() => console.log("new move")}
          >
            NEW
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-sm text-[var(--muted)] border-b">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">Date</th>
              <th className="p-4">Contact</th>
              <th className="p-4">From</th>
              <th className="p-4">To</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr
                key={row._id}
                className="border-b last:border-none hover:bg-[rgba(43,134,255,0.06)] transition cursor-pointer"
                onClick={() => console.log("open details")}
              >
                <td className="p-4 font-medium text-[var(--text)]">{row.reference}</td>
                <td className="p-4">{row.date}</td>
                <td className="p-4">{row.contact}</td>
                <td className="p-4">{row.from}</td>
                <td className="p-4">{row.to}</td>

                {/* IN moves green, OUT moves red */}
                <td
                  className={`p-4 font-semibold ${
                    row.type === "IN" ? "text-[var(--success)]" : "text-[var(--danger)]"
                  }`}
                >
                  {row.qty}
                </td>

                <td className="p-4">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="p-6 text-center text-[var(--muted)]">No move records found</div>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
