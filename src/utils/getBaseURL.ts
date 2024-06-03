import { clientEnv } from "../env/env-client";
import { serverEnv } from "../env/env-server";

export const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return new URL("/", window.location.origin);
  }

  if (clientEnv.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "develop") {
    return new URL("https://staging.chintristan.io");
  }
  if (clientEnv.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "main") {
    return new URL("https://www.chintristan.io");
  }
  if (clientEnv.NEXT_PUBLIC_VERCEL_URL) {
    return new URL(`https://${clientEnv.NEXT_PUBLIC_VERCEL_URL}`);
  }

  try {
    return new URL(`http://localhost:${serverEnv.PORT ?? 3000}`);
  } catch {
    return new URL("http://localhost:3000");
  }
};
