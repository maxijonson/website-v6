import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "groqfmt-nodejs";
import path from "path";
import { contentDetailsSelection } from "../../sanity/groqd/selections/content/content-details";
import { makeGetPostByIdQuery } from "../../sanity/queries/post/getPostById";

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

    const query = makeGetPostByIdQuery()
      .slice(0)
      .grabOne$("body")
      .filter()
      .select(contentDetailsSelection);

    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
