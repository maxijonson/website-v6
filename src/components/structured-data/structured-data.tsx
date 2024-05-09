import { WithContext, Thing } from "schema-dts";

const StructuredData = <T extends Thing>({ data }: { data: T }) => {
  const schema =
    typeof data !== "object"
      ? data
      : ({
          "@context": "https://schema.org",
          ...data,
        } satisfies WithContext<T>);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
