/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, type Config } from "sanity";
import { structureTool } from "sanity/structure";

import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { iconify } from "sanity-plugin-iconify";
import { structure } from "./sanity/desk/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { presentationTool } from "sanity/presentation";

export const configBase = {
  projectId,
  schema,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/sanity/draft",
        },
      },
    }),
    codeInput(),
    colorInput(),
    iconify(),
  ],
} satisfies Partial<Config>;

// Note: This is only used for CLI commands. It isn't configured with the intent of being used in the app.
export default defineConfig({
  ...configBase,
  dataset,
});
