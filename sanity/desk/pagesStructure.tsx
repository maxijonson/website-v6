import type { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { DocumentIcon, DocumentsIcon } from "@sanity/icons";
import { pageSchemas } from "../schemas/pages";

export const pagesStructure = defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Pages")
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title("Pages")
        .items(
          pageSchemas.map((schema) =>
            S.documentTypeListItem(schema.name)
              .icon(DocumentIcon)
              .title(
                schema.title ??
                  schema.name[0].toUpperCase() + schema.name.slice(1),
              )
              .child(
                S.document()
                  .schemaType(schema.name)
                  .documentId(schema.name)
                  .title(
                    schema.title ??
                      schema.name[0].toUpperCase() + schema.name.slice(1),
                  ),
              ),
          ),
        ),
    ),
);
