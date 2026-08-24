import ProcessCard from "./ProcessCard";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Philosophy.module.css";

const steps = [
  {
    num: "01",
    title: "Entender",
    body: "O que o negócio faz, para quem, e o que precisa acontecer quando alguém chega no site.",
    items: ["Conversa inicial", "Concorrentes", "Objetivo do site"],
  },
  {
    num: "02",
    title: "Estruturar",
    body: "Arquitetura da informação e hierarquia — o que vem primeiro, o que pode esperar.",
    items: ["Mapa de páginas", "Ordem das seções", "Pontos de conversão"],
  },
  {
    num: "03",
    title: "Desenhar",
    body: "Direção visual, tipografia e ritmo. É aqui que o site ganha cara própria.",
    items: ["Paleta e tipografia", "Layout responsivo", "Aprovação antes do código"],
  },
  {
    num: "04",
    title: "Construir",
    body: "Código limpo, performance medida e responsivo testado em tela real, não só no editor.",
    items: ["Desenvolvimento", "Testes em dispositivo", "Publicação e ajustes"],
  },
];

export default function Philosophy() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          title={
            <>
              Não começo pelo código. Começo pelo problema.
            </>
          }
          lead="Hierarquia, ritmo e detalhe antes de qualquer linha escrita. Quatro etapas, e você aprova cada uma antes da seguinte."
        />

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 70}>
              <ProcessCard {...step} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
