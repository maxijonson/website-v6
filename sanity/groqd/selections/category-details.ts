import { q, type Selection, type TypeFromSelection } from "groqd";
import { categorySchema } from "../../sanity.schemas";
import { makeImageDetailsQuery } from "./image-details";

export const categoryDetailsSelection = {
  id: ["_id", categorySchema.shape._id],
  createdAt: ["_createdAt", categorySchema.shape._createdAt],
  updatedAt: ["_updatedAt", categorySchema.shape._updatedAt],
  slug: q.slug("slug"),
  name: categorySchema.shape.name,
  caption: categorySchema.shape.caption,
  description: categorySchema.shape.description,
  keywords: ["coalesce(keywords, [])", categorySchema.shape.keywords.unwrap()],
  image: makeImageDetailsQuery("image"),
} satisfies Selection;

export type CategoryDetails = TypeFromSelection<
  typeof categoryDetailsSelection
>;
