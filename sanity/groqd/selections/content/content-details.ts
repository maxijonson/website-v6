import { q, type InferType } from "groqd";
import { qType } from "../../filters/type";
import { contentBlockDetailsSelection } from "./content-block-details";
import { contentCodeDetailsSelection } from "./content-code-details";
import { contentImageDetailsSelection } from "./content-image-details";

export const makeContentDetailsQuery = <F extends string>(fieldName: F) => {
  return q(fieldName)
    .filter()
    .select({
      [qType("block")]: contentBlockDetailsSelection,
      [qType("image")]: contentImageDetailsSelection,
      [qType("code")]: contentCodeDetailsSelection,
      default: {
        _type: q.string(),
        _key: q.string(),
      },
    });
};

export type ContentDetails = InferType<
  ReturnType<typeof makeContentDetailsQuery>
>;
