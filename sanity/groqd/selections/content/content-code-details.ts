import { q, type Selection, type TypeFromSelection } from "groqd";

export const contentCodeDetailsSelection = {
  _key: q.string(),
  _type: q.literal("code"),
  language: q.string().optional(),
  filename: q.string().optional(),
  code: q.string().optional(),
  highlightedLines: q.array(q.number()).optional(),
} satisfies Selection;

export type ContentCodeDetails = TypeFromSelection<
  typeof contentCodeDetailsSelection
>;
