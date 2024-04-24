import { q } from "groqd";
import { qCount } from "../../utils/groqd/count";
import { tagDetailsSelection } from "../../selections/tag-details";
import { qGt } from "../../utils/groqd/gt";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { makeGetPostsQuery } from "../post/getPosts";
import { makeQueryRunner } from "../../utils/runQuery";
import tagSchema from "../../schemas/documents/tag";

export interface GetTagsQueryOptions {
  filter?: string;
}

export const makeGetTagsQuery = ({ filter }: GetTagsQueryOptions = {}) =>
  q("*")
    .filter(
      qAnd(
        qType("tag"),
        qGt(
          qCount(
            makeGetPostsQuery({ filter: "references(^._id)" }).grab({
              _id: q.string(),
            }),
          ),
          0,
        ),
        filter,
      ),
    )
    .grab$(tagDetailsSelection);

export const getTags = makeQueryRunner((runQuery) =>
  runQuery(makeGetTagsQuery(), {}, { next: { tags: [tagSchema.name] } }),
);
