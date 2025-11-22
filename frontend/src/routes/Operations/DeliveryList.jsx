import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import StatusPill from "../../components/common/StatusPill";

const DeliveryList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["delivery-list", search],
    queryFn: () => operationsApi.getDeliveries(search),
  });

  if (isLoading) return <div className="p-6">Loading deliveries...</div>;

  const openDeliveryForm = (id) => {
    window.location.href = `/operations/delivery/${id}`;
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Delivery
        </h1>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]"
          >
            🔍
          </button>

          <button
            className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]"
          >
            📦
          </button>

          <button
            onClick={() => openDeliveryForm("new")}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-600)] transition"
          >
            NEW
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-sm text-[var(--muted)] border-b">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">From</th>
              <th className="p-4">To</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Schedule Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr
                key={row._id}
                className="border-b last:border-none hover:bg-[rgba(43,134,255,0.06)] transition cursor-pointer"
                onClick={() => openDeliveryForm(row._id)}
              >
                <td className="p-4 font-medium text-[var(--text)]">{row.reference}</td>
                <td className="p-4">{row.from}</td>
                <td className="p-4">{row.to}</td>
                <td className="p-4">{row.contact}</td>
                <td className="p-4">{row.scheduleDate}</td>
                <td className="p-4">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="p-6 text-center text-[var(--muted)]">
            No delivery orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryList;
