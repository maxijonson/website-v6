import { exec } from "child_process";
import inquirer from "inquirer";
import path from "path";
import { promisify } from "util";

export const asyncExec = promisify(exec);

export const sanityExportsDir = path.join(
  __dirname,
  "..",
  "..",
  "sanity",
  "exports",
);

export const exportDataset = async (
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  exportPath = path.join(sanityExportsDir, `${project}-${dataset}.tar.gz`),
) => {
  if (!project || !dataset) {
    throw new Error("[exportDataset]: Missing project or dataset.");
  }
  await asyncExec(
    `sanity dataset export ${dataset} ${exportPath} --overwrite`,
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: project,
        NEXT_PUBLIC_SANITY_DATASET: dataset,
      },
    },
  );
  return { exportPath, dataset, project };
};

export const importDataset = async (
  importPath: string,
  project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "",
) => {
  if (!project || !dataset) {
    throw new Error("[importDataset]: Missing project or dataset.");
  }
  const replace = dataset === "production" ? "" : "--replace";

  await asyncExec(
    `sanity dataset import "${importPath}" ${dataset} ${replace}`,
    {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: project,
        NEXT_PUBLIC_SANITY_DATASET: dataset,
      },
    },
  );
};

export const createProject = async (
  projectName: string,
  datasetName = "production",
) => {
  const result = await asyncExec(
    `sanity init --create-project "${projectName}" --dataset "${datasetName}" --visibility public --bare`,
  );
  const projectId = result.stdout.match(/Project ID: (\w+)/)?.[1];

  return { name: projectName, id: projectId, dataset: datasetName };
};

export const getGitBranch = async () => {
  const { stdout } = await asyncExec("git branch --show-current");
  return stdout.trim();
};

export const promptConfirm = async (message: string, abortOnFalse = true) => {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message,
    },
  ]);

  if (abortOnFalse && !confirm) {
    console.info("Operation cancelled.");
    process.exit(0);
  }

  return confirm;
};
