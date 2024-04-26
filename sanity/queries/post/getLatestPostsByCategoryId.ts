import { qGt } from "../../groqd/filters/gt";
import { qCount } from "../../groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";
import postSchema from "../../schemas/documents/post";
import type { Selection } from "groqd";
import { runQuery } from "../../groqd/runQuery";
import { qAnd } from "../../groqd/filters/and";

export const makeGetLatestPostsByCategoryIdQuery = (filter?: string) =>
  makeGetLatestPostsQuery(
    qAnd(qGt(qCount("(tags[]->)[references($categoryId)]"), 0), filter),
  );

export const getLatestPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) => {
  return runQuery(
    makeGetLatestPostsByCategoryIdQuery().grab$(selection),
    { categoryId },
    { next: { tags: [categoryId, postSchema.name] } },
  );
};
