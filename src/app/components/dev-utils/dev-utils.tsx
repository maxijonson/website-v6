"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const DevUtils = () => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    (window as any).toggleTheme = () => {
      if (!theme) return;
      setTheme(theme === "light" ? "dark" : "light");
    };
  }, [setTheme, theme]);

  return null;
};

export default DevUtils;
