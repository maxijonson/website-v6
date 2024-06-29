import type { AnalyticsProvider } from "./analytics-provider";
import { PostHogAnalyticsProvider } from "./providers/post-hog-analytics-provider";

export class AnalyticsManager {
  private static providers: AnalyticsProvider[] = [
    new PostHogAnalyticsProvider(),
  ];

  public static track(...args: Parameters<AnalyticsProvider["track"]>): void {
    this.providers.forEach((provider) => {
      provider.track(...args);
    });
  }

  public static identify(
    ...args: Parameters<AnalyticsProvider["identify"]>
  ): void {
    this.providers.forEach((provider) => {
      provider.identify(...args);
    });
  }

  public static set(...args: Parameters<AnalyticsProvider["set"]>): void {
    this.providers.forEach((provider) => {
      provider.set(...args);
    });
  }

  public static setOnce(
    ...args: Parameters<AnalyticsProvider["setOnce"]>
  ): void {
    this.providers.forEach((provider) => {
      provider.setOnce(...args);
    });
  }

  public static unset(...args: Parameters<AnalyticsProvider["unset"]>): void {
    this.providers.forEach((provider) => {
      provider.unset(...args);
    });
  }

  public static getProvider(
    type: typeof AnalyticsProvider,
  ): AnalyticsProvider | null {
    return this.providers.find((provider) => provider instanceof type) ?? null;
  }
}

if (typeof window !== "undefined") {
  (window as any).AnalyticsManager = AnalyticsManager;
  (window as any).PostHogAnalytics = AnalyticsManager.getProvider(
    PostHogAnalyticsProvider,
  );
}
