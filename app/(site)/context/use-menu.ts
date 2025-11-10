"use client";

import { createContext, use } from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function useMenu() {
  const context = use(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
