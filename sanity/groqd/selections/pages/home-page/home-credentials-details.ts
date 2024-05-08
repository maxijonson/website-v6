import { q, type Selection, type TypeFromSelection } from "groqd";
import { homeCredentialsSchema } from "../../../../sanity.schemas";
import { makeContentDetailsQuery } from "../../content/content-details";
import { makeImageDetailsQuery } from "../../image-details";

const homeCredentialSchema = homeCredentialsSchema.shape.credentials.element;

export const homeCredentialDetailsSelection = {
  _key: q.string(),
  title: homeCredentialSchema.shape.title,
  type: homeCredentialSchema.shape.type,
  issuer: homeCredentialSchema.shape.issuer,
  issueDate: homeCredentialSchema.shape.issueDate,
  startDate: homeCredentialSchema.shape.startDate,
  location: homeCredentialSchema.shape.location,
  image: makeImageDetailsQuery("image"),
} satisfies Selection;

export const homeCredentialsDetailsSelection = {
  _key: q.string(),
  _type: homeCredentialsSchema.shape._type,
  title: homeCredentialsSchema.shape.title,
  content: makeContentDetailsQuery("content"),
  credentials: q("credentials").filter().grab$(homeCredentialDetailsSelection),
} satisfies Selection;

export type HomeCredentialsDetails = TypeFromSelection<
  typeof homeCredentialsDetailsSelection
>;
