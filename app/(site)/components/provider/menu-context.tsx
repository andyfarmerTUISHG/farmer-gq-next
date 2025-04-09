"use client";
import { createContext, useContext, useState } from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openMenu: () => void;
};

const MenuContext = createContext<MenuContextType | null>(null);

export default function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  const value: MenuContextType = {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export const triggerNavItem = (id: string) => {
  window.scrollTo({
    top: document.getElementById(id)?.offsetTop || 0,
    behavior: "smooth",
  });
};

// Move these functions into the context hook usage
export const useMobileNavigation = () => {
  const { closeMenu } = useMenu();

  const triggerMobileNavItem = (id: string) => {
    alert(id);
    closeMenu();
    triggerNavItem(id);
  };

  return { triggerMobileNavItem };
};

// Custom hook for consuming components
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export type { MenuContextType };
