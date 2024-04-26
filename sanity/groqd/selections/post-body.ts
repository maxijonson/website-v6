import { InferType, q, type Selection, type TypeFromSelection } from "groqd";

const postBodyBlockLinkSchema = q.object({
  _key: q.string(),
  _type: q.literal("link"),
  href: q.string(),
});

export type PostBodyBlockLink = InferType<typeof postBodyBlockLinkSchema>;

const postBodyBlockSchema = q.contentBlock({
  markDefs: postBodyBlockLinkSchema,
});

export type PostBodyBlock = InferType<typeof postBodyBlockSchema>;

const postBodyCodeSchema = q.object({
  _type: q.literal("code"),
  language: q.string(),
  highlightedLines: q.array(q.number()).optional(),
  code: q.string(),
  filename: q.string().optional(),
});

export type PostBodyCode = InferType<typeof postBodyCodeSchema>;

const postBodyImageSchema = q.object({
  _key: q.string(),
  _type: q.literal("image"),
  alt: q.string(),
  metadata: q.object({
    lqip: q.string(),
  }),
  asset: q.object({
    _ref: q.string(),
    _type: q.literal("reference"),
  }),
});

export type PostBodyImage = InferType<typeof postBodyImageSchema>;

export const postBodySelection = {
  body: q.array(
    q.union([postBodyBlockSchema, postBodyCodeSchema, postBodyImageSchema]),
  ),
} satisfies Selection;

export type PostBody = TypeFromSelection<typeof postBodySelection>["body"];
