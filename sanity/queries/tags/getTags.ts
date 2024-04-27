import { q, type Selection } from "groqd";
import { qAnd } from "../../groqd/filters/and";
import { qDefined } from "../../groqd/filters/defined";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import tagSchema from "../../schemas/documents/tag";
import { makeGetPostsQuery } from "../post/getPosts";

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
    { next: { tags: [tagSchema.name] } },
  );
