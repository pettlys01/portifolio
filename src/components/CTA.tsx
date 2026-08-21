import Reveal from "./Reveal";
import styles from "./CTA.module.css";

const CONTACT_EMAIL = "seu-email@exemplo.com";

export default function CTA() {
  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <h2 className={styles.headline}>Tem um projeto em mente?</h2>
        <a className={styles.email} href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </Reveal>
    </section>
  );
}
