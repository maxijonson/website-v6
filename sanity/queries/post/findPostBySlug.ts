import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";
import { cacheTag } from "@/utils/cache";
import { getQueryTag } from "../../utils/getQueryTag";

export const makeFindPostBySlugQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("slug.current == $slug", filter));

export const findPostBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindPostBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    {
      tag: getQueryTag("post", findPostBySlug.name),
      next: { tags: [cacheTag.postSlug(slug)] },
    },
  );
