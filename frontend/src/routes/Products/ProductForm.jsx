import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../../api/productsApi";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new" || !id;

  const [form, setForm] = useState({ name: "", sku: "", category: "", uom: "", unitCost: "", onHand: 0 });

  useEffect(() => {
    if (!isNew) {
      // load product
      productsApi.getProductById(id).then((data) => setForm(data || {})).catch(() => {});
    }
  }, [id]);

  const save = async () => {
    try {
      if (isNew) await productsApi.createProduct(form);
      else await productsApi.updateProduct(id, form);
      navigate("/products");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-container">
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 className="text-2xl font-bold">{isNew ? "New Product" : "Edit Product"}</h1>
        <div className="flex gap-2">
          <button className="btn btn-surface" onClick={() => navigate('/products')}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label className="form-label">Name</label>
            <input value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} />
          </div>

          <div>
            <label className="form-label">SKU</label>
            <input value={form.sku} onChange={(e)=>setForm(f=>({...f, sku:e.target.value}))} />
          </div>

          <div>
            <label className="form-label">Category</label>
            <input value={form.category} onChange={(e)=>setForm(f=>({...f, category:e.target.value}))} />
          </div>

          <div>
            <label className="form-label">Unit Cost</label>
            <input value={form.unitCost} onChange={(e)=>setForm(f=>({...f, unitCost:e.target.value}))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
