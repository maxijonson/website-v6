import Image, { type StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as classes from "./credential.css";
import { Breakpoint } from "@/utils/breakpoint";

export interface CredentialProps {
  name: string;
  issuer: string;
  location?: string;
  type: string;
  date: string;
  image: StaticImageData;
}

const Credential = ({
  name,
  issuer,
  location,
  type,
  date,
  image,
}: CredentialProps) => {
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
          src={image}
          alt={name}
          fill
          className="object-cover"
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
