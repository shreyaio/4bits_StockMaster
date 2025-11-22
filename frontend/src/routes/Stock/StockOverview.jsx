import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { stockApi } from "../../api/stockApi";
import Modal from "../../components/common/Modal";

const StockOverview = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch stock list from backend
  const { data, isLoading } = useQuery({
    queryKey: ["stock-overview"],
    queryFn: stockApi.getStockOverview,
  });

  if (isLoading) return <div className="p-6">Loading stock...</div>;

  const openAdjustModal = (item) => {
    setSelectedProduct(item);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-full p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">Stock Overview</h1>
      </div>

      {/* Stock Card */}
      <div className="rounded-xl shadow-md p-1 bg-[var(--surface)]">
        <table className="w-full text-left">
          <thead className="text-sm text-[var(--muted)] border-b">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Unit Cost</th>
              <th className="p-4">On Hand</th>
              <th className="p-4">Free to Use</th>
              <th className="p-4 text-right">Adjust</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-[rgba(43,134,255,0.06)] transition-all border-b last:border-none"
              >
                <td className="p-4 font-medium text-[var(--text)]">
                  {item.productName}
                  <div className="text-xs text-[var(--muted)]">{item.sku}</div>
                </td>

                <td className="p-4 text-[var(--text)]">₹ {item.unitCost}</td>

                <td className="p-4 text-[var(--text)]">{item.onHand}</td>

                <td
                  className={`p-4 font-semibold ${
                    item.freeToUse <= 0 ? "text-[var(--danger)]" : "text-[var(--success)]"
                  }`}
                >
                  {item.freeToUse}
                </td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => openAdjustModal(item)}
                    className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white text-sm hover:bg-[var(--primary-600)] transition"
                  >
                    Adjust
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stock Adjustment Modal */}
      {selectedProduct && (
        <Modal title="Adjust Stock" onClose={closeModal}>
          <div className="space-y-3">
            <p className="text-[var(--text)] font-semibold">{selectedProduct.productName}</p>
            <p className="text-sm text-[var(--muted)]">
              Current: {selectedProduct.onHand}
            </p>

            <input
              type="number"
              placeholder="Enter new quantity"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-[var(--primary)]"
            />

            <button
              className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:bg-[var(--primary-600)] transition"
              onClick={() => {
                // TODO: call stockApi.adjustStock(selectedProduct._id, qty)
                closeModal();
              }}
            >
              Save Adjustment
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StockOverview;
