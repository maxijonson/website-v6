import Link from "next/link";
import BMCDark from "$/image/bmc/black-button.png";
import BMCLight from "$/image/bmc/white-button.png";
import Image from "next/image";
import clsx from "clsx";

const BlogPostCoffee = () => {
  return (
    <Link href="https://buymeacoffee.com/maxijonson" className="mx-auto">
      <Image
        src={BMCDark}
        alt="Buy Me a Coffee"
        className={clsx(
          "hidden max-h-12 w-auto rounded-lg border border-transparent",
          "md:max-h-10",
          "dark:block",
        )}
      />
      <Image
        src={BMCLight}
        alt="Buy Me a Coffee"
        className={clsx(
          "max-h-12 w-auto rounded-lg border border-stone-500",
          "md:max-h-10",
          "dark:hidden",
        )}
      />
    </Link>
  );
};

export default BlogPostCoffee;
