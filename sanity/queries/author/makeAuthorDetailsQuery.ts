import type { Author } from "../../sanity.types";
import SanityQuery from "../../utils/sanity-query";

export type AuthorDetails = Pick<Author, "name" | "bio"> & {
  id: Author["_id"];
  slug: string;
  createdAt: Author["_createdAt"];
  updatedAt: Author["_updatedAt"];
  image: Author["image"] & {
    metadata: {
      lqip: string;
    };
  };
};

export const makeAuthorDetailsQuery = () =>
  new SanityQuery<AuthorDetails>()
    .where("_type == 'author'")
    .pick("name", "bio")
    .pickImage("image", { metadata: ["lqip"] })
    .alias("id", "_id")
    .alias("slug", "slug.current")
    .alias("createdAt", "_createdAt")
    .alias("updatedAt", "_updatedAt");
