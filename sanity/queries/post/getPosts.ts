import { q } from "groqd";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { postDetailsSelection } from "../../selections/post-details";
import { makeQueryRunner } from "../../utils/runQuery";
import postSchema from "../../schemas/documents/post";

export interface GetPostsQueryOptions {
  filter?: string;
}

export const makeGetPostsQuery = ({ filter }: GetPostsQueryOptions = {}) =>
  q("*")
    .filter(qAnd(qType("post"), filter))
    .grab$(postDetailsSelection);

export const getPosts = makeQueryRunner((runQuery) =>
  runQuery(makeGetPostsQuery(), {}, { next: { tags: [postSchema.name] } }),
);
