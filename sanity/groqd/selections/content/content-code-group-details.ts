import { q, type Selection, type TypeFromSelection } from "groqd";
import { codeGroupSchema } from "../../../sanity.schemas";

export const contentCodeGroupDetailsSelection = {
  _key: q.string(),
  _type: codeGroupSchema.shape._type,
  snippets: codeGroupSchema.shape.snippets,
} satisfies Selection;

export type ContentCodeGroupDetails = TypeFromSelection<
  typeof contentCodeGroupDetailsSelection
>;
