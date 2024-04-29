import type { ListBuilder, ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { blogSettingsStructure } from "./blogSettings";

// These are the types that are expected to be customized in the `items` array below
const CUSTOM_STRUCTURE_TYPES: string[] = ["blogSettings"];

export const structure = defineStructure<ListBuilder>((S, ctx) =>
  S.list()
    .title("Content")
    .items([
      blogSettingsStructure(S, ctx),
      // Default structure items if they're not in the CUSTOM_STRUCTURE_TYPES array. Render them defaultly.
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem: ListItemBuilder) =>
          !CUSTOM_STRUCTURE_TYPES.includes(listItem?.getId()?.toString() ?? ""),
      ),
    ]),
);
