import ImageStreamHero from "./ImageStreamHero";
import styles from "./Hero.module.css";

const IMAGES = [
  { src: "/projects/elevadores.png", alt: "Atlas Elevadores" },
  { src: "/projects/odontologia.png", alt: "Lumina Odontologia" },
];

export default function Hero() {
  return (
    <ImageStreamHero
      images={IMAGES}
      cards={11}
      speed={11}
      className={styles.hero}
      path={{ cardWidth: 15, cardHeight: 20 }}
    >
      <div id="hero" className={styles.content}>
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
      </div>
    </ImageStreamHero>
  );
}
