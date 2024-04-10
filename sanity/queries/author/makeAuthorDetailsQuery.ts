import type { Author } from "../../types/author.types";
import SanityQuery from "../../utils/sanity-query";

export type AuthorDetails = Pick<Author, "name" | "bio" | "image"> & {
  id: Author["_id"];
  slug: string;
  createdAt: Author["_createdAt"];
  updatedAt: Author["_updatedAt"];
};

export const makeAuthorDetailsQuery = () =>
  new SanityQuery<AuthorDetails>()
    .where("_type == 'author'")
    .pick("name", "bio", "image")
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt");
