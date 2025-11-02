/**
 * Sets up the Presentation Resolver API,
 * see https://www.sanity.io/docs/presentation-resolver-api for more information.
 */
import { defineDocuments, defineLocations } from "sanity/presentation";

import { resolveHref } from "@/sanity/lib/utils";

export const mainDocuments = defineDocuments([
  {
    route: "/articles/:slug",

    filter: "_type == \"article\" && slug.current == $slug",
  },
]);

export const locations = {
  settings: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
  }),
  article: defineLocations({
    select: { name: "name", slug: "slug.current" },
    resolve: (doc) => ({

      locations: [
        {
          title: doc?.name || "Untitled",
          href: resolveHref("article", doc?.slug)!,
        },
      ],
    }),
  }),
};
