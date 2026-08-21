import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>© {year} Lucas</span>
      <div className={styles.links}>
        <a href="https://github.com/pettlys01" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
}
