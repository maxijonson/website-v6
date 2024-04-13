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

export type PostDetails = Pick<Post, "title" | "summary" | "keywords"> & {
  id: Post["_id"];
  slug: string;
  createdAt: Post["_createdAt"];
  updatedAt: Post["_updatedAt"];
  author: AuthorDetails;
  tags: TagDetails[];
  image: Post["image"] & {
    metadata: {
      lqip: string;
    };
  };
};

export const makePostDetailsQuery = () =>
  new SanityQuery<PostDetails>()
    .where("_type == 'post'")
    .pick("title", "summary")
    .pickImage("image", { metadata: ["lqip"] })
    .coalesce("keywords", "keywords", "[]")
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt")
    .pick(
      `author->${makeAuthorDetailsQuery().getGroqProjections().replaceAll("\n", " ").replaceAll("\t", "")}`,
    )
    .coalesce(
      "tags",
      `tags[]->${makeTagDetailsQuery().getGroqProjections().replaceAll("\n", " ").replaceAll("\t", "")}`,
      "[]",
    );
