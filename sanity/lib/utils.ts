import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "@/sanity/lib/api";

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "home":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "article":
      return slug ? `/articles/${slug}` : undefined;
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

export const urlForImage = (source: Image | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};
