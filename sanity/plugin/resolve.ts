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
  {
    route: "/books/:slug",
    filter: "_type == \"book\" && slug.current == $slug",
  },
  {
    route: "/books/:bookSlug/chapters/:chapterSlug",
    filter: "_type == \"chapter\" && slug.current == $chapterSlug",
  },
]);

export const locations = {
  settings: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
  }),
  article: defineLocations({
    select: { name: "name", slug: "slug.current" },
    resolve: doc => ({
      locations: [
        {
          title: doc?.name || "Untitled",
          href: resolveHref("article", doc?.slug)!,
        },
      ],
    }),
  }),
  book: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: doc => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: resolveHref("book", doc?.slug)!,
        },
      ],
    }),
  }),
  chapter: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
      parentBookSlug: "parentBook->slug.current",
    },
    resolve: doc => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: resolveHref("chapter", doc?.slug, doc?.parentBookSlug)!,
        },
      ],
    }),
  }),
};
