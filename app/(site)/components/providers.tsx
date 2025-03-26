import { HeroUIProvider } from "@heroui/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider className="flex h-full w-full flex-col">
      {children}
    </HeroUIProvider>
  );
}
