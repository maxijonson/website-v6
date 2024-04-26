import { toPlainText } from "next-sanity";
import slugify from "slugify";
import type { PostBody } from "../../sanity/groqd/selections/post-body";
import { isDefined } from "./isDefined";

export const getHeadingId = (block: PostBody[number] & { _type: "block" }) => {
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
