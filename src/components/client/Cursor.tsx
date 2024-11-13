import { useEffect, useRef, useState } from "react";
import useMousePosition from "@/lib/useMousePosition";

interface MousePosition {
    x: number | null;
    y: number | null;
}

export default function Cursor() {
    const { x, y }: MousePosition = useMousePosition();
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const innerDotRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleMouseOver = () => cursorRef.current!.style.opacity = "1";
        const handleMouseOut = () => cursorRef.current!.style.opacity = "0";
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
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className={`hidden lg:block fixed pointer-events-none transition-opacity duration-200 
          ${isClicking ? 'scale-90' : 'scale-100 bg-transparent'} 
          rounded-full border-2 border-color-layout`}
                style={{
                    width: "40px",
                    height: "40px",
                    left: (x ?? 0) - 20,
                    top: (y ?? 0) - 20,
                    transition: "transform 0.15s ease-out, opacity 0.1s ease",
                    zIndex: 10*10000,
                }}
            />

            <div
                ref={innerDotRef}
                className={`fixed pointer-events-none rounded-full transition-transform duration-100
          ${isClicking ? 'scale-125' : 'scale-100'} bg-color-layout`}
                style={{
                    width: "8px",
                    height: "8px",
                    left: x ?? 0,
                    top: y ?? 0,
                    zIndex: 10*10000,
                    transform: "translate(-50%, -50%)",
                }}
            />
        </>
    );
}
