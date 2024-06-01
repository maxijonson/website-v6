import { clientEnv } from "@/env/env-client";

export const apiVersion = clientEnv.NEXT_PUBLIC_SANITY_API_VERSION;

export const dataset = clientEnv.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const useCdn = (() => {
  if (typeof clientEnv.NEXT_PUBLIC_SANITY_FORCE_USE_CDN !== "undefined") {
    return clientEnv.NEXT_PUBLIC_SANITY_FORCE_USE_CDN;
  }
  switch (clientEnv.NEXT_PUBLIC_VERCEL_ENV) {
    case "production":
      return false;
    default:
      return true;
  }
})();
