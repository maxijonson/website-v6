import { q, type Selection, type TypeFromSelection } from "groqd";

export const contentBlockLinkDetailsSelection = {
  _key: q.string(),
  _type: q.literal("link"),
  href: q.string(),
} satisfies Selection;

export type ContentBlockLinkDetails = TypeFromSelection<
  typeof contentBlockLinkDetailsSelection
>;
