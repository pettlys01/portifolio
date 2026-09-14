"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { shotsFor, type Project } from "@/data/projects";
import styles from "./ProjectTile.module.css";

type Props = {
  project: Project;
  /** "marquee": largura fixa pro carrossel; "grid": ocupa a coluna. */
  layout?: "marquee" | "grid";
  /** Cópia duplicada do carrossel — fora do foco e do leitor de tela. */
  duplicate?: boolean;
};

/**
 * Card de projeto sem vídeo: dois prints longos do site (computador e
 * celular) animados só com transform, que roda liso a 60fps — a gravação
 * em vídeo ficava travada. No hover (ou com o card na tela, no toque) a
 * tela do computador rola até embaixo, encolhe pro lado e o celular entra
 * rolando a versão mobile. A informação aparece num círculo que cresce
 * a partir da base.
 */
export default function ProjectTile({ project, layout = "marquee", duplicate = false }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [state, setState] = useState<"idle" | "play" | "out">("idle");
  const shots = shotsFor(project.slug);
  const tags = project.category.split("·").map((tag) => tag.trim());

  useEffect(() => {
    const link = linkRef.current;
    if (!link || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let timer = 0;
      const play = () => {
        window.clearTimeout(timer);
        setState("play");
      };
      // Some com fade antes de zerar a animação, pra não dar pulo ao sair.
      const stop = () => {
        setState((current) => (current === "idle" ? current : "out"));
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setState("idle"), 320);
      };
      link.addEventListener("mouseenter", play);
      link.addEventListener("mouseleave", stop);
      link.addEventListener("focus", play);
      link.addEventListener("blur", stop);
      return () => {
        window.clearTimeout(timer);
        link.removeEventListener("mouseenter", play);
        link.removeEventListener("mouseleave", stop);
        link.removeEventListener("focus", play);
        link.removeEventListener("blur", stop);
      };
    }

    const observer = new IntersectionObserver(([entry]) => setState(entry.isIntersecting ? "play" : "idle"), {
      threshold: 0.6,
    });
    observer.observe(link);
    return () => observer.disconnect();
  }, []);

  const className = [
    styles.tile,
    layout === "grid" && styles.grid,
    state !== "idle" && styles.play,
    state === "out" && styles.out,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      ref={linkRef}
      href={`/projetos/${project.slug}`}
      className={className}
      aria-label={`Ver case: ${project.title}`}
      tabIndex={duplicate ? -1 : undefined}
    >
      {/* Topo do site parado: aparece por baixo enquanto a animação some. */}
      <div className={styles.rest} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- print já otimizado (webp) */}
        <img src={shots.desktop} alt="" loading="lazy" decoding="async" />
      </div>

      <div className={styles.anim} aria-hidden="true">
        <div className={styles.desk}>
          {/* eslint-disable-next-line @next/next/no-img-element -- print longo animado por transform */}
          <img src={shots.desktop} alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.phone}>
          {/* eslint-disable-next-line @next/next/no-img-element -- print longo animado por transform */}
          <img src={shots.mobile} alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className={styles.reveal}>
        <div className={styles.shade} />
        <div className={styles.info}>
          <h3 className={styles.title}>
            {project.title}
            <span aria-hidden="true">↗</span>
          </h3>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
