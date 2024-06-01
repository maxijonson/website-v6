"use client";
import { Suspense } from "react";
import CurrentBreakpoint from "./current-breakpoint/current-breakpoint";
import ToggleTheme from "./toggle-theme/toggle-theme";
import { useSearchParams } from "next/navigation";
import { clientEnv } from "@/env/env-client";
import CurrentBaseUrl from "./current-base-url/current-base-url";

const DevUtilsClient = () => {
  const searchParams = useSearchParams();

  if (
    clientEnv.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    !searchParams.has("dev-utils")
  ) {
    return null;
  }
  return (
    <>
      <ToggleTheme />
      <div className="fixed bottom-0 left-0 z-[10000000] text-xs text-white opacity-20 hover:opacity-100">
        <div className="flex items-center gap-1">
          <CurrentBreakpoint />
          <CurrentBaseUrl />
        </div>
      </div>
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
