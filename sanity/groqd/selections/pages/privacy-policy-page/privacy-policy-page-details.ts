import { type Selection, type TypeFromSelection } from "groqd";
import { privacyPolicyPageSchema } from "../../../../sanity.schemas";
import { makeContentDetailsQuery } from "../../content/content-details";

export const privacyPolicyPageDetailsSelection = {
  updatedAt: ["_updatedAt", privacyPolicyPageSchema.shape._updatedAt],
  content: makeContentDetailsQuery("content"),
} satisfies Selection;

export type PrivacyPolicyPageDetails = TypeFromSelection<
  typeof privacyPolicyPageDetailsSelection
>;
