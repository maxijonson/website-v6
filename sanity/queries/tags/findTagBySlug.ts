import type { Selection } from "groqd";
import { makeGetTagsQuery } from "./getTags";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { getQueryTag } from "../../utils/getQueryTag";

export const makeFindTagBySlugQuery = (filter?: string) =>
  makeGetTagsQuery(qAnd("slug.current == $slug", filter));

export const findTagBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindTagBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    { tag: getQueryTag("tag", findTagBySlug.name), next: { tags: [slug] } },
  );
