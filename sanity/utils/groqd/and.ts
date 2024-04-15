import { qS, type QueryLike } from "./s";

export const qAnd = (...queries: [QueryLike, QueryLike, ...QueryLike[]]) => {
  return ["(", qS(queries).join(" && "), ")"].join("");
};
