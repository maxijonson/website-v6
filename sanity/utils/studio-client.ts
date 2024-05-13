import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const studioClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
