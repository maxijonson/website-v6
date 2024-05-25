import { defineType } from "sanity";
import { makeImageField } from "../../utils/field-generators/make-image-field";

export default defineType(makeImageField("contentImage"));
