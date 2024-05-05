import { keyframes, style } from "@vanilla-extract/css";

const animateLogo = keyframes({
  "0%": {
    transform: "scale(0.5)",
    opacity: 0,
    top: "-250px",
  },
  "5%": {
    transform: "scale(1)",
    opacity: 1,
  },
  "20%": {
    transform: "scale(1)",
    opacity: 1,
    top: "-150px",
  },
  "25%": {
    transform: "scale(0)",
    opacity: 0,
    top: "0px",
  },
});

export const followPath = style({
  animationName: animateLogo,
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",
});
