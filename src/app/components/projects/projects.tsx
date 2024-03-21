import { RxGithubLogo } from "react-icons/rx";
import { cn } from "@/lib/utils";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Link from "next/link";
import Project, { type ProjectProps } from "./project/project";
import type React from "react";
import imageCuisto from "$/image/project/cuisto.png";
import imageIntellibot from "$/image/project/intellibot.png";
import imageGptTurbo from "$/image/project/gpt-turbo.png";
import imageNuclui from "$/image/project/nuclui.png";
import imagePunchbot from "$/image/project/punchbot.png";
import imageVideoMerger from "$/image/project/video-merger.png";
import { SiNpm, SiSpigotmc } from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";
import {
  CarouselItem,
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const ProjectItem = (props: ProjectProps) => {
  return (
    <CarouselItem className={cn("basis-full", "md:basis-1/2")}>
      <Project {...props} />
    </CarouselItem>
  );
};

const Projects = () => {
  return (
    <HomeSection id="projects">
      <HomeHeading>Projects</HomeHeading>
      <p className={cn("text-lg", "md:text-xl")}>
        Here's a few of the projects I've worked on. You can see the full list
        on my{" "}
        <Link
          className={cn("font-semibold text-blue-700", "dark:text-blue-500")}
          href="https://github.com/maxijonson"
        >
          Github
        </Link>{" "}
        profile, but these are the ones I am most proud of. Even if some of
        these were eventually left unfinished (like most my repos, oops!), I
        still learned a lot from them!
      </p>

      <div className={cn("mx-auto mt-6 w-[calc(100%-2*48px)]")}>
        <Carousel>
          <CarouselContent>
            <ProjectItem
              name="GPT Turbo"
              description="An isomorphic TypeScript library to interact with OpenAI's Chat Completion GPT models and manage conversation history."
              image={imageGptTurbo}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/gpt-turbo",
                  icon: <RxGithubLogo className="size-5" />,
                },
                {
                  label: "NPM - Library",
                  url: "https://www.npmjs.com/package/gpt-turbo",
                  icon: <SiNpm className="size-5" />,
                },
                {
                  label: "NPM - CLI",
                  url: "https://www.npmjs.com/package/gpt-turbo-cli",
                  icon: <SiNpm className="size-5" />,
                },
                {
                  label: "WebApp",
                  url: "https://gpt-turbo-web.chintristan.io/",
                  icon: <VscGlobe className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Phisherman"
              description="A library and CLI tool to send fake credentials to phishing websites, polluting their database with fake information."
              initials="PM"
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/phisherman",
                  icon: <RxGithubLogo className="size-5" />,
                },
                {
                  label: "NPM - Library",
                  url: "https://www.npmjs.com/package/@maxijonson/phisherman",
                  icon: <SiNpm className="size-5" />,
                },
                {
                  label: "NPM - CLI",
                  url: "https://www.npmjs.com/package/@maxijonson/phisherman-cli",
                  icon: <SiNpm className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Video Merger"
              description="A simple web API to merge multiple videos into one. Built to work with iOS Shortcuts, use this tool to merge your videos straight from your Photos app!"
              image={imageVideoMerger}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/video-merger",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Nuclui"
              description="A React UI framework, built with TypeScript, to make your developement easier so you can give more focus on your app and less on the design!"
              image={imageNuclui}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/nuclui",
                  icon: <RxGithubLogo className="size-5" />,
                },
                {
                  label: "NPM - Library",
                  url: "https://www.npmjs.com/package/nuclui",
                  icon: <SiNpm className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="GeNFT"
              description="Generate NFT collections by composing multiple layers together."
              initials="GN"
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/genft",
                  icon: <RxGithubLogo className="size-5" />,
                },
                {
                  label: "NPM",
                  url: "https://www.npmjs.com/package/genft",
                  icon: <SiNpm className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Intellibot"
              description="The ultimate multipurpose Discord bot."
              image={imageIntellibot}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/Intellibot",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Punchbot"
              description="Minimalist Discord bot to keep track of time worked on projects."
              image={imagePunchbot}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/PunchBot",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Code Lock"
              description={`Minecraft plugin to lock entities with an "enter and forget" code lock. Inspired by Rust's code lock.`}
              initials="CL"
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/code-lock",
                  icon: <RxGithubLogo className="size-5" />,
                },
                {
                  label: "SpigotMC",
                  url: "https://www.spigotmc.org/resources/code-lock.91058/",
                  icon: <SiSpigotmc className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Tinder Bullseye"
              description="Find the people who liked you on Tinder, without Gold. (Patched by Tinder)"
              initials="TB"
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/tinder-bullseye",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="React (Wallpaper Engine)"
              description="Have an audio visualizer as your desktop wallpaper. Includes 100+ customizable options."
              initials="RE"
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/React---Wallpaper-Engine",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
            <ProjectItem
              name="Cuisto"
              description="Restaurant system to manage inventory, suppliers and orders."
              image={imageCuisto}
              links={[
                {
                  label: "GitHub",
                  url: "https://github.com/maxijonson/Cuisto-public",
                  icon: <RxGithubLogo className="size-5" />,
                },
              ]}
            />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </HomeSection>
  );
};

export default Projects;
