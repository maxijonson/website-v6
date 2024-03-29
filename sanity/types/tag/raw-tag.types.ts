import type {
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
  internalGroqTypeReferenceTo,
} from "../sanity.types";

export type RawTag = {
  _id: string;
  _type: "tag";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  category: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "category";
  };
  description: string;
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
