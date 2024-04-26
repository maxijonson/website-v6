import type { Selection } from "groqd";
import postSchema from "../../schemas/documents/post";
import { qAnd } from "../../groqd/filters/and";
import { qCount } from "../../groqd/count";
import { qGt } from "../../groqd/filters/gt";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export const makeGetPostsByCategoryIdQuery = (filter?: string) =>
  makeGetPostsQuery(
    qAnd(qGt(qCount("(tags[]->)[references($categoryId)]"), 0), filter),
  );

export const getPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostsByCategoryIdQuery().grab$(selection),
    { categoryId },
    { next: { tags: [categoryId, postSchema.name] } },
  );
