import { qGt } from "../../groqd/filters/gt";
import { qCount } from "../../groqd/count";
import { runQuery } from "../../groqd/runQuery";
import postSchema from "../../schemas/documents/post";
import { makeGetPostsQuery } from "./getPosts";
import { qAnd } from "../../groqd/filters/and";
import type { Selection } from "groqd";

export const makeGetPostsByTagIdQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd(qGt(qCount("(tags[]->)[_id == $tagId]"), 0), filter));

export const getPostsByTagId = <S extends Selection>(
  tagId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostsByTagIdQuery().grab$(selection),
    { tagId },
    { next: { tags: [tagId, postSchema.name] } },
  );
