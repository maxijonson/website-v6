import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";
import { makeQueryRunner } from "../../utils/runQuery";
import postSchema from "../../schemas/documents/post";
import { makeGetPostsQuery } from "./getPosts";

export const makeGetPostsByTagIdQuery = () =>
  makeGetPostsQuery({
    filter: qGt(qCount("(tags[]->)[_id == $tagId]"), 0),
  });

export const getPostsByTagId = makeQueryRunner((runQuery, tagId: string) => {
  return runQuery(
    makeGetPostsByTagIdQuery(),
    { tagId },
    { next: { tags: [tagId, postSchema.name] } },
  );
});
