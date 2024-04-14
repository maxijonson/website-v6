import type { BaseQuery } from "groqd";

export const qCoalesce = (...values: (BaseQuery<any> | string)[]) => {
  return [
    "coalesce(",
    values.map((v) => (typeof v === "string" ? v : v.query)).join(", "),
    ")",
  ].join("");
};
