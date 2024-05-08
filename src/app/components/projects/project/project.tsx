import IconifyIcon from "@/components/iconify-icon/iconify-icon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import Link from "next/link";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { getImageBuilder } from "../../../../../sanity/utils/image";

export interface ProjectLink {
  url: string;
  title: string;
  icon: string;
}

export interface ProjectProps {
  name: string;
  description: string;
  links?: ProjectLink[];
  image: ImageDetails;
}

const Project = ({ name, description, links = [], image }: ProjectProps) => {
  const imageBuilder = getImageBuilder(image).width(128).height(128);
  const { aspectRatio, ...imageDimensions } = getImageDimensions(image);

  return (
    <Card className="flex h-full min-h-28 flex-col">
      <CardHeader
        className={cn(
          "flex grow flex-col gap-2",
          "md:flex-row-reverse md:justify-between md:gap-6",
        )}
      >
        <div className="flex justify-center">
          <Avatar className={cn("size-16")}>
            <AvatarImage asChild src={imageBuilder.url()}>
              <Image {...imageDimensions} src={imageBuilder.url()} alt={name} />
            </AvatarImage>
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
                title={link.title}
              >
                <IconifyIcon icon={link.icon} className="size-5" />
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Project;
