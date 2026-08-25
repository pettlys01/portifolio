"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

function isScrolled() {
  return typeof window !== "undefined" && window.scrollY > 40;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(isScrolled);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav}>
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
