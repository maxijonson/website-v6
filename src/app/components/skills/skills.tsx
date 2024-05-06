import Content from "@/components/content/content";
import { cn } from "@/lib/utils";
import type { HomeSkillsDetails } from "../../../../sanity/groqd/selections/pages/home-page/home-skills-details";
import HomeHeading from "../home-heading/home-heading";
import HomeSection from "../home-section/home-section";
import Skill from "./skill/skill";
import SkillsGroup from "./skills-group/skills-group";

type SkillsProps = HomeSkillsDetails;

const Skills = ({ title, content, skillGroups }: SkillsProps) => {
  return (
    <HomeSection id="skills">
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
      <div
        className={cn(
          "grid grid-cols-1 gap-4 pt-4",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
        )}
      >
        {skillGroups.map((group) => (
          <SkillsGroup key={group._key} name={group.name}>
            {group.skills.map((skill) => (
              <Skill
                key={skill._key}
                name={skill.name}
                proficiency={skill.level}
                icon={skill.image}
              />
            ))}
          </SkillsGroup>
        ))}
      </div>
    </HomeSection>
  );
};

export default Skills;
