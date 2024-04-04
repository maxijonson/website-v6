import type {
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
  internalGroqTypeReferenceTo,
} from "../sanity.types";

export type RawCategory = {
  _id: string;
  _type: "category";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  caption: string;
  description: string;
  keywords: Array<string>;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot: SanityImageHotspot;
    crop: SanityImageCrop;
    alt: string;
    _type: "image";
  };
};
