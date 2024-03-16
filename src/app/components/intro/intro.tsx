import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "$/image/tristan/dci.jpg";
import TCLogo from "$/svg/tristan/logo/logo-color-transparent.svg";
import Image from "next/image";
import { Suspense } from "react";

const Intro = () => {
  return (
    <section className="m-auto max-w-5xl px-6 py-4" id="intro">
      <div className="flex gap-12">
        <div className="hidden items-center justify-center md:flex">
          <Avatar className="size-52 rounded-3xl dark:grayscale">
            <AvatarImage asChild src={profileImage.src}>
              <Image src={profileImage} alt="Tristan Chin" />
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
          <h1 className="pb-6 text-center text-3xl font-bold md:text-left md:text-5xl">
            👋 Hello there!
          </h1>
          <div className="flex flex-col gap-3">
            <p className="text-center text-lg md:text-left md:text-xl">
              I'm a Web developer with a bachelor's degree in Software
              Engineering, located in Montreal, Quebec. Since I was introduced
              to programming, I've always had a passion for Web development and
              technologies, especially in the JavaScript (TypeScript) ecosystem.
              I like to try out the latest popular libraries and frameworks to
              make great software!
            </p>
            <p className="text-center text-lg md:text-left md:text-xl">
              Other than development, a huge Star Wars fan! I've seen all of the
              movie and series... a couple of times! My favorite Jedi has to be
              Ahsoka Tano, for her unique fighting style and wisdom. I also
              mostly listen to EDM music. While I listen to many artists in the
              genre, my favorite is Illenium, with his great vocal chops!
            </p>
            <p className="text-center text-lg md:text-left md:text-xl">
              Finally, I have a sweet spot for 4-legged fluffy friends,
              especially dogs. I'm the kind of person to hang out with the dog
              at a party. I also have a Soft Coated Wheaten Terrier named
              Kingsley!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
