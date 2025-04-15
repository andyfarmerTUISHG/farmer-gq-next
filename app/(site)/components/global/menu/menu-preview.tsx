import { settingsQuery } from "@/sanity/lib/queries";
import { useQuery } from "@/sanity/loader/use-query";

import MenuLayout from "./menu-layout";

interface MenuData {
  menuItems?: Array<{
    _type: string;
    slug?: string;
    name: string;
  }>;
}

interface MenuPreviewProps {
  initial: MenuData;
}

export default function MenuPreview({ initial }: MenuPreviewProps) {
  const { data, encodeDataAttribute } = useQuery(
    settingsQuery,
    {},
    {
      initial,
    }
  );
  return <MenuLayout data={data} encodeDataAttribute={encodeDataAttribute} />;
}
