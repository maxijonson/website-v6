import { toPlainText } from "next-sanity";
import slugify from "slugify";
import { isDefined } from "./isDefined";
import { blockHasChildren } from "./blockHasChildren";
import type { ContentBlockDetails } from "../../sanity/groqd/selections/content/content-block-details";

export const getHeadingId = (block: ContentBlockDetails) => {
  if (!blockHasChildren(block)) {
    return block._key;
  }
  return [
    slugify(toPlainText(block), {
      lower: true,
      strict: true,
    }),
    block._key,
  ]
    .filter(isDefined)
    .join("-");
};
