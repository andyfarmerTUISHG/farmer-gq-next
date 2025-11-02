"use client";

import { useEffect } from "react";

import { useMenu } from "../context/menu-context";

export default function BodyClassManager() {
  const { isMenuOpen } = useMenu();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    }
    else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  return null;
}
