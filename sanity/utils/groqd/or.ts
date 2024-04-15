import { qS, type QueryLike } from "./s";

export const qOr = (...queries: [QueryLike, QueryLike, ...QueryLike[]]) => {
  return ["(", qS(queries).join(" || "), ")"].join("");
};
