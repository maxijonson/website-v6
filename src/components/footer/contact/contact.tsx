import { BsTwitterX } from "react-icons/bs";
import { RxLinkedinLogo, RxInstagramLogo, RxGithubLogo } from "react-icons/rx";
import { IoLogoReddit } from "react-icons/io5";
import ContactEmail from "./contact-email/contact-email";
import ContactSocial from "./contact-social/contact-social";

const Contact = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <ContactSocial
          url="https://www.linkedin.com/in/tristan-chin/"
          name="LinkedIn - Tristan Chin"
          type="linkedin"
        >
          <RxLinkedinLogo className="size-5" />
        </ContactSocial>
        <ContactSocial
          url="https://instagram.com/chin.tristan"
          name="Instagram - chin.tristan"
          type="instagram"
        >
          <RxInstagramLogo className="size-5" />
        </ContactSocial>
        <ContactSocial
          url="https://github.com/maxijonson"
          name="GitHub - maxijonson"
          type="github"
        >
          <RxGithubLogo className="size-5" />
        </ContactSocial>
        <ContactSocial
          url="https://twitter.com/maxijonson"
          name="Twitter - @MaxiJonson"
          type="twitter"
        >
          <BsTwitterX className="size-5" />
        </ContactSocial>
        <ContactSocial
          url="https://www.reddit.com/user/maxijonson/"
          name="Reddit - u/maxijonson"
          type="reddit"
        >
          <IoLogoReddit className="size-5" />
        </ContactSocial>
      </div>
      <ContactEmail />
    </div>
  );
};

export default Contact;
