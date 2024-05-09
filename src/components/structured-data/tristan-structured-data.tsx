import type { Person } from "schema-dts";
import StructuredData from "./structured-data";

export const tristanSchema: Person = {
  "@type": "Person",
  name: "Tristan Chin",
  url: "https://www.chintristan.io/",
  image: "https://www.chintristan.io/image/tristan/ipnos.jpg",
  sameAs: [
    "https://twitter.com/MaxiJonson",
    "https://www.instagram.com/chin.tristan",
    "https://www.linkedin.com/in/tristan-chin/",
    "https://github.com/maxijonson",
    "https://www.chintristan.io/",
  ],
  jobTitle: "Full-Stack Web Developer",
};

const TristanStructuredData = () => {
  return <StructuredData data={tristanSchema} />;
};

export default TristanStructuredData;
