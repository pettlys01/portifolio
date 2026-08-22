import Reveal from "./Reveal";
import styles from "./Services.module.css";

const services = [
  {
    num: "01",
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
    num: "02",
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
    num: "03",
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
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.heading}>
            <span className={styles.label}>Serviços</span>
            <span className={styles.headingRule} />
          </div>
          <h2 className={styles.headingTitle}>
            O que eu construo, e para quem.
          </h2>
        </Reveal>

        <div className={styles.rows}>
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 70}>
              <article className={styles.row}>
                <span className={styles.num}>{service.num}</span>

                <div>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.body}>{service.body}</p>
                </div>

                <ul className={styles.list}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
