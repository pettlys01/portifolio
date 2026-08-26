"use client";

import { useEffect, useMemo, useRef } from "react";
import TechIcon, { ICONS, type TechSlug } from "./TechIcon";
import styles from "./IconCloud.module.css";

const SLUGS: TechSlug[] = [
  "html5",
  "css",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "git",
  "vercel",
  "analytics",
];

const RADIUS = 138;
const PERSPECTIVE = 530;
const SPEED = (2 * Math.PI) / 9000; // rad/ms — uma volta completa a cada 9s
const TILT = -0.18; // leve inclinação fixa, pra esfera não parecer um círculo achatado de frente

type Point3D = { x0: number; y0: number; z0: number };

/* Distribuição de Fibonacci sobre a esfera, com uma inclinação fixa no
   eixo X aplicada uma única vez às coordenadas base. */
function spherePoints(count: number, radius: number, tilt: number): Point3D[] {
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x0 = radius * Math.sin(phi) * Math.cos(theta);
    const yRaw = radius * Math.cos(phi);
    const zRaw = radius * Math.sin(phi) * Math.sin(theta);
    return { x0, y0: yRaw * cosT - zRaw * sinT, z0: yRaw * sinT + zRaw * cosT };
  });
}

/* Esfera 3D "billboard": cada ícone é um card 2D que nunca vira de
   lado — só troca de posição, escala e opacidade, como o antigo
   TagCanvas fazia num canvas 2D. Um rotateY físico em cada card (a
   primeira versão testada) faz o card mostrar a própria borda quando
   passa perto de 90/270°, virando uma lasca fina — foi exatamente
   isso que ficou estranho. Aqui a profundidade (Z) só alimenta
   escala/opacidade via requestAnimationFrame: 9 escritas de estilo
   por frame, ordens de grandeza mais leve que o redesenho de canvas
   da lib antiga. */
export default function IconCloud() {
  const points = useMemo(() => spherePoints(SLUGS.length, RADIUS, TILT), []);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;

    function paint(now: number) {
      const angle = reduceMotion ? 0 : (now - start) * SPEED;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      points.forEach((p, i) => {
        const el = refs.current[i];
        if (!el) return;
        const x = p.x0 * cosA + p.z0 * sinA;
        const z = -p.x0 * sinA + p.z0 * cosA;

        const scale = PERSPECTIVE / (PERSPECTIVE - z);
        const depthT = (z + RADIUS) / (2 * RADIUS);
        el.style.transform = `translate3d(${x}px, ${p.y0}px, 0) scale(${scale})`;
        el.style.opacity = String(0.32 + depthT * 0.68);
        el.style.zIndex = String(Math.round(z * 100));
      });

      if (!reduceMotion) raf = requestAnimationFrame(paint);
    }

    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, [points]);

  return (
    <div className={styles.scene}>
      {SLUGS.map((slug, i) => (
        <div
          key={slug}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={styles.tag}
          title={ICONS[slug].title}
        >
          <TechIcon slug={slug} size={26} />
        </div>
      ))}
    </div>
  );
}
