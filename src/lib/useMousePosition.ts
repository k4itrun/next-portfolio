import { MousePosition } from "@/interfaces";

import { useEffect, useState, useRef } from "react";

const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
    delayX: null,
    delayY: null,
  });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      setMousePosition((prevState) => ({
        ...prevState,
        x: clientX,
        y: clientY,
      }));

      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        setMousePosition((prevState) => ({
          ...prevState,
          delayX: clientX,
          delayY: clientY,
        }));
      });
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;