import { q, type TypeFromSelection } from "groqd";
import { imageDetailsSelection } from "../image-details";

export const contentImageDetailsSelection = {
  ...imageDetailsSelection,
  _type: q.literal("image"),
  _key: q.string(),
};

export type ContentImageDetails = TypeFromSelection<
  typeof contentImageDetailsSelection
>;
