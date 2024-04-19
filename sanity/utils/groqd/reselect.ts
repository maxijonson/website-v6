import type { Selection } from "groqd";

/**
 * Given a selection, returns the same selection without any aliases.
 *
 * @example
 * The following selection:
 * ```ts
 * {
 *   id: ["_id", q.string()],
 *   name: q.string(),
 * }
 * ```
 * Becomes:
 * ```ts
 * {
 *   id: q.string(),
 *   name: q.string(),
 * }
 * ```
 */
export const reselect = <S extends Selection>(selection: S): S => {
  return Object.entries(selection).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value[1];
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>,
  ) as S;
};
