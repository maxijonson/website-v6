import { q, type Selection, type TypeFromSelection } from "groqd";
import { makeContentDetailsQuery } from "../../content/content-details";
import { homeExperienceSchema } from "../../../../sanity.schemas";
import { makeImageDetailsQuery } from "../../image-details";

const homeExperiencePositionSchema =
  homeExperienceSchema.shape.positions.element;

export const homeExperiencePositionDetailsSelection = {
  _key: q.string(),
  company: homeExperiencePositionSchema.shape.company,
  position: homeExperiencePositionSchema.shape.position,
  description: homeExperiencePositionSchema.shape.description,
  startDate: homeExperiencePositionSchema.shape.startDate,
  endDate: homeExperiencePositionSchema.shape.endDate,
  type: homeExperiencePositionSchema.shape.type,
  logo: makeImageDetailsQuery("logo"),
  highlights: homeExperiencePositionSchema.shape.highlights,
} satisfies Selection;

export type HomeExperiencePositionDetails = TypeFromSelection<
  typeof homeExperiencePositionDetailsSelection
>;

export const homeExperienceDetailsSelection = {
  _key: q.string(),
  _type: homeExperienceSchema.shape._type,
  title: homeExperienceSchema.shape.title,
  content: makeContentDetailsQuery("content"),
  positions: q("positions")
    .filter()
    .grab$(homeExperiencePositionDetailsSelection),
} satisfies Selection;

export type HomeExperienceDetails = TypeFromSelection<
  typeof homeExperienceDetailsSelection
>;
