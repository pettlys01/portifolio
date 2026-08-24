import Reveal from "./Reveal";
import StackCarousel, { type StackItem } from "./StackCarousel";
import IconCloud from "./IconCloud";
import styles from "./Stack.module.css";

/* O `tint` de cada card é a cor oficial da marca, não uma paleta
   decorativa — a cor vem da tecnologia. */
const items: StackItem[] = [
  {
    slug: "html5",
    name: "HTML",
    role: "Estrutura semântica — a base do SEO e da acessibilidade.",
    tint: "#E34F26",
    group: "Base",
  },
  {
    slug: "css",
    name: "CSS",
    role: "Layout, grid e responsividade, sem framework pesado por padrão.",
    tint: "#7C42B8",
    group: "Base",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    role: "Comportamento e interações, aplicado onde agrega.",
    tint: "#C9A227",
    group: "Base",
  },
  {
    slug: "typescript",
    name: "TypeScript",
    role: "Tipagem estática em projetos que vão crescer.",
    tint: "#3178C6",
    group: "Quando o projeto pede",
  },
  {
    slug: "react",
    name: "React",
    role: "Interfaces com estado e componentes reaproveitáveis.",
    tint: "#1F8FA6",
    group: "Quando o projeto pede",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    role: "Renderização estática, rotas e otimização de imagem.",
    tint: "#4A4A55",
    group: "Quando o projeto pede",
  },
  {
    slug: "git",
    name: "Git",
    role: "Versionamento — todo projeto com histórico rastreável.",
    tint: "#D93B2B",
    group: "Entrega",
  },
  {
    slug: "vercel",
    name: "Vercel",
    role: "Deploy contínuo, HTTPS e CDN global inclusos.",
    tint: "#3D3D48",
    group: "Entrega",
  },
  {
    slug: "analytics",
    name: "Analytics",
    role: "Medição de tráfego para decidir com dado, não achismo.",
    tint: "#D96A00",
    group: "Entrega",
  },
];

export default function Stack() {
  return (
    <section id="stack" className={styles.section}>
      {/* Duas colunas no desktop, empilhado no celular: a esfera
          precisa de área quase quadrada para não virar uma faixa
          achatada, e o carrossel precisa de largura para respirar. */}
      <div className={styles.split}>
        <Reveal className={styles.cloudCol}>
          <div className={styles.cloud}>
            <IconCloud />
          </div>
        </Reveal>

        <Reveal delay={90} className={styles.textCol}>
          <h2 className={styles.title}>Ferramenta serve ao projeto.</h2>
          <p className={styles.body}>
            Nem todo site precisa de framework. Um institucional de cinco
            páginas roda melhor em HTML, CSS e JavaScript diretos do que
            numa stack que só adiciona peso. A escolha vem do problema.
          </p>
          <StackCarousel items={items} />
        </Reveal>
      </div>
    </section>
  );
}
