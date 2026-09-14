"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import styles from "./Process.module.css";

/* As etapas reais do processo (mesmo texto da antiga seção Processo),
   cada uma com uma ilustração no estilo da seção "molde pronto". */
const STEPS = [
  {
    num: "01",
    title: "Entender",
    body: "O que o negócio faz, para quem, e o que precisa acontecer quando alguém chega no site.",
    image: "/process/etapa-entender.webp",
  },
  {
    num: "02",
    title: "Estruturar",
    body: "Arquitetura da informação e hierarquia — o que vem primeiro, o que pode esperar.",
    image: "/process/etapa-estruturar.webp",
  },
  {
    num: "03",
    title: "Desenhar",
    body: "Direção visual, tipografia e ritmo. É aqui que o site ganha cara própria.",
    image: "/process/etapa-desenhar.webp",
  },
  {
    num: "04",
    title: "Construir",
    body: "Código limpo, performance medida e responsivo testado em tela real, não só no editor.",
    image: "/process/etapa-construir.webp",
  },
  {
    num: "✓",
    title: "Você aprova cada etapa",
    body: "Nada avança pra próxima etapa sem sua validação — sem retrabalho por ter andado rápido demais no que ainda não tinha fechado.",
    image: "/process/etapa-aprovar.webp",
  },
];

export default function Process() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0 });
  const [dragging, setDragging] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);

  /* Arrastar com o mouse; no toque a rolagem lateral nativa já resolve. */
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { active: true, x: e.clientX, left: trackRef.current.scrollLeft };
    trackRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (stage) {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty("--cx", `${e.clientX - rect.left}px`);
      stage.style.setProperty("--cy", `${e.clientY - rect.top}px`);
    }
    if (drag.current.active && trackRef.current) {
      trackRef.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
    }
  }

  function endDrag() {
    drag.current.active = false;
    setDragging(false);
  }

  return (
    <section id="process" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <h2 className={styles.title}>
            <span>Você</span>
            <em className={styles.big}>aprova</em>
            <em className={styles.l3}>cada etapa</em>
          </h2>
          <p className={styles.lead}>
            Hierarquia, ritmo e detalhe antes de qualquer linha escrita. Você aprova cada etapa antes da
            seguinte.
          </p>
        </div>

        <div
          ref={stageRef}
          className={styles.stage}
          onPointerEnter={(e) => e.pointerType === "mouse" && setCursorOn(true)}
          onPointerLeave={() => {
            setCursorOn(false);
            endDrag();
          }}
          onPointerMove={onPointerMove}
        >
          <span className={`${styles.cursor} ${cursorOn ? styles.cursorOn : ""}`} aria-hidden="true">
            Arraste
          </span>
          <div
            ref={trackRef}
            className={`${styles.track} ${dragging ? styles.dragging : ""}`}
            onPointerDown={onPointerDown}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {STEPS.map((step) => (
              <article key={step.title} className={styles.card}>
                <div className={styles.media}>
                  <Image src={step.image} alt="" fill sizes="340px" draggable={false} />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.stepNum}>{step.num === "✓" ? "Sempre" : `Etapa ${step.num}`}</span>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
