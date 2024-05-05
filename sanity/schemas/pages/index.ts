import homePage, { homePageSchemas } from "./home/home-page";

export const pageSchemas = [homePage, ...homePageSchemas] as const;
