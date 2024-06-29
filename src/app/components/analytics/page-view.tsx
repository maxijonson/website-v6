"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface PageViewProps {
  type?: string;
}

const PageView = ({ type }: PageViewProps) => {
  const pathname = usePathname();
  const lastPathname = useRef("");

  useEffect(() => {
    const cleanup = () => {
      if (type) {
        AnalyticsManager.unset("page_type");
      }
    };

    if (type) {
      AnalyticsManager.set({ page_type: type });
    }

    if (pathname === lastPathname.current) return cleanup;
    lastPathname.current = pathname;
    AnalyticsManager.track("$pageview", {
      $current_url: window.origin + pathname,
    });

    return cleanup;
  }, [pathname, type]);

  return null;
};

export default PageView;
