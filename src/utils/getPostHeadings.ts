import { toPlainText } from "next-sanity";
import { getHeadingId } from "./getHeadingId";
import { blockHasChildren } from "./blockHasChildren";
import type { ContentDetails } from "../../sanity/groqd/selections/content/content-details";
import type { ContentBlockDetails } from "../../sanity/groqd/selections/content/content-block-details";

export const getPostHeadings = (body: ContentDetails) => {
  return body
    .filter(
      (
        block,
      ): block is ContentBlockDetails & {
        style: "h2" | "h3";
      } =>
        block._type === "block" &&
        ["h2", "h3"].includes((block as ContentBlockDetails).style || ""),
    )
    .map((block) => {
      return {
        level: Number(block.style.replace("h", "")),
        text: blockHasChildren(block) ? toPlainText(block) : block._key,
        id: getHeadingId(block),
      };
    });
};
