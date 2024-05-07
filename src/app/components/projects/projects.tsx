"use client";
import Content from "@/components/content/content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import type { HomeProjectsDetails } from "../../../../sanity/groqd/selections/pages/home-page/home-projects-details";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Project from "./project/project";

type ProjectsProps = HomeProjectsDetails;

const Projects = ({ title, content, projects }: ProjectsProps) => {
  return (
    <HomeSection id="projects">
      <HomeHeading>{title}</HomeHeading>
      <Content
        className={cn(
          "prose prose-lg prose-stone max-w-none text-stone-950",
          "prose-p:leading-snug",
          "prose-ul:list-none prose-ul:p-0",
          "prose-li:p-0 prose-li:leading-snug",
          "md:prose-xl",
          "dark:prose-invert dark:text-stone-50",
        )}
        value={content}
      />

      <div className={cn("mx-auto mt-6 w-[calc(100%-2*48px)]")}>
        <Carousel>
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem
                key={project._key}
                className={cn("basis-full", "md:basis-1/2")}
              >
                <Project
                  name={project.title}
                  description={project.description}
                  image={project.image}
                  links={project.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                    icon: <Icon icon={link.icon.name!} className="size-5" />,
                  }))}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </HomeSection>
  );
};

export default Projects;
