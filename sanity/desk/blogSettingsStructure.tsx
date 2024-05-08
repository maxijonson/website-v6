import type { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { CogIcon } from "@sanity/icons";
import { BLOGSETTINGS_DOCUMENT_ID } from "../queries/blog-settings/getBlogSettings";

export const blogSettingsStructure = defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Blog Settings")
    .icon(CogIcon)
    .child(
      S.document()
        .schemaType("blogSettings")
        .documentId(BLOGSETTINGS_DOCUMENT_ID),
    ),
);
