import { q, type Selection, type TypeFromSelection } from "groqd";

export const contentBlockInternalLinkDetailsSelection = {
  _key: q.string(),
  _type: q.literal("internalLink"),
  reference: q("@.reference")
    .deref()
    .select({
      "_type == 'post'": {
        type: ["_type", q.literal("post")],
        slug: ["slug.current", q.string()],
      },
      "_type == 'category'": {
        type: ["_type", q.literal("category")],
        slug: ["slug.current", q.string()],
      },
      "_type == 'tag'": {
        type: ["_type", q.literal("tag")],
        slug: ["slug.current", q.string()],
      },
    }),
} satisfies Selection;

export type ContentBlockInternalLinkDetails = TypeFromSelection<
  typeof contentBlockInternalLinkDetailsSelection
>;
