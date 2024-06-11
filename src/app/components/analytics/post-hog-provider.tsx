"use client";
import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { PostHogAnalyticsProvider } from "@/app/analytics/providers/post-hog-analytics-provider";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export interface PostHogProviderProps {
  children?: React.ReactNode;
}

if (typeof window !== "undefined") {
  AnalyticsManager.getProvider(PostHogAnalyticsProvider)?.init();
}

const PostHogProvider = ({ children }: PostHogProviderProps) => {
  return <PHProvider client={posthog}>{children}</PHProvider>;
};

export default PostHogProvider;
