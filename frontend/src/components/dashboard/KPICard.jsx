import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../api/dashboardApi";

const KPICard = ({ title = "KPI", fetchKey = ["kpis"], renderValue }) => {
  const { data, isLoading } = useQuery({ queryKey: fetchKey, queryFn: () => dashboardApi.getKpis() });

  if (isLoading) return <div className="card">Loading...</div>;

  const kpis = data || {};

  return (
    <div className="stat-card">
      <div className="text-sm text-[var(--muted)]">{title}</div>
      <div className="text-2xl font-bold mt-2">{renderValue ? renderValue(kpis) : JSON.stringify(kpis)}</div>
    </div>
  );
};

export default KPICard;
