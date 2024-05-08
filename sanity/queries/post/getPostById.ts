import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";
import { qId } from "../../groqd/filters/id";

export const makeGetPostByIdQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd(qId("$postId"), filter));

export const getPostById = <S extends Selection>(
  postId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostByIdQuery().grab$(selection).slice(0),
    { postId },
    { next: { tags: [postId] } },
  );
