import { runQuery } from "../../utils/run-query";
import { makeGetTagsQuery } from "./getTags";

export const makeGetTagsByCategoryIdQuery = () =>
  makeGetTagsQuery({ filter: "references($categoryId)" });

export const getTagsByCategoryId = (categoryId: string) =>
  runQuery(makeGetTagsByCategoryIdQuery(), { categoryId });
