"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import styles from "./CTA.module.css";

const WHATSAPP_NUMBER = "5511937104630";

const PROJECT_TYPES = ["Site institucional", "Landing page", "Loja virtual", "Ainda não sei"];
const TIMELINES = ["Sem pressa", "Até 1 mês", "Tenho urgência"];

const DIRECT_MESSAGE = "Olá! Vim pelo site da LCS e quero saber mais sobre criação de site.";

function whatsAppUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function openWhatsApp(url: string) {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}

export default function CTA() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }
    e.preventDefault();

    const lines = [
      "Olá! Vim pelo site da LCS.",
      "",
      `Meu nome é ${name.trim()}.`,
      `Estou procurando: ${projectType}.`,
      description.trim() ? `Sobre o projeto: ${description.trim()}` : null,
      `Prazo: ${timeline}.`,
      "",
      "Gostaria de conversar sobre o projeto.",
    ].filter((line): line is string => line !== null);

    openWhatsApp(whatsAppUrl(lines.join("\n")));
  }

  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <h2 className={styles.headline}>Tem um projeto em mente?</h2>
        <p className={styles.body}>
          Me conta o que o seu negócio faz e o que o site precisa resolver. Respondo com uma ideia
          de escopo e prazo.
        </p>

        {!open && (
          <div className={styles.btnWrap}>
            <button type="button" className="btn btnPrimary btnGlow" onClick={() => setOpen(true)}>
              Falar sobre meu projeto <span className="arrow" aria-hidden="true">↗</span>
            </button>
            <a className="btn btnGhost" href="#work">
              Ver projetos
            </a>
          </div>
        )}

        {open && (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="cta-name">Como posso te chamar?</label>
              <input
                id="cta-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="cta-type">O que você precisa?</label>
              <select
                id="cta-type"
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="" disabled>
                  Escolha uma opção
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="cta-desc">
                Me conta um pouco mais <span className={styles.optional}>(opcional)</span>
              </label>
              <textarea
                id="cta-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="O que você gostaria que o site resolvesse?"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="cta-timeline">Quando gostaria de começar?</label>
              <select
                id="cta-timeline"
                required
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                <option value="" disabled>
                  Escolha uma opção
                </option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className="btn btnPrimary btnGlow">
                Continuar pelo WhatsApp <span className="arrow" aria-hidden="true">↗</span>
              </button>
              <button type="button" className={styles.cancelBtn} onClick={() => setOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        <a
          className={styles.directLink}
          href={whatsAppUrl(DIRECT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prefere falar direto? WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
