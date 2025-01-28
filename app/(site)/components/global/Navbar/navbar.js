import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { loadSettings } from "@/sanity/loader/load-query";

import NavbarLayout from "./nav-bar-layout";

const NavbarPreview = dynamic(
  () => import("@/app/(site)/components/global/Navbar/nav-bar-preview")
);

export default async function Navbar() {
  const initial = await loadSettings();

  if ((await draftMode()).isEnabled) {
    return <NavbarPreview initial={initial} />;
  }

  if (!initial.data) {
    notFound();
  }

  return <NavbarLayout data={initial.data} />;
}
