import { cn } from "@/lib/utils";
import type React from "react";

export type HomeSectionProps = JSX.IntrinsicElements["section"];

const HomeSection = (props: HomeSectionProps) => {
  return (
    <section
      {...props}
      className={cn(
        "m-auto max-w-5xl px-6 pb-4 pt-8",
        "md:pt-20",
        props.className,
      )}
    />
  );
};

export default HomeSection;
