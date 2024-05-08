import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TCLogo from "$/svg/tristan/logo/logo-color-transparent.svg";
import Image from "next/image";
import HeroLogos from "./hero-logos/hero-logos";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import HeroPattern from "./hero-pattern/hero-pattern";
import type { HomeHeroDetails } from "../../../../sanity/groqd/selections/pages/home-page/home-hero-details";
import { getImageBuilder } from "../../../../sanity/utils/image";
import { getImageDimensions } from "@sanity/asset-utils";

type HeroProps = HomeHeroDetails;

const Hero = ({ title, subtitle, image, logos }: HeroProps) => {
  const profileImage = getImageBuilder(image).size(160, 160).quality(100);
  const { aspectRatio, ...profileImageDimensions } = getImageDimensions(image);

  return (
    <section
      className={cn(
        "relative flex h-screen w-full flex-col justify-center overflow-hidden bg-background align-middle",
        "after:absolute after:bottom-[-1px] after:h-44 after:w-full after:bg-gradient-to-b after:from-transparent after:to-stone-50 after:to-75%",
        "after:dark:to-stone-950",
      )}
    >
      <HeroPattern />
      <div className="hero-content z-10 flex flex-col">
        <div className="relative mb-4 self-center">
          <HeroLogos logos={logos} />
          <Avatar className="z-10 size-40">
            <AvatarImage asChild src={profileImage.url()}>
              <Image
                src={profileImage.url()}
                {...profileImageDimensions}
                alt={image.alt}
                placeholder="blur"
                blurDataURL={image.metadata.lqip}
                priority
              />
            </AvatarImage>
            <Suspense
              fallback={
                <AvatarFallback className="bg-blue-900 text-6xl font-bold text-white">
                  TC
                </AvatarFallback>
              }
            >
              <AvatarFallback className="bg-transparent">
                <TCLogo className="size-36 animate-pulse" />
              </AvatarFallback>
            </Suspense>
          </Avatar>
        </div>
        <h1 className="z-10 pb-2 text-center text-5xl font-bold">{title}</h1>
        <h2 className="text-md z-10 text-center text-muted-foreground">
          {subtitle}
        </h2>
      </div>
    </section>
  );
};

export default Hero;
