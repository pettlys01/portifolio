import Reveal from "./Reveal";
import styles from "./Included.module.css";

const items = [
  {
    title: "Performance",
    body: "Imagens comprimidas, JavaScript mínimo e hospedagem em CDN — pensado para carregar rápido em qualquer conexão.",
  },
  {
    title: "SEO técnico",
    body: "HTML semântico, meta tags, Open Graph e sitemap configurados desde o início do projeto, não como retrofit.",
  },
  {
    title: "Segurança",
    body: "HTTPS por padrão, formulários validados e sem dependências desnecessárias expostas ao navegador.",
  },
  {
    title: "Responsivo",
    body: "Desenhado para mobile, tablet e desktop — não é a versão de desktop encolhida até caber.",
  },
];

export default function Included() {
  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className="sectionLabel">Incluso</span>
          <span className={styles.headingRule} />
        </div>
        <h2 className={styles.headingTitle}>
          O que vem junto, sem cobrar à parte.
        </h2>
      </Reveal>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className={styles.item}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
