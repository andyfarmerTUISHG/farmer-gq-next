import { HeroUIProvider } from "@heroui/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
