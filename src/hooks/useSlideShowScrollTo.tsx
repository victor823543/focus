import React, { useMemo } from "react";
import useViewportWidth from "./useViewportWidth";

const useSlideShowScrollTo = (
  containerRef: React.RefObject<HTMLDivElement>,
): ((index: number) => void) => {
  const width = useViewportWidth();

  const itemWidth = useMemo(() => width * 0.85, [width]);

  const scrollToItem = (index: number) => {
    if (containerRef.current) {
      const position = itemWidth * index;
      containerRef.current.scrollTo({ left: position, behavior: "smooth" });
    }
  };

  return scrollToItem;
};

export default useSlideShowScrollTo;
