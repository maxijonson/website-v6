import { RxGithubLogo } from "react-icons/rx";
import { cn } from "@/lib/utils";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Link from "next/link";
import Project from "./project/project";
import type React from "react";
import ImgCuisto from "$/image/projects/cuisto.png";
import ImgIntellibot from "$/image/projects/intellibot.png";
import ImgGptTurbo from "$/image/projects/gpt-turbo.png";
import ImgNuclui from "$/image/projects/nuclui.png";
import ImgPunchbot from "$/image/projects/punchbot.png";
import ImgReact from "$/image/projects/react.jpg";
import ImgVideoMerger from "$/image/projects/video-merger.png";
import { SiNpm, SiSpigotmc } from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";

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

      <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
        <Project
          name="GPT Turbo"
          description="An isomorphic TypeScript library to interact with OpenAI's Chat Completion GPT models and manage conversation history."
          image={ImgGptTurbo}
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
        <Project
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
        <Project
          name="Video Merger"
          description="A simple web API to merge multiple videos into one. Built to work with iOS Shortcuts, use this tool to merge your videos straight from your Photos app!"
          image={ImgVideoMerger}
          links={[
            {
              label: "GitHub",
              url: "https://github.com/maxijonson/video-merger",
              icon: <RxGithubLogo className="size-5" />,
            },
          ]}
        />
        <Project
          name="Nuclui"
          description="A React UI framework, built with TypeScript, to make your developement easier so you can give more focus on your app and less on the design!"
          image={ImgNuclui}
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
        <Project
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
        <Project
          name="Intellibot"
          description="The ultimate multipurpose Discord bot."
          image={ImgIntellibot}
          links={[
            {
              label: "GitHub",
              url: "https://github.com/maxijonson/Intellibot",
              icon: <RxGithubLogo className="size-5" />,
            },
          ]}
        />
        <Project
          name="Punchbot"
          description="Minimalist Discord bot to keep track of time worked on projects."
          image={ImgPunchbot}
          links={[
            {
              label: "GitHub",
              url: "https://github.com/maxijonson/PunchBot",
              icon: <RxGithubLogo className="size-5" />,
            },
          ]}
        />
        <Project
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
        <Project
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
        <Project
          name="React (Wallpaper Engine)"
          description="Have an audio visualizer as your desktop wallpaper. Includes 100+ customizable options."
          image={ImgReact}
          links={[
            {
              label: "GitHub",
              url: "https://github.com/maxijonson/React---Wallpaper-Engine",
              icon: <RxGithubLogo className="size-5" />,
            },
          ]}
        />
        <Project
          name="Cuisto"
          description="Restaurant system to manage inventory, suppliers and orders."
          image={ImgCuisto}
          links={[
            {
              label: "GitHub",
              url: "https://github.com/maxijonson/Cuisto-public",
              icon: <RxGithubLogo className="size-5" />,
            },
          ]}
        />
      </div>
    </HomeSection>
  );
};

export default Projects;
