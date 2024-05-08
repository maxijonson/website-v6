import { q, type Selection, type TypeFromSelection } from "groqd";
import { makeContentDetailsQuery } from "../../content/content-details";
import { homeExperienceSchema } from "../../../../sanity.schemas";
import { makeImageDetailsQuery } from "../../image-details";

export const homeExperiencePositionDetailsSelection = {
  _key: q.string(),
  company: q.string(),
  position: q.string(),
  description: q.string().optional(),
  startDate: q.string(),
  endDate: q.string().optional(),
  type: q.union([
    q.literal("full-time"),
    q.literal("part-time"),
    q.literal("internship"),
  ]),
  logo: makeImageDetailsQuery("logo"),
  highlights: q.array(q.string()),
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
