import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import SkillsGroup from "./skills-group/skills-group";
import Skill from "./skill/skill";

import LogoReact from "$/svg/logo/logo-react.svg";
import { cn } from "@/lib/utils";

const Skills = () => {
  return (
    <HomeSection id="skills">
      <HomeHeading>Skills</HomeHeading>
      <div className={cn("flex flex-col gap-6", "md:flex-row")}>
        <SkillsGroup name="Web">
          <Skill name="React" icon={<LogoReact />} proficiency={5} />
          <Skill name="React" icon={<LogoReact />} proficiency={4} />
          <Skill name="React" icon={<LogoReact />} proficiency={3} />
          <Skill name="React" icon={<LogoReact />} proficiency={2} />
          <Skill name="React" icon={<LogoReact />} proficiency={1} />
        </SkillsGroup>
        <SkillsGroup name="Web">
          <Skill name="React" icon={<LogoReact />} proficiency={5} />
          <Skill name="React" icon={<LogoReact />} proficiency={4} />
          <Skill name="React" icon={<LogoReact />} proficiency={3} />
          <Skill name="React" icon={<LogoReact />} proficiency={2} />
          <Skill name="React" icon={<LogoReact />} proficiency={1} />
        </SkillsGroup>
        <SkillsGroup name="Web">
          <Skill name="React" icon={<LogoReact />} proficiency={5} />
          <Skill name="React" icon={<LogoReact />} proficiency={4} />
          <Skill name="React" icon={<LogoReact />} proficiency={3} />
          <Skill name="React" icon={<LogoReact />} proficiency={2} />
          <Skill name="React" icon={<LogoReact />} proficiency={1} />
        </SkillsGroup>
      </div>
    </HomeSection>
  );
};

export default Skills;
