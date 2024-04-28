import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Contact from "./contact/contact";

const Footer = () => {
  return (
    <footer
      className={cn(
        "flex flex-col gap-8 py-12 text-center text-sm",
        "md:py-20",
      )}
      suppressHydrationWarning
    >
      <Separator />
      <Contact />
      <div>{new Date().getFullYear()} &copy; Tristan Chin</div>
    </footer>
  );
};

export default Footer;
