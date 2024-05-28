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
  amount = 4,
  params?: RunQueryParams,
  options?: RunQueryOptions,
) => runSlicedQuery(query, selection, 0, amount - 1, params, options);

export const getRecentPosts = <S extends Selection>(selection: S, amount = 4) =>
  runLatestPostsQuery(
    makeGetPostsQuery(),
    selection,
    amount,
    {},
    {
      tag: getQueryTag("post", getRecentPosts.name),
      next: { tags: [cacheTag.posts] },
    },
  );

export const getRecentPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
  amount = 3,
) =>
  runLatestPostsQuery(
    makeGetPostsByCategoryIdQuery(),
    selection,
    amount,
    { categoryId },
    {
      tag: getQueryTag("post", getRecentPostsByCategoryId.name),
      next: { tags: [categoryId, cacheTag.posts] },
    },
  );

export const getRecentPostsByTagId = <S extends Selection>(
  tagId: string,
  selection: S,
  amount = 3,
) =>
  runLatestPostsQuery(
    makeGetPostsByTagIdQuery(),
    selection,
    amount,
    { tagId },
    {
      tag: getQueryTag("post", getRecentPostsByTagId.name),
      next: { tags: [tagId, cacheTag.posts] },
    },
  );
