
import Link from "next/link";

import { resolveHref } from "@/sanity/lib/utils";

export default function NavbarLayout(props) {
    const { data } = props;
    const menuItems = data?.menuItems || [];
  return (
    <div>
      NewLinks below????
      <pre>
        {JSON.stringify(menuItems, null, 2)}
      </pre>
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }
          return (
            <Link
              key={key}
              className={`text-lg hover:text-black md:text-xl ${
                menuItem?._type === "home"
                  ? "font-extrabold text-black"
                  : "text-gray-600"
              }`}
              href={href}
            >
              {menuItem.name}
            </Link>
          );
        })}
    </div>
  );
}
