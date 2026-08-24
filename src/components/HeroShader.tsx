"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/* Tons de cinza, não uma paleta decorativa — a regra do site é que
   cor só aparece no trabalho real (globals.css). O shader entra como
   textura tonal ambiente, não como acento de marca. */
const COLORS = ["#08080a", "#1a1a20", "#3b3b45", "#7a7a86", "#f7f6f4"];
const SPEED = 0.22;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function HeroShader() {
  const [speed, setSpeed] = useState(() => (prefersReducedMotion() ? 0 : SPEED));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setSpeed(e.matches ? 0 : SPEED);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <MeshGradient
      colors={COLORS}
      speed={speed}
      distortion={0.85}
      swirl={0.3}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
