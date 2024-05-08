import { runQuery } from "../../groqd/runQuery";
import { makeContentDetailsQuery } from "../../groqd/selections/content/content-details";
import { makeGetPostByIdQuery } from "./getPostById";

export const getPostBody = async (postId: string) =>
  runQuery(
    makeGetPostByIdQuery()
      .slice(0)
      .grabOne$("body", makeContentDetailsQuery("body").schema),
    { postId },
    { next: { tags: [postId] } },
  );
