import { z } from "zod";

export const CONSENT_COOKIE_NAME = "consent";

export const consentCookieSchema = z.object({
  version: z.literal(1),
  purposes: z.object({
    cookieless: z.boolean(),
  }),
});
export type ConsentCookie = z.infer<typeof consentCookieSchema>;
export type Purpose = keyof ConsentCookie["purposes"];
export type Consent = Record<Purpose, boolean>;

export class ConsentApi {
  private static enableLogging: boolean = (() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has("debug-analytics");
    }
    return false;
  })();

  private static isReady = false;
  private static consent: Consent = {
    cookieless: (() => {
      if (typeof window === "undefined") return true;
      return navigator.doNotTrack !== "1";
    })(),
  };

  private static changeListeners: Array<
    (newConsent: Consent, previousConsent: Consent) => void
  > = [];
  private static readyListeners: Array<(consent: Consent) => void> = [];

  public static init(): void {
    if (this.isReady) return;
    this.isReady = true;

    try {
      const cookies = Object.fromEntries(
        document.cookie
          .split("; ")
          .map((v) => v.split(/=(.*)/s).map(decodeURIComponent)),
      );
      const consentCookieText: string = cookies[CONSENT_COOKIE_NAME];
      if (consentCookieText) {
        try {
          const parsedConsent = consentCookieSchema.parse(
            JSON.parse(consentCookieText),
          );
          this.consent = { ...parsedConsent.purposes };
        } catch {
          this.warn(
            "Failed to parse consent cookie. Resetting consent.",
            consentCookieText,
          );
        }
      }
    } catch {
      this.error("Failed to initialize consent API. Using defaults.");
    }

    this.fireReady({ ...this.consent });
    if (this.enableLogging) {
      console.info("[Analytics][ConsentApi] Initialized");
    }
  }

  public static getConsent(purpose: Purpose): boolean {
    return this.consent[purpose];
  }

  public static setConsent(consent: Consent): void {
    const previousConsent = { ...this.consent };
    this.consent = { ...consent };
    const newConsent = { ...this.consent };

    this.refreshCookie();
    this.fireConsentChange(newConsent, previousConsent);
  }

  public static setPurposeConsent(purpose: Purpose, value: boolean): void {
    const previousConsent = { ...this.consent };
    this.consent[purpose] = value;
    const newConsent = { ...this.consent };

    this.refreshCookie();
    this.fireConsentChange(newConsent, previousConsent);
  }

  public static onConsentChange(
    listener: (typeof this.changeListeners)[number],
  ): void {
    this.changeListeners.push(listener);
  }

  public static offConsentChange(
    listener: (typeof this.changeListeners)[number],
  ): void {
    const index = this.changeListeners.indexOf(listener);
    if (index !== -1) {
      this.changeListeners.splice(index, 1);
    }
  }

  private static fireConsentChange(
    ...args: Parameters<(typeof this.changeListeners)[number]>
  ) {
    this.changeListeners.forEach((listener) => {
      listener(...args);
    });
  }

  public static onReady(listener: (typeof this.readyListeners)[number]): void {
    if (this.isReady) {
      listener({ ...this.consent });
      return;
    }

    this.readyListeners.push(listener);
  }

  public static offReady(listener: (typeof this.readyListeners)[number]): void {
    const index = this.readyListeners.indexOf(listener);
    if (index !== -1) {
      this.readyListeners.splice(index, 1);
    }
  }

  private static fireReady(
    ...args: Parameters<(typeof this.readyListeners)[number]>
  ) {
    this.readyListeners.forEach((listener) => {
      listener(...args);
    });
  }

  private static refreshCookie(): void {
    try {
      const cookieValue = consentCookieSchema.parse({
        version: 1,
        purposes: this.consent,
      });
      // Expires in 1 year
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `${CONSENT_COOKIE_NAME}=${JSON.stringify(cookieValue)}; path=/; max-age=${maxAge}`;
      this.log("Updated consent cookie", { ...this.consent });
    } catch (error) {
      this.error("Failed to update consent cookie", error);
    }
  }

  private static log(...args: any[]): void {
    if (!this.enableLogging) return;
    console.info(`[Analytics][ConsentAPI]`, ...args);
  }
  private static warn(...args: any[]): void {
    if (!this.enableLogging) return;
    console.warn(`[Analytics][ConsentAPI]`, ...args);
  }
  private static error(...args: any[]): void {
    if (!this.enableLogging) return;
    console.error(`[Analytics][ConsentAPI]`, ...args);
  }
}

if (typeof window !== "undefined") {
  (window as any).ConsentApi = ConsentApi;
  ConsentApi.init();
}
