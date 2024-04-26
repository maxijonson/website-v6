import { q, type Selection } from "groqd";
import { qCount } from "../../groqd/count";
import { qGt } from "../../groqd/filters/gt";
import { qAnd } from "../../groqd/filters/and";
import { qType } from "../../groqd/filters/type";
import { makeGetPostsQuery } from "../post/getPosts";
import tagSchema from "../../schemas/documents/tag";
import { runQuery } from "../../groqd/runQuery";

export const makeGetTagsQuery = (filter?: string) =>
  q("*").filter(
    qAnd(
      qType("tag"),
      qGt(
        qCount(
          makeGetPostsQuery("references(^._id)").grab$({
            _id: q.string(),
          }),
        ),
        0,
      ),
      filter,
    ),
  );

export const getTags = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetTagsQuery().grab$(selection),
    {},
    { next: { tags: [tagSchema.name] } },
  );
