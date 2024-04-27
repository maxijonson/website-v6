import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qDefined } from "../../groqd/filters/defined";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import categorySchema from "../../schemas/documents/category";
import { makeGetTagsQuery } from "../tags/getTags";

export const makeGetCategoriesQuery = (filter?: string) =>
  q("*").filter(
    qAnd(
      qType("category"),
      qDefined(makeGetTagsQuery("references(^._id)").slice(0)),
      filter,
    ),
  );

export const getCategories = async <S extends Selection>(selection: S) =>
  runQuery(
    makeGetCategoriesQuery().grab$(selection),
    {},
    { next: { tags: [categorySchema.name] } },
  );
