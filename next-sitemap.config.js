/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: (() => {
    if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "develop") {
      return new URL("https://staging.chintristan.io");
    }
    if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "main") {
      return new URL("https://www.chintristan.io");
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      return new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
    }
    return new URL(`http://localhost:3000`);
  })().href,
  generateRobotsTxt: true,
};

module.exports = config;
