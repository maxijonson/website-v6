"use client";

import HeroPatternLight from "$/svg/hero-pattern.svg";
import HeroPatternDark from "$/svg/hero-pattern-dark.svg";
import React, { useLayoutEffect, useRef } from "react";
import { animateShootingStars } from "./hero-pattern.css";
import { cn } from "@/lib/utils";

const HeroPattern = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll("& > svg").forEach((element) => {
      if (!element) return;
      const rects = element.querySelectorAll("rect");
      rects.forEach((rect) => {
        rect.classList.add(animateShootingStars);
        rect.style.animationDelay = `${Math.random() * 10000}ms`;
      });
      element.classList.remove("opacity-0");
    });
  }, []);

  return (
    <div className="absolute left-0 top-0 size-full" ref={containerRef}>
      <HeroPatternLight
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "absolute left-0 top-0 size-full opacity-0",
          "dark:invisible",
        )}
      />
      <HeroPatternDark
        preserveAspectRatio="xMidYMid slice"
        className={cn(
          "invisible absolute left-0 top-0 size-full opacity-0",
          "dark:visible",
        )}
      />
    </div>
  );
};

export default HeroPattern;
