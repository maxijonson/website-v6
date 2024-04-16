import { BsTwitterX } from "react-icons/bs";
import { RxLinkedinLogo, RxInstagramLogo, RxGithubLogo } from "react-icons/rx";
import ContactEmail from "./contact/contact-email/contact-email";
import ContactSocial from "./contact/contact-social/contact-social";

const HomeFooter = () => {
  return (
    <footer
      className="flex flex-col gap-8 py-8 text-center text-sm"
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <ContactSocial
            url="https://www.linkedin.com/in/tristan-chin/"
            name="LinkedIn - Tristan Chin"
          >
            <RxLinkedinLogo className="size-5" />
          </ContactSocial>
          <ContactSocial
            url="https://instagram.com/chin.tristan"
            name="Instagram - chin.tristan"
          >
            <RxInstagramLogo className="size-5" />
          </ContactSocial>
          <ContactSocial
            url="https://github.com/maxijonson"
            name="GitHub - maxijonson"
          >
            <RxGithubLogo className="size-5" />
          </ContactSocial>
          <ContactSocial
            url="https://twitter.com/maxijonson"
            name="Twitter - @MaxiJonson"
          >
            <BsTwitterX className="size-5" />
          </ContactSocial>
        </div>
        <ContactEmail />
      </div>
      <div>&copy; {new Date().getFullYear()} &middot; Tristan Chin</div>
    </footer>
  );
};

export default HomeFooter;
