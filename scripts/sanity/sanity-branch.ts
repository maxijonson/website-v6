import {
  webhookBodyQuery,
  webhookFilter,
} from "@/app/api/webhooks/sanity/query";
import { Command, Option } from "commander";
import { format } from "groqfmt-nodejs";
import slugify from "slugify";
import {
  createProject,
  exportDataset,
  getGitBranch,
  importDataset,
  promptConfirm,
} from "./utils";

(async () => {
  const program = new Command("Sanity Branch");
  const branch = await getGitBranch();
  const defaultProjectName = branch
    ? slugify("chintristan-dev-" + branch.split("/").join("-"), {
        lower: true,
        strict: true,
        trim: true,
      })
    : undefined;

  program
    .addOption(
      new Option(
        "-p, --project <project>",
        "Project of the dataset to branch from",
      )
        .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
        .makeOptionMandatory(),
    )
    .addOption(
      new Option("-d, --dataset <dataset>", "Dataset to branch from")
        .env("NEXT_PUBLIC_SANITY_DATASET")
        .makeOptionMandatory(),
    )
    .addOption(
      new Option(
        "-n, --name <projectName>",
        "Name of the new project.",
      ).default(defaultProjectName),
    )
    .addOption(
      new Option(
        "-b, --branch <datasetName>",
        "Name of the new dataset.",
      ).default("dev"),
    )
    .parse();

  const {
    project: srcProject,
    dataset: srcDataset,
    name: destProjectName,
    branch: destDataset,
  } = program.opts<{
    project: string;
    dataset: string;
    name: string;
    branch: string;
  }>();

  if (!destProjectName) {
    throw new Error(
      "Project name was not specified and could not be inferred from the current branch.",
    );
  }

  await promptConfirm(
    `Create "${destProjectName}" project with "${destDataset}" dataset from ${srcProject}/${srcDataset}?`,
  );

  console.info(`Exporting ${srcProject}/${srcDataset} dataset...`);
  const exported = await exportDataset(srcProject, srcDataset);
  console.info(
    `Exported "${exported.dataset}" dataset from project ${exported.project} to "${exported.exportPath}".`,
  );

  console.info(
    `Creating "${destProjectName}" project with "${destDataset}" dataset...`,
  );
  const project = await createProject(destProjectName, destDataset);
  console.info(
    `Project "${project.name}" created with ID "${project.id}": https://www.sanity.io/manage/project/${project.id}`,
  );

  console.info(
    `Importing ${srcProject}/${srcDataset} dataset to ${project.id}/${project.dataset} dataset...`,
  );
  await importDataset(exported.exportPath, project.id, project.dataset);
  console.info(
    `Imported ${srcProject}/${srcDataset} dataset to ${project.id}/${project.dataset}.`,
  );

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
  console.info(`NEXT_PUBLIC_SANITY_PROJECT_ID="${project.id}"`);
  console.info(`NEXT_PUBLIC_SANITY_DATASET="${project.dataset}"`);

  console.info(
    `\n\nTo access the Studio, create a new Developer token here and set your SANITY_API_WRITE_TOKEN to it: https://www.sanity.io/manage/personal/project/${project.id}/api`,
  );
})();
