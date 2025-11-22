import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import ProductLineTable from "../../components/operations/ProductLineTable";
import OperationStatusStepper from "../../components/operations/OperationStatusStepper";

const DeliveryForm = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["delivery-form", id],
    queryFn: () => operationsApi.getDeliveryById(id),
    enabled: id !== "new",
  });

  if (isLoading) return <div className="p-6">Loading order...</div>;

  return (
    <div className="p-6 w-full">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[22px] font-semibold text-[var(--text)]">
          Delivery
        </h1>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white">
            Validate
          </button>
          <button className="px-3 py-1 rounded-lg bg-[var(--surface)] text-[var(--text)]">
            Print
          </button>
          <button className="px-3 py-1 rounded-lg bg-[var(--danger)] text-white">
            Cancel
          </button>
        </div>
      </div>

      {/* Status Progress */}
      <OperationStatusStepper status={data?.status || "Draft"} />

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text)]">Delivery Address</label>
          <input className="p-2 border rounded-md w-full" placeholder="Enter address" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text)]">Schedule Date</label>
          <input type="date" className="p-2 border rounded-md w-full" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text)]">Responsible</label>
          <input className="p-2 border rounded-md w-full" placeholder="Assigned user" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text)]">Operation Type</label>
          <select className="p-2 border rounded-md w-full">
            <option>Delivery</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="mt-8">
        <ProductLineTable items={data?.lines || []} />
      </div>
    </div>
  );
};

export default DeliveryForm;
