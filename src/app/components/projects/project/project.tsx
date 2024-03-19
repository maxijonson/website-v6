import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export interface ProjectLink {
  url: string;
  label: string;
  icon: React.ReactNode;
}

export interface ProjectPropsBase {
  name: string;
  description: string;
  links?: ProjectLink[];
}

export interface ProjectPropsWithImage extends ProjectPropsBase {
  image: StaticImageData;
  initials?: never;
}

export interface ProjectPropsWithAvatar extends ProjectPropsBase {
  initials: string;
  image?: never;
}

export type ProjectProps = ProjectPropsWithImage | ProjectPropsWithAvatar;

const Project = ({
  name,
  description,
  links,
  image,
  initials,
}: ProjectProps) => {
  return (
    <Card className="flex h-full min-h-28 flex-col">
      <CardHeader
        className={cn(
          "flex grow flex-col gap-2",
          "md:flex-row-reverse md:justify-between md:gap-6",
        )}
      >
        <div className="flex justify-center">
          <Avatar className="size-16">
            {image ? (
              <AvatarImage asChild src={image.src}>
                <Image src={image} alt={name} />
              </AvatarImage>
            ) : (
              <AvatarFallback className="bg-blue-900 text-3xl font-bold text-white">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter>
        {links && (
          <div
            className={cn(
              "flex w-full flex-row justify-center gap-4",
              "md:justify-start",
            )}
          >
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                target="_blank"
                className="flex items-center gap-1"
                title={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Project;
