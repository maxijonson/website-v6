import { q, sanityImage, type Selection, type TypeFromSelection } from "groqd";

type WithAssetOption =
  | "base"
  | "dimensions"
  | "location"
  | "lqip"
  | "palette"
  | "isOpaque"
  | "hasAlpha"
  | "blurHash";

export const baseAdditionalFieldsSelection = {
  alt: q.string(),
  metadata: q("asset->metadata").grab$({
    lqip: q.string(),
  }),
} satisfies Selection;

export const makeImageDetailsQuery = <
  WithCrop extends boolean | undefined = undefined,
  WithHotspot extends boolean | undefined = undefined,
  AdditionalSelection extends Selection | undefined = undefined,
  Multiple extends boolean | undefined = undefined,
  WithAsset extends readonly WithAssetOption[] | undefined = undefined,
>(
  fieldName: string,
  options: {
    withCrop?: WithCrop;
    withHotspot?: WithHotspot;
    isList?: Multiple;
    additionalFields?: AdditionalSelection;
    withAsset?: WithAsset;
  } = {},
) => {
  type FinalWithCrop = WithCrop extends undefined ? false : WithCrop;
  type FinalWithHotspot = WithHotspot extends undefined ? false : WithHotspot;
  type FinalAdditionalSelection = AdditionalSelection extends undefined
    ? typeof baseAdditionalFieldsSelection
    : AdditionalSelection & typeof baseAdditionalFieldsSelection;
  type FinalMultiple = Multiple extends undefined ? false : Multiple;
  type FinalWithAsset = WithAsset extends undefined ? undefined : WithAsset;

  return sanityImage<
    FinalWithCrop,
    FinalWithHotspot,
    FinalAdditionalSelection,
    FinalMultiple,
    FinalWithAsset
  >(fieldName, {
    ...options,
    withCrop: (options.withCrop ?? false) as FinalWithCrop,
    withHotspot: (options.withHotspot ?? false) as FinalWithHotspot,
    isList: (options.isList ?? false) as FinalMultiple,
    withAsset: (options.withAsset ?? undefined) as FinalWithAsset,
    additionalFields: {
      ...baseAdditionalFieldsSelection,
      ...options.additionalFields,
    } as FinalAdditionalSelection,
  });
};

export const imageDetailsSelection = {
  ...baseAdditionalFieldsSelection,
  asset: q.object({
    _ref: q.string(),
    _type: q.literal("reference"),
    _weak: q.boolean().optional(),
  }),
} satisfies Selection;

export type ImageDetails = TypeFromSelection<typeof imageDetailsSelection>;
