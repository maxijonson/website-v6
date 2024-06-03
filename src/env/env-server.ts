import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    PORT: z
      .string()
      .optional()
      .transform((s) => {
        if (!s) return undefined;
        return parseInt(s, 10);
      }),
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_API_WRITE_TOKEN: z.string().min(1),
    SANITY_REVALIDATE_SECRET: z.string().min(1),
    SANITY_ECO_MODE: z
      .union([z.literal("true"), z.literal("false")])
      .optional()
      .transform((s) => {
        if (!s) return true;
        return s === "true";
      })
      .default("true"),
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
    SANITY_ECO_MODE: process.env.SANITY_ECO_MODE,
  },
});
