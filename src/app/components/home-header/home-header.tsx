"use client";

import LogoColor from "$/svg/tristan/logo/logo-color-transparent.svg";
import Link from "next/link";
import ThemeSwitch from "./theme-switch/theme-switch";
import { cn } from "@/lib/utils";
import HomeHeaderProvider from "./home-header-context/home-header-provider";
import useHomeHeader from "./home-header-context/useHomeHeader";

const HomeHeader = () => {
  const { showBackground } = useHomeHeader();
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[1000] flex flex-col items-center overflow-hidden px-2 pt-2 opacity-0",
        "md:px-5 md:pt-3",
        {
          "opacity-1": showBackground !== null,
        },
      )}
    >
      <div
        className={cn(
          "relative flex w-full max-w-full items-center rounded-md border-[1px] border-transparent bg-transparent p-2 transition-[background-color,border-color,max-width] ease-in-out",
          {
            [cn(
              "max-w-screen-lg border-stone-400 bg-white",
              "supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur",
              "dark:border-stone-800 dark:bg-stone-950",
              "supports-[backdrop-filter]:dark:bg-stone-950/70",
            )]: showBackground,
          },
        )}
      >
        <div className="flex items-center">
          <Link href="/" scroll={false}>
            <LogoColor className="size-12" />
          </Link>
        </div>
        <div className="grow"></div>
        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

const HomeHeaderProvided = () => (
  <HomeHeaderProvider>
    <HomeHeader />
  </HomeHeaderProvider>
);

export default HomeHeaderProvided;
