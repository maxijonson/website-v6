import { q, type Selection, type TypeFromSelection } from "groqd";
import { homeSkillsSchema } from "../../../../sanity.schemas";
import { makeContentDetailsQuery } from "../../content/content-details";
import { makeImageDetailsQuery } from "../../image-details";

const homeSkillGroupSchema = homeSkillsSchema.shape.skillGroups.element;
const homeSkillSchema = homeSkillGroupSchema.shape.skills.element;

export const homeSkillDetailsSelection = {
  _key: homeSkillSchema.shape._key,
  name: homeSkillSchema.shape.name,
  level: homeSkillSchema.shape.level,
  image: makeImageDetailsQuery("image"),
} satisfies Selection;

export type HomeSkillDetails = TypeFromSelection<
  typeof homeSkillDetailsSelection
>;

export const homeSkillGroupDetailsSelection = {
  _key: homeSkillGroupSchema.shape._key,
  name: homeSkillGroupSchema.shape.name,
  skills: q("skills").filter().grab$(homeSkillDetailsSelection),
} satisfies Selection;

export type HomeSkillGroupDetails = TypeFromSelection<
  typeof homeSkillGroupDetailsSelection
>;

export const homeSkillsDetailsSelection = {
  _key: q.string(),
  _type: homeSkillsSchema.shape._type,
  title: homeSkillsSchema.shape.title,
  content: makeContentDetailsQuery("content"),
  skillGroups: q("skillGroups").filter().grab$(homeSkillGroupDetailsSelection),
} satisfies Selection;

export type HomeSkillsDetails = TypeFromSelection<
  typeof homeSkillsDetailsSelection
>;
