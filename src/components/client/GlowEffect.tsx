"use client";

import { GlowEffectProps } from "@/interfaces";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

const GlowEffect = ({ children, className }: GlowEffectProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const glowSetting = localStorage.getItem("glow") === "true";
    setEnabled(glowSetting);
    
    if (!localStorage.getItem("glow")) {
      localStorage.setItem("glow", "true");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <Tilt
      glareEnable={enabled}
      glareMaxOpacity={isDarkMode ? 0.3 : 0.15}
      glareColor={isDarkMode ? "#ffffff" : "#000000"}
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      className={`${className} transition-all duration-300`}
    >
      {children}
    </Tilt>
  );
}

export default GlowEffect;