import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import OperationStatusStepper from "../../components/operations/OperationStatusStepper";
import ProductLineTable from "../../components/operations/ProductLineTable";

const TransferForm = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const { data } = useQuery({
    queryKey: ["transfer-form", id],
    queryFn: () => operationsApi.getTransferById(id),
    enabled: !isNew,
  });

  const [form, setForm] = useState({
    fromLocation: data?.fromLocation || "",
    toLocation: data?.toLocation || "",
    responsible: data?.responsible || "",
    scheduleDate: data?.scheduleDate || "",
  });

  const updateValue = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="p-6 w-full">
      <div className="flex-between mb-4">
        <h1 className="text-[22px] font-semibold text-[var(--text)]">Transfer</h1>

        <div className="flex items-center gap-2">
          <button className="btn btn-primary">Validate</button>
          <button className="btn btn-surface">Print</button>
          <button className="btn btn-danger">Cancel</button>
        </div>
      </div>

      <OperationStatusStepper status={data?.status || "Draft"} />

      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="space-y-2">
          <label>From Location</label>
          <input
            className="p-2 border rounded-md w-full"
            value={form.fromLocation}
            onChange={(e) => updateValue("fromLocation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label>To Location</label>
          <input
            className="p-2 border rounded-md w-full"
            value={form.toLocation}
            onChange={(e) => updateValue("toLocation", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label>Responsible</label>
          <input
            className="p-2 border rounded-md w-full"
            value={form.responsible}
            onChange={(e) => updateValue("responsible", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label>Schedule Date</label>
          <input
            type="date"
            className="p-2 border rounded-md w-full"
            value={form.scheduleDate}
            onChange={(e) => updateValue("scheduleDate", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        <ProductLineTable items={data?.lines || []} />
      </div>
    </div>
  );
};

export default TransferForm;
