"use client";

import * as React from "react";
import TechIcon, { type TechSlug } from "./TechIcon";
import styles from "./StackCard.module.css";

export default function StackCard({
  slug,
  name,
  role,
  tint,
  group,
}: {
  slug: TechSlug;
  name: string;
  role: string;
  /** cor oficial da marca — o gradiente é derivado dela */
  tint: string;
  group: string;
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

    const rotateX = ((y - height / 2) / (height / 2)) * -7;
    const rotateY = ((x - width / 2) / (width / 2)) * 7;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.1s ease-out",
    });

    el.style.setProperty("--mx", `${(x / width) * 100}%`);
    el.style.setProperty("--my", `${(y / height) * 100}%`);
  }

  function handleMouseLeave() {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.45s ease-in-out",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ["--tint" as string]: tint }}
      className={styles.card}
    >
      {/* `overflow: hidden` (cantos arredondados) fica só aqui, num
          elemento que nunca recebe transform. `rotateX/Y` + `overflow:
          hidden` no MESMO elemento é um bug real de renderização —
          o recorte não acompanha a rotação 3D direito e corta a borda
          em ângulos mais extremos. Girar só o miolo, com o molde
          arredondado parado por fora, resolve sem perder o tilt. */}
      <div className={styles.tilt} style={style}>
        <span className={styles.wash} aria-hidden="true" />
        <span className={styles.sheen} aria-hidden="true" />

        <div className={styles.layer}>
          <div className={styles.top}>
            <span className={styles.icon}>
              <TechIcon slug={slug} size={22} />
            </span>
            <span className={styles.dot} aria-hidden="true" />
          </div>

          <div className={styles.bottom}>
            <span className={styles.group}>{group}</span>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.role}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
