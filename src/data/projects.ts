export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  url: string;
  image: string;
  imageMobile: string;
  technologies: string[];
  challenge: string;
  approach: string;
  result: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "atlas-elevadores",
    title: "Atlas Elevadores",
    category: "Institucional · B2B",
    description:
      "Presença digital para uma empresa de elevadores que foge do padrão genérico de engenharia — precisão, tecnologia e sofisticação em primeiro plano.",
    url: "https://pettlys01-elevadores.vercel.app",
    image: "/projects/elevadores.webp",
    imageMobile: "/projects/elevadores-mobile.webp",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenge:
      "Elevadores é um mercado tradicionalmente representado por sites técnicos e genéricos. O desafio era criar uma presença digital que comunicasse precisão de engenharia sem parecer um catálogo industrial datado.",
    approach:
      "Fotografia arquitetônica em ângulos que remetem à escala dos prédios, tipografia direta e uma paleta sóbria — para posicionar a marca como parceira técnica, não fornecedora genérica.",
    result:
      "Um site institucional que apresenta soluções, diferenciais técnicos e um canal direto de contato, com carregamento rápido em qualquer dispositivo.",
  },
  {
    number: "02",
    slug: "lumina-odontologia",
    title: "Lumina Odontologia",
    category: "Saúde · Landing Page",
    description:
      "Landing page premium para uma clínica odontológica, construída para transmitir confiança através de composição e ritmo visual.",
    url: "https://lumina-lcs16.vercel.app",
    image: "/projects/odontologia.webp",
    imageMobile: "/projects/odontologia-mobile.webp",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenge:
      "Clínicas odontológicas competem por confiança antes de qualquer visita. O site precisava transmitir segurança e cuidado sem recorrer aos clichês do setor — sorrisos genéricos de banco de imagens, azul clínico.",
    approach:
      "Fotografia real do espaço da clínica, tipografia serifada para transmitir acolhimento e hierarquia clara guiando o visitante até o agendamento.",
    result:
      "Landing page focada em conversão, com prova social (avaliações reais do Google) e caminho direto para o agendamento de avaliação.",
  },
];
