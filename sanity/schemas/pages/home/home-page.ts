import { defineArrayMember, defineField, defineType } from "sanity";
import homeHero from "./home-hero";
import homeIntro from "./home-intro";
import homeSkills from "./home-skills";
import { HomeIcon } from "@sanity/icons";
import homeProjects from "./home-projects";

export const homePageSchemas = [
  homeHero,
  homeIntro,
  homeSkills,
  homeProjects,
] as const;

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      type: "array",
      name: "sections",
      of: homePageSchemas.map((s) =>
        defineArrayMember({
          type: s.name,
          name: s.name,
        }),
      ),
    }),
  ],
  preview: {
    prepare() {
      return {
        media: HomeIcon,
      };
    },
  },
});
