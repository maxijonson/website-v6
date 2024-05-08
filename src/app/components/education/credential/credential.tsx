import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Breakpoint } from "@/utils/breakpoint";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import * as classes from "./credential.css";

export interface CredentialProps {
  name: string;
  issuer: string;
  location?: string;
  type: string;
  date: string;
  image: ImageDetails;
}

const Credential = ({
  name,
  issuer,
  location,
  type,
  date,
  image,
}: CredentialProps) => {
  const imageUrl = getImageBuilder(image).width(800).url();
  const { aspectRatio, ...imageDimensions } = getImageDimensions(image);

  return (
    <Card className="relative overflow-hidden">
      <div
        className={cn(
          "absolute right-0 top-0 flex h-full w-3/4 items-center justify-end opacity-20",
          "dark:opacity-10",
          classes.imageContainer,
        )}
      >
        <Image
          {...imageDimensions}
          src={imageUrl}
          alt={name}
          className="size-full object-cover"
          sizes={`(max-width: ${Breakpoint.mdpx}) 100vw, 50vw`}
        />
      </div>
      <div className="relative flex flex-col items-start p-6">
        <Badge>{type}</Badge>
        <h2 className="pt-1 text-lg font-bold">{name}</h2>
        <div className="py-1">
          <p>{issuer}</p>
          {location && <p className="text-sm">{location}</p>}
        </div>
        <p className="pt-2 text-xs text-muted-foreground">{date}</p>
      </div>
    </Card>
  );
};

export default Credential;
