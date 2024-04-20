import { runQuery } from "../../utils/run-query";
import { makeGetCategoriesQuery } from "./getCategories";

export const makeFindCategoryBySlugQuery = () =>
  makeGetCategoriesQuery({ filter: "slug.current == $slug" });

export const findCategoryBySlug = async (slug: string) => {
  const categories = await runQuery(makeFindCategoryBySlugQuery(), { slug });
  if (categories.length === 0) {
    return null;
  }
  return categories[0];
};
