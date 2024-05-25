import {
  nullToUndefined,
  q,
  type Selection,
  type TypeFromSelection,
} from "groqd";
import { contentBlockSchema } from "../../../../sanity.schemas";
import { qType } from "../../../filters/type";
import { contentBlockLinkDetailsSelection } from "./content-block-link-details";
import { contentBlockInternalLinkDetailsSelection } from "./content-block-internal-link-details";

export const contentBlockDetailsSelection = nullToUndefined({
  _key: q.string(),
  ...contentBlockSchema.shape,
  markDefs: q("markDefs")
    .filter()
    .select({
      [qType("link")]: contentBlockLinkDetailsSelection,
      [qType("internalLink")]: contentBlockInternalLinkDetailsSelection,
      default: {
        _key: q.string(),
        _type: q
          .string()
          .transform((type) => `[ContentBlockDetails] unknown (${type})`),
      },
    }),
}) satisfies Selection;

export type ContentBlockDetails = TypeFromSelection<
  typeof contentBlockDetailsSelection
>;
