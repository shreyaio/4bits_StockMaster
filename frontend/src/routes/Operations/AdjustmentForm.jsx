import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { operationsApi } from "../../api/operationsApi";
import OperationStatusStepper from "../../components/operations/OperationStatusStepper";

const AdjustmentForm = () => {
  const { id } = useParams();
  const isNew = id === "new";

  const { data } = useQuery({
    queryKey: ["adjustment-form", id],
    queryFn: () => operationsApi.getAdjustmentById(id),
    enabled: !isNew,
  });

  const recordedQty = data?.recordedQty || 0;

  const [form, setForm] = useState({
    product: data?.product || "",
    location: data?.location || "",
    countedQty: "",
  });

  const diff = (form.countedQty || 0) - recordedQty;

  const updateValue = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="p-6 w-full">
      <div className="flex-between">
        <h1 className="text-[22px] font-semibold text-[var(--text)]">
          Stock Adjustment
        </h1>

        <div className="flex gap-2">
          <button className="btn btn-primary">Validate</button>
          <button className="btn btn-danger">Cancel</button>
        </div>
      </div>

      <OperationStatusStepper status={data?.status || "Draft"} />

      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="space-y-2">
          <label>Product</label>
          <input
            value={form.product}
            onChange={(e) => updateValue("product", e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div className="space-y-2">
          <label>Location</label>
          <input
            value={form.location}
            onChange={(e) => updateValue("location", e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div className="space-y-2">
          <label>Recorded Quantity</label>
          <input
            value={recordedQty}
            readOnly
            className="p-2 border rounded-md w-full bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <label>Counted Quantity</label>
          <input
            type="number"
            value={form.countedQty}
            onChange={(e) => updateValue("countedQty", e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-[var(--surface)]">
        <p className="font-semibold text-[var(--text)]">Difference</p>
        <p
          className={`text-lg font-bold ${
            diff < 0
              ? "text-[var(--danger)]"
              : diff > 0
              ? "text-[var(--success)]"
              : "text-[var(--muted)]"
          }`}
        >
          {diff}
        </p>
      </div>
    </div>
  );
};

export default AdjustmentForm;
