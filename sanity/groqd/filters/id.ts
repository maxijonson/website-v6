import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "../s";

export const qId = (id: QueryLike) => {
  if (!isDefined(id)) {
    return "";
  }
  return `_id == ${qS(id)}`;
};
