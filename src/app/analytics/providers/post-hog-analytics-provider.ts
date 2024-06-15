import { clientEnv } from "@/env/env-client";
import posthog from "posthog-js";
import { AnalyticsProvider } from "../analytics-provider";
import { ConsentApi, type Consent } from "../consent-api";

export class PostHogAnalyticsProvider extends AnalyticsProvider {
  public name = "PostHog";

  public get isEnabled(): boolean {
    return (
      typeof window !== "undefined" &&
      !!posthog &&
      this.hasInit &&
      this.isOptedIn &&
      this.hasConsent
    );
  }

  public init(): void {
    ConsentApi.onConsentChange((newConsent, prevConsent) => {
      this.onConsentApiEvent(newConsent, prevConsent);
    });
    ConsentApi.onReady((consent) => this.onConsentApiEvent(consent, consent));
  }

  public track(
    event: string,
    properties?: Record<string, any> | undefined,
  ): void {
    if (!this.isEnabled) {
      return this.queueTrack(event, properties);
    }
    posthog.capture(event, properties);
  }

  public identify(_properties?: Record<string, any> | undefined): void {}

  private get hasConsent(): boolean {
    return ConsentApi.getConsent("performance");
  }

  private get isOptedIn(): boolean {
    return !posthog.has_opted_out_capturing();
  }

  private get hasInit(): boolean {
    return posthog.__loaded;
  }

  private onConsentApiEvent(newConsent: Consent, prevConsent: Consent) {
    if (!this.hasInit && this.hasConsent) {
      this.log("Initializing");
      posthog.init(clientEnv.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: clientEnv.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        capture_pageleave: true,
        _onCapture: (eventName, eventData) => {
          this.log("Tracked event", eventName, eventData);
        },
        debug: Boolean(AnalyticsProvider.enableLogging),
        advanced_disable_decide: true,
        advanced_disable_feature_flags: true,
        advanced_disable_feature_flags_on_first_load: true,
        advanced_disable_toolbar_metrics: true,
        disable_session_recording: true,
        enable_heatmaps: false,
        autocapture: false,
        loaded: () => {
          this.log("Initialized");

          // Let PostHog track $opt_in before we start tracking events
          setTimeout(() => {
            this.trackQueuedData();
          }, 0);
        },
      });
    }

    if (!this.hasInit) return;

    if (
      this.hasConsent &&
      (!this.isOptedIn || newConsent.performance !== prevConsent.performance)
    ) {
      posthog.opt_in_capturing();
    } else if (!this.hasConsent && this.isOptedIn) {
      posthog.opt_out_capturing();
      posthog.config.capture_pageleave = false;
    }
  }
}
