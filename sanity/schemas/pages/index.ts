import homePage, { homePageSchemas } from "./home/home-page";

export const pageSchemas = [homePage] as const;

export const deepPageSchemas = [...pageSchemas, ...homePageSchemas] as const;
