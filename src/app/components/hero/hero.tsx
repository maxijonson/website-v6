import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "$/image/tristan/ipnos.jpg";
import Image from "next/image";
import HeroBackground from "./hero-background/hero-background";
import HeroPattern from "$/svg/hero-pattern.svg?url";
import HeroPatternDark from "$/svg/hero-pattern-dark.svg?url";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col justify-center overflow-hidden bg-background align-middle",
        "after:absolute after:bottom-0 after:h-44 after:w-full after:bg-gradient-to-b after:from-transparent after:to-stone-50 after:to-75% dark:after:to-stone-950",
      )}
    >
      <Image
        src={HeroPattern}
        alt="Hero pattern"
        fill
        className="object-cover dark:invisible"
        priority
      />
      <Image
        src={HeroPatternDark}
        alt="Hero pattern dark"
        fill
        className="invisible object-cover dark:visible"
        priority
      />
      <HeroBackground />
      <div className="z-10 flex flex-col">
        <Avatar className="mb-4 size-40 self-center">
          <AvatarImage asChild src={profileImage.src}>
            <Image src={profileImage} alt="Tristan Chin" priority />
          </AvatarImage>
          <AvatarFallback className="bg-blue-900 text-6xl font-bold text-white">
            TC
          </AvatarFallback>
        </Avatar>
        <h1 className="pb-2 text-center text-5xl font-bold">Tristan Chin</h1>
        <h2 className="text-md text-center">
          B. Eng. Software Engineering & <br />
          Web Developer
        </h2>
      </div>
    </div>
  );
};

export default Hero;
