import { RxLinkedinLogo, RxGithubLogo, RxInstagramLogo } from "react-icons/rx";
import { BsTwitterX } from "react-icons/bs";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import ContactEmail from "./contact-email/contact-email";
import ContactSocial from "./contact-social/contact-social";
import ContactCard from "./contact-card/contact-card";

const Contact = () => {
  return (
    <HomeSection id="contact" className="pb-24">
      <HomeHeading>Contact</HomeHeading>
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
          <ContactCard />
        </div>
        <ContactEmail />
      </div>
    </HomeSection>
  );
};

export default Contact;
