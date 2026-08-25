"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import styles from "./HeroShader.module.css";

/* Única exceção deliberada à regra de "cor só no trabalho real" —
   roxo/azul vívido, contido a este elemento, do mesmo jeito que o
   btnGlow fica restrito a um único CTA. Tons próximos demais (a
   versão em cinza anterior) faziam o movimento ficar ilegível; o
   contraste alto aqui é o que faz a animação se ler à distância. */
const COLORS = ["#04030f", "#4c1d95", "#4338ca", "#818cf8", "#e0e7ff"];
const SPEED = 0.22;

/* O construtor do shader lança exceção se getContext("webgl2") vier
   nulo — sem esse teste antes, qualquer navegador sem WebGL2 (modo
   de baixo consumo, alguns webviews de app, Android mais antigo)
   quebra silenciosamente e o fundo do Hero fica em branco. Mesma
   lógica do fallback estático do IconCloud: o conteúdo não pode
   depender de um recurso que nem todo navegador entrega. */
function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function HeroShader() {
  const [supported, setSupported] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    setSupported(supportsWebGL2());

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSpeed(mq.matches ? 0 : SPEED);
    const handler = (e: MediaQueryListEvent) => setSpeed(e.matches ? 0 : SPEED);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!supported) {
    return <div className={styles.fallback} aria-hidden="true" />;
  }

  return (
    <MeshGradient
      colors={COLORS}
      speed={speed}
      distortion={0.85}
      swirl={0.3}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
