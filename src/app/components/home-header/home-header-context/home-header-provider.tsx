"use client";

import React, { useEffect, useMemo } from "react";
import {
  HomeHeaderContext,
  HomeHeaderContextValue,
} from "./home-header-context";

interface HomeHeaderProviderProps {
  children?: React.ReactNode;
}

const HomeHeaderProvider = ({ children }: HomeHeaderProviderProps) => {
  const [showBackground, setShowBackground] = React.useState<boolean | null>(
    null,
  );

  const providerValue = useMemo<HomeHeaderContextValue>(
    () => ({
      showBackground,
    }),
    [showBackground],
  );

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".hero-content");
      if (!element) return;
      const { height, y } = element.getBoundingClientRect();
      setShowBackground(y + height < 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HomeHeaderContext.Provider value={providerValue}>
      {children}
    </HomeHeaderContext.Provider>
  );
};

export default HomeHeaderProvider;
