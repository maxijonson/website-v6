import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional().default("2024-03-24"),
    NEXT_PUBLIC_SANITY_FORCE_USE_CDN: z
      .union([z.literal("true"), z.literal("false")])
      .optional()
      .transform((s) => {
        if (!s) return undefined;
        return s === "true";
      }),

    NEXT_PUBLIC_VERCEL_ENV: z.union([
      z.literal("development"),
      z.literal("preview"),
      z.literal("production"),
    ]),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: z.string().optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().optional(),

    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_FORCE_USE_CDN: process.env.NEXT_PUBLIC_SANITY_USE_CDN,

    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA:
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
