import type { Metadata, ResolvingMetadata } from "next";
import { isDefined } from "./isDefined";

export const getDefinedParentMetadata = async (parent: ResolvingMetadata) => {
  const definedParentMetadata = Object.entries(await parent).reduce(
    (acc, [key, value]) => {
      if (!isDefined(value)) return acc;
      return { ...acc, [key]: value };
    },
    {} as Metadata,
  );
  return definedParentMetadata;
};
