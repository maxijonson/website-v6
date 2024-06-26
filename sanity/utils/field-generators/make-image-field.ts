import {
  defineField,
  type DefineSchemaBase,
  type FieldDefinitionBase,
  type IntrinsicTypeName,
  type MaybeAllowUnknownProps,
  type NarrowPreview,
  type StrictDefinition,
} from "sanity";

export type SanityImageFieldConfig<
  TName extends string,
  TType extends string | IntrinsicTypeName = "image",
  TSelect extends Record<string, string> | undefined =
    | Record<string, string>
    | undefined,
  TPrepareValue extends Record<keyof TSelect, any> | undefined =
    | Record<keyof TSelect, any>
    | undefined,
  TAlias extends IntrinsicTypeName | undefined = IntrinsicTypeName | undefined,
  TStrict extends StrictDefinition = StrictDefinition,
> = {
  type: TType;
  name: TName;
} & DefineSchemaBase<TType, TAlias> &
  NarrowPreview<TType, TAlias, TSelect, TPrepareValue> &
  MaybeAllowUnknownProps<TStrict> &
  FieldDefinitionBase;

type MakeImageFieldOpts<TName extends string> = Omit<
  SanityImageFieldConfig<TName>,
  "name" | "type"
>;

export const makeImageFieldDefaultOptions = {
  metadata: ["blurhash", "lqip", "palette"],
} satisfies MakeImageFieldOpts<string>["options"];

export const makeImageFieldDefaultFields = [
  {
    name: "alt",
    type: "string",
    title: "Alternative Text",
    validation: (rule) => [rule.required()],
  },
] satisfies MakeImageFieldOpts<string>["fields"];

export const makeImageField = <TName extends string>(
  name: TName,
  opts: MakeImageFieldOpts<TName> = {},
) => {
  return defineField({
    type: "image",
    name,
    title: "Image",
    options: makeImageFieldDefaultOptions,
    fields: makeImageFieldDefaultFields,
    validation: (rule) => [rule.required().assetRequired()],
    ...opts,
  });
};
