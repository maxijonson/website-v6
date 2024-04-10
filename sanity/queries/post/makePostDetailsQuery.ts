import type { Post } from "../../sanity.types";
import SanityQuery from "../../utils/sanity-query";
import {
  makeAuthorDetailsQuery,
  type AuthorDetails,
} from "../author/makeAuthorDetailsQuery";
import {
  makeTagDetailsQuery,
  type TagDetails,
} from "../tag/makeTagDetailsQuery";

export type PostDetails = Pick<
  Post,
  "title" | "summary" | "image" | "keywords"
> & {
  id: Post["_id"];
  slug: string;
  createdAt: Post["_createdAt"];
  updatedAt: Post["_updatedAt"];
  author: AuthorDetails;
  tags: TagDetails[];
};

export const makePostDetailsQuery = () =>
  new SanityQuery<PostDetails>()
    .where("_type == 'post'")
    .pick("title", "summary", "image")
    .coalesce("keywords", "keywords", "[]")
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt")
    .pick(`author->${makeAuthorDetailsQuery().getGroqProjections()}`)
    .coalesce(
      "tags",
      `tags[]->${makeTagDetailsQuery().getGroqProjections()}`,
      "[]",
    );
