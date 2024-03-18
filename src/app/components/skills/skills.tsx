import { InfoCircledIcon } from "@radix-ui/react-icons";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import SkillsGroup from "./skills-group/skills-group";
import Skill from "./skill/skill";
import { cn } from "@/lib/utils";
import LogoHtml from "$/svg/logo/logo-html.svg";
import LogoCss from "$/svg/logo/logo-css.svg";
import LogoJavaScript from "$/svg/logo/logo-javascript.svg";
import LogoTypeScript from "$/svg/logo/logo-typescript.svg";
import LogoReact from "$/svg/logo/logo-react.svg";
import LogoNext from "$/svg/logo/logo-next.svg";
import LogoAngular from "$/svg/logo/logo-angular.svg";
import LogoNode from "$/svg/logo/logo-node.svg";
import LogoNest from "$/svg/logo/logo-nest.svg";
import LogoSass from "$/svg/logo/logo-sass.svg";
import LogoJava from "$/svg/logo/logo-java.svg";
import LogoCSharp from "$/svg/logo/logo-csharp.svg";
import LogoPython from "$/svg/logo/logo-python.svg";
import LogoCpp from "$/svg/logo/logo-cpp.svg";
import LogoRust from "$/svg/logo/logo-rust.svg";
import LogoFirebase from "$/svg/logo/logo-firebase.svg";
import LogoMongoDB from "$/svg/logo/logo-mongodb.svg";
import LogoMySQL from "$/svg/logo/logo-mysql.svg";
import LogoOracle from "$/svg/logo/logo-oracle.svg";
import LogoSQLServer from "$/svg/logo/logo-sqlserver.svg";
import LogoGCP from "$/svg/logo/logo-gcp.svg";
import LogoAzure from "$/svg/logo/logo-azure.svg";
import LogoHeroku from "$/svg/logo/logo-heroku.svg";
import LogoVercel from "$/svg/logo/logo-vercel.svg";
import LogoBash from "$/svg/logo/logo-bash.svg";
import LogoAndroid from "$/svg/logo/logo-android.svg";
import LogoSwift from "$/svg/logo/logo-swift.svg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const Skills = () => {
  return (
    <HomeSection id="skills">
      <HomeHeading>Skills</HomeHeading>
      <p className={cn("pb-4 text-center text-lg", "md:text-left md:text-xl")}>
        Here's a list of my technical skills. As you can see, while I mostly
        specialize in Web technologies, I've learned a thing or two in other
        fields while I was in school and in past job experiences.
      </p>
      <Collapsible className="mb-6">
        <CollapsibleTrigger asChild>
          <div className={cn("flex justify-center", "md:justify-start")}>
            <Button variant="outline">
              <InfoCircledIcon className="mr-2" /> About the ratings
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p
            className={cn(
              "pb-4 text-center text-lg",
              "md:text-left md:text-xl",
            )}
          >
            I'm aware rating skills on a scale of 1 to 5 is subjective and
            skills are not really measurable that way, but here's a quick
            rundown of how I rated each of them:
          </p>
          <ul
            className={cn(
              "pb-4 text-center text-lg",
              "md:text-left md:text-xl",
            )}
          >
            <li>
              <b>1</b> - I've tried it, but can barely make something with it.
            </li>
            <li>
              <b>2</b> - I've used it, but only for simple use cases.
            </li>
            <li>
              <b>3</b> - I've got a good grasp of it and can make something
              decent with it.
            </li>
            <li>
              <b>4</b> - I've used it multiple times and can get a project done
              with it by myself.
            </li>
            <li>
              <b>5</b> - I use this almost every day! They're usually my
              technologies of choice when creating my own projects.
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          "sm:grid-cols-2",
          "md:grid-cols-3",
        )}
      >
        <SkillsGroup name="Web">
          <Skill name="HTML" icon={<LogoHtml />} proficiency={5} />
          <Skill name="CSS" icon={<LogoCss />} proficiency={5} />
          <Skill name="JavaScript" icon={<LogoJavaScript />} proficiency={5} />
          <Skill name="TypeScript" icon={<LogoTypeScript />} proficiency={5} />
          <Skill name="React" icon={<LogoReact />} proficiency={5} />
          <Skill
            name="NextJS"
            icon={<LogoNext className="dark:drop-shadow-[0_0_1px_#FFFFFF]" />}
            proficiency={4}
          />
          <Skill name="Angular" icon={<LogoAngular />} proficiency={3} />
          <Skill name="Node" icon={<LogoNode />} proficiency={4} />
          <Skill name="NestJS" icon={<LogoNest />} proficiency={4} />
          <Skill name="SCSS" icon={<LogoSass />} proficiency={4} />
        </SkillsGroup>
        <SkillsGroup name="Application">
          <Skill name="Java" icon={<LogoJava />} proficiency={3} />
          <Skill name="C#" icon={<LogoCSharp />} proficiency={3} />
          <Skill name="Python" icon={<LogoPython />} proficiency={3} />
          <Skill name="C++" icon={<LogoCpp />} proficiency={2} />
          <Skill
            name="Rust"
            icon={<LogoRust className="dark:drop-shadow-[0_0_1px_#FFFFFF]" />}
            proficiency={1}
          />
        </SkillsGroup>
        <SkillsGroup name="Database">
          <Skill name="Firebase" icon={<LogoFirebase />} proficiency={4} />
          <Skill name="MongoDB" icon={<LogoMongoDB />} proficiency={3} />
          <Skill name="MySQL" icon={<LogoMySQL />} proficiency={3} />
          <Skill name="Oracle SQL" icon={<LogoOracle />} proficiency={2} />
          <Skill name="SQL Server" icon={<LogoSQLServer />} proficiency={2} />
        </SkillsGroup>
        <SkillsGroup name="Cloud">
          <Skill name="GCP" icon={<LogoGCP />} proficiency={3} />
          <Skill name="Azure" icon={<LogoAzure />} proficiency={3} />
          <Skill name="Heroku" icon={<LogoHeroku />} proficiency={4} />
          <Skill
            name="Vercel"
            icon={<LogoVercel className="dark:drop-shadow-[0_0_1px_#FFFFFF]" />}
            proficiency={3}
          />
        </SkillsGroup>
        <SkillsGroup name="Other">
          <Skill name="Bash" icon={<LogoBash />} proficiency={4} />
          <Skill name="Android" icon={<LogoAndroid />} proficiency={2} />
          <Skill name="Swift" icon={<LogoSwift />} proficiency={1} />
        </SkillsGroup>
      </div>
    </HomeSection>
  );
};

export default Skills;
