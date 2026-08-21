import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.mark}>Lucas</span>
      <div className={styles.links}>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
