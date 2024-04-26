import type { Selection } from "groqd";
import postSchema from "../../schemas/documents/post";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export const makeGetLatestPostsQuery = (filter?: string) =>
  makeGetPostsQuery(filter).order("_createdAt desc").slice(0, 4);

export const getLatestPosts = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetPostsQuery().grab$(selection),
    {},
    { next: { tags: [postSchema.name] } },
  );
