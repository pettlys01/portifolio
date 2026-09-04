import ProcessCard from "./ProcessCard";
import ProcessMediaCard from "./ProcessMediaCard";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import styles from "./Philosophy.module.css";

/**
 * Desenhar e Construir são as duas etapas que já produzem algo real
 * pra mostrar — ganham card grande com imagem (por enquanto uma
 * gerada por IA, pensada pra virar vídeo do processo real depois,
 * sem mudar o layout: só trocar <Image> por <video>).
 *
 * Entender, Estruturar e a aprovação em cada etapa são conceituais —
 * ficam como texto compacto, sem imagem forçada (banco de imagem
 * genérico pra "conversa inicial" seria pior que não ter nada).
 *
 * Decisão tomada com o usuário em rodadas de protótipo (Artifact),
 * comparando com a estrutura da Human Academy — ver
 * memory/lcs-portfolio-project.md.
 */
const mediaSteps = [
  {
    slug: "desenhar",
    eyebrow: "03 · Desenho",
    title: "Desenhar",
    body: "Direção visual, tipografia e ritmo. É aqui que o site ganha cara própria.",
    meta: "Paleta e tipografia · Layout responsivo · Aprovação antes do código",
    image: "/process/desenhar.webp",
  },
  {
    slug: "construir",
    eyebrow: "04 · Desenvolvimento",
    title: "Construir",
    body: "Código limpo, performance medida e responsivo testado em tela real, não só no editor.",
    meta: "Desenvolvimento · Testes em dispositivo · Publicação e ajustes",
    image: "/process/construir.webp",
  },
];

const textSteps = [
  {
    num: "01",
    variant: "pulse" as const,
    title: "Entender",
    body: "O que o negócio faz, para quem, e o que precisa acontecer quando alguém chega no site.",
    items: ["Conversa inicial", "Concorrentes", "Objetivo do site"],
  },
  {
    num: "02",
    variant: "settle" as const,
    title: "Estruturar",
    body: "Arquitetura da informação e hierarquia — o que vem primeiro, o que pode esperar.",
    items: ["Mapa de páginas", "Ordem das seções", "Pontos de conversão"],
  },
  {
    num: "✓",
    variant: "check" as const,
    title: "Você aprova cada etapa",
    body: "Nada avança pra próxima etapa sem sua validação — sem retrabalho por ter andado rápido demais no que ainda não tinha fechado.",
    items: ["Revisão antes de seguir", "Sem surpresa no fim", "Ritmo definido com você"],
  },
];

export default function Philosophy() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          title="Desenhar e Construir aparecem primeiro. Entender e Estruturar explicam como isso acontece."
          lead="Hierarquia, ritmo e detalhe antes de qualquer linha escrita. Você aprova cada etapa antes da seguinte."
        />

        <div className={styles.mediaRow}>
          {mediaSteps.map((step) => (
            <Reveal key={step.slug}>
              <ProcessMediaCard {...step} />
            </Reveal>
          ))}
        </div>

        <div className={styles.textRow}>
          {textSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <ProcessCard {...step} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
