"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects, shotsFor } from "@/data/projects";
import styles from "./ProjectIndex.module.css";

/* Índice dos projetos abaixo do carrossel: cada linha é um case. No
   desktop, uma prévia do site segue o cursor e troca conforme a linha;
   no toque, cada linha já traz uma miniatura. */
export default function ProjectIndex() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const wrap = wrapRef.current;
    const preview = previewRef.current;
    if (!wrap || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const place = () => {
      preview.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    // A prévia persegue o cursor com atraso leve e para quando alcança.
    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      place();
      raf = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.4 ? requestAnimationFrame(tick) : 0;
    };

    const local = (event: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      targetX = event.clientX - r.left;
      targetY = event.clientY - r.top;
    };

    const onEnter = (event: PointerEvent) => {
      local(event);
      x = targetX;
      y = targetY;
      place();
    };

    const onMove = (event: PointerEvent) => {
      local(event);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointermove", onMove);
    return () => {
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`container ${styles.index} ${active >= 0 ? styles.show : ""}`}
      onPointerLeave={() => setActive(-1)}
    >
      <ul className={styles.list}>
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projetos/${project.slug}`}
              className={`${styles.row} ${active === i ? styles.on : ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pôster já otimizado (webp pequeno) */}
              <img
                className={styles.thumb}
                src={shotsFor(project.slug).desktop}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className={styles.name}>{project.title}</span>
              <span className={styles.category}>{project.category}</span>
              <span className={styles.go}>
                <span className={styles.goText}>Ver case</span>
                <span className="pillArrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={previewRef} className={styles.preview} aria-hidden="true">
        {projects.map((project, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- pôster já otimizado (webp pequeno)
          <img
            key={project.slug}
            className={active === i ? styles.current : ""}
            src={shotsFor(project.slug).desktop}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}
