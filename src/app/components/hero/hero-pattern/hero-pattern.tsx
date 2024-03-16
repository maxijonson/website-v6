"use client";

import HeroPatternLight from "$/svg/hero-pattern.svg";
import HeroPatternDark from "$/svg/hero-pattern-dark.svg";
import React, { useLayoutEffect, useRef } from "react";
import { animateShootingStars } from "./hero-pattern.css";
import { cn } from "@/lib/utils";

const HeroPattern = () => {
  const lightRef = useRef<SVGElement>(null);
  const darkRef = useRef<SVGElement>(null);

  const animateRects = (ref: typeof lightRef) => {
    if (!ref.current) return;
    const rects = ref.current.querySelectorAll("rect");
    rects.forEach((rect) => {
      rect.classList.add(animateShootingStars);
      rect.style.animationDelay = `${Math.random() * 10000}ms`;
    });
    ref.current.classList.remove("opacity-0");
  };

  useLayoutEffect(() => {
    animateRects(lightRef);
    animateRects(darkRef);
  }, []);

  return (
    <>
      <HeroPatternLight
        ref={lightRef}
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "absolute left-0 top-0 h-full w-full opacity-0",
          "dark:invisible",
        )}
      />
      <HeroPatternDark
        ref={darkRef}
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "invisible absolute left-0 top-0 h-full w-full opacity-0",
          "dark:visible",
        )}
      />
    </>
  );
};

export default HeroPattern;
