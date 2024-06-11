"use client";

import { AnalyticsManager } from "@/app/analytics/analytics-manager";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PageView = () => {
  const pathname = usePathname();
  const lastPathname = useRef("");

  useEffect(() => {
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    AnalyticsManager.track("$pageview", {
      $current_url: window.origin + pathname,
    });
  }, [pathname]);

  return null;
};

export default PageView;
