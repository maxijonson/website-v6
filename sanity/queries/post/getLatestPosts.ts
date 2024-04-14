import { q } from "groqd";
import { runQuery } from "../../utils/run-query";
import { postDetailsSelection } from "../../selections/post-details";

export const getLatestPosts = () => {
  return runQuery(
    q("*")
      .filterByType("post")
      .grab$(postDetailsSelection)
      .order("createdAt desc")
      .slice(0, 3),
  );
};
