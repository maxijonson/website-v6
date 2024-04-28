import type { Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { runQuery } from "../../groqd/runQuery";
import { makeGetPostsQuery } from "./getPosts";
import { cacheTag } from "@/utils/cache";

export const makeFindPostByGiscusTermQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("giscusTerm == $giscusTerm", filter));

export const findPostByGiscusTerm = <S extends Selection>(
  giscusTerm: string,
  selection: S,
) =>
  runQuery(
    makeFindPostByGiscusTermQuery().grab$(selection).slice(0).nullable(),
    { giscusTerm },
    { next: { tags: [cacheTag.posts] } },
  );
