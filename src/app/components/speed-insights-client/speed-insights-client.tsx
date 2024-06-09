"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

const SpeedInsightsClient = () => {
  return (
    <SpeedInsights
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
