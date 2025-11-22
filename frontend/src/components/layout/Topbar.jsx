// src/components/layout/Topbar.jsx
import React from "react";
import { authStore } from "../../store/authStore";

const Topbar = () => {
  const { logout } = authStore();

  return (
    <header className="h-[60px] w-full border-b border-[#e4e7eb] bg-white shadow-sm flex items-center justify-between px-6">
      <div className="text-[18px] font-semibold text-[var(--text)]">
        Inventory Manager
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[rgba(43,134,255,0.08)]">
          🔍
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={logout}>
          <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-semibold">
            U
          </div>
          <span className="text-[14px] text-[var(--text)]">Logout</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
