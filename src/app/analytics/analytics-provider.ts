import { ConsentApi, type Consent } from "./consent-api";

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
  public abstract cookieTypes: (keyof Consent)[];

  public abstract get isEnabled(): boolean;

  private queuedEvents: Array<[string, Record<string, any> | undefined]> = [];
  private queuedIdentify: Record<string, any> | undefined;
  private queuedSet: Record<string, any> | undefined;
  private queuedSetOnce: Record<string, any> | undefined;
  private queuedUnset: string[] | undefined;

  public get hasConsent(): boolean {
    return this.cookieTypes.every((type) => ConsentApi.getConsent(type));
  }

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

  public abstract set(properties: Record<string, any>): void;
  protected queueSet(properties: Record<string, any>): void {
    this.queuedSet = { ...this.queuedSet, ...properties };
    this.log("Queued set", properties);
  }

  public abstract setOnce(properties: Record<string, any>): void;
  protected queueSetOnce(properties: Record<string, any>): void {
    this.queuedSetOnce = { ...properties, ...this.queuedSetOnce };
    this.log("Queued setOnce", properties);
  }

  public abstract unset(...properties: string[]): void;
  protected queueUnset(...properties: string[]): void {
    this.queuedUnset = [...(this.queuedUnset ?? []), ...properties];
    this.log("Queued unset", properties);
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
      events: [...this.queuedEvents],
      set: this.queuedSet ? { ...this.queuedSet } : undefined,
      setOnce: this.queuedSetOnce ? { ...this.queuedSetOnce } : undefined,
      unset: this.queuedUnset ? [...this.queuedUnset] : undefined,
    });

    if (this.queuedSet) {
      this.set(this.queuedSet);
      this.queuedSet = undefined;
    }

    if (this.queuedSetOnce) {
      this.setOnce(this.queuedSetOnce);
      this.queuedSetOnce = undefined;
    }

    if (this.queuedUnset) {
      this.unset(...this.queuedUnset);
      this.queuedUnset = undefined;
    }

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
