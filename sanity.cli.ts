import { clientEnv } from "@/env/env-client";
import { defineCliConfig } from "sanity/cli";

const projectId = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = clientEnv.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
});
