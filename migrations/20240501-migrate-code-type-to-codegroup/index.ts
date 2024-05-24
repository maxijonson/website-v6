import { defineMigration, set } from "sanity/migrate";

export default defineMigration({
  title: 'Migrate "code" type to "codeGroup"',
  migrate: {
    object(node, path) {
      if (node._type === "code" && !path.includes("snippets")) {
        return set({
          _type: "codeGroup",
          snippets: [
            {
              _type: "code",
              language: node.language,
              code: node.code,
              filename: node.filename,
            },
          ],
        });
      }
    },
  },
});
