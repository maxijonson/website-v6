import type { SlugIsUniqueValidator } from "sanity";
import { apiVersion } from "../env";
import { qNot } from "../groqd/filters/not";
import { qDefined } from "../groqd/filters/defined";
import { q } from "groqd";
import { qAnd } from "../groqd/filters/and";
import { qOr } from "../groqd/filters/or";
import { qType } from "../groqd/filters/type";

export const isUniqueSlug: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context;
  if (!document) return true;

  const client = getClient({ apiVersion });
  const id = document._id.replace(/^drafts\./, "");
  const query = qNot(
    qDefined(
      q("*")
        .filter(
          qAnd(
            qNot("_id in [$draft, $published]"),
            qOr(
              qType("post"),
              qType("category"),
              qType("tag"),
              qType("author"),
            ),
            "slug.current == $slug",
          ),
        )
        .slice(0)
        .grabOne$("_id", q.string()),
    ),
  );
  const result = await client.fetch(query, {
    draft: `drafts.${id}`,
    published: id,
    slug,
  });
  return result;
};
