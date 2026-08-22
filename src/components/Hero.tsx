import HeroGradient from "./HeroGradient";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <HeroGradient />
      <span className={styles.badge}>Estúdio digital — LCS</span>

      <h1 className={styles.headline}>Sites que fazem negócios parecerem maiores.</h1>

      <p className={styles.sub}>
        Design, desenvolvimento e performance sob o mesmo teto — para
        empresas que precisam de um site à altura do que já construíram.
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
