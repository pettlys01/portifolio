import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
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
