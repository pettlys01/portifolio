import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.mark}>LCS</span>
        <span className={styles.tagline}>Estúdio digital — feito à mão, prancha por prancha.</span>
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <a href="https://github.com/pettlys01" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="#work">Trabalhos</a>
          <a href="#contact">Contato</a>
        </div>
        <span>© {year} LCS</span>
      </div>
    </footer>
  );
}
