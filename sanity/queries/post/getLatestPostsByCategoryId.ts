import { q } from "groqd";
import { runQuery } from "../../utils/run-query";
import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";

export const makeGetLatestPostsByCategoryIdQuery = () =>
  makeGetLatestPostsQuery({
    filter: qGt(
      qCount(q("tags").filter().deref().filter("category._ref == $id")),
      0,
    ),
  });

export const getLatestPostsByCategoryId = (id: string) => {
  return runQuery(makeGetLatestPostsByCategoryIdQuery(), { id });
};
