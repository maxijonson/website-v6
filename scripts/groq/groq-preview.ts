import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "groqfmt-nodejs";
import path from "path";
import { makeGetPostByIdQuery } from "../../sanity/queries/post/getPostById";
import { makeContentDetailsQuery } from "../../sanity/groqd/selections/content/content-details";
import { q } from "groqd";
import { qType } from "../../sanity/groqd/filters/type";
import { contentBlockDetailsSelection } from "../../sanity/groqd/selections/content/content-block-details";
import { contentCodeGroupDetailsSelection } from "../../sanity/groqd/selections/content/content-code-group-details";
import { contentImageDetailsSelection } from "../../sanity/groqd/selections/content/content-image-details";

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
      .grabOne$("body", makeContentDetailsQuery("").schema)
      .filter()
      .select({
        [qType("contentBlock")]: contentBlockDetailsSelection,
        [qType("image")]: contentImageDetailsSelection,
        [qType("codeGroup")]: contentCodeGroupDetailsSelection,
        default: {
          _key: q.string(),
          _type: q
            .string()
            .transform((type) => `[ContentDetails] unknown (${type})`),
        },
      });

    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
