export type IsDefined<T> = T extends undefined | null | "" ? never : T;

export type Defined<T> = Exclude<T, undefined | null | "">;

export const isDefined = <T>(value: T): value is Defined<T> =>
  value !== undefined && value !== null && value !== "";
