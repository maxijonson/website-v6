/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { type Config } from "sanity";
import { structureTool } from "sanity/structure";

import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { iconify } from "sanity-plugin-iconify";
import { structure } from "./sanity/desk/structure";
import { apiVersion, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

export const configBase = {
  projectId,
  schema,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    colorInput(),
    iconify(),
  ],
} satisfies Partial<Config>;
