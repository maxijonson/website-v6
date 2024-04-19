import { makeGetTagsQuery } from "../tags/getTags";
import { makeGetCategoriesQuery } from "./getCategories";
import { runQuery } from "../../utils/run-query";
import { reselect } from "../../utils/groqd/reselect";
import { categoryDetailsSelection } from "../../selections/category-details";

export const makeGetCategoriesWithTagsQuery = () =>
  makeGetCategoriesQuery().grab$({
    ...reselect(categoryDetailsSelection),
    tags: makeGetTagsQuery({ filter: "references(^.id)" }),
  });

export const getCategoriesWithTags = () =>
  runQuery(makeGetCategoriesWithTagsQuery());
