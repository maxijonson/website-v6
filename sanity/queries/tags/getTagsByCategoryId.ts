import type { Selection } from "groqd";
import tagSchema from "../../schemas/documents/tag";
import { makeGetTagsQuery } from "./getTags";
import { runQuery } from "../../groqd/runQuery";
import { qAnd } from "../../groqd/filters/and";

export const makeGetTagsByCategoryIdQuery = (filter?: string) =>
  makeGetTagsQuery(qAnd("references($categoryId)", filter));

export const getTagsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) =>
  runQuery(
    makeGetTagsByCategoryIdQuery().grab$(selection),
    { categoryId },
    { next: { tags: [categoryId, tagSchema.name] } },
  );
