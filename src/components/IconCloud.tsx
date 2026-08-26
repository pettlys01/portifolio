"use client";

import { useMemo } from "react";
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

const RADIUS = 95;

/* Distribuição de Fibonacci sobre a esfera: espaça N pontos de forma
   quase uniforme na superfície, sem aglomerar nos polos como uma
   grade lat/long faria. */
function sphereTransforms(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return `rotateY(${theta}rad) rotateX(${Math.PI / 2 - phi}rad) translateZ(${radius}px)`;
  });
}

/* Esfera 3D só com CSS: transform-style + uma única animação de
   rotação no elemento pai (composta na GPU, custo de JS é zero por
   frame). Substitui o antigo <Cloud> da react-icon-cloud, que
   redesenhava um <canvas> 2D via TagCanvas/eval() a cada frame — pesado
   o bastante para travar em celulares mais fracos. backface-visibility
   esconde a face de trás dos ícones que giraram para longe da câmera,
   em vez de mostrar o texto espelhado. */
export default function IconCloud() {
  const transforms = useMemo(() => sphereTransforms(SLUGS.length, RADIUS), []);

  return (
    <div className={styles.scene}>
      <div className={styles.sphere}>
        {SLUGS.map((slug, i) => (
          <div
            key={slug}
            className={styles.tag}
            style={{ transform: transforms[i] }}
            title={ICONS[slug].title}
          >
            <TechIcon slug={slug} size={26} />
          </div>
        ))}
      </div>
    </div>
  );
}
