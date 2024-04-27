import type { EntityQuery } from "@/utils/types";
import {
  runQuery,
  type RunQueryOptions,
  type RunQueryParams,
} from "../groqd/runQuery";
import { postBodySelection } from "../groqd/selections/post-body";

export const getContent = (
  query: EntityQuery,
  field: string,
  params?: RunQueryParams,
  options?: RunQueryOptions,
) => {
  return runQuery(
    query.grabOne$(
      `
        ${field}[]{
            ...,
            _type == "image" => {
            ...,
            "metadata": asset->metadata
            }
        }
    `,
      postBodySelection.body,
    ),
    params,
    options,
  );
};
