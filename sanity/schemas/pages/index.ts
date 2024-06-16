import homePage, { homePageSchemas } from "./home/home-page";
import privacyPolicyPage from "./privacy-policy/privacy-policy-page";

export const pageSchemas = [homePage, privacyPolicyPage] as const;

export const deepPageSchemas = [...pageSchemas, ...homePageSchemas] as const;
