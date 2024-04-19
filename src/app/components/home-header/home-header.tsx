"use client";

import Header from "@/components/header/header";
import { useViewportBelow } from "@/hooks/user-viewport-below";
import { cn } from "@/lib/utils";

const HomeHeader = () => {
  const showBackground = useViewportBelow(".hero-content");

  return (
    <Header
      classNames={{
        root: cn({
          "opacity-0": showBackground === null,
        }),
        container: cn({
          [cn(
            "max-w-full border-transparent bg-transparent",
            "supports-[backdrop-filter]:bg-transparent supports-[backdrop-filter]:backdrop-blur-none",
            "dark:bg-transparent dark:border-transparent",
            "dark:supports-[backdrop-filter]:bg-transparent",
          )]: !showBackground,
        }),
      }}
      themeSwitch={{
        variant: !showBackground ? "link" : undefined,
      }}
    />
  );
};

export default HomeHeader;
