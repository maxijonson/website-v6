import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "groqfmt-nodejs";
import path from "path";
import { makeGetPostsByCategoryIdQuery } from "../../sanity/queries/post/getPostsByCategoryId";
import { postDetailsSelection } from "../../sanity/groqd/selections/post-details";
import { reselect } from "../../sanity/groqd/selections/reselect";

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

    const query = makeGetPostsByCategoryIdQuery().grab$(
      reselect({
        id: postDetailsSelection.id,
        slug: postDetailsSelection.slug,
      }),
    );

    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
