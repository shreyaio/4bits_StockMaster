import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import StatusPill from "../../components/common/StatusPill";

const TransfersList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["transfers", search],
    queryFn: () => operationsApi.getTransfers(search),
  });

  if (isLoading) return <div className="p-6">Loading transfer records...</div>;

  const openTransferForm = (id) => {
    window.location.href = `/operations/transfer/${id}`;
  };

  return (
    <div className="p-6 w-full">
      <div className="flex-between mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Internal Transfers
        </h1>

        <div className="flex items-center gap-3">
          <input
            className="p-2 border rounded-lg"
            placeholder="Search transfers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]">
            🔍
          </button>

          <button
            onClick={() => openTransferForm("new")}
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
              <th>From</th>
              <th>To</th>
              <th>Contact</th>
              <th>Schedule Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((t) => (
              <tr
                key={t._id}
                onClick={() => openTransferForm(t._id)}
                className="hover:bg-[rgba(43,134,255,0.06)] cursor-pointer"
              >
                <td className="p-4 font-semibold">{t.reference}</td>
                <td className="p-4">{t.fromLocation}</td>
                <td className="p-4">{t.toLocation}</td>
                <td className="p-4">{t.contact}</td>
                <td className="p-4">{t.scheduleDate}</td>
                <td className="p-4"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="p-6 text-center text-[var(--muted)]">
            No internal transfers recorded
          </div>
        )}
      </div>
    </div>
  );
};

export default TransfersList;
