import { defineArrayMember, defineField, defineType } from "sanity";
import homeHero from "./home-hero";
import homeIntro from "./home-intro";

export const homePageSchemas = [homeHero, homeIntro] as const;

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
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
});
