export abstract class AnalyticsProvider {
  public static enableLogging: boolean | "trace" = (() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("debug-analytics") === "trace") {
        return "trace";
      }
      return urlParams.has("debug-analytics");
    }
    return false;
  })();

  public abstract name: string;

  public abstract get isEnabled(): boolean;

  private queuedEvents: Array<[string, Record<string, any> | undefined]> = [];
  private queuedIdentify: Record<string, any> | undefined;

  public abstract init(): void;

  public abstract track(event: string, properties?: Record<string, any>): void;
  protected queueTrack(event: string, properties?: Record<string, any>): void {
    this.queuedEvents.push([event, properties]);
    this.log("Queued event", event, properties);
  }

  public abstract identify(properties?: Record<string, any>): void;
  protected queueIdentify(properties: Record<string, any> = {}): void {
    this.queuedIdentify = { ...this.queuedIdentify, ...properties };
    this.log("Queued identify", properties);
  }

  protected trackQueuedData(): void {
    if (
      !this.isEnabled ||
      (!this.queuedIdentify && this.queuedEvents.length === 0)
    ) {
      return;
    }
    this.log("Tracking queued data", {
      identify: this.queuedIdentify ? { ...this.queuedIdentify } : undefined,
      events: this.queuedEvents.length,
    });

    if (this.queuedIdentify) {
      this.identify(this.queuedIdentify);
      this.queuedIdentify = undefined;
    }

    while (this.queuedEvents.length > 0) {
      const [event, properties] = this.queuedEvents.shift()!;
      this.track(event, properties);
    }
  }

  protected log(...args: any[]): void {
    if (!AnalyticsProvider.enableLogging) return;
    if (AnalyticsProvider.enableLogging === "trace") {
      // eslint-disable-next-line no-console
      console.trace(`[Analytics][${this.name}]`, ...args);
    } else {
      console.info(`[Analytics][${this.name}]`, ...args);
    }
  }
  protected warn(...args: any[]): void {
    if (!AnalyticsProvider.enableLogging) return;
    console.warn(`[Analytics][${this.name}]`, ...args);
  }
  protected error(...args: any[]): void {
    if (!AnalyticsProvider.enableLogging) return;
    console.error(`[Analytics][${this.name}]`, ...args);
  }
}
