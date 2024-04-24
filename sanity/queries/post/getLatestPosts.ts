import postSchema from "../../schemas/documents/post";
import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export interface GetLatestPostsQueryOptions {
  filter?: string;
}

export const makeGetLatestPostsQuery = ({
  filter,
}: GetLatestPostsQueryOptions = {}) =>
  makeGetPostsQuery({ filter }).order("createdAt desc").slice(0, 4);

export const getLatestPosts = makeQueryRunner((runQuery) =>
  runQuery(
    makeGetLatestPostsQuery(),
    {},
    { next: { tags: [postSchema.name] } },
  ),
);
