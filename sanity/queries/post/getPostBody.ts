import { runQuery } from "../../groqd/runQuery";
import { contentDetailsSelection } from "../../groqd/selections/content/content-details";
import { makeGetPostByIdQuery } from "./getPostById";

export const getPostBody = async (postId: string) =>
  runQuery(
    makeGetPostByIdQuery()
      .slice(0)
      .grabOne$("body")
      .filter()
      .select(contentDetailsSelection),
    { postId },
    { next: { tags: [postId] } },
  );
