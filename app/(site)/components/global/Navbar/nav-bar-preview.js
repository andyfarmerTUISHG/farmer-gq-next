"use client";

import { settingsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import NavbarLayout from "./nav-bar-layout";

export default function NavbarPreview(props) {
  const { initial } = props;
  const { data, encodeDataAttribute } = useQuery(settingsQuery, {}, {
    initial,
  });
  return <NavbarLayout data={data} encodeDataAttribute={encodeDataAttribute} />;
}