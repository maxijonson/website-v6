import type { ContentBlockDetails } from "../../sanity/groqd/selections/content/content-block-details";

export const blockHasChildren = (
  block: ContentBlockDetails,
): block is ContentBlockDetails & {
  children: Required<ContentBlockDetails>["children"];
} => {
  return Boolean(block.children);
};
