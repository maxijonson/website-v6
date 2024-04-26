import type { Selection } from "groqd";

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
