import { style, keyframes } from "@vanilla-extract/css";

const shootingStarsAnimation = keyframes({
  "0%": {
    opacity: 0,
  },
  "10%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0,
  },
});

export const animateShootingStars = style({
  opacity: 0,
  animation: `${shootingStarsAnimation} 5s infinite linear`,
});
