import { webhookBodyQuery } from "@/app/api/webhooks/sanity/query";
import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "groqfmt-nodejs";
import path from "path";

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

    const query = webhookBodyQuery;

    const queryFormatted = format(query.query);
    await fs.writeFile(queryFile, queryFormatted, "utf-8");
  } catch (error) {
    console.error(error);
  }
})();
