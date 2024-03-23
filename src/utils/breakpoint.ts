const xs = 0;
const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;
const xxl = 1536;

export const Breakpoint = {
  xs,
  xspx: `${xs}px`,

  sm,
  smpx: `${sm}px`,

  md,
  mdpx: `${md}px`,

  lg,
  lgpx: `${lg}px`,

  xl,
  xlpx: `${xl}px`,

  xxl,
  xxlpx: `${xxl}px`,
  "2xl": xxl,
  "2xlpx": `${xxl}px`,
} as const;
export type Breakpoint = typeof Breakpoint;
