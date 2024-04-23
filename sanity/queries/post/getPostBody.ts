import { q } from "groqd";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { postBodySelection } from "../../selections/post-body";
import { makeQueryRunner } from "../../utils/runQuery";

export const makeGetPostBodyQuery = () =>
  q("*")
    .filter(qAnd(qType("post"), "_id == $postId"))
    .grab$({
      body: [
        `
        body[]{
          ...,
          _type == "image" => {
            ...,
            "metadata": asset->metadata
          }
        }
      `,
        q.unknown(),
      ],
    })
    .grabOne("body", postBodySelection.body);

export const getPostBody = makeQueryRunner(async (runQuery, postId: string) => {
  return (
    await runQuery(
      makeGetPostBodyQuery(),
      { postId },
      { next: { tags: [postId] } },
    )
  )[0];
});
