import { ConfigContext } from "sanity";
import { StructureBuilder } from "sanity/structure";

/**
 * Helper for creating and typing composable desk structure parts.
 */
export default function defineStructure<StructureType = unknown>(
  factory: (S: StructureBuilder, context: ConfigContext) => StructureType,
) {
  return factory;
}
