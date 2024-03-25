import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlFor = (source: Image) => {
  return imageBuilder.image(source);
};

export const urlForImage = (source: Image) => {
  return urlFor(source).auto("format").fit("max").url();
};
