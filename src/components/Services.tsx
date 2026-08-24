import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Services.module.css";

const services = [
  {
    num: "01",
    title: "Site institucional",
    body: "Para empresas que já têm reputação offline e precisam que o site esteja à altura dela. Apresenta serviços, credenciais e diferenciais sem virar catálogo confuso.",
    forWhom: "Indústria, engenharia, serviços técnicos, B2B",
    items: [
      "Arquitetura da informação",
      "Páginas de serviço",
      "Canal de contato direto",
      "SEO técnico de base",
    ],
  },
  {
    num: "02",
    title: "Landing page",
    body: "Uma página, um objetivo: transformar quem chegou em contato, orçamento ou agendamento. Cada bloco existe para levar ao próximo.",
    forWhom: "Clínicas, serviços locais, campanhas pagas",
    items: [
      "Hierarquia orientada à ação",
      "Prova social real",
      "Formulário ou WhatsApp",
      "Medição de conversão",
    ],
  },
  {
    num: "03",
    title: "Redesign",
    body: "Quando o site existe mas trabalha contra o negócio — lento, datado, quebrado no celular ou impossível de atualizar sem chamar alguém.",
    forWhom: "Quem já tem site e perdeu o controle dele",
    items: [
      "Diagnóstico do site atual",
      "Migração de conteúdo",
      "Ganho de performance",
      "Responsivo de verdade",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          light
          title="Três formas de resolver o mesmo problema."
          lead="O que muda entre elas é o tamanho do escopo e o que o negócio precisa que o site faça."
        />

        <div className={styles.rows}>
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 70}>
              <article className={styles.row}>
                <div className={styles.left}>
                  <span className={styles.num}>{service.num}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.forWhom}>{service.forWhom}</p>
                </div>

                <div className={styles.right}>
                  <p className={styles.body}>{service.body}</p>
                  <ul className={styles.chips}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
