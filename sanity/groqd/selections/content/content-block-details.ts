import {
  q,
  type InferType,
  type Selection,
  type TypeFromSelection,
} from "groqd";

const contentBlockLinkMarkDefSchema = q.object({
  href: q.string().optional(),
  _type: q.literal("link"),
  _key: q.string(),
});

export const contentBlockDetailsSelection = {
  _key: q.string(),
  _type: q.literal("block"),
  children: q
    .array(
      q.object({
        marks: q.array(q.string()).optional(),
        text: q.string().optional(),
        _type: q.literal("span"),
        _key: q.string(),
      }),
    )
    .optional(),
  style: q
    .union([
      q.literal("normal"),
      q.literal("h2"),
      q.literal("h3"),
      q.literal("h4"),
      q.literal("h5"),
      q.literal("h6"),
      q.literal("blockquote"),
    ])
    .optional(),
  listItem: q.literal("bullet").optional(),
  markDefs: q.array(contentBlockLinkMarkDefSchema).optional(),
  level: q.number().optional(),
} satisfies Selection;

export type ContentBlockDetails = TypeFromSelection<
  typeof contentBlockDetailsSelection
>;

export type ContentBlockLink = InferType<typeof contentBlockLinkMarkDefSchema>;
