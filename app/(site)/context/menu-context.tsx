"use client";

import type { ReactNode } from "react";

import { useMemo, useState } from "react";

import { MenuContext } from "./use-menu";

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const memoizedMenuState = useMemo(() => {
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    return { isMenuOpen, toggleMenu };
  }, [isMenuOpen]);

  return (
    <MenuContext value={memoizedMenuState}>
      {children}
    </MenuContext>
  );
}
