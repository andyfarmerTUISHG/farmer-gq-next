import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { loadSettings } from "@/sanity/loader/load-query";

import MenuLayout from "./menu-layout";

const MenuPreview = dynamic(
  () => import("@/app/(site)/components/global/menu/menu-preview"),
);

export default async function Menu() {
  const initial = await loadSettings();

  if ((await draftMode()).isEnabled) {
    return <MenuPreview initial={initial} />;
  }
  if (!initial.data) {
    notFound();
  }
  return <MenuLayout data={initial.data} />;
}
