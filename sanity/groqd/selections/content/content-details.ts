import { q, type InferType } from "groqd";
import { qType } from "../../filters/type";
import { contentBlockDetailsSelection } from "./content-block-details";
import { contentCodeDetailsSelection } from "./content-code-details";
import { contentImageDetailsSelection } from "./content-image-details";
import { contentCodeGroupDetailsSelection } from "./content-code-group-details";

export const makeContentDetailsQuery = <F extends string>(fieldName: F) => {
  return q(fieldName)
    .filter()
    .select({
      [qType("block")]: contentBlockDetailsSelection,
      [qType("image")]: contentImageDetailsSelection,
      [qType("code")]: contentCodeDetailsSelection,
      [qType("codeGroup")]: contentCodeGroupDetailsSelection,
      default: {
        _key: q.string(),
        _type: q
          .string()
          .transform((type) => `[ContentDetails] unknown (${type})`),
      },
    });
};

export type ContentDetails = InferType<
  ReturnType<typeof makeContentDetailsQuery>
>;
