export const getQueryTag = (
  type: "blog-settings" | "category" | "home-page" | "post" | "tag" | "misc",
  name: string,
) => {
  return [
    process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
    process.env.VERCEL_GIT_COMMIT_SHA || "local",
    type,
    name,
  ].join(".");
};
