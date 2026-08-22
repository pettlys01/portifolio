import ImageStreamHero from "@/components/ImageStreamHero";
import styles from "./preview.module.css";

const IMAGES = [
  { src: "/projects/elevadores.png", alt: "Atlas Elevadores" },
  { src: "/projects/odontologia.png", alt: "Lumina Odontologia" },
];

export default function PreviewHero() {
  return (
    <ImageStreamHero images={IMAGES} className={styles.hero}>
      <div className={styles.overlay}>
        <span className={styles.badge}>Estúdio digital — LCS</span>
        <h1 className={styles.headline}>
          Sites que fazem negócios parecerem maiores.
        </h1>
        <p className={styles.sub}>
          Design, desenvolvimento e performance sob o mesmo teto.
        </p>
        <div className={styles.actions}>
          <a href="#" className="btn btnPrimary">
            Ver trabalhos
          </a>
          <a href="#" className="btn btnGhost">
            Falar comigo
          </a>
        </div>
      </div>
    </ImageStreamHero>
  );
}
