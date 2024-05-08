import { q, type Selection, type TypeFromSelection } from "groqd";
import { authorSchema } from "../../sanity.schemas";
import { makeImageDetailsQuery } from "./image-details";

export const authorDetailsSelection = {
  id: ["_id", authorSchema.shape._id],
  createdAt: ["_createdAt", authorSchema.shape._createdAt],
  updatedAt: ["_updatedAt", authorSchema.shape._updatedAt],
  slug: q.slug("slug"),
  name: authorSchema.shape.name,
  bio: authorSchema.shape.bio,
  image: makeImageDetailsQuery("image"),
} satisfies Selection;

export type AuthorDetails = TypeFromSelection<typeof authorDetailsSelection>;
