"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { DIRECT_MESSAGE, whatsAppUrl } from "@/lib/contact";
import Reveal from "./Reveal";
import styles from "./Contact.module.css";

const PROJECT_TYPES = ["Site institucional", "Landing page", "Loja virtual", "Ainda não sei"];
const TIMELINES = ["Sem pressa", "Até 1 mês", "Tenho urgência"];

function openWhatsApp(url: string) {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}

/**
 * Card de contato no formato da referência (moldura com borda em
 * degradê, visual à esquerda, conversa à direita). O fluxo é o mesmo
 * de antes: formulário curto que monta a mensagem do WhatsApp, ou
 * atalho direto sem formulário.
 */
export default function Contact() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const lines = [
      "Olá! Vim pelo site da Mirai.",
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

  const direct = (
    <a className={styles.direct} href={whatsAppUrl(DIRECT_MESSAGE)} target="_blank" rel="noopener noreferrer">
      Prefere falar direto? WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );

  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <div className={`gradientBorder ${styles.frame}`}>
          <div className={styles.card}>
            <div className={styles.visual} aria-hidden="true">
              <Image src="/mirai-mark-light.png" alt="" width={421} height={177} className={styles.mark} />
              <span className={styles.caption}>Criação de sites · São Paulo</span>
            </div>

            <div className={styles.content}>
              <h2 className={styles.title}>
                Tem um projeto <em>em mente?</em>
              </h2>
              <p className={styles.body}>
                Me conta o que o seu negócio faz e o que o site precisa resolver. Respondo com uma ideia de
                escopo e prazo.
              </p>

              {!open ? (
                <div className={styles.actions}>
                  <button type="button" className="btnPill btnPillSolid" onClick={() => setOpen(true)}>
                    Falar sobre meu projeto
                    <span className="pillArrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                  {direct}
                </div>
              ) : (
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
                    <select id="cta-type" required value={projectType} onChange={(e) => setProjectType(e.target.value)}>
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
                    <select id="cta-timeline" required value={timeline} onChange={(e) => setTimeline(e.target.value)}>
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
                    <button type="submit" className="btnPill btnPillSolid">
                      Continuar pelo WhatsApp
                      <span className="pillArrow" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                    <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>
                      Cancelar
                    </button>
                  </div>
                  {direct}
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
