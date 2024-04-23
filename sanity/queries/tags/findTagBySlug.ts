import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetTagsQuery } from "./getTags";

export const makeFindTagBySlugQuery = () =>
  makeGetTagsQuery({ filter: "slug.current == $slug" });

export const findTagBySlug = makeQueryRunner(async (runQuery, slug: string) => {
  const tags = await runQuery(
    makeFindTagBySlugQuery(),
    { slug },
    { next: { tags: [slug] } },
  );
  if (tags.length === 0) {
    return null;
  }
  return tags[0];
});
