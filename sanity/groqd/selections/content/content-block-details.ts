import {
  nullToUndefined,
  q,
  type InferType,
  type Selection,
  type TypeFromSelection,
} from "groqd";
import { contentBlockSchema } from "../../../sanity.schemas";

const contentBlockLinkSchema = contentBlockSchema.shape.markDefs
  .unwrap()
  .element.and(q.object({ _type: q.literal("link") }));

export const contentBlockDetailsSelection = nullToUndefined({
  _key: q.string(),
  ...contentBlockSchema.shape,
}) satisfies Selection;

export type ContentBlockDetails = TypeFromSelection<
  typeof contentBlockDetailsSelection
>;

export type ContentBlockLink = InferType<typeof contentBlockLinkSchema>;
