import type { Image } from "sanity";

import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "./api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export function urlForImage(source: Image) {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder.image(source).auto("format").fit("max");
}
