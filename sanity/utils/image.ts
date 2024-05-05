import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const getImageBuilder = (source: Image) => {
  return imageBuilder.image(source);
};

export const urlForImage = (source: Image) => {
  return getImageBuilder(source).auto("format").fit("max").url();
};

export const urlForSvg = (source: Image) => {
  return getImageBuilder(source).url();
};
