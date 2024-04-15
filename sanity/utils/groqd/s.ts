import type { BaseQuery } from "groqd";

export type QueryLike = BaseQuery<any> | string | number | boolean;

export const qS = <
  T extends QueryLike | QueryLike[],
  R = T extends QueryLike[] ? string[] : string,
>(
  value: T,
): R => {
  if (Array.isArray(value)) {
    return value.map((v) => qS(v)).filter((s) => !!s) as R;
  }
  if (typeof value === "string") return value as R;
  if (typeof value === "number") return `${value}` as R;
  if (typeof value === "boolean") return `${value}` as R;
  return value.query as R;
};
