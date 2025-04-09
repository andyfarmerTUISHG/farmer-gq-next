"use client";

import { ReactNode } from "react";

import { useMenu } from "../(site)/components/provider/menu-context";

export function LayoutContent({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useMenu();

  return (
    <body
      className={`relative ${isMenuOpen ? "max-h-screen overflow-hidden" : ""}`}
    >
      <div id="main" className="relative">
        {children}
      </div>
    </body>
  );
}
