import { clientEnv } from "@/env/env-client";

export const apiVersion = clientEnv.NEXT_PUBLIC_SANITY_API_VERSION;

export const dataset = clientEnv.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const useCdn = false;
