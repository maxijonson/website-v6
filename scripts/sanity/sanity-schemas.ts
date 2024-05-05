import fs from "fs/promises";
import path from "path";

(async () => {
  const schemaFile = path.join(
    __dirname,
    "..",
    "..",
    "sanity",
    "sanity.schemas.ts",
  );
  const schemaContent = await fs.readFile(schemaFile, "utf-8");
  const groqdImport = 'import { q as z } from "groqd";';
  const groqdImportRegex = /import { z } from "zod";/;
  const newSchemaContent = schemaContent.replace(groqdImportRegex, groqdImport);
  await fs.writeFile(schemaFile, newSchemaContent);
})();
