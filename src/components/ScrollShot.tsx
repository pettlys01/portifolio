"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ScrollShot.module.css";

/**
 * Print longo do site rolando sozinho enquanto está na tela. Substitui os
 * vídeos: transform animado roda liso a 60fps e funciona em qualquer iPhone.
 */
export default function ScrollShot({ src, label, duration = 16 }: { src: string; label: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const frame = ref.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.frame} ${running ? styles.run : ""}`}
      style={{ "--dur": `${duration}s` } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- print longo animado por transform */}
      <img src={src} alt={label} loading="lazy" decoding="async" />
    </div>
  );
}
