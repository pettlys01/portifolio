import Reveal from "./Reveal";
import StackCard from "./StackCard";
import { type TechSlug } from "./TechIcon";
import styles from "./Stack.module.css";

/* O `tint` de cada card é a cor oficial da marca (Simple Icons),
   não uma paleta decorativa — a cor vem da tecnologia. */
const items: {
  slug: TechSlug;
  name: string;
  role: string;
  tint: string;
  group: string;
}[] = [
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
    tint: "#663399",
    group: "Base",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    role: "Comportamento e interações, aplicado onde agrega.",
    tint: "#B59A00",
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
    tint: "#1D7A8C",
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
    tint: "#F03C2E",
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
    tint: "#E37400",
    group: "Entrega",
  },
];

export default function Stack() {
  return (
    <section id="stack" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <span className="sectionLabel">Stack</span>
          <span className={styles.headingRule} />
        </div>
        <h2 className={styles.headingTitle}>Ferramenta serve ao projeto.</h2>
        <p className={styles.headingBody}>
          Nem todo site precisa de framework. Um institucional de cinco
          páginas roda melhor em HTML, CSS e JavaScript diretos do que numa
          stack que só adiciona peso. A escolha vem do problema.
        </p>
      </Reveal>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 50}>
            <StackCard {...item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
