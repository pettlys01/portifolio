import Reveal from "./Reveal";
import styles from "./Services.module.css";

const services = [
  {
    num: "S01",
    title: "Site institucional",
    body: "Para empresas que precisam apresentar serviços, credenciais e diferenciais sem virar catálogo confuso.",
    items: [
      "Arquitetura da informação",
      "Páginas de serviço",
      "Canal de contato direto",
      "SEO técnico de base",
    ],
  },
  {
    num: "S02",
    title: "Landing page",
    body: "Página única com um objetivo só: transformar quem chegou em contato, orçamento ou agendamento.",
    items: [
      "Hierarquia orientada à ação",
      "Prova social real",
      "Formulário ou WhatsApp",
      "Medição de conversão",
    ],
  },
  {
    num: "S03",
    title: "Redesign",
    body: "Quando o site existe mas trabalha contra o negócio — lento, datado ou impossível de atualizar.",
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
      <Reveal>
        <div className={styles.heading}>
          <span className="sectionLabel">Serviços</span>
          <span className={styles.headingRule} />
        </div>
        <h2 className={styles.headingTitle}>
          O que eu construo, e para quem.
        </h2>
      </Reveal>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <Reveal key={service.num} delay={i * 80}>
            <article className={styles.card}>
              <span className={styles.num}>{service.num}</span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.body}>{service.body}</p>
              <ul className={styles.list}>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
