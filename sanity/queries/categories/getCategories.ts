import { q } from "groqd";
import { runQuery } from "../../utils/run-query";
import { qCount } from "../../utils/groqd/count";
import { makeGetTagsQuery } from "../tags/getTags";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";
import { qGt } from "../../utils/groqd/gt";
import { categoryDetailsSelection } from "../../selections/category-details";

export interface GetCategoriesQueryOptions {
  filter?: string;
}

export const makeGetCategoriesQuery = ({
  filter,
}: GetCategoriesQueryOptions = {}) =>
  q("*")
    .filter(
      qAnd(
        qType("category"),
        qGt(
          qCount(
            makeGetTagsQuery({
              filter: "references(^._id)",
            }).grab({
              _id: q.string(),
            }),
          ),
          0,
        ),
        filter,
      ),
    )
    .grab$(categoryDetailsSelection);

export const getCategories = async () => {
  return runQuery(makeGetCategoriesQuery());
};
