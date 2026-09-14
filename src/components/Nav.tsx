"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DIRECT_MESSAGE, whatsAppUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./Icons";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/#work", label: "Projetos" },
  { href: "/#services", label: "Serviços" },
  { href: "/#process", label: "Processo" },
  { href: "/#contact", label: "Contato" },
];

/* Faixa superior: só fatos (o que a Mirai faz), nada de urgência
   inventada — a referência usa promoção, aqui não existe uma. */
const BAR_ITEMS = [
  "Sites institucionais, landing pages e redesign",
  "Design, desenvolvimento e performance sob o mesmo teto",
  "Atendimento direto pelo WhatsApp",
];

/**
 * Navegação em dois estados, como na referência:
 * - no topo: logo, cápsula de links com borda em degradê e ações;
 * - depois de rolar: tudo isso sobe e a cápsula reaparece presa
 *   embaixo, com "voltar ao topo" e WhatsApp nas pontas.
 * No celular fica sempre uma cápsula única no topo com menu.
 */
export default function Nav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [docked, setDocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const light = tone === "light";
  const wa = whatsAppUrl(DIRECT_MESSAGE);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 60);
      setDocked(y > window.innerHeight * 0.55);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 900) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pill = (
    <div className={styles.pill}>
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={[styles.header, scrolled && styles.scrolled, light && styles.light]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.bar}>
          <div className={styles.barTrack} aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className={styles.barGroup}>
                {[...BAR_ITEMS, ...BAR_ITEMS].map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            ))}
          </div>
          <span className="srOnly">{BAR_ITEMS.join(". ")}</span>
        </div>

        <div className={styles.row}>
          <Link href="/" className={styles.logo} aria-label="Mirai — início">
            <Image
              src={light ? "/mirai-mark-dark.png" : "/mirai-mark-light.png"}
              alt="Mirai"
              width={421}
              height={177}
              priority
            />
          </Link>

          <nav className="gradientBorder" aria-label="Principal">
            {pill}
          </nav>

          <div className={styles.actions}>
            <a className={styles.wa} href={wa} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">
              <WhatsAppIcon />
            </a>
            <Link href="/#contact" className={`btnPill ${light ? "btnPillLight" : ""}`}>
              Falar comigo
              <span className="pillArrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.capsule}>
          <Link href="/" className={styles.capsuleLogo} aria-label="Mirai — início">
            <Image src="/mirai-mark-light.png" alt="Mirai" width={421} height={177} />
          </Link>
          <div className={styles.capsuleActions}>
            <a className={styles.wa} href={wa} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">
              <WhatsAppIcon />
            </a>
            <button
              type="button"
              className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>

          {menuOpen && (
            <div className={styles.menu}>
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" className="btnPill btnPillSolid" onClick={() => setMenuOpen(false)}>
                Falar comigo
                <span className="pillArrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className={`${styles.dock} ${docked ? styles.dockOn : ""}`} inert={!docked}>
        <button
          type="button"
          className={`gradientBorder ${styles.round}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
        >
          <span aria-hidden="true">↑</span>
        </button>
        <nav className="gradientBorder" aria-label="Atalhos">
          {pill}
        </nav>
        <a className={styles.wa} href={wa} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">
          <WhatsAppIcon />
        </a>
      </div>
    </>
  );
}
