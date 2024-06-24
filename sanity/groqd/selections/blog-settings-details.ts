import { type Selection, type TypeFromSelection } from "groqd";
import { blogSettingsSchema } from "../../sanity.schemas";
import { makeImageDetailsQuery } from "./image-details";

export const blogSettingsDetailsSelection = {
  type: ["_type", blogSettingsSchema.shape._type],
  id: ["_id", blogSettingsSchema.shape._id],
  createdAt: ["_createdAt", blogSettingsSchema.shape._createdAt],
  updatedAt: ["_updatedAt", blogSettingsSchema.shape._updatedAt],
  caption: blogSettingsSchema.shape.caption,
  description: blogSettingsSchema.shape.description,
  image: makeImageDetailsQuery("image"),
} satisfies Selection;

export type BlogSettingsDetails = TypeFromSelection<
  typeof blogSettingsDetailsSelection
>;
