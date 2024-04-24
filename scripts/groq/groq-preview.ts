import { existsSync } from "fs";
import fs from "fs/promises";
import { q } from "groqd";
import { format } from "groqfmt-nodejs";
import path from "path";
import { categoryDetailsSelection } from "../../sanity/selections/category-details";
import { postDetailsSelection } from "../../sanity/selections/post-details";
import { tagDetailsSelection } from "../../sanity/selections/tag-details";

(async () => {
  try {
    const queryFile = path.join(__dirname, "sandbox.groq");
    if (!existsSync(queryFile)) {
      await fs.writeFile(
        queryFile,
        `*[_type == "post"]{ title, slug }`,
        "utf-8",
      );
      console.info("sandbox.groq created");
    }
    const query = q("*")
      .filter("_type in ['post', 'category', 'tag', 'author']")
      .select({
        "_type == 'post'": {
          type: ["_type", q.literal("post")],
          id: postDetailsSelection.id,
          slug: postDetailsSelection.slug,
          tags: q("tags")
            .filter()
            .deref()
            .grab$({
              type: ["_type", q.literal("tag")],
              id: tagDetailsSelection.id,
              slug: tagDetailsSelection.slug,
              category: q("category")
                .deref()
                .grab$({
                  type: ["_type", q.literal("category")],
                  id: categoryDetailsSelection.id,
                  slug: categoryDetailsSelection.slug,
                }),
            }),
        },
      })
      .slice(0);
    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
