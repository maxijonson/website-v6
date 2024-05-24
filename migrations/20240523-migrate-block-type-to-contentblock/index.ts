import { defineMigration, set } from "sanity/migrate";

export default defineMigration({
  title: 'Migrate "block" type to "contentBlock"',
  migrate: {
    object(node) {
      if (node._type === "block") {
        return set({
          ...node,
          _type: "contentBlock",
        });
      }
    },
  },
});
