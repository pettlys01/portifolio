import Reveal from "./Reveal";
import styles from "./Philosophy.module.css";

const steps = [
  {
    num: "01",
    title: "Entender",
    body: "O que o negócio faz, para quem, e o que precisa acontecer quando alguém chega no site.",
  },
  {
    num: "02",
    title: "Estruturar",
    body: "Arquitetura da informação e hierarquia — o que vem primeiro, o que pode esperar.",
  },
  {
    num: "03",
    title: "Desenhar",
    body: "Direção visual, tipografia e ritmo. É aqui que o site ganha cara própria.",
  },
  {
    num: "04",
    title: "Construir",
    body: "Código limpo, performance medida e responsivo testado em tela real, não só no editor.",
  },
];

export default function Philosophy() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.heading}>
            <span className="sectionLabel">Processo</span>
            <span className={styles.headingRule} />
          </div>
          <p className={styles.statement}>
            Não começo pelo código. Começo pelo <em>problema</em> — hierarquia,
            ritmo e detalhe antes de qualquer linha escrita.
          </p>
        </Reveal>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 70}>
              <div className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
