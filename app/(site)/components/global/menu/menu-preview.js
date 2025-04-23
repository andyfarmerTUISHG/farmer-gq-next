"use client";
import { settingsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import MenuLayout from "./menu-layout";

export default function MenuPreview({ initial }) {
  const { data, encodeDataAttribute } = useQuery(
    settingsQuery,
    {},
    {
      initial,
    }
  );
  return <MenuLayout data={data} encodeDataAttribute={encodeDataAttribute} />;
}
