"use client";

import { AnalyticsProvider } from "@/app/analytics/analytics-provider";
import { Analytics } from "@vercel/analytics/next";

const VercelAnalyticsClient = () => {
  return (
    <Analytics
      debug={Boolean(AnalyticsProvider.enableLogging)}
      beforeSend={(data) => {
        const pathname = new URL(data.url).pathname;
        if (pathname.startsWith("/studio")) {
          return null;
        }
        return data;
      }}
    />
  );
};

export default VercelAnalyticsClient;
