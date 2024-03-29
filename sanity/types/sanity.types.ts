export type Slug = {
  _type: "slug";
  current: string;
  source: string;
};
export declare const internalGroqTypeReferenceTo: unique symbol;

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
};
