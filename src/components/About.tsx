import Reveal from "./Reveal";
import styles from "./About.module.css";

/* No lugar dos contadores da referência (a Mirai não tem números reais
   pra exibir): o que todo projeto já inclui, com a primeira frase de
   cada item da antiga seção "O que vem junto". */
const INCLUDED = [
  { title: "Carrega rápido", body: "Imagens comprimidas, JavaScript mínimo e hospedagem em CDN." },
  {
    title: "Aparece no Google",
    body: "HTML semântico, meta tags, Open Graph e sitemap configurados desde o começo do projeto.",
  },
  {
    title: "É seguro",
    body: "HTTPS por padrão, formulários validados e nenhuma dependência desnecessária exposta ao navegador.",
  },
  { title: "Funciona no celular", body: "Desenhado para celular, tablet e desktop, testado em tela real." },
];

export default function About() {
  return (
    <section className={`container ${styles.section}`}>
      <Reveal>
        <p className={styles.kicker}>A Mirai cria sites institucionais e landing pages em São Paulo.</p>
      </Reveal>
      <Reveal delay={80}>
        <p className={styles.lead}>
          Cada projeto começa entendendo o que o negócio faz, para quem, e o que precisa acontecer
          quando alguém chega no site. Design, desenvolvimento e performance ficam sob o mesmo teto —
          e nada avança para a próxima etapa sem a sua aprovação.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <h2 className={styles.factsLabel}>O que vem junto, sem cobrar à parte</h2>
      </Reveal>
      <div className={styles.facts}>
        {INCLUDED.map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className={styles.fact}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
