import dynamic from "next/dynamic";
import PostHogProvider from "./post-hog-provider";

export interface AnalyticsProviderProps {
  children?: React.ReactNode;
}

const PageView = dynamic(() => import("./page-view"), {
  ssr: false,
});

const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return (
    <PostHogProvider>
      <PageView />
      {children}
    </PostHogProvider>
  );
};

export default AnalyticsProvider;
