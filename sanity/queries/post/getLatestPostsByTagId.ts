import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeGetLatestPostsQuery } from "./getLatestPosts";
import { makeQueryRunner } from "../../utils/runQuery";
import postSchema from "../../schemas/documents/post";

export const makeGetLatestPostsByTagIdQuery = () =>
  makeGetLatestPostsQuery({
    filter: qGt(qCount("(tags[]->)[_id == $tagId]"), 0),
  });

export const getLatestPostsByTagId = makeQueryRunner(
  (runQuery, tagId: string) => {
    return runQuery(
      makeGetLatestPostsByTagIdQuery(),
      { tagId },
      { next: { tags: [tagId, postSchema.name] } },
    );
  },
);
