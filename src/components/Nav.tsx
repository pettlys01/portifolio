import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.mark} aria-label="LCS — início">
        LCS
      </Link>
      <div className={styles.links}>
        <Link href="/#work">Projetos</Link>
        <Link href="/#services" className={styles.hideSmall}>
          Serviços
        </Link>
        <Link href="/#stack" className={styles.hideSmall}>
          Stack
        </Link>
        <Link href="/#contact" className={styles.cta}>
          Falar comigo
        </Link>
      </div>
    </nav>
  );
}
