import { runQuery } from "../../utils/run-query";
import { makeGetTagsQuery } from "./getTags";

export const makeFindTagBySlugQuery = () =>
  makeGetTagsQuery({ filter: "slug.current == $slug" });

export const findTagBySlug = async (slug: string) => {
  const tags = await runQuery(makeFindTagBySlugQuery(), { slug });
  if (tags.length === 0) {
    return null;
  }
  return tags[0];
};
