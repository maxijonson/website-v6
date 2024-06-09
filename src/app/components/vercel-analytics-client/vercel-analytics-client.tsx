import { Analytics } from "@vercel/analytics/next";

const VercelAnalyticsClient = () => {
  return (
    <Analytics
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
