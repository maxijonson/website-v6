"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import BreakpointOverlay from "./breakpoint-overlay/breakpoint-overlay";

const DevUtils = () => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    (window as any).toggleTheme = () => {
      if (!theme) return;
      setTheme(theme === "light" ? "dark" : "light");
    };
  }, [setTheme, theme]);

  return (
    <>
      <BreakpointOverlay />
    </>
  );
};

export default DevUtils;
