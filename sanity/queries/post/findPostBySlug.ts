import { runQuery } from "../../utils/run-query";
import { makeGetPostsQuery } from "./getPosts";

export const makeFindPostBySlugQuery = () =>
  makeGetPostsQuery({ filter: "slug.current == $slug" });

export const findPostBySlug = async (slug: string) => {
  const posts = await runQuery(makeFindPostBySlugQuery(), { slug });
  if (posts.length === 0) {
    return null;
  }
  return posts[0];
};
