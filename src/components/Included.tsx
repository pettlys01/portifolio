import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Included.module.css";

const items = [
  {
    title: "Carrega rápido",
    body: "Imagens comprimidas, JavaScript mínimo e hospedagem em CDN. Site lento perde visita antes de mostrar qualquer coisa — e no celular, com rede ruim, perde mais ainda.",
  },
  {
    title: "Aparece no Google",
    body: "HTML semântico, meta tags, Open Graph e sitemap configurados desde o começo do projeto. Não é um plugin instalado no fim para tapar buraco.",
  },
  {
    title: "É seguro",
    body: "HTTPS por padrão, formulários validados e nenhuma dependência desnecessária exposta ao navegador. Menos peça, menos superfície para dar problema.",
  },
  {
    title: "Funciona no celular",
    body: "Desenhado para celular, tablet e desktop, testado em tela real. Não é a versão de desktop encolhida até caber.",
  },
];

export default function Included() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          title="O que vem junto, sem cobrar à parte."
          lead="Não são extras de proposta comercial. É o mínimo para um site funcionar — então já vem no projeto."
        />

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
      </div>
    </section>
  );
}
