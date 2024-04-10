import { makePostDetailsQuery } from "./makePostDetailsQuery";

export const makeLatestPostsQuery = () => {
  return makePostDetailsQuery().orderBy(["createdAt", "desc"]).limit(4);
};

export const getLatestPosts = () => {
  return makeLatestPostsQuery().get();
};
