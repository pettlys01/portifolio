"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StackCard from "./StackCard";
import { type TechSlug } from "./TechIcon";
import styles from "./StackCarousel.module.css";

export type StackItem = {
  slug: TechSlug;
  name: string;
  role: string;
  tint: string;
  group: string;
};

export default function StackCarousel({ items }: { items: StackItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  /* Rolagem nativa com scroll-snap: no celular o dedo já funciona,
     no desktop os botões movem um card por vez. Sem biblioteca. */
  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const t = trackRef.current;
        if (!t) return;
        const children = Array.from(t.children) as HTMLElement[];
        const mid = t.scrollLeft + t.clientWidth / 2;
        let closest = 0;
        let best = Infinity;
        children.forEach((c, i) => {
          const center = c.offsetLeft - t.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(center - mid);
          if (d < best) {
            best = d;
            closest = i;
          }
        });
        setIndex(closest);
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const atStart = index === 0;
  const atEnd = index >= items.length - 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef}>
        {items.map((item) => (
          <div key={item.name} className={styles.slide}>
            <StackCard {...item} />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {items.map((item, i) => (
            <button
              key={item.name}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para ${item.name}`}
              aria-current={i === index}
            />
          ))}
        </div>

        <div className={styles.arrows}>
          <button
            className={styles.arrowBtn}
            onClick={() => scrollTo(Math.max(0, index - 1))}
            disabled={atStart}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            className={styles.arrowBtn}
            onClick={() => scrollTo(Math.min(items.length - 1, index + 1))}
            disabled={atEnd}
            aria-label="Próximo"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
