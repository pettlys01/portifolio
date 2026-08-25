"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

function isScrolled() {
  return typeof window !== "undefined" && window.scrollY > 40;
}

const LINKS = [
  { href: "/#work", label: "Projetos" },
  { href: "/#services", label: "Serviços" },
  { href: "/#process", label: "Processo" },
  { href: "/#stack", label: "Stack" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(isScrolled);
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* Services é a única seção clara do site — sem isso, o fundo
       sólido do nav (pensado pro resto, que é escuro) vira uma barra
       preta destoando de um fundo #f2f1ee. */
    const target = document.getElementById("services");
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setLight(entry.isIntersecting),
      { rootMargin: "-72px 0px -85% 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* A cápsula de navegação só existe acima de 940px — se a janela
       crescer com o menu mobile aberto (rotação, redimensionar),
       ele não pode continuar aberto por cima da cápsula que reaparece. */
    function onResize() {
      if (window.innerWidth > 940) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const classes = [styles.nav, scrolled && styles.scrolled, light && styles.light]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes}>
      <Link href="/" className={styles.mark} aria-label="LCS — início">
        LCS
      </Link>

      <div className={styles.pill}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className={styles.mobileGroup}>
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <Link href="/#contact" className={styles.cta}>
          Falar comigo <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
