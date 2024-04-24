import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";
import { makeQueryRunner } from "../../utils/runQuery";
import postSchema from "../../schemas/documents/post";

export const makeGetLatestPostsByCategoryIdQuery = () =>
  makeGetLatestPostsQuery({
    filter: qGt(qCount("(tags[]->)[references($categoryId)]"), 0),
  });

export const getLatestPostsByCategoryId = makeQueryRunner(
  (runQuery, categoryId: string) => {
    return runQuery(
      makeGetLatestPostsByCategoryIdQuery(),
      { categoryId },
      { next: { tags: [categoryId, postSchema.name] } },
    );
  },
);
