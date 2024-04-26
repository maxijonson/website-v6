import { q, type Selection, type TypeFromSelection } from "groqd";

export const referenceSelection = {
  _ref: q.string(),
  _type: q.literal("reference"),
  _weak: q.boolean().optional(),
} satisfies Selection;

export type Reference = TypeFromSelection<typeof referenceSelection>;
