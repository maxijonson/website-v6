import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  categorySchema,
  postSchema,
  tagSchema,
} from "../../../../sanity.schemas";

export const contentBlockInternalLinkDetailsSelection = {
  _key: q.string(),
  _type: q.literal("internalLink"),
  reference: q("@.reference")
    .deref()
    .select({
      "_type == 'post'": {
        type: ["_type", postSchema.shape._type],
        slug: ["slug.current", q.string()],
      },
      "_type == 'category'": {
        type: ["_type", categorySchema.shape._type],
        slug: ["slug.current", q.string()],
      },
      "_type == 'tag'": {
        type: ["_type", tagSchema.shape._type],
        slug: ["slug.current", q.string()],
      },
    }),
} satisfies Selection;

export type ContentBlockInternalLinkDetails = TypeFromSelection<
  typeof contentBlockInternalLinkDetailsSelection
>;
