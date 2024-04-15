import { q } from "groqd";
import { runQuery } from "../../utils/run-query";
import { postDetailsSelection } from "../../selections/post-details";
import { qType } from "../../utils/groqd/type";

export const makeGetLatestPostsQuery = () =>
  q("*")
    .filter(qType("post"))
    .grab$(postDetailsSelection)
    .order("createdAt desc")
    .slice(0, 3);

export const getLatestPosts = () => runQuery(makeGetLatestPostsQuery());
