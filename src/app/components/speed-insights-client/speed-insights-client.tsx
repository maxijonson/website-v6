"use client";

import { AnalyticsProvider } from "@/app/analytics/analytics-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SpeedInsightsClient = () => {
  return (
    <SpeedInsights
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

export default SpeedInsightsClient;
