import { qS, type QueryLike } from "./s";

export const qType = (type: QueryLike) => {
  return `_type == "${qS(type)}"`;
};
