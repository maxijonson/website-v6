import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export const makeFindPostBySlugQuery = () =>
  makeGetPostsQuery({ filter: "slug.current == $slug" });

export const findPostBySlug = makeQueryRunner(
  async (runQuery, slug: string) => {
    const posts = await runQuery(
      makeFindPostBySlugQuery(),
      { slug },
      { next: { tags: [slug] } },
    );
    if (posts.length === 0) {
      return null;
    }
    return posts[0];
  },
);
