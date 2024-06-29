"use client";
import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { PostHogAnalyticsProvider } from "@/app/analytics/providers/post-hog-analytics-provider";
import { useEffect, useState } from "react";

export interface PostHogProviderProps {
  children?: React.ReactNode;
}

const PostHogProvider = ({ children }: PostHogProviderProps) => {
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (hasInit) return;
    setHasInit(true);
    AnalyticsManager.getProvider(PostHogAnalyticsProvider)?.init();
  }, [hasInit]);

  return children;
};

export default PostHogProvider;
