"use client";
import { settingsQuery } from "@/sanity/lib/queries";
import { useLiveQuery } from "@/sanity/loader/use-query";

import MenuLayout from "./menu-layout";

export default function MenuPreview({ initial }) {
  const { data } = useLiveQuery(settingsQuery, {}, { initial });
  return <MenuLayout data={data} />;
}
