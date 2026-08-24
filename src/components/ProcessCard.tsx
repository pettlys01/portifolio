"use client";

import * as React from "react";
import styles from "./ProcessCard.module.css";

export default function ProcessCard({
  num,
  title,
  body,
  items,
}: {
  num: string;
  title: string;
  body: string;
  items: string[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const reduced = React.useRef(false);

  React.useEffect(() => {
    /* Sem mouse não há hover: o tilt nunca dispara em toque. */
    reduced.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced.current) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -6;
    const rotateY = ((x - width / 2) / (width / 2)) * 6;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });

    el.style.setProperty("--mx", `${(x / width) * 100}%`);
    el.style.setProperty("--my", `${(y / height) * 100}%`);
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.45s ease-in-out",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={styles.card}
    >
      {/* brilho que segue o cursor */}
      <span className={styles.sheen} aria-hidden="true" />

      <div className={styles.layer}>
        <div className={styles.header}>
          <span className={styles.num}>{num}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <p className={styles.body}>{body}</p>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
