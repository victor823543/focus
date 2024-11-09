import { useEffect, useRef, useState } from "react";

const useOverflowHeight = () => {
  const [overflowMargin, setOverflowMargin] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateOverflowMargin = () => {
      if (sectionRef.current && screenRef.current) {
        const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
        const screenBottom = screenRef.current.getBoundingClientRect().bottom;

        // Calculate the difference between the bottoms (screenContainer overflows)
        const overflow = Math.max(0, screenBottom - sectionBottom);
        setOverflowMargin(overflow);
      }
    };

    const observer = new ResizeObserver(() => {
      calculateOverflowMargin();
    });

    // Observe the screenContainer for resizing
    if (screenRef.current) {
      observer.observe(screenRef.current);
    }

    // Cleanup observer when the component unmounts
    return () => {
      if (screenRef.current) {
        observer.unobserve(screenRef.current);
      }
    };
  }, []);

  return { overflowMargin, sectionRef, screenRef };
};

export default useOverflowHeight;
