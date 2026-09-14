"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./GrowMedia.module.css";

/**
 * Imagem que começa recortada (recuada e com cantos arredondados) e
 * cresce até ocupar a largura toda conforme a pessoa rola — o gesto
 * de abertura das páginas de case da referência. O progresso vira uma
 * variável CSS (--p, de 0 a 1); todo o desenho fica no CSS.
 */
export default function GrowMedia({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    function update() {
      raf = 0;
      if (!el) return;
      const range = Math.max(240, window.innerHeight * 0.45);
      const p = Math.min(1, Math.max(0, window.scrollY / range));
      el.style.setProperty("--p", p.toFixed(4));
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.frame}>{children}</div>
    </div>
  );
}
