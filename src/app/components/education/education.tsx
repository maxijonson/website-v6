import Content from "@/components/content/content";
import { cn } from "@/lib/utils";
import type { HomeCredentialsDetails } from "../../../../sanity/groqd/selections/pages/home-page/home-credentials-details";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Credential from "./credential/credential";

export type EducationProps = HomeCredentialsDetails;

const Education = ({ title, content, credentials }: EducationProps) => {
  return (
    <HomeSection id="education">
      <HomeHeading>{title}</HomeHeading>
      <Content
        className={cn(
          "prose prose-lg prose-stone max-w-none text-stone-950",
          "prose-p:leading-snug",
          "prose-ul:list-none prose-ul:p-0",
          "prose-li:p-0 prose-li:leading-snug",
          "md:prose-xl",
          "dark:prose-invert dark:text-stone-50",
        )}
        value={content}
      />
      <div className={cn("mt-6 grid grid-cols-1 gap-5", "md:grid-cols-2")}>
        {credentials.map((credential) => {
          const startDate = credential.startDate
            ? new Date(credential.startDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : undefined;
          const issueDate = new Date(credential.issueDate).toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            },
          );

          return (
            <Credential
              key={credential._key}
              name={credential.title}
              issuer={credential.issuer}
              location={credential.location}
              type={credential.type}
              date={[startDate, issueDate].filter(Boolean).join(" - ")}
              image={credential.image}
            />
          );
        })}
      </div>
    </HomeSection>
  );
};

export default Education;
