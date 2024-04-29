import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/fields/post-content";
import category from "./schemas/documents/category";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import tag from "./schemas/documents/tag";
import blogSettings from "./schemas/singletons/blogSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, tag, blockContent, blogSettings],
};
