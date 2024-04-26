import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "./s";

export const qCount = (query: QueryLike) => {
  if (!isDefined(query)) {
    return "";
  }
  return `count(${qS(query)})`;
};
