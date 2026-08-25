"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

function isScrolled() {
  return typeof window !== "undefined" && window.scrollY > 40;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(isScrolled);
  const [light, setLight] = useState(false);

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

  const classes = [styles.nav, scrolled && styles.scrolled, light && styles.light]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={classes}>
      <Link href="/" className={styles.mark} aria-label="LCS — início">
        LCS
      </Link>

      <div className={styles.pill}>
        <Link href="/#work">Projetos</Link>
        <Link href="/#services">Serviços</Link>
        <Link href="/#process">Processo</Link>
        <Link href="/#stack">Stack</Link>
      </div>

      <Link href="/#contact" className={styles.cta}>
        Falar comigo <span aria-hidden="true">↗</span>
      </Link>
    </nav>
  );
}
