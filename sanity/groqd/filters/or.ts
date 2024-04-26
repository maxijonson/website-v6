import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "../s";

export const qOr = (...queries: (QueryLike | undefined)[]) => {
  const definedQueries = queries.filter(isDefined);
  if (definedQueries.length === 0) {
    return "";
  }
  if (definedQueries.length === 1) {
    return qS(definedQueries[0]);
  }
  return ["(", qS(definedQueries).join(" || "), ")"].join("");
};
