import { cn } from "@/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import Image, { type ImageProps } from "next/image";
import React, { Suspense } from "react";
import type { HomeHeroDetails } from "../../../../../sanity/groqd/selections/pages/home-page/home-hero-details";
import { urlForSvg } from "../../../../../sanity/utils/image";
import { followPath } from "./hero-logos.css";

interface HeroLogoProps {
  logos: HomeHeroDetails["logos"];
}

// https://github.com/yixizhang/seed-shuffle/blob/master/index.js
const shuffle = <T,>(array: T[], seed: number): T[] => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const HeroLogos = ({ logos }: HeroLogoProps) => {
  const delays = shuffle(
    Array.from({ length: logos.length }, (_, i) => i),
    926303,
  );

  return (
    <Suspense fallback={null}>
      {logos.map((logo, index) => {
        const { aspectRatio, ...logoDimensions } = getImageDimensions(logo);
        const imageProps: ImageProps = {
          ...logoDimensions,
          src: urlForSvg(logo),
          alt: logo.alt,
          className: cn("absolute size-14 transform-gpu opacity-0", followPath),
          style: {
            animationDelay: `${delays[index] * 300}ms`,
          },
        };
        return (
          <div
            key={logo.alt}
            className={cn(
              "absolute left-0 top-0 z-0 flex size-full items-center justify-center",
            )}
            style={{
              transform: `rotate(${index * 20}deg)`,
            }}
          >
            <div
              className={cn("opacity-100 transition-opacity", "dark:opacity-0")}
            >
              <Image {...imageProps} alt={imageProps.alt} />
            </div>
            <div
              className={cn("opacity-0 transition-opacity", "dark:opacity-100")}
            >
              <Image
                {...imageProps}
                alt={imageProps.alt}
                style={{
                  ...imageProps.style,
                  filter: `drop-shadow(0 0 5px ${logo.darkShadow.hex})`,
                }}
              />
            </div>
          </div>
        );
      })}
    </Suspense>
  );
};

export default HeroLogos;
