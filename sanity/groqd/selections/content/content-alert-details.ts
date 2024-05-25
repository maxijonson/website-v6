import { q, type Selection, type TypeFromSelection } from "groqd";
import { contentAlertSchema } from "../../../sanity.schemas";
import { qType } from "../../filters/type";
import { contentBlockDetailsSelection } from "./content-block-details";
import { contentCodeGroupDetailsSelection } from "./content-code-group-details";
import { contentImageDetailsSelection } from "./content-image-details";

export const contentAlertDetailsSelection = {
  ...contentAlertSchema.shape,
  message: q("message")
    .filter()
    .select({
      // FIXME: We need to keep the selection of the nested content types in sync with the contentDetailsSelection manually.
      // It's possible to extract "pure" (non-nested) content selection in a separate file to avoid circular dependencies, but then the selection just doesn't work...
      // It logs the message "[ContentDetails] unknown (contentAlert)" when trying to select the pure content types.
      [qType("contentBlock")]: contentBlockDetailsSelection,
      [qType("contentImage")]: contentImageDetailsSelection,
      [qType("codeGroup")]: contentCodeGroupDetailsSelection,
      default: {
        _key: q.string(),
        _type: q
          .string()
          .transform((type) => `[ContentAlertDetails] unknown (${type})`),
      },
    }),
  _key: q.string(),
} satisfies Selection;

export type ContentAlertDetails = TypeFromSelection<
  typeof contentAlertDetailsSelection
>;
