import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.mark}>
        LCS
      </Link>
      <div className={styles.links}>
        <Link href="/#work">Trabalhos</Link>
        <Link href="/#about">Sobre</Link>
        <Link href="/#contact" className={styles.cta}>
          Contato
        </Link>
      </div>
    </nav>
  );
}
