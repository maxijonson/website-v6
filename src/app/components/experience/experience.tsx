import { cn } from "@/lib/utils";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Company from "./company/company";
import imageIpnos from "$/image/company/ipnos.jpg";
import imageDesjardins from "$/image/company/desjardins.jpg";
import imageComact from "$/image/company/comact.jpg";

const Experience = () => {
  return (
    <HomeSection id="experience">
      <HomeHeading>Experience</HomeHeading>
      <p className={cn("pb-4 text-lg", "md:text-xl")}>
        Here's an overview of my past experiences as a developer. Before
        starting to work in this field, while I was just starting as a student,
        I worked two and a half years as a cashier at Canada's renowned coffee
        shop, Tim Horton's.
      </p>
      <div className={cn("flex flex-col", "md:mx-auto md:max-w-xl")}>
        <Company
          name="Ipnos"
          image={imageIpnos}
          from="September 2023"
          position="Full-Stack Web Developer"
          type="Full-Time"
          description="Ipnos is a leading wellness app development studio. They're the creator of the sleep & relaxation app BetterSleep (formerly Relax Melodies)."
          feats={[
            "Rebuild the marketing website using Next.js",
            "Implement different analytics tools to get insights on user behavior",
          ]}
        />
        <Company
          name="Desjardins"
          image={imageDesjardins}
          from="September 2022"
          to="September 2023"
          position="IT Security Advisor"
          type="Full-Time"
          description="The Desjardins Group is a Canadian financial services cooperative and the largest federation of credit unions in North America."
          feats={[
            "Create full-stack web applications using .Net 6 and Blazor.",
            "Create and deploy internal security tools.",
          ]}
        />
        <Company
          name="Desjardins"
          image={imageDesjardins}
          from="May 2022"
          to="August 2022"
          position="IT Security Advisor"
          type="Internship"
          feats={[
            "Apply Agile and DevOps development practices.",
            "Adapt existing tools to client needs.",
          ]}
        />
        <Company
          name="Ipnos"
          image={imageIpnos}
          from="May 2021"
          to="August 2021"
          position="Full-Stack Web Developer"
          type="Internship"
          feats={[
            "Create a rich user interface in a Web app environment using Angular.",
            "Create Back-End services using cloud functions that are used by the Web app.",
            "Research and analyze the feasability of new development projects.",
          ]}
        />
        <Company
          name="Comact"
          image={imageComact}
          from="January 2020"
          to="May 2020"
          position="Front-End Developer"
          type="Internship"
          description="Comact designs and manufactures sawmill and planer mill equipment. They offer the most comprehensive range of products on the market."
          feats={[
            "Create helpful tools to generate data and send it to an artificial intelligence system.",
            "Upgrade technologies to the latest version and implement their new features.",
          ]}
        />
        <Company
          name="Comact"
          image={imageComact}
          from="June 2019"
          to="September 2019"
          position="Front-End Developer"
          type="Full-Time"
          feats={[
            "Validate client user interface requirements.",
            "Evaluate the impact of needs across available systems.",
          ]}
        />
        <Company
          name="Comact"
          image={imageComact}
          from="January 2019"
          to="May 2019"
          position="Front-End Developer"
          type="Internship"
          feats={[
            "Maintain and improve the current web applications using React.",
            "Create new web applications using React.",
            "Apply Agile development practices.",
          ]}
        />
      </div>
    </HomeSection>
  );
};

export default Experience;
