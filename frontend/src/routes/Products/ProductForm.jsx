import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/productsApi";

const ProductsList = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: () => productsApi.getProducts(search),
  });

  if (isLoading) return <div className="p-6">Loading products...</div>;

  const openProductForm = (id) => {
    window.location.href = `/products/${id}`;
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex-between mb-6">
        <h1 className="text-[24px] font-semibold text-[var(--text)]">
          Products
        </h1>

        <div className="flex items-center gap-3">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={() => openProductForm("new")}
            className="btn btn-primary"
          >
            NEW
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="rounded-xl shadow-md bg-[var(--surface)] overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>UOM</th>
              <th>Unit Cost</th>
              <th>On Hand</th>
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 &&
              data.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-[rgba(43,134,255,0.06)] cursor-pointer"
                  onClick={() => openProductForm(product._id)}
                >
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.uom}</td>
                  <td className="p-4">₹ {product.unitCost}</td>
                  <td className="p-4 font-semibold text-[var(--primary)]">
                    {product.onHand ?? 0}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="p-6 text-center text-[var(--muted)]">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
