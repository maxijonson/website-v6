/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, type Config } from "sanity";
import { RobotIcon, RocketIcon } from "@sanity/icons";
import { structureTool } from "sanity/structure";

import { apiVersion, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { codeInput } from "@sanity/code-input";
import { structure } from "./sanity/desk/structure";

const configBase = {
  projectId,
  schema,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
} satisfies Partial<Config>;

export default defineConfig([
  {
    ...configBase,
    dataset: "production",
    basePath: "/studio",
    name: "production",
    title: "Production",
    icon: RocketIcon,
  },
  {
    ...configBase,
    dataset: "staging",
    basePath: "/studio-staging",
    name: "staging",
    title: "Staging",
    icon: RobotIcon,
  },
]);
