"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Loader.module.css";

const PALETTE = ["#7c3aed", "#a78bfa", "#38bdf8", "#f472b6", "#34d399", "#f5d0fe"];

type Particle = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  delay: number;
  color: string;
  final: string;
};

/**
 * Intro de marca: partículas coloridas giram e se juntam formando o
 * logo da Mirai, depois a tela escura some e o hero entra.
 *
 * Roda a cada carregamento do site, nunca com "reduzir movimento".
 * A decisão de mostrar é tomada por script no <head> (ver layout.tsx);
 * este componente só executa a animação. Rede de segurança no CSS:
 * mesmo que o JS falhe, a tela escura some sozinha em 4,5s.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.classList.add("intro-done");
      setDone(true);
      return;
    }

    // Em desenvolvimento o Strict Mode limpa as classes do <html> ao
    // remontar — repõe a que o script do <head> tinha colocado.
    root.classList.add("intro-run");

    const timers: number[] = [];
    let raf = 0;

    function finish() {
      root.classList.add("intro-done");
      setDone(true);
    }

    // Celular e tablet: o logo completo fica mais tempo na tela antes de
    // sair (lá a imagem chega mais tarde e o nome mal aparecia inteiro).
    // Mantenha em sincronia com --intro-delay no globals.css.
    const leaveAt = window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches ? 2700 : 1900;
    timers.push(window.setTimeout(() => setLeaving(true), leaveAt));
    timers.push(window.setTimeout(finish, leaveAt + 450));

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return () => timers.forEach(clearTimeout);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.scale(dpr, dpr);

    let particles: Particle[] = [];
    let size = 2.4;
    let start = 0;

    const img = new Image();
    img.src = "/mirai-mark-light.png";
    img.onload = () => {
      const step = W < 600 ? 3 : 4;
      size = step * 0.62;
      const logoW = Math.round(Math.min(520, W * 0.72));
      const logoH = Math.round((logoW * img.height) / img.width);
      const off = document.createElement("canvas");
      off.width = logoW;
      off.height = logoH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, logoW, logoH);
      const data = octx.getImageData(0, 0, logoW, logoH).data;
      const ox = (W - logoW) / 2;
      const oy = (H - logoH) / 2;

      const targets: { x: number; y: number; final: string }[] = [];
      for (let y = 0; y < logoH; y += step) {
        for (let x = 0; x < logoW; x += step) {
          const i = (y * logoW + x) * 4;
          if (data[i + 3] < 120) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Mantém a cor real do logo onde ela é saturada (o traço roxo).
          const saturated = Math.max(r, g, b) - Math.min(r, g, b) > 60;
          targets.push({ x: ox + x, y: oy + y, final: saturated ? `rgb(${r},${g},${b})` : "#ecebe6" });
        }
      }

      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [targets[i], targets[j]] = [targets[j], targets[i]];
      }

      const reach = Math.max(W, H) * 0.5;
      particles = targets.slice(0, 2800).map((t) => {
        const a = Math.random() * Math.PI * 2;
        const rad = (0.55 + Math.random() * 0.6) * reach;
        return {
          sx: W / 2 + Math.cos(a) * rad,
          sy: H / 2 + Math.sin(a) * rad * 0.75,
          tx: t.x,
          ty: t.y,
          delay: Math.random() * 0.3,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          final: t.final,
        };
      });
      start = performance.now();
      raf = requestAnimationFrame(draw);
    };

    function draw(now: number) {
      if (!ctx) return;
      const t = (now - start) / 1500;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        const k = Math.min(1, Math.max(0, (t - p.delay) / 0.7));
        const e = 1 - Math.pow(1 - k, 3);
        // Espiral: o deslocamento até o alvo gira enquanto encolhe.
        const ang = (1 - e) * 2.4;
        const dx = p.sx - p.tx;
        const dy = p.sy - p.ty;
        const cos = Math.cos(ang);
        const sin = Math.sin(ang);
        const x = p.tx + (dx * cos - dy * sin) * (1 - e);
        const y = p.ty + (dx * sin + dy * cos) * (1 - e);
        ctx.globalAlpha = 0.35 + 0.65 * e;
        ctx.fillStyle = e > 0.92 ? p.final : p.color;
        ctx.fillRect(x, y, size, size);
      }
      raf = requestAnimationFrame(draw);
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      img.onload = null;
    };
  }, []);

  if (done) return null;

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leaving : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
