import { qS, type QueryLike } from "./s";

export const qCount = (query: QueryLike) => {
  return `count(${qS(query)})`;
};
