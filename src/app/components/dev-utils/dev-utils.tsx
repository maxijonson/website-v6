"use client";
import { Suspense } from "react";
import BreakpointOverlay from "./breakpoint-overlay/breakpoint-overlay";
import ToggleTheme from "./toggle-theme/toggle-theme";
import { useSearchParams } from "next/navigation";

const DevUtilsClient = () => {
  const searchParams = useSearchParams();

  if (process.env.NODE_ENV === "production" && !searchParams.has("dev-utils")) {
    return null;
  }
  return (
    <>
      <ToggleTheme />
      <BreakpointOverlay />
    </>
  );
};

const DevUtils = () => {
  return (
    <Suspense fallback={null}>
      <DevUtilsClient />
    </Suspense>
  );
};

export default DevUtils;
