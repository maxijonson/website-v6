import type {
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "./sanity.types";

export type BlockContent = Array<
  | {
      children: Array<{
        marks: Array<string>;
        text: string;
        _type: "span";
        _key: string;
      }>;
      style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
      listItem: "bullet";
      markDefs: Array<{
        href: string;
        _type: "link";
        _key: string;
      }>;
      level: number;
      _type: "block";
      _key: string;
    }
  | {
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
      _key: string;
    }
>;
