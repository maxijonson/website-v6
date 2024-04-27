import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";
import { cacheTag } from "@/utils/cache";

export const makeFindPostBySlugQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("slug.current == $slug", filter));

export const findPostBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindPostBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    { next: { tags: [cacheTag.postSlug(slug)] } },
  );
