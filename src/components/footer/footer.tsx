import Contact from "./contact/contact";

const Footer = () => {
  return (
    <footer
      className="flex flex-col gap-8 py-8 text-center text-sm"
      suppressHydrationWarning
    >
      <Contact />
      <div>{new Date().getFullYear()} &copy; Tristan Chin</div>
    </footer>
  );
};

export default Footer;