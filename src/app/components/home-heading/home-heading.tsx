import { cn } from "@/lib/utils";

type HomeHeadingProps = JSX.IntrinsicElements["h1"];

const HomeHeading = (props: HomeHeadingProps) => {
  return (
    <h1
      {...props}
      className={cn(
        "relative pb-6 pt-6 text-center text-3xl font-bold",
        "before:absolute before:left-1/2 before:top-0 before:h-2 before:w-32 before:-translate-x-1/2 before:rounded before:bg-stone-600 dark:before:bg-stone-300",
        "md:text-left md:text-5xl",
        "md:before:left-0 md:before:w-40 md:before:translate-x-0",
        props.className,
      )}
    />
  );
};

export default HomeHeading;
