import type {
  ListBuilder,
  ListItemBuilder,
  StructureBuilder,
} from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { blogSettingsStructure } from "./blogSettingsStructure";
import blogSettings from "../schemas/singletons/blogSettings";
import post from "../schemas/documents/post";
import author from "../schemas/documents/author";
import category from "../schemas/documents/category";
import tag from "../schemas/documents/tag";
import { pages, pagesStructure } from "./pagesStructure";

// These are the types that are expected to be customized in the `items` array below
const HANDLED_STRUCTURE_TYPES = [
  blogSettings,
  post,
  author,
  category,
  tag,
  ...pages,
] as const;

// Uses the default list item builder for a given type
const defaultListItem = (
  S: StructureBuilder,
  type: { name: string; title?: string },
) =>
  S.documentTypeListItem(type.name).title(
    type.title ?? type.name[0].toUpperCase() + type.name.slice(1),
  );

export const structure = defineStructure<ListBuilder>((S, ctx) => {
  const unhandledTypes = S.documentTypeListItems().filter(
    (listItem: ListItemBuilder) =>
      HANDLED_STRUCTURE_TYPES.every(
        (type) => listItem?.getId()?.toString() !== type.name,
      ),
  );

  return S.list()
    .title("Content")
    .items([
      blogSettingsStructure(S, ctx),
      defaultListItem(S, post),
      defaultListItem(S, author),
      defaultListItem(S, category),
      defaultListItem(S, tag),
      S.divider(),
      pagesStructure(S, ctx),
      S.divider(),
      ...unhandledTypes,
    ]);
});
