import { useEffect, useState } from "react";

export const useViewportBelow = (
  selector: string,
  threshold = 1,
  thresholdInPx = false,
) => {
  const [isViewportBelow, setIsViewportBelow] = useState<boolean | null>(null);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) {
      setIsViewportBelow(null);
      return;
    }

    const handleScroll = () => {
      const { height, y } = element.getBoundingClientRect();
      const thresholdedHeight = thresholdInPx
        ? height + threshold
        : height * threshold;
      setIsViewportBelow(y + thresholdedHeight < 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selector, threshold, thresholdInPx]);

  return isViewportBelow;
};
