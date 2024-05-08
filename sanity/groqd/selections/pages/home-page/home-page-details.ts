import { q, type Selection, type TypeFromSelection } from "groqd";
import { qType } from "../../../filters/type";
import { homeHeroDetailsSelection } from "./home-hero-details";
import { homeIntroDetailsSelection } from "./home-intro-details";
import { homeSkillsDetailsSelection } from "./home-skills-details";
import { homeProjectsDetailsSelection } from "./home-projects-details";
import { homeExperienceDetailsSelection } from "./home-experience-details";
import { homeCredentialsDetailsSelection } from "./home-credentials-details";

export const homePageDetailsSelection = {
  sections: q("sections")
    .filter()
    .select({
      [qType("homeHero")]: homeHeroDetailsSelection,
      [qType("homeIntro")]: homeIntroDetailsSelection,
      [qType("homeSkills")]: homeSkillsDetailsSelection,
      [qType("homeProjects")]: homeProjectsDetailsSelection,
      [qType("homeExperience")]: homeExperienceDetailsSelection,
      [qType("homeCredentials")]: homeCredentialsDetailsSelection,
    }),
} satisfies Selection;

export type HomePageDetails = TypeFromSelection<
  typeof homePageDetailsSelection
>;
