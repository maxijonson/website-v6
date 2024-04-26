import { isDefined } from "@/utils/isDefined";
import { qS, type QueryLike } from "../s";

export const qType = (type: QueryLike) => {
  if (!isDefined(type)) {
    return "";
  }
  return `_type == "${qS(type)}"`;
};
