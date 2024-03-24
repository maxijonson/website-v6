import { getBaseURL } from "@/utils/getBaseURL";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = getBaseURL();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/",
    },
    sitemap: new URL("/sitemap.xml", host).href,
  };
}
