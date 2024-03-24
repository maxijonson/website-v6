import { getBaseURL } from "@/utils/getBaseURL";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = getBaseURL();

  return [
    {
      url: baseURL.href,
      lastModified: new Date(),
    },
  ];
}
