import { Command, Option } from "commander";
import path from "path";
import slugify from "slugify";
import {
  deleteDataset,
  exportDataset,
  getProjectDatasets,
  importDataset,
  promptConfirm,
  sanityExportsDir,
} from "./utils";

const program = new Command("Sanity Copy");

program
  .addOption(
    new Option(
      "--from-project <fromProject>",
      "Project of the source dataset to copy from",
    )
      .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      "--from-dataset <fromDataset>",
      "Source dataset to copy from",
    ).makeOptionMandatory(),
  )
  .addOption(
    new Option(
      "--to-project <toProject>",
      "Project of the destination dataset to copy to",
    )
      .env("NEXT_PUBLIC_SANITY_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      "--to-dataset <toDataset>",
      "Destination dataset to copy to",
    ).makeOptionMandatory(),
  )
  .parse();

const { fromProject, fromDataset, toProject, toDataset } = program.opts<{
  fromProject: string;
  fromDataset: string;
  toProject: string;
  toDataset: string;
}>();

(async () => {
  await promptConfirm(
    `Are you sure you want to copy ${fromProject}/${fromDataset} dataset into ${toProject}/${toDataset} dataset?`,
  );

  const projectDatasets = await getProjectDatasets(toProject);
  const destDatasetExists = projectDatasets.includes(toDataset);

  console.info(`Exporting ${fromProject}/${fromDataset} dataset...`);
  const source = await exportDataset(fromProject, fromDataset);
  console.info(`✔ Exported source dataset to ${source.exportPath}.`);

  let backup: Awaited<ReturnType<typeof exportDataset>> | null = null;
  if (destDatasetExists) {
    console.info(`Creating backup for ${toProject}/${toDataset} dataset...`);
    const backupSuffix = slugify(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    );
    backup = await exportDataset(
      toProject,
      toDataset,
      path.join(
        sanityExportsDir,
        "backups",
        toProject,
        toDataset,
        `${toProject}-${toDataset}-backup-${backupSuffix}.tar.gz`,
      ),
    );
    console.info(
      `✔ Created backup for destination dataset to ${backup.exportPath}.`,
    );
    await deleteDataset(toProject, toDataset);
  }

  const restore = async () => {
    if (!backup) return;
    console.info(`Restoring backup for ${toProject}/${toDataset} dataset...`);
    await importDataset(backup.exportPath, toProject, toDataset);
  };

  process.on("SIGINT", async () => {
    console.info("Received SIGINT signal, aborting copy...");
    await restore();
    process.exit(0);
  });

  try {
    console.info(
      `Importing ${fromProject}/${fromDataset} dataset into ${toProject}/${toDataset} dataset...`,
    );
    await importDataset(source.exportPath, toProject, toDataset);
    console.info(
      `✔ Imported ${fromProject}/${fromDataset} dataset into ${toProject}/${toDataset} dataset.`,
    );
  } catch (error) {
    console.error(error);
    await restore();
  }
})();
