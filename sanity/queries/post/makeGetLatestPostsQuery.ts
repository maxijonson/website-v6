import { makePostDetailsQuery } from "./makePostDetailsQuery";

export const makeGetLatestPostsQuery = () => {
  return makePostDetailsQuery().orderBy(["createdAt", "desc"]).limit(4);
};

export const getLatestPosts = () => {
  return makeGetLatestPostsQuery().get();
};
