import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "../s";

export const qCoalesce = (...values: (QueryLike | undefined)[]) => {
  const definedValues = values.filter(isDefined);
  if (definedValues.length === 0) {
    return "";
  }
  return ["coalesce(", qS(definedValues).join(", "), ")"].join("");
};
