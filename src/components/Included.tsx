import Reveal from "./Reveal";
import styles from "./Included.module.css";

const items = [
  {
    title: "Performance",
    body: "Imagens comprimidas, JavaScript mínimo e hospedagem na Vercel — pensado para carregar rápido em qualquer conexão.",
  },
  {
    title: "SEO técnico",
    body: "HTML semântico, meta tags e Open Graph configurados desde o início do projeto, não como retrofit.",
  },
  {
    title: "Segurança",
    body: "HTTPS por padrão, formulários validados e sem dependências desnecessárias expostas ao navegador.",
  },
  {
    title: "Responsivo",
    body: "Desenhado para mobile, tablet e desktop — não é a versão de desktop encolhida.",
  },
];

export default function Included() {
  return (
    <section className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className={styles.headingLabel}>O que está incluso</span>
          <span className={styles.headingRule} />
        </div>
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
