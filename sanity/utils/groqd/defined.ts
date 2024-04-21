import { type QueryLike, qS } from "./s";

export const qDefined = (query: QueryLike) => {
  return ["defined(", qS(query), ")"].join("");
};
