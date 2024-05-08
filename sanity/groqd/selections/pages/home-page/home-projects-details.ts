import { q, type Selection, type TypeFromSelection } from "groqd";
import { homeProjectsSchema } from "../../../../sanity.schemas";
import { makeContentDetailsQuery } from "../../content/content-details";
import { makeImageDetailsQuery } from "../../image-details";

const homeProjectSchema = homeProjectsSchema.shape.projects.element;
const homeProjectLinkSchema = homeProjectSchema.shape.links.element;

export const homeProjectLinkDetailsSelection = {
  _key: homeProjectLinkSchema.shape._key,
  title: homeProjectLinkSchema.shape.title,
  url: homeProjectLinkSchema.shape.url,
  icon: homeProjectLinkSchema.shape.icon,
} satisfies Selection;

export type HomeProjectLinkDetails = TypeFromSelection<
  typeof homeProjectLinkDetailsSelection
>;

export const homeProjectDetailsSelection = {
  _key: homeProjectSchema.shape._key,
  title: homeProjectSchema.shape.title,
  description: homeProjectSchema.shape.description,
  image: makeImageDetailsQuery("image"),
  links: q("links").filter().grab$(homeProjectLinkDetailsSelection),
} satisfies Selection;

export type HomeProjectDetails = TypeFromSelection<
  typeof homeProjectDetailsSelection
>;

export const homeProjectsDetailsSelection = {
  _key: q.string(),
  _type: homeProjectsSchema.shape._type,
  title: homeProjectsSchema.shape.title,
  content: makeContentDetailsQuery("content"),
  projects: q("projects").filter().grab$(homeProjectDetailsSelection),
} satisfies Selection;

export type HomeProjectsDetails = TypeFromSelection<
  typeof homeProjectsDetailsSelection
>;
