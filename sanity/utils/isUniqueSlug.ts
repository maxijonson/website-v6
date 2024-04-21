import type { SlugIsUniqueValidator } from "sanity";
import { apiVersion } from "../env";
import { qNot } from "./groqd/not";
import { qDefined } from "./groqd/defined";
import { q } from "groqd";
import { qAnd } from "./groqd/and";
import { qOr } from "./groqd/or";
import { qType } from "./groqd/type";
import { qIn } from "./groqd/in";

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
            qNot(qIn("_id", ["$draft", "$published"])),
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
