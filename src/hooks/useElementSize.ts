import { useEffect, useRef, useState } from "react";

type Size = {
  width: number;
  height: number;
};

type Options = {
  includePadding?: boolean;
};

function useElementSize<T extends HTMLElement>({
  includePadding = false,
}: Options = {}): [Size, React.RefObject<T>] {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const updateSize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (entry && elementRef.current) {
        const newSize = includePadding
          ? {
              width: elementRef.current.getBoundingClientRect().width,
              height: elementRef.current.getBoundingClientRect().height,
            }
          : {
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            };
        setSize(newSize);
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
  }, [includePadding]);

  return [size, elementRef];
}

export default useElementSize;
