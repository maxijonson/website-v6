import { q } from "groqd";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { runQuery } from "../../utils/run-query";
import { postBodySelection } from "../../selections/post-body";

export const makeGetPostBodyQuery = () =>
  q("*")
    .filter(qAnd(qType("post"), "_id == $id"))
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

export const getPostBody = async (id: string) => {
  return (await runQuery(makeGetPostBodyQuery(), { id }))[0];
};
