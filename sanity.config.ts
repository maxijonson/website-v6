/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, type Config } from "sanity";
import { RobotIcon, RocketIcon } from "@sanity/icons";
import { structureTool } from "sanity/structure";

import { apiVersion, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

const configBase = {
  projectId,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
} satisfies Partial<Config>;

export default defineConfig([
  {
    ...configBase,
    dataset: "production",
    basePath: "/studio",
    name: "Production",
    title: "Production",
    icon: RocketIcon,
  },
  {
    ...configBase,
    dataset: "staging",
    basePath: "/studio-staging",
    name: "Staging",
    title: "Staging",
    icon: RobotIcon,
  },
]);
