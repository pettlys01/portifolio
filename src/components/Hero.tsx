import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <p className={styles.eyebrow}>Estúdio digital — LCS</p>
      <h1 className={styles.headline}>
        Sites com a precisão de um{" "}
        <span className={styles.mark}>
          projeto técnico
          <svg viewBox="0 0 340 12" aria-hidden="true">
            <path d="M2 8 C 90 2, 250 2, 338 8" />
          </svg>
        </span>
        .
      </h1>
      <p className={styles.sub}>
        Direção de arte, desenvolvimento e performance sob o mesmo teto —
        para negócios que precisam de um site à altura do que já
        construíram.
      </p>
      <a href="#work" className={styles.scrollHint}>
        Trabalhos <span>↓</span>
      </a>
    </section>
  );
}
