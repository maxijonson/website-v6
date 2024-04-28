import {
  webhookBodyQuery,
  webhookFilter,
} from "@/app/api/webhooks/sanity/query";
import { format } from "groqfmt-nodejs";
import slugify from "slugify";
import {
  asyncExec,
  createDevProject,
  exportDataset,
  importDataset,
} from "./utils";

(async () => {
  console.info("Exporting production dataset...");
  const exported = await exportDataset(undefined, "production");
  console.info(
    `Exported "${exported.dataset}" dataset from project ${exported.project} to "${exported.exportPath}".`,
  );

  console.info("Getting current branch...");
  const { stdout } = await asyncExec("git branch --show-current");
  const branch = stdout.trim();
  if (!branch) {
    throw new Error("Could not get the current branch.");
  }
  if (["main", "master", "develop", "staging"].includes(branch)) {
    throw new Error(`Cannot create a dev project on the ${branch} branch.`);
  }
  console.info("Current branch:", branch);

  const branchParts = branch.split("/");
  const projectName = slugify("chintristan-dev-" + branchParts.join("-"), {
    lower: true,
    strict: true,
    trim: true,
  });

  console.info(`Creating dev project "${projectName}"...`);
  const project = await createDevProject(projectName);
  console.info(
    `Project ${project.name} created with ID ${project.id}: https://www.sanity.io/manage/project/${project.id}`,
  );

  console.info(`Importing production dataset to dev project...`);
  await importDataset(exported.exportPath, project.id, project.dataset);
  console.info(`Imported production dataset to dev project ${project.name}.`);

  const webhookProjection = format(
    webhookBodyQuery.query
      .slice(
        webhookBodyQuery.query.indexOf(webhookFilter) +
          webhookFilter.length +
          1,
      )
      .trim(),
  );
  console.info(
    "\n\nIf you want to test revalidation, configure a webhook with the following config:",
  );
  console.info("\nFilter:");
  console.info(webhookFilter);
  console.info("\nProjection:");
  console.info(webhookProjection);

  console.info("\n\nChange your environment variables to the following:");
  console.info("NEXT_PUBLIC_SANITY_PROJECT_ID=", project.id);
  console.info("NEXT_PUBLIC_SANITY_DATASET=", project.dataset);
})();
