import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import Contact from "./contact/contact";

const Footer = () => {
  return (
    <footer
      className={cn("flex flex-col gap-8 pb-8 text-center text-sm")}
      suppressHydrationWarning
    >
      <Separator className="mt-20" />
      <Contact />
      <div>{new Date().getFullYear()} &copy; Tristan Chin</div>
    </footer>
  );
};

export default Footer;
