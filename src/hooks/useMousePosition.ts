import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
  sideX: "left" | "right";
  sideY: "top" | "bottom";
  normalizedX: number;
  normalizedY: number;
};

export const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    sideX: "left",
    sideY: "top",
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = event.clientX;
      const y = event.clientY;

      // Determine the side of the screen
      const sideX = x < innerWidth / 2 ? "left" : "right";
      const sideY = y < innerHeight / 2 ? "top" : "bottom";

      const normalizedX = x / innerWidth;
      const normalizedY = y / innerHeight;

      setMousePosition({ x, y, sideX, sideY, normalizedX, normalizedY });
    };

    // Add event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
};
