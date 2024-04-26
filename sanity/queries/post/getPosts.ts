import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import postSchema from "../../schemas/documents/post";

export const makeGetPostsQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("post"), filter));

export const getPosts = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetPostsQuery().grab$(selection),
    {},
    { next: { tags: [postSchema.name] } },
  );
