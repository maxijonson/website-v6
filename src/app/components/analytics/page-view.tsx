"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { stegaClean } from "@sanity/client/stega";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface PageViewProps {
  setProperties?: Record<string, any>;
}

const PageView = ({ setProperties }: PageViewProps) => {
  const pathname = usePathname();
  const lastPathname = useRef("");

  useEffect(() => {
    const cleanup = () => {
      if (setProperties) {
        AnalyticsManager.unset(...Object.keys(setProperties));
      }
    };

    if (setProperties) {
      AnalyticsManager.set(stegaClean(setProperties));
    }

    if (pathname === lastPathname.current) return cleanup;
    lastPathname.current = pathname;
    AnalyticsManager.track("$pageview", {
      $current_url: window.origin + pathname,
    });

    return cleanup;
  }, [pathname, setProperties]);

  return null;
};

export default PageView;
