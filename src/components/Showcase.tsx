"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./Showcase.module.css";

/* A seção de "entrada" da referência: quatro ilustrações em cartões
   inclinados nos cantos — uma por etapa do processo, feitas pra compor,
   não prints de site — apagadas até o cursor chegar perto; e objetos 3D
   flutuando na frente (os pilares que vêm em todo site: rápido, Google,
   seguro, celular). Sem biblioteca: CSS pra flutuação e um único
   requestAnimationFrame pro parallax de mouse e rolagem. */

const CARDS = [
  { slot: "tl", tag: "Entender", src: "/showcase/card-entender.webp" },
  { slot: "tr", tag: "Estruturar", src: "/showcase/card-estruturar.webp" },
  { slot: "bl", tag: "Desenhar", src: "/showcase/card-desenhar.webp" },
  { slot: "br", tag: "Construir", src: "/showcase/card-construir.webp" },
] as const;

const OBJECTS = [
  { src: "/showcase/cursor.webp", slot: "o1", depth: 1.3, dur: 5.2, delay: 0, enter: 0.25 },
  { src: "/showcase/phone.webp", slot: "o2", depth: 0.9, dur: 6.4, delay: -2, enter: 0.4 },
  { src: "/showcase/bolt.webp", slot: "o3", depth: 1.1, dur: 4.6, delay: -1, enter: 0.3 },
  { src: "/showcase/lock.webp", slot: "o4", depth: 0.8, dur: 5.8, delay: -3, enter: 0.45 },
  { src: "/showcase/lens.webp", slot: "o5", depth: 1.6, dur: 5, delay: -1.5, enter: 0.55 },
  { src: "/showcase/window.webp", slot: "o6", depth: 0.6, dur: 7, delay: -4, enter: 0.5 },
];

const clamp = (n: number) => Math.max(-1, Math.min(1, n));

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let visible = false;
    let raf = 0;
    let cycle = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    // Mouse suavizado (persegue o alvo) + posição da seção na tela.
    const tick = () => {
      raf = 0;
      if (!visible) return;
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      const r = section.getBoundingClientRect();
      const sy = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      section.style.setProperty("--mx", x.toFixed(4));
      section.style.setProperty("--my", y.toFixed(4));
      section.style.setProperty("--sy", Math.max(-1.2, Math.min(1.2, sy)).toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) setInView(true);
        if (reduce) return;
        if (visible && !raf) raf = requestAnimationFrame(tick);

        // No toque não há cursor: os cartões acendem um por vez.
        if (!fine) {
          window.clearInterval(cycle);
          if (visible) {
            let n = 0;
            setLit(0);
            cycle = window.setInterval(() => {
              n = (n + 1) % CARDS.length;
              setLit(n);
            }, 2400);
          } else {
            setLit(-1);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    const onMove = (event: PointerEvent) => {
      const r = section.getBoundingClientRect();
      targetX = ((event.clientX - r.left) / r.width) * 2 - 1;
      targetY = ((event.clientY - r.top) / r.height) * 2 - 1;

      let best = -1;
      let bestDistance = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const c = card.getBoundingClientRect();
        const dx = event.clientX - (c.left + c.width / 2);
        const dy = event.clientY - (c.top + c.height / 2);
        card.style.setProperty("--tx", clamp(dx / c.width).toFixed(3));
        card.style.setProperty("--ty", clamp(dy / c.height).toFixed(3));
        const distance = Math.hypot(dx, dy);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setLit(bestDistance < r.width * 0.3 ? best : -1);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      setLit(-1);
    };

    if (fine && !reduce) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearInterval(cycle);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} ${inView ? styles.in : ""}`}>
      <div className={styles.stage} aria-hidden="true">
        {CARDS.map((card, i) => (
          <span
            key={card.slot}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`${styles.card} ${styles[card.slot]} ${lit === i ? styles.lit : ""}`}
          >
            <span className={styles.enter}>
              <span className={styles.tilt}>
                {/* eslint-disable-next-line @next/next/no-img-element -- ilustração já otimizada (webp pequeno) */}
                <img className={styles.shot} src={card.src} alt="" loading="lazy" decoding="async" />
                <span className={styles.tag}>{card.tag}</span>
              </span>
            </span>
          </span>
        ))}

        {OBJECTS.map((object) => (
          <span
            key={object.slot}
            className={`${styles.obj} ${styles[object.slot]}`}
            style={
              {
                "--depth": object.depth,
                "--dur": `${object.dur}s`,
                "--delay": `${object.delay}s`,
                "--enter": `${object.enter}s`,
              } as CSSProperties
            }
          >
            <span className={styles.bob}>
              {/* eslint-disable-next-line @next/next/no-img-element -- recorte com transparência, já otimizado */}
              <img src={object.src} alt="" loading="lazy" decoding="async" />
            </span>
          </span>
        ))}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title} aria-label="Nenhum site sai de molde pronto.">
          <span className={styles.line} aria-hidden="true">
            <span>Nenhum site</span>
          </span>
          <span className={styles.line} aria-hidden="true">
            <span>sai de</span>
          </span>
          <span className={styles.line} aria-hidden="true">
            <span>
              <em>molde pronto.</em>
            </span>
          </span>
        </h2>
        <p className={styles.sub}>
          Cada projeto parte do que o negócio faz — desenhado e programado do zero, sem tema comprado.
        </p>
        <Link href={`/projetos/${projects[0].slug}`} className={`btnPill ${styles.cta}`}>
          Ver um case por dentro
          <span className="pillArrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
