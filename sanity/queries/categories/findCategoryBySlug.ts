import { type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetCategoriesQuery } from "./getCategories";
import { cacheTag } from "@/utils/cache";
import { getQueryTag } from "../../utils/getQueryTag";

export const makeFindCategoryBySlugQuery = (filter?: string) =>
  makeGetCategoriesQuery(qAnd("slug.current == $slug", filter));

export const findCategoryBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindCategoryBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    {
      tag: getQueryTag("category", findCategoryBySlug.name),
      next: { tags: [cacheTag.categorySlug(slug)] },
    },
  );
