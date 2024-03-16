import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "$/image/tristan/dci.jpg";
import TCLogo from "$/svg/tristan/logo/logo-color-transparent.svg";
import Image from "next/image";
import { Suspense } from "react";
import HomeSection from "../home-section/home-section";
import HomeHeading from "../home-heading/home-heading";
import { cn } from "@/lib/utils";

const Intro = () => {
  return (
    <HomeSection id="intro">
      <div className="flex gap-12">
        <div className={cn("hidden items-center justify-center", "md:flex")}>
          <Avatar className={cn("h-full w-60 rounded-3xl", "dark:grayscale")}>
            <AvatarImage asChild src={profileImage.src}>
              <Image
                src={profileImage}
                alt="Tristan Chin"
                fill
                className="object-cover"
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
        <div className="grow">
          <HomeHeading>👋 Hello there!</HomeHeading>
          <div className="flex flex-col gap-3">
            <p className={cn("text-center text-lg", "md:text-left md:text-xl")}>
              I'm a Web developer with a bachelor's degree in Software
              Engineering, located in Montreal, Quebec. Since I was introduced
              to programming, I've always had a passion for Web development and
              technologies, especially in the JavaScript (TypeScript) ecosystem.
              I like to try out the latest popular libraries and frameworks to
              make great software!
            </p>
            <p className={cn("text-center text-lg", "md:text-left md:text-xl")}>
              Other than development, a huge Star Wars fan! I've seen all of the
              movie and series... a couple of times! My favorite Jedi has to be
              Ahsoka Tano, for her unique fighting style and wisdom. I also
              mostly listen to EDM music. While I listen to many artists in the
              genre, my favorite is Illenium, with his great vocal chops!
            </p>
            <p className={cn("text-center text-lg", "md:text-left md:text-xl")}>
              Finally, I have a sweet spot for 4-legged fluffy friends,
              especially dogs. I'm the kind of person to hang out with the dog
              at a party. I also have a Soft Coated Wheaten Terrier named
              Kingsley!
            </p>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};

export default Intro;
