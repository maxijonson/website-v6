import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "$/image/tristan/ipnos.jpg";
import Image from "next/image";
import HeroBackground from "./hero-background/hero-background";
import HeroPattern from "$/svg/hero-pattern.svg?url";

const Hero = () => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center overflow-hidden bg-gray-200 align-middle dark:bg-background">
      <Image
        src={HeroPattern}
        alt="Hero pattern"
        fill
        className="object-cover"
        style={{ animationDuration: "60s" }}
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
