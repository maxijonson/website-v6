import { q, type TypeFromSelection } from "groqd";
import { imageDetailsSelection } from "../image-details";
import { contentImageSchema } from "../../../sanity.schemas";

export const contentImageDetailsSelection = {
  ...imageDetailsSelection,
  _type: contentImageSchema.shape._type,
  _key: q.string(),
};

export type ContentImageDetails = TypeFromSelection<
  typeof contentImageDetailsSelection
>;
