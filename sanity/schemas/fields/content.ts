import { defineArrayMember, defineType } from "sanity";
import codeGroup from "./code-group";
import contentBlock from "./content-block";
import contentImage from "./content-image";
import contentAlert from "./content-alert";

export default defineType({
  title: "Post Content",
  name: "content",
  type: "array",
  of: [
    defineArrayMember({
      type: contentBlock.name,
    }),
    defineArrayMember({
      type: contentImage.name,
    }),
    defineArrayMember({
      type: codeGroup.name,
    }),
    defineArrayMember({
      type: contentAlert.name,
    }),
  ],
});
