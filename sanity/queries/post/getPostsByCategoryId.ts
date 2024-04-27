import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";
import { cacheTag } from "@/utils/cache";

export const makeGetPostsByCategoryIdQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("$categoryId in tags[]->category._ref", filter));

export const getPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostsByCategoryIdQuery().grab$(selection),
    { categoryId },
    { next: { tags: [categoryId, cacheTag.posts] } },
  );
