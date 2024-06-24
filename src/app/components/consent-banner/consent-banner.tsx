"use client";

import { ConsentApi, STORED_CONSENT_NAME } from "@/app/analytics/consent-api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface ConsentBannerProps {}

const ConsentBanner = ({}: ConsentBannerProps) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(STORED_CONSENT_NAME);
    setShowBanner(!storedConsent);
  }, []);

  if (!showBanner) return null;
  return (
    <div className="fixed bottom-0 z-[9999] flex w-full justify-center p-4">
      <div
        className={cn(
          "flex w-full max-w-screen-lg flex-col items-center gap-4 rounded-md border-[1px] border-stone-400 bg-white p-4 text-center text-xs transition-[background-color,border-color,max-width,opacity] ease-in-out",
          "md:flex-row md:text-left",
          "supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur",
          "dark:border-stone-800 dark:bg-stone-950",
          "dark:supports-[backdrop-filter]:bg-stone-950/70",
        )}
      >
        <p className="grow">
          This website collects anonymous analytics data to improve the user
          experience. You can learn more about this in the privacy policy.
        </p>
        <div className="flex gap-2">
          <Link href="/privacy-policy">
            <Button variant="link" size="sm">
              Privacy Policy
            </Button>
          </Link>
          <Button
            onClick={() => {
              ConsentApi.setPurposeConsent(
                "cookieless",
                ConsentApi.getConsent("cookieless"),
              );
              setShowBanner(false);
            }}
            size="sm"
          >
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
