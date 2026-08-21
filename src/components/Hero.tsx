import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Digital Studio — Lucas</p>
      <h1 className={styles.headline}>
        Sites que parecem <em>feitos à mão</em>, não gerados.
      </h1>
      <p className={styles.sub}>
        Projeto, direção visual e desenvolvimento de websites institucionais
        e landing pages para negócios que querem ser percebidos de forma
        diferente.
      </p>
      <a href="#work" className={styles.scrollHint}>
        Selected work <span>↓</span>
      </a>
    </section>
  );
}
