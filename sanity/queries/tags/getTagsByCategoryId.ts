import { makeQueryRunner } from "../../utils/runQuery";
import { makeGetTagsQuery } from "./getTags";

export const makeGetTagsByCategoryIdQuery = () =>
  makeGetTagsQuery({ filter: "references($categoryId)" });

export const getTagsByCategoryId = makeQueryRunner(
  (runQuery, categoryId: string) =>
    runQuery(
      makeGetTagsByCategoryIdQuery(),
      { categoryId },
      { next: { tags: [categoryId] } },
    ),
);
