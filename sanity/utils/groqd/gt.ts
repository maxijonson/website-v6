import { qS, type QueryLike } from "./s";

export const qGt = (value: QueryLike, greaterThan: QueryLike) => {
  return `${qS(value)} > ${qS(greaterThan)}`;
};
