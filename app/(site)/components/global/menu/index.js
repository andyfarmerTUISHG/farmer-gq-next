import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

import MenuLayout from "./menu-layout";

export default async function Menu() {
  const { data } = await sanityFetch({ query: settingsQuery });

  if (!data) {
    notFound();
  }
  return <MenuLayout data={data} />;
}
