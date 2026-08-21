import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.badge}>Estúdio digital — LCS</span>

      <h1 className={styles.headline}>Sites que parecem feitos à mão, não gerados.</h1>

      <p className={styles.sub}>
        Direção de arte, desenvolvimento e performance sob o mesmo teto —
        para negócios que precisam de um site à altura do que já
        construíram.
      </p>

      <div className={styles.actions}>
        <a href="#work" className="btn btnPrimary">
          Ver trabalhos
        </a>
        <a href="#contact" className="btn btnGhost">
          Falar comigo
        </a>
      </div>
    </section>
  );
}
