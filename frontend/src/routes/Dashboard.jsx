// src/routes/Dashboard.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboardApi";
import KPICard from "../components/dashboard/KPICard";
import OperationsSummaryPanel from "../components/dashboard/OperationsSummaryPanel";
import OperationsFilterBar from "../components/filters/OperationsFilterBar";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    docType: "",
    status: "",
    warehouse: "",
    category: "",
  });

  const { data: kpis, isLoading: loadingKpis } = useQuery({
    queryKey: ["dashboard-kpis", filters],
    queryFn: () => dashboardApi.getKpis(filters),
  });

  const { data: opsSummary, isLoading: loadingOps } = useQuery({
    queryKey: ["dashboard-ops", filters],
    queryFn: () => dashboardApi.getOperationsSummary(filters),
  });

  const goToReceipts = () => {
    window.location.href = "/operations/receipts";
  };

  const goToDeliveries = () => {
    window.location.href = "/operations/delivery";
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex-between mb-4">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Dashboard
        </h1>
      </div>

      {/* Filters */}
      <OperationsFilterBar filters={filters} onChange={setFilters} />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          label="Total Products in Stock"
          value={kpis?.totalProductsInStock}
          variant="primary"
          subtitle="Across all warehouses"
        />
        <KPICard
          label="Low / Out of Stock"
          value={kpis?.lowStockCount}
          variant="accent"
          subtitle="Needs attention"
        />
        <KPICard
          label="Pending Receipts"
          value={kpis?.pendingReceipts}
          subtitle="To be received"
        />
        <KPICard
          label="Pending Deliveries"
          value={kpis?.pendingDeliveries}
          subtitle="To be delivered"
        />
        <KPICard
          label="Internal Transfers Scheduled"
          value={kpis?.internalTransfersScheduled}
          subtitle="Upcoming moves"
        />
      </div>

      {/* Operations Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OperationsSummaryPanel
          title="Receipts"
          data={opsSummary?.receipts}
          onClick={goToReceipts}
        />
        <OperationsSummaryPanel
          title="Delivery"
          data={opsSummary?.deliveries}
          onClick={goToDeliveries}
        />
      </div>

      {/* Optional: Transfers summary card */}
      {opsSummary?.transfers && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl shadow-md p-4 bg-[var(--surface)]">
            <div className="flex-between mb-2">
              <h2 className="text-[16px] font-semibold text-[var(--text)]">
                Internal Transfers
              </h2>
            </div>
            <div className="text-sm">
              <div className="flex-between mb-1">
                <span>Total</span>
                <span className="font-semibold">
                  {opsSummary.transfers.total ?? 0}
                </span>
              </div>
              <div className="flex-between">
                <span>Scheduled</span>
                <span className="font-semibold text-[var(--primary)]">
                  {opsSummary.transfers.scheduled ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {(loadingKpis || loadingOps) && (
        <div className="mt-4 text-sm text-[var(--muted)]">
          Updating dashboard…
        </div>
      )}
    </div>
  );
};

export default Dashboard;
