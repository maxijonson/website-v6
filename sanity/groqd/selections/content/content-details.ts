import type { ConditionRecord } from "@/utils/types";
import { q, type InferType } from "groqd";
import { qType } from "../../filters/type";
import { contentBlockDetailsSelection } from "./content-block-details/content-block-details";
import { contentCodeGroupDetailsSelection } from "./content-code-group-details";
import { contentImageDetailsSelection } from "./content-image-details";
import { contentAlertDetailsSelection } from "./content-alert-details";

export const contentDetailsSelection = {
  [qType("contentBlock")]: contentBlockDetailsSelection,
  [qType("contentImage")]: contentImageDetailsSelection,
  [qType("codeGroup")]: contentCodeGroupDetailsSelection,
  // The types below can contain nested content (except their own to prevent infinite recursion). If you add a new type above, make sure to add it in each of the types below.
  [qType("contentAlert")]: contentAlertDetailsSelection,
  default: {
    _key: q.string(),
    _type: q.string().transform((type) => `[ContentDetails] unknown (${type})`),
  },
} satisfies ConditionRecord;

export const makeContentDetailsQuery = <F extends string>(fieldName: F) => {
  return q(fieldName).filter().select(contentDetailsSelection);
};

export type ContentDetails = InferType<
  ReturnType<typeof makeContentDetailsQuery>
>;
