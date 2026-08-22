import ImageStreamHero from "./ImageStreamHero";
import styles from "./Hero.module.css";

const IMAGES = [
  { src: "/projects/elevadores.png", alt: "" },
  { src: "/projects/odontologia.png", alt: "" },
];

function Content() {
  return (
    <div className={styles.content}>
      <span className={styles.badge}>
        <span className={styles.dot} />
        Estúdio digital
      </span>

      <h1 className={styles.headline}>
        Sites que fazem negócios parecerem <em>maiores</em>.
      </h1>

      <p className={styles.sub}>
        Design, desenvolvimento e performance sob o mesmo teto — para
        empresas que precisam de um site à altura do que já construíram.
      </p>

      <div className={styles.actions}>
        <a href="#work" className="btn btnPrimary">
          Ver projetos
        </a>
        <a href="#contact" className="btn btnGhost">
          Falar comigo
        </a>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero">
      {/* Desktop: corredor 3D de screenshots ao fundo */}
      <div className={styles.streamOnly}>
        <ImageStreamHero
          images={IMAGES}
          cards={11}
          speed={11}
          className={styles.hero}
          path={{ cardWidth: 15, cardHeight: 20 }}
        >
          <Content />
        </ImageStreamHero>
      </div>

      {/* Mobile: mesma composição, sem o corredor */}
      <div className={styles.plainOnly}>
        <Content />
      </div>
    </section>
  );
}
