import type { Image } from "sanity";

import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/lib/api";

export function resolveHref(
  documentType?: string,
  slug?: string,
  parentSlug?: string,
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "article":
      return slug ? `/articles/${slug}` : undefined;
    case "book":
      return slug ? `/books/${slug}` : undefined;
    case "chapter":
      return slug && parentSlug ? `/books/${parentSlug}/chapters/${slug}` : undefined;
    case "sitelinks":
      return slug ? `${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export function urlForImage(source: Image | null | undefined) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
}
