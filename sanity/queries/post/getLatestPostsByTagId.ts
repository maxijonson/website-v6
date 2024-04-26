import { qGt } from "../../groqd/filters/gt";
import { qCount } from "../../groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";
import postSchema from "../../schemas/documents/post";
import type { Selection } from "groqd";
import { runQuery } from "../../groqd/runQuery";
import { qAnd } from "../../groqd/filters/and";

export const makeGetLatestPostsByTagIdQuery = (filter?: string) =>
  makeGetLatestPostsQuery(
    qAnd(qGt(qCount("(tags[]->)[_id == $tagId]"), 0), filter),
  );

export const getLatestPostsByTagId = <S extends Selection>(
  tagId: string,
  selection: S,
) => {
  return runQuery(
    makeGetLatestPostsByTagIdQuery().grab$(selection),
    { tagId },
    { next: { tags: [tagId, postSchema.name] } },
  );
};
