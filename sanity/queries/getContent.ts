import type { EntityQuery } from "@/utils/types";
import { runQuery } from "../groqd/runQuery";
import { postBodySelection } from "../groqd/selections/post-body";

export const getContent = (
  query: EntityQuery,
  field: string,
  params: Parameters<typeof runQuery>[1],
  options: Parameters<typeof runQuery>[2],
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
