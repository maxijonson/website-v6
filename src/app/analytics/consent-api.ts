import { z } from "zod";

export const CONSENT_COOKIE_NAME = "consent";

export const consentCookieSchema = z.object({
  version: z.literal(1),
  purposes: z.object({
    performance: z.boolean(),
  }),
});
export type ConsentCookie = z.infer<typeof consentCookieSchema>;
export type Purpose = keyof ConsentCookie["purposes"];

export class ConsentApi {
  private static enableLogging: boolean = (() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has("debug-analytics");
    }
    return false;
  })();

  private static isReady = false;
  private static consent: Record<Purpose, boolean> = {
    performance: false,
  };

  private static changeListeners: Array<
    (
      newConsent: typeof ConsentApi.consent,
      previousConsent: typeof ConsentApi.consent,
    ) => void
  > = [];
  private static readyListeners: Array<
    (consent: typeof ConsentApi.consent) => void
  > = [];

  public static init(): void {
    if (ConsentApi.isReady) return;
    ConsentApi.isReady = true;

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
        ConsentApi.consent = { ...parsedConsent.purposes };
      } catch {}
    }

    const cookieValue = JSON.stringify(
      consentCookieSchema.parse({
        version: 1,
        purposes: ConsentApi.consent,
      } satisfies ConsentCookie),
    );
    document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; path=/`;
    ConsentApi.updateCookie();

    ConsentApi.fireReady({ ...ConsentApi.consent });
    if (ConsentApi.enableLogging) {
      console.info("[ConsentApi] Initialized");
    }
  }

  public static getConsent(purpose: Purpose): boolean {
    return ConsentApi.consent[purpose];
  }

  public static setConsent(consent: typeof ConsentApi.consent): void {
    const previousConsent = { ...ConsentApi.consent };
    ConsentApi.consent = { ...consent };
    const newConsent = { ...ConsentApi.consent };

    ConsentApi.updateCookie();
    ConsentApi.fireConsentChange(newConsent, previousConsent);
  }

  public static setPurposeConsent(purpose: Purpose, value: boolean): void {
    const previousConsent = { ...ConsentApi.consent };
    ConsentApi.consent[purpose] = value;
    const newConsent = { ...ConsentApi.consent };

    ConsentApi.updateCookie();
    ConsentApi.fireConsentChange(newConsent, previousConsent);
  }

  public static onConsentChange(
    listener: (typeof ConsentApi.changeListeners)[number],
  ): void {
    ConsentApi.changeListeners.push(listener);
  }

  public static offConsentChange(
    listener: (typeof ConsentApi.changeListeners)[number],
  ): void {
    const index = ConsentApi.changeListeners.indexOf(listener);
    if (index !== -1) {
      ConsentApi.changeListeners.splice(index, 1);
    }
  }

  private static fireConsentChange(
    ...args: Parameters<(typeof ConsentApi.changeListeners)[number]>
  ) {
    ConsentApi.changeListeners.forEach((listener) => {
      listener(...args);
    });
  }

  public static onReady(
    listener: (typeof ConsentApi.readyListeners)[number],
  ): void {
    if (ConsentApi.isReady) {
      listener({ ...ConsentApi.consent });
      return;
    }

    ConsentApi.readyListeners.push(listener);
  }

  public static offReady(
    listener: (typeof ConsentApi.readyListeners)[number],
  ): void {
    const index = ConsentApi.readyListeners.indexOf(listener);
    if (index !== -1) {
      ConsentApi.readyListeners.splice(index, 1);
    }
  }

  private static fireReady(
    ...args: Parameters<(typeof ConsentApi.readyListeners)[number]>
  ) {
    ConsentApi.readyListeners.forEach((listener) => {
      listener(...args);
    });
  }

  private static updateCookie(): void {
    const cookieValue = JSON.stringify(
      consentCookieSchema.parse({ version: 1, purposes: ConsentApi.consent }),
    );
    document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; path=/`;
  }
}

if (typeof window !== "undefined") {
  (window as any).ConsentApi = ConsentApi;
  ConsentApi.init();
}
