import Content from "@/components/content/content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import type { HomeIntroDetails } from "../../../../sanity/groqd/selections/pages/home-page/home-intro-details";
import { getImageBuilder } from "../../../../sanity/utils/image";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";

type IntroProps = HomeIntroDetails;

const Intro = ({ image, title, content }: IntroProps) => {
  const profileImage = getImageBuilder(image);
  const { aspectRatio, ...imageDimensions } = getImageDimensions(image);

  return (
    <HomeSection id="intro">
      <div className="flex gap-12">
        <div className={cn("hidden items-center justify-center", "md:flex")}>
          <Avatar className={cn("h-full w-60 rounded-3xl", "dark:grayscale")}>
            <AvatarImage asChild src={profileImage.url()}>
              <Image
                {...imageDimensions}
                src={profileImage.url()}
                alt={image.alt}
                placeholder="blur"
                blurDataURL={image.metadata.lqip}
                className="object-cover"
                priority
              />
            </AvatarImage>
            <AvatarFallback className="bg-transparent">
              <Image
                {...imageDimensions}
                src={image.metadata.lqip}
                alt={image.alt}
                className="h-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grow">
          <HomeHeading>{title}</HomeHeading>
          <Content
            className={cn(
              "prose prose-lg prose-stone text-stone-950 prose-p:leading-snug",
              "md:prose-xl",
              "dark:prose-invert dark:text-stone-50",
            )}
            value={content}
          />
        </div>
      </div>
    </HomeSection>
  );
};

export default Intro;
