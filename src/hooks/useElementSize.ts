import { useEffect, useRef, useState } from "react";

type Size = {
  width: number;
  height: number;
};

function useElementSize<T extends HTMLElement>(): [Size, React.RefObject<T>] {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const updateSize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return [size, elementRef];
}

export default useElementSize;
