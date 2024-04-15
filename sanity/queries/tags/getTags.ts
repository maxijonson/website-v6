import { q } from "groqd";
import { qCount } from "../../utils/groqd/count";
import { runQuery } from "../../utils/run-query";
import { tagDetailsSelection } from "../../selections/tag-details";
import { qGt } from "../../utils/groqd/gt";
import { qAnd } from "../../utils/groqd/and";
import { qType } from "../../utils/groqd/type";

export interface GetTagsQueryOptions {
  filter?: string;
}

export const makeGetTagsQuery = ({ filter }: GetTagsQueryOptions = {}) =>
  q("*")
    .filter(
      qAnd(
        qType("tag"),
        qGt(
          qCount(
            q("*")
              .filter(qAnd(qType("post"), "references(^._id)"))
              .grab({
                _id: q.string(),
              }),
          ),
          0,
        ),
        filter ?? "",
      ),
    )
    .grab$(tagDetailsSelection);

export const getTags = () => runQuery(makeGetTagsQuery());
