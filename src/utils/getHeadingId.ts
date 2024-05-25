import { toPlainText } from "next-sanity";
import slugify from "slugify";
import type { ContentBlockDetails } from "../../sanity/groqd/selections/content/content-block-details/content-block-details";
import { blockHasChildren } from "./blockHasChildren";

export const getHeadingId = (block: ContentBlockDetails) => {
  if (!blockHasChildren(block)) {
    return block._key;
  }
  return slugify(toPlainText(block), {
    lower: true,
    strict: true,
  });
};
