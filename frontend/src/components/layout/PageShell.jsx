// src/components/layout/PageShell.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { uiStore } from "../../store/uiStore";

const PageShell = ({ children }) => {
  const { collapsed } = uiStore();

  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-auto">
        <Topbar />

        <main
          className="flex-1 overflow-auto transition-all bg-[var(--bg)]"
          style={{ paddingLeft: collapsed ? "10px" : "20px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageShell;
