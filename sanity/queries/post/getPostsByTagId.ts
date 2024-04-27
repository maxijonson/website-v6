import { cacheTag } from "@/utils/cache";
import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export const makeGetPostsByTagIdQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("$tagId in tags[]._ref", filter));

export const getPostsByTagId = <S extends Selection>(
  tagId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostsByTagIdQuery().grab$(selection),
    { tagId },
    { next: { tags: [tagId, cacheTag.posts] } },
  );
