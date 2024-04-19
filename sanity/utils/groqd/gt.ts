import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "./s";

export const qGt = (value: QueryLike, greaterThan: QueryLike) => {
  if (!isDefined(value) || !isDefined(greaterThan)) {
    throw new Error("qGt requires two non-empty arguments");
  }
  return `${qS(value)} > ${qS(greaterThan)}`;
};
