"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Entrada suave ao entrar na viewport.
 *
 * Regra de segurança: o conteúdo NUNCA nasce invisível no HTML. O
 * estado escondido só é aplicado depois que o JS confirma que
 * consegue animar. Se o script falhar, demorar a hidratar, ou o
 * IntersectionObserver não disparar por qualquer motivo, o texto
 * continua legível — em vez de a página inteira ficar em branco.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Já visível na primeira pintura? Não esconde — evita piscar.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    // Rede de segurança: se por qualquer motivo o observer não
    // disparar, revela mesmo assim.
    const failsafe = window.setTimeout(() => setShown(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const state = !armed || shown ? "is-visible" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${state} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
