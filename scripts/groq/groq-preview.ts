import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "groqfmt-nodejs";
import path from "path";
import { homePageDetailsSelection } from "../../sanity/groqd/selections/pages/home-page/home-page-details";
import { makeGetHomePageQuery } from "../../sanity/queries/pages/home-page/getHomePage";

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

    const query = makeGetHomePageQuery()
      .grab$(homePageDetailsSelection)
      .slice(0);

    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
