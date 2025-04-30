import { cacheTag } from "@/utils/cache";
import type { UnknownArrayQuery } from "@/utils/types";
import type { Selection } from "groqd";
import type { RunQueryOptions, RunQueryParams } from "../../groqd/runQuery";
import { runSlicedQuery } from "../slice";
import { makeGetPostsQuery } from "./getPosts";
import { makeGetPostsByCategoryIdQuery } from "./getPostsByCategoryId";
import { makeGetPostsByTagIdQuery } from "./getPostsByTagId";
import { getQueryTag } from "../../utils/getQueryTag";

const runLatestPostsQuery = <S extends Selection>(
  query: UnknownArrayQuery,
  selection: S,
  { amount = 4 }: { amount?: number } = {},
  params?: RunQueryParams,
  options?: RunQueryOptions,
) => {
  return runSlicedQuery(query, selection, 0, amount - 1, params, options);
};

export const getRecentPosts = <S extends Selection>(
  selection: S,
  { amount = 4, excludeIds }: { amount?: number; excludeIds?: string[] } = {},
) =>
  runLatestPostsQuery(
    makeGetPostsQuery(excludeIds ? `!(_id in $excludeIds)` : undefined),
    selection,
    { amount },
    { excludeIds },
    {
      tag: getQueryTag("post", "getRecentPosts"),
      next: { tags: [cacheTag.posts] },
    },
  );

export const getRecentPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
  { amount = 3, excludeIds }: { amount?: number; excludeIds?: string[] } = {},
) =>
  runLatestPostsQuery(
    makeGetPostsByCategoryIdQuery(
      excludeIds ? `!(_id in $excludeIds)` : undefined,
    ),
    selection,
    { amount },
    { categoryId, excludeIds },
    {
      tag: getQueryTag("post", "getRecentPostsByCategoryId"),
      next: { tags: [categoryId, cacheTag.posts] },
    },
  );

export const getRecentPostsByTagId = <S extends Selection>(
  tagId: string,
  selection: S,
  { amount = 3, excludeIds }: { amount?: number; excludeIds?: string[] } = {},
) =>
  runLatestPostsQuery(
    makeGetPostsByTagIdQuery(excludeIds ? `!(_id in $excludeIds)` : undefined),
    selection,
    { amount },
    { tagId, excludeIds },
    {
      tag: getQueryTag("post", "getRecentPostsByTagId"),
      next: { tags: [tagId, cacheTag.posts] },
    },
  );
