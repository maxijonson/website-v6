import { qAnd } from "../../groqd/filters/and";
import { getContent } from "../getContent";
import { makeGetPostsQuery } from "./getPosts";

export const getPostBody = (postId: string, filter?: string) =>
  getContent(
    makeGetPostsQuery(qAnd("_id == $postId", filter)).slice(0),
    "body",
    { postId },
    { next: { tags: [postId] } },
  );
