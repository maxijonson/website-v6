import { cacheTag } from "@/utils/cache";
import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qDefined } from "../../groqd/filters/defined";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "../post/getPosts";
import { getQueryTag } from "../../utils/getQueryTag";

export const makeGetTagsQuery = (filter?: string) =>
  q("*").filter(
    qAnd(
      qType("tag"),
      qDefined(makeGetPostsQuery("references(^._id)").slice(0)),
      filter,
    ),
  );

export const getTags = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetTagsQuery().grab$(selection),
    {},
    {
      tag: getQueryTag("tag", "getTags"),
      next: { tags: [cacheTag.tags] },
    },
  );
