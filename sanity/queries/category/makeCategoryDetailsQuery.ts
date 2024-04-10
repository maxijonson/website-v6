import type { Category } from "../../types/category.types";
import SanityQuery from "../../utils/sanity-query";

export type CategoryDetails = Pick<
  Category,
  "name" | "caption" | "description" | "image" | "keywords"
> & {
  id: Category["_id"];
  slug: string;
  createdAt: Category["_createdAt"];
  updatedAt: Category["_updatedAt"];
};

export const makeCategoryDetailsQuery = () =>
  new SanityQuery<CategoryDetails>()
    .where("_type == 'category'")
    .pick("name", "caption", "description", "image")
    .coalesce("keywords", "keywords", "[]")
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt");
