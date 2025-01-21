

import { HeroUIProvider } from "@heroui/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {


  return (

      <HeroUIProvider

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        className="flex h-full w-full flex-col"
      >

					{children}

      </HeroUIProvider>

  );
}
