import { q } from "groqd";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { runQuery } from "../../utils/run-query";
import { postDetailsSelection } from "../../selections/post-details";

export interface GetPostsQueryOptions {
  filter?: string;
}

export const makeGetPostsQuery = ({ filter }: GetPostsQueryOptions = {}) =>
  q("*")
    .filter(qAnd(qType("post"), filter))
    .grab$(postDetailsSelection);

export const getPosts = () => runQuery(makeGetPostsQuery());
