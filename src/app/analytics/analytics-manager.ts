import type { AnalyticsProvider } from "./analytics-provider";
import { PostHogAnalyticsProvider } from "./providers/post-hog-analytics-provider";

export class AnalyticsManager {
  private static providers: AnalyticsProvider[] = [
    new PostHogAnalyticsProvider(),
  ];

  public static track(event: string, properties?: Record<string, any>): void {
    AnalyticsManager.providers.forEach((provider) => {
      provider.track(event, properties);
    });
  }

  public static getProvider(
    type: typeof AnalyticsProvider,
  ): AnalyticsProvider | null {
    return (
      AnalyticsManager.providers.find((provider) => provider instanceof type) ??
      null
    );
  }
}

if (typeof window !== "undefined") {
  (window as any).AnalyticsManager = AnalyticsManager;
  (window as any).PostHogAnalytics = AnalyticsManager.getProvider(
    PostHogAnalyticsProvider,
  );
}
