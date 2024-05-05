import { q, type Selection, type TypeFromSelection } from "groqd";
import { homeIntroSchema } from "../../../../sanity.schemas";
import { makeImageDetailsQuery } from "../../image-details";
import { makeContentDetailsQuery } from "../../content/content-details";

export const homeIntroDetailsSelection = {
  _key: q.string(),
  _type: homeIntroSchema.shape._type,
  title: homeIntroSchema.shape.title,
  image: makeImageDetailsQuery("image"),
  content: makeContentDetailsQuery("content"),
} satisfies Selection;

export type HomeIntroDetails = TypeFromSelection<
  typeof homeIntroDetailsSelection
>;
