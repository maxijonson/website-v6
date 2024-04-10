import type { Tag } from "../../sanity.types";
import SanityQuery from "../../utils/sanity-query";
import {
  makeCategoryDetailsQuery,
  type CategoryDetails,
} from "../category/makeCategoryDetailsQuery";

export type TagDetails = Pick<
  Tag,
  "name" | "caption" | "description" | "image" | "keywords"
> & {
  id: Tag["_id"];
  slug: string;
  createdAt: Tag["_createdAt"];
  updatedAt: Tag["_updatedAt"];
  category: CategoryDetails;
};

export const makeTagDetailsQuery = () =>
  new SanityQuery<TagDetails>()
    .where("_type == 'tag'")
    .pick("name", "caption", "description", "image")
    .coalesce("keywords", "keywords", "[]")
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt")
    .pick(`category->${makeCategoryDetailsQuery().getGroqProjections()}`);
