import "../globals.css";

import type { ReactNode } from "react";

import MenuProvider from "../(site)/components/provider/menu-context";
import { LayoutContent } from "./layout-content";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👷‍♂️ ✏️ 👷‍♂️</text></svg>"
        />

        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <MenuProvider>
        <LayoutContent>{children}</LayoutContent>
      </MenuProvider>
    </html>
  );
}
