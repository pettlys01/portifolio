import Reveal from "./Reveal";
import styles from "./CTA.module.css";

// TODO: trocar pelo e-mail real de contato antes de divulgar o link.
const CONTACT_EMAIL = "contato@seudominio.com";

export default function CTA() {
  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <h2 className={styles.headline}>Tem um projeto em mente?</h2>
        <div className={styles.btnWrap}>
          <a className="btn btnInverse" href={`mailto:${CONTACT_EMAIL}`}>
            Falar com a LCS ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
