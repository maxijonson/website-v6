export const getBaseURL = () => {
  if (
    process.env.VERCEL_GIT_COMMIT_REF === "develop" ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "develop"
  ) {
    return new URL("https://staging.chintristan.io");
  }
  switch (process.env.NODE_ENV) {
    case "development":
      return new URL("http://localhost:3000");
    case "production":
      return new URL("https://www.chintristan.io");
    default:
      if (process.env.VERCEL_URL) {
        return new URL(`https://${process.env.VERCEL_URL}`);
      }
      return new URL("https://www.chintristan.io");
  }
};
