export const getQueryTag = (
  type: "blog-settings" | "category" | "home-page" | "post" | "tag" | "misc",
  name: string,
) => {
  const environment = (() => {
    switch (process.env.VERCEL_ENV || process.env.NODE_ENV || "development") {
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
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "0000000";

  console.info(
    [sha, environment, type, name].join(".").slice(0, 75),
    [sha, environment, type, name].join(".").slice(0, 75).length,
  );
  return [sha, environment, type, name].join(".").slice(0, 75);
};
