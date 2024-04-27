import { cacheTag } from "@/utils/cache";
import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";

export const makeGetPostsQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("post"), filter));

export const getPosts = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetPostsQuery().grab$(selection),
    {},
    { next: { tags: [cacheTag.posts] } },
  );
