import { cn } from "@/lib/utils";

export const scrollbarClassName = cn(
  "scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-rounded-full scrollbar-thumb-stone-400 scrollbar-track-stone-200 scrollbar-corner",
  "[&.dark]:scrollbar-thumb-stone-600 [&.dark]:scrollbar-track-stone-800",
  "dark:scrollbar-thumb-stone-600 dark:scrollbar-track-stone-800",
);
