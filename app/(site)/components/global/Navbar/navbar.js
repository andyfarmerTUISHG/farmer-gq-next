import { loadSettings } from "@/sanity/loader/load-query";

import NavbarLayout from "./nav-bar-layout";

export default async function Navbar() {
  const initial = await loadSettings();
  return (
    <div>
      <NavbarLayout data={initial.data} />

    </div>
  );
}
