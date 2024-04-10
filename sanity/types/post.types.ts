import type { BlockContent } from "./block-content.types";
import type {
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
  internalGroqTypeReferenceTo,
} from "./sanity.types";

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  summary: string;
  slug: Slug;
  author: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  tags: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "tag";
  }>;
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
  body: BlockContent;
};
