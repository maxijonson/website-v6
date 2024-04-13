import { makePostDetailsQuery } from "./makePostDetailsQuery";

export interface GetLatestPostsQueryOptions {
  limit?: number;
}

export const makeGetLatestPostsQuery = ({
  limit = 4,
}: GetLatestPostsQueryOptions = {}) => {
  return makePostDetailsQuery().orderBy(["createdAt", "desc"]).limit(limit);
};

export const getLatestPosts = (options?: GetLatestPostsQueryOptions) => {
  return makeGetLatestPostsQuery(options).get();
};
