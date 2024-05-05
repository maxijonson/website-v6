import { q, type Selection, type TypeFromSelection } from "groqd";
import { homeHeroSchema } from "../../../../sanity.schemas";
import { makeImageDetailsQuery } from "../../image-details";

export const homeHeroDetailsSelection = {
  _key: q.string(),
  _type: homeHeroSchema.shape._type,
  title: homeHeroSchema.shape.title,
  subtitle: homeHeroSchema.shape.subtitle,
  image: makeImageDetailsQuery("image"),
  logos: makeImageDetailsQuery("logos", {
    additionalFields: {
      darkShadow: homeHeroSchema.shape.logos.unwrap().element.shape.darkShadow,
    },
    isList: true,
  }),
} satisfies Selection;

export type HomeHeroDetails = TypeFromSelection<
  typeof homeHeroDetailsSelection
>;
