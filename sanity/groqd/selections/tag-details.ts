import { q, type Selection, type TypeFromSelection } from "groqd";
import { tagSchema } from "../../sanity.schemas";
import { categoryDetailsSelection } from "./category-details";
import { makeImageDetailsQuery } from "./image-details";

export const tagDetailsSelection = {
  type: ["_type", tagSchema.shape._type],
  id: ["_id", tagSchema.shape._id],
  createdAt: ["_createdAt", tagSchema.shape._createdAt],
  updatedAt: ["_updatedAt", tagSchema.shape._updatedAt],
  slug: q.slug("slug"),
  name: tagSchema.shape.name,
  caption: tagSchema.shape.caption,
  description: tagSchema.shape.description,
  keywords: ["coalesce(keywords, [])", tagSchema.shape.keywords.unwrap()],
  image: makeImageDetailsQuery("image"),
  category: q("category").deref().grab$(categoryDetailsSelection),
} satisfies Selection;

export type TagDetails = TypeFromSelection<typeof tagDetailsSelection>;
