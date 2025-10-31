import "../globals.css";

import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import BodyClassManager from "./components/body-class-manager";
import Footer from "./components/footer";
import Menu from "./components/global/menu";
import { MenuProvider } from "./context/menu-context";
import { DraftModeToast } from "./draft-mode-toast";

export const metadata = {
  title: "Andy Farmer - Growth Quotient",
  description:
    "A personal space, where I write about personal development, business growth, software development learnings or self-improvement",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📕</text></svg>"
        />
      </head>
      <body className="relative">
        <div id="main" className="relative">
          <MenuProvider>
            <div>
              <BodyClassManager />
              <Menu />
              {children}
              <Footer />
            </div>
          </MenuProvider>
        </div>
        {(await draftMode()).isEnabled && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
