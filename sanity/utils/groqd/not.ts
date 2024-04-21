import { qS, type QueryLike } from "./s";

export const qNot = (query: QueryLike) => {
  return `!(${qS(query)})`;
};
