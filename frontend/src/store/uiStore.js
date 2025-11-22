// src/store/uiStore.js
import { create } from "zustand";

export const uiStore = create((set) => ({
  collapsed: false,
  toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
}));
