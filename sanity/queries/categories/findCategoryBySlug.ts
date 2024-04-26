import { type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetCategoriesQuery } from "./getCategories";

export const makeFindCategoryBySlugQuery = (filter?: string) =>
  makeGetCategoriesQuery(qAnd("slug.current == $slug", filter));

export const findCategoryBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindCategoryBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    { next: { tags: [slug] } },
  );
