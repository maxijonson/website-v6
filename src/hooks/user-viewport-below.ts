import { useEffect, useState } from "react";

export const useViewportBelow = (selector: string, threshold = 1) => {
  const [isViewportBelow, setIsViewportBelow] = useState<boolean | null>(null);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (!element) {
      setIsViewportBelow(null);
      return;
    }

    const handleScroll = () => {
      const { height, y } = element.getBoundingClientRect();
      setIsViewportBelow(y + threshold * height < 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selector, threshold]);

  return isViewportBelow;
};
