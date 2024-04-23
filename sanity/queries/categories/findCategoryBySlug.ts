import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetCategoriesQuery } from "./getCategories";

export const makeFindCategoryBySlugQuery = () =>
  makeGetCategoriesQuery({ filter: "slug.current == $slug" });

export const findCategoryBySlug = makeQueryRunner(
  async (runQuery, slug: string) => {
    const categories = await runQuery(
      makeFindCategoryBySlugQuery(),
      { slug },
      { next: { tags: [slug] } },
    );
    if (categories.length === 0) {
      return null;
    }
    return categories[0];
  },
);
