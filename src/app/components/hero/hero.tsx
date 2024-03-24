import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "$/image/tristan/ipnos.jpg";
import TCLogo from "$/svg/tristan/logo/logo-color-transparent.svg";
import Image from "next/image";
import HeroLogos from "./hero-logos/hero-logos";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import HeroPattern from "./hero-pattern/hero-pattern";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative flex h-screen w-full flex-col justify-center overflow-hidden bg-background align-middle",
        "after:absolute after:bottom-[-1px] after:h-44 after:w-full after:bg-gradient-to-b after:from-transparent after:to-stone-50 after:to-75%",
        "after:dark:to-stone-950",
      )}
    >
      <HeroPattern />
      <HeroLogos />
      <div className="hero-content z-10 flex flex-col">
        <Avatar className="mb-4 size-40 self-center">
          <AvatarImage asChild src={profileImage.src}>
            <Image src={profileImage} alt="Tristan Chin" priority />
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
        <h1 className="pb-2 text-center text-5xl font-bold">Tristan Chin</h1>
        <h2 className="text-md text-center text-muted-foreground">
          B. Eng. Software Engineering & <br />
          Web Developer
        </h2>
      </div>
    </section>
  );
};

export default Hero;
