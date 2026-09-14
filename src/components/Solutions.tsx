"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./Solutions.module.css";

/* Mesmo conteúdo da antiga seção Serviços (abrir pela situação de quem
   chega, não pelo nome do serviço), em faixas coloridas que abrem como
   acordeão. Aberta, a faixa segue a referência: nome grande em itálico
   e texto à esquerda, imagem à direita. */
const SOLUTIONS = [
  {
    path: "Redesign",
    color: "var(--band-1)",
    image: "/solutions/redesign.webp",
    situation: "Seu site existe, mas trabalha contra você.",
    forWhom: "Quem já tem site e perdeu o controle dele",
    body: "Lento, datado, quebrado no celular ou impossível de atualizar sem chamar alguém — quando o site existe, mas trabalha contra o negócio em vez de a favor dele.",
    items: ["Diagnóstico do site atual", "Migração de conteúdo", "Ganho de performance", "Responsivo de verdade"],
  },
  {
    path: "Site institucional",
    color: "var(--band-2)",
    image: "/solutions/institucional.webp",
    situation: "Sua empresa tem reputação, mas o site não está à altura dela.",
    forWhom: "Indústria, engenharia, serviços técnicos, B2B",
    body: "Para empresas que já têm reputação offline e precisam que o site esteja à altura dela — apresentando serviços, credenciais e diferenciais sem virar catálogo confuso.",
    items: ["Arquitetura da informação", "Páginas de serviço", "Canal de contato direto", "SEO técnico de base"],
  },
  {
    path: "Landing page",
    color: "var(--band-3)",
    image: "/solutions/landing.webp",
    situation: "Você tem uma campanha rodando, e precisa de um lugar pra converter.",
    forWhom: "Clínicas, serviços locais, campanhas pagas",
    body: "Uma página, um objetivo: transformar quem chegou em contato, orçamento ou agendamento. Cada bloco existe pra levar ao próximo.",
    items: ["Hierarquia orientada à ação", "Prova social real", "Formulário ou WhatsApp", "Medição de conversão"],
  },
];

export default function Solutions() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className={styles.section}>
      <div className={`container ${styles.head}`}>
        <div>
          <h2 className={styles.title}>
            <em>Qual é a sua</em>
            <br />
            situação hoje?
          </h2>
          <a href="#contact" className={`btnPill btnPillLight ${styles.headCta}`}>
            Falar sobre meu projeto
            <span className="pillArrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <p className={styles.lead}>
          As três soluções continuam as mesmas. O que muda é o que você lê primeiro: a situação em que
          seu site está, não o nome do serviço que resolve ela.
        </p>
      </div>

      <div className={styles.bands}>
        {SOLUTIONS.map((item, i) => {
          const isOpen = open === i;
          const panelId = `solucao-${i}`;
          return (
            <div
              key={item.path}
              className={`${styles.band} ${isOpen ? styles.open : ""}`}
              style={{ "--band": item.color } as CSSProperties}
            >
              <button
                type="button"
                className={styles.bandHead}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {/* Aberta, o nome sai do cabeçalho e reaparece grande no painel. */}
                <span className={styles.headTitle}>{item.path}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>

              <div id={panelId} className={styles.panel} inert={!isOpen}>
                <div className={styles.panelClip}>
                  <div className={`container ${styles.panelGrid}`}>
                    <div>
                      <span className={styles.num}>{i + 1}</span>
                      <h3 className={styles.name}>{item.path}</h3>
                      <p className={styles.situation}>{item.situation}</p>
                      <p className={styles.body}>{item.body}</p>
                      <p className={styles.forWhom}>Para: {item.forWhom}</p>
                      <div className={styles.includes}>
                        <span>O que entra</span>
                        <ul>
                          {item.items.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      </div>
                      <a href="#contact" className={`btnPill ${styles.bandCta}`}>
                        Resolver com {item.path}
                        <span className="pillArrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </div>
                    <div className={styles.figure}>
                      <Image src={item.image} alt="" fill sizes="(max-width: 900px) 100vw, 48vw" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
