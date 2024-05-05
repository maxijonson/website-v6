import { q, type Selection, type TypeFromSelection } from "groqd";
import { qType } from "../../../filters/type";
import { homeHeroDetailsSelection } from "./home-hero-details";
import { homeIntroDetailsSelection } from "./home-intro-details";

export const homePageDetailsSelection = {
  sections: q("sections")
    .filter()
    .select({
      [qType("homeHero")]: homeHeroDetailsSelection,
      [qType("homeIntro")]: homeIntroDetailsSelection,
    }),
} satisfies Selection;

export type HomePageDetails = TypeFromSelection<
  typeof homePageDetailsSelection
>;
