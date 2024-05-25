import { type SchemaTypeDefinition } from "sanity";

import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import post from "./schemas/documents/post";
import tag from "./schemas/documents/tag";
import content from "./schemas/fields/content";
import { deepPageSchemas } from "./schemas/pages";
import blogSettings from "./schemas/singletons/blogSettings";
import codeGroup from "./schemas/fields/code-group";
import contentBlock from "./schemas/fields/content-block";
import contentImage from "./schemas/fields/content-image";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    tag,
    content,
    blogSettings,
    ...deepPageSchemas,
    codeGroup,
    contentBlock,
    contentImage,
  ],
};
