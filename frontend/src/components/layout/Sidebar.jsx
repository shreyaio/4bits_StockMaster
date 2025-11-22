// src/components/layout/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uiStore } from "../../store/uiStore";

const menu = [
  { label: "Dashboard", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Receipts", path: "/operations/receipts" },
  { label: "Deliveries", path: "/operations/delivery" },
  { label: "Transfers", path: "/operations/transfers" },
  { label: "Adjustments", path: "/operations/adjustments" },
  { label: "Move History", path: "/operations/move-history" },
  { label: "Stock", path: "/stock" },
  { label: "Warehouses", path: "/settings/warehouses" },
  { label: "Locations", path: "/settings/locations" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { collapsed, toggleSidebar } = uiStore();
  const location = useLocation();

  return (
    <aside
      className={`h-screen transition-all bg-[var(--surface)] shadow-md border-r border-[#e4e7eb]
        ${collapsed ? "w-[70px]" : "w-[240px]"}`}
    >
      {/* Logo + Collapse Toggle */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <div className="font-bold text-[18px]">StockMaster</div>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-[rgba(43,134,255,0.09)]"
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-1 text-[14px]">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-left px-4 py-2 rounded-lg transition
                ${active
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text)] hover:bg-[rgba(43,134,255,0.09)]"}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
