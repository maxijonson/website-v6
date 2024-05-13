"use client";

import { NextStudio } from "next-sanity/studio";
import { configBase } from "../../../../../sanity.config";
import { defineConfig } from "sanity";

interface StudioProps {
  datasets: string[];
}

const Studio = ({ datasets }: StudioProps) => {
  return (
    <NextStudio
      config={defineConfig(
        datasets.map((dataset) => ({
          ...configBase,
          dataset,
          name: dataset,
          title: dataset[0].toUpperCase() + dataset.slice(1),
          basePath: dataset === "production" ? "/studio" : `/studio-${dataset}`,
        })),
      )}
    />
  );
};

export default Studio;
