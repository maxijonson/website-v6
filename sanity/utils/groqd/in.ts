import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "./s";

export const qIn = (value: QueryLike, ins: (QueryLike | undefined)[]) => {
  const definedIns = ins.filter(isDefined);
  return [qS(value), " in ", "[", qS(definedIns).join(","), "]"].join("");
};
