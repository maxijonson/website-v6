import { q } from "groqd";
import { runQuery } from "../../utils/run-query";
import { postDetailsSelection } from "../../selections/post-details";
import { qType } from "../../utils/groqd/type";
import { qAnd } from "../../utils/groqd/and";
import { qGt } from "../../utils/groqd/gt";
import { qCount } from "../../utils/groqd/count";

export const makeGetLatestPostsByCategoryIdQuery = () =>
  q("*")
    .filter(
      qAnd(
        qType("post"),
        qGt(
          qCount(q("tags").filter().deref().filter("category._ref == $id")),
          0,
        ),
      ),
    )
    .grab$(postDetailsSelection)
    .order("createdAt desc")
    .slice(0, 3);

export const getLatestPostsByCategoryId = (id: string) => {
  return runQuery(makeGetLatestPostsByCategoryIdQuery(), { id });
};
