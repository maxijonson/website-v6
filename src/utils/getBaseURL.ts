import { clientEnv } from "../env/env-client";

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

  return new URL(`http://localhost:3000`);
};
