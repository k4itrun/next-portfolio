"use client";

import { useEffect, useRef, useState } from "react";

interface IMousePosition {
 x: number | null;
 y: number | null;
 delayX: number | null;
 delayY: number | null;
}

export const useMousePosition = (): IMousePosition => {
 const [mousePosition, setMousePosition] = useState<IMousePosition>({
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
};

export const Cursor = () => {
 const { x, y }: IMousePosition = useMousePosition();
 const [isClicking, setIsClicking] = useState<boolean>(false);
 const cursorRef = useRef<HTMLDivElement | null>(null);
 const innerDotRef = useRef<HTMLDivElement | null>(null);
 const [isMobile, setIsMobile] = useState<boolean>(false);

 useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  handleResize();

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 useEffect(() => {
  if (isMobile) return;

  const handleMouseOver = () => {
   if (cursorRef.current) cursorRef.current.style.opacity = "1";
  };
  const handleMouseOut = () => {
   if (cursorRef.current) cursorRef.current.style.opacity = "0";
  };
  const handleMouseClick = () => {
   setIsClicking(true);
   setTimeout(() => setIsClicking(false), 150);
  };

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  document.addEventListener("mousedown", handleMouseClick);

  return () => {
   document.removeEventListener("mouseover", handleMouseOver);
   document.removeEventListener("mouseout", handleMouseOut);
   document.removeEventListener("mousedown", handleMouseClick);
  };
 }, [isMobile]);

 if (isMobile) return null;

 return (
  <>
   <div
    ref={cursorRef}
    className={`fixed pointer-events-none transition-opacity duration-200 
                    ${isClicking ? "scale-90" : "scale-100 bg-transparent"} 
                    rounded-full border-2 border-color-layout`}
    style={{
     width: "40px",
     height: "40px",
     left: (x ?? 0) - 20,
     top: (y ?? 0) - 20,
     transition: "transform 0.15s ease-out, opacity 0.1s ease",
     zIndex: 10 * 10000,
    }}
   />

   <div
    ref={innerDotRef}
    className={`fixed pointer-events-none rounded-full transition-transform duration-100
                    ${isClicking ? "scale-125" : "scale-100"} bg-color-layout`}
    style={{
     width: "8px",
     height: "8px",
     left: x ?? 0,
     top: y ?? 0,
     zIndex: 10 * 10000,
     transform: "translate(-50%, -50%)",
    }}
   />
  </>
 );
};
