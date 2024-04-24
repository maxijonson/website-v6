import postSchema from "../../schemas/documents/post";
import { qCount } from "../../utils/groqd/count";
import { qGt } from "../../utils/groqd/gt";
import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetPostsQuery } from "./getPosts";

export const makeGetPostsByCategoryIdQuery = () =>
  makeGetPostsQuery({
    filter: qGt(qCount("(tags[]->)[references($categoryId)]"), 0),
  });

export const getPostsByCategoryId = makeQueryRunner(
  (runQuery, categoryId: string) => {
    return runQuery(
      makeGetPostsByCategoryIdQuery(),
      { categoryId },
      { next: { tags: [categoryId, postSchema.name] } },
    );
  },
);
