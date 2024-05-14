import { type SchemaTypeDefinition } from "sanity";

import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import post from "./schemas/documents/post";
import tag from "./schemas/documents/tag";
import blockContent from "./schemas/fields/content";
import { deepPageSchemas } from "./schemas/pages";
import blogSettings from "./schemas/singletons/blogSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    tag,
    blockContent,
    blogSettings,
    ...deepPageSchemas,
  ],
};
