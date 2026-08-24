import Reveal from "./Reveal";
import styles from "./CTA.module.css";

// TODO: trocar pelo e-mail real de contato antes de divulgar o link.
const CONTACT_EMAIL = "contato@seudominio.com";

export default function CTA() {
  return (
    <section id="contact" className={styles.section}>
      <Reveal>
        <h2 className={styles.headline}>Tem um projeto em mente?</h2>
        <p className={styles.body}>
          Me conta o que o seu negócio faz e o que o site precisa resolver.
          Respondo com uma ideia de escopo e prazo.
        </p>
        <div className={styles.btnWrap}>
          <a className="btn btnPrimary btnGlow" href={`mailto:${CONTACT_EMAIL}`}>
            Enviar e-mail <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <a className="btn btnGhost" href="#work">
            Ver projetos antes
          </a>
        </div>
      </Reveal>
    </section>
  );
}
