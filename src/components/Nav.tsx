import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.mark}>LCS</span>
      <div className={styles.links}>
        <a href="#work">Trabalhos</a>
        <a href="#about">Sobre</a>
        <a href="#contact">Contato</a>
      </div>
    </nav>
  );
}
