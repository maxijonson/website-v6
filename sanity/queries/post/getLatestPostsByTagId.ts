import { runQuery } from "../../utils/run-query";
import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";

export const makeGetLatestPostsByTagIdQuery = () =>
  makeGetLatestPostsQuery({
    filter: qGt(qCount("(tags[]->)[_id == $tagId]"), 0),
  });

export const getLatestPostsByTagId = (tagId: string) => {
  return runQuery(makeGetLatestPostsByTagIdQuery(), { tagId });
};
