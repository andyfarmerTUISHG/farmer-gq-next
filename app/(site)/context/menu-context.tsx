"use client";

import type { ReactNode } from "react";

import { createContext, use, useState } from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <MenuContext value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext>
  );
}

export function useMenu() {
  const context = use(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
