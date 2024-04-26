import { toPlainText } from "next-sanity";
import type { PostBody } from "../../sanity/groqd/selections/post-body";
import { getHeadingId } from "./getHeadingId";

export const getPostHeadings = (body: PostBody) => {
  return body
    .filter(
      (
        block,
      ): block is PostBody[number] & {
        _type: "block";
        style: "h1" | "h2" | "h3";
      } =>
        block._type === "block" &&
        ["h1", "h2", "h3"].includes(block.style || ""),
    )
    .map((block) => {
      return {
        level: Number(block.style.replace("h", "")),
        text: toPlainText(block),
        id: getHeadingId(block),
      };
    });
};
