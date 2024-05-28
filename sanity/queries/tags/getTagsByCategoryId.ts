import { cacheTag } from "@/utils/cache";
import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetTagsQuery } from "./getTags";
import { getQueryTag } from "../../utils/getQueryTag";

export const makeGetTagsByCategoryIdQuery = (filter?: string) =>
  makeGetTagsQuery(qAnd("references($categoryId)", filter));

export const getTagsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) =>
  runQuery(
    makeGetTagsByCategoryIdQuery().grab$(selection),
    { categoryId },
    {
      tag: getQueryTag("tag", getTagsByCategoryId.name),
      next: { tags: [categoryId, cacheTag.tags] },
    },
  );
