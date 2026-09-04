import Link from "next/link";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Services.module.css";

/**
 * As três ofertas continuam as mesmas — o que mudou é a porta de entrada.
 * Antes, cada linha abria pelo nome do serviço ("Site institucional",
 * "Landing page", "Redesign"). Reformulado pra abrir pela situação de quem
 * chega: a pessoa se reconhece primeiro, o nome do serviço aparece depois,
 * como o caminho que resolve aquilo — mesma lógica de "Jobs to be Done"
 * validada comparando com a estrutura da Human Academy (protótipo aprovado
 * em 2026-09-04, ver memory/lcs-portfolio-project.md).
 */
const services = [
  {
    num: "01",
    situation: "Seu site existe, mas trabalha contra você.",
    path: "Redesign",
    forWhom: "Quem já tem site e perdeu o controle dele",
    body: "Lento, datado, quebrado no celular ou impossível de atualizar sem chamar alguém — quando o site existe, mas trabalha contra o negócio em vez de a favor dele.",
    items: [
      "Diagnóstico do site atual",
      "Migração de conteúdo",
      "Ganho de performance",
      "Responsivo de verdade",
    ],
  },
  {
    num: "02",
    situation: "Sua empresa tem reputação, mas o site não está à altura dela.",
    path: "Site institucional",
    forWhom: "Indústria, engenharia, serviços técnicos, B2B",
    body: "Para empresas que já têm reputação offline e precisam que o site esteja à altura dela — apresentando serviços, credenciais e diferenciais sem virar catálogo confuso.",
    items: [
      "Arquitetura da informação",
      "Páginas de serviço",
      "Canal de contato direto",
      "SEO técnico de base",
    ],
  },
  {
    num: "03",
    situation:
      "Você tem uma campanha rodando, e precisa de um lugar pra converter.",
    path: "Landing page",
    forWhom: "Clínicas, serviços locais, campanhas pagas",
    body: "Uma página, um objetivo: transformar quem chegou em contato, orçamento ou agendamento. Cada bloco existe pra levar ao próximo.",
    items: [
      "Hierarquia orientada à ação",
      "Prova social real",
      "Formulário ou WhatsApp",
      "Medição de conversão",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          light
          title="Qual é a sua situação hoje?"
          lead="As três soluções continuam as mesmas. O que muda é o que você lê primeiro: a situação em que seu site está, não o nome do serviço que resolve ela."
        />

        <div className={styles.rows}>
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 70}>
              <article className={styles.row}>
                <div className={styles.left}>
                  <span className={styles.num}>{service.num}</span>
                  <h3 className={styles.title}>{service.situation}</h3>
                  <p className={styles.forWhom}>{service.forWhom}</p>
                  <span className={styles.pathTag}>
                    <span className={styles.pathDot}>→</span>
                    Caminho: {service.path}
                  </span>
                </div>

                <div className={styles.right}>
                  <p className={styles.body}>{service.body}</p>
                  <ul className={styles.chips}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="#contact" className={styles.rowCta}>
                    Resolver com {service.path}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
