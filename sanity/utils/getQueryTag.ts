import { clientEnv } from "@/env/env-client";

export const getQueryTag = (
  type: "blog-settings" | "category" | "home-page" | "post" | "tag" | "misc",
  name: string,
) => {
  const environment = (() => {
    switch (
      clientEnv.NEXT_PUBLIC_VERCEL_ENV ||
      clientEnv.NEXT_PUBLIC_NODE_ENV ||
      "development"
    ) {
      case "production":
        return 0;
      case "preview":
        return 1;
      case "development":
        return 2;
      default:
        return 3;
    }
  })();
  const sha =
    clientEnv.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "0000000";

  return [sha, environment, type, name].join(".").slice(0, 75);
};
