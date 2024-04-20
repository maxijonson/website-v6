import { runQuery } from "../../utils/run-query";
import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";

export const makeGetLatestPostsByCategoryIdQuery = () =>
  makeGetLatestPostsQuery({
    filter: qGt(qCount("(tags[]->)[references($categoryId)]"), 0),
  });

export const getLatestPostsByCategoryId = (categoryId: string) => {
  return runQuery(makeGetLatestPostsByCategoryIdQuery(), { categoryId });
};
