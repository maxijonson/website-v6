import { q, type Selection } from "groqd";
import categorySchema from "../../schemas/documents/category";
import { qAnd } from "../../groqd/filters/and";
import { qCount } from "../../groqd/count";
import { qGt } from "../../groqd/filters/gt";
import { qType } from "../../groqd/filters/type";
import { runQuery } from "../../groqd/runQuery";
import { makeGetTagsQuery } from "../tags/getTags";

export const makeGetCategoriesQuery = (filter?: string) =>
  q("*").filter(
    qAnd(
      qType("category"),
      qGt(
        qCount(
          makeGetTagsQuery("references(^._id)").grab$({
            _id: q.string(),
          }),
        ),
        0,
      ),
      filter,
    ),
  );

export const getCategories = async <S extends Selection>(selection: S) =>
  runQuery(
    makeGetCategoriesQuery().grab$(selection),
    {},
    { next: { tags: [categorySchema.name] } },
  );
