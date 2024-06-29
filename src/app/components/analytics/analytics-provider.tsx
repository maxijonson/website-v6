import PostHogProvider from "./post-hog-provider";

export interface AnalyticsProviderProps {
  children?: React.ReactNode;
}

const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return <PostHogProvider>{children}</PostHogProvider>;
};

export default AnalyticsProvider;
