import { qS, type QueryLike } from "./s";

export const qCoalesce = (...values: QueryLike[]) => {
  return ["coalesce(", qS(values).join(", "), ")"].join("");
};
