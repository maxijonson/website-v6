import { serverEnv } from "@/env/env-server";
import { experimental_taintUniqueValue } from "react";

export const readToken = serverEnv.SANITY_API_READ_TOKEN;

if (!readToken) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

experimental_taintUniqueValue(
  "Do not pass the sanity API read token to the client.",
  process,
  readToken,
);
