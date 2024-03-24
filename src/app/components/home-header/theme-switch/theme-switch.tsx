"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import useHomeHeader from "../home-header-context/useHomeHeader";
import { cn } from "@/lib/utils";

const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { showBackground } = useHomeHeader();

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const iconBaseClassName =
    "absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-all";
  const deactivatedIconClassName = "opacity-0 rotate-0";
  const activatedIconClassName = "opacity-1 rotate-[360deg]";

  if (!resolvedTheme || showBackground === null) return null;
  return (
    <Button
      variant={showBackground ? "ghost" : "link"}
      size="icon"
      onClick={handleToggleTheme}
      className="relative rounded-full"
    >
      <SunIcon
        className={cn(iconBaseClassName, {
          [activatedIconClassName]: resolvedTheme === "light",
          [deactivatedIconClassName]: resolvedTheme !== "light",
        })}
      />
      <MoonIcon
        className={cn(iconBaseClassName, {
          [activatedIconClassName]: resolvedTheme === "dark",
          [deactivatedIconClassName]: resolvedTheme !== "dark",
        })}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeSwitch;
