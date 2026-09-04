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
    url: "https://hb-elevadores.vercel.app",
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
    url: "https://lumina-mirai-agencia.vercel.app",
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
  {
    number: "03",
    slug: "salgados-festas",
    title: "Salgados & Festas",
    category: "Alimentação · Catálogo & Encomenda",
    description:
      "Catálogo digital para salgaderia/confeitaria, com pedido e orçamento centralizados no WhatsApp — sem depender só de bio de Instagram ou lista de preço solta.",
    url: "https://confeitaria-template.mirai-agencia.workers.dev",
    image: "/projects/confeitaria.webp",
    imageMobile: "/projects/confeitaria-mobile.webp",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenge:
      "O mercado de salgado de festa costuma viver em cardápio solto — print, PDF, mensagem de texto — sem fotos confiáveis dos produtos reais e sem regra clara de pedido mínimo. O cliente decide sem saber se o que chegar bate com o que viu.",
    approach:
      "Cada foto do catálogo passa por conferência contra o produto real antes de entrar no ar, nunca banco de imagens. O WhatsApp é o canal primário de pedido, com o iFood como opção secundária discreta.",
    result:
      "Catálogo navegável por categoria com regra de pedido mínimo visível em cada item, e caminho direto para o WhatsApp em todo ponto de decisão.",
  },
  {
    number: "04",
    slug: "nando-guincho",
    title: "Nando Guincho",
    category: "Serviço Local · Landing Page",
    description:
      "Landing page de conversão para guincho autônomo, construída para decisão sob pressão — carro quebrado, poucos minutos para escolher.",
    url: "https://nando-guincho.mirai-agencia.workers.dev",
    image: "/projects/guincho.webp",
    imageMobile: "/projects/guincho-mobile.webp",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    challenge:
      "Guincho autônomo compete com uma categoria conhecida por ligação anônima e preço combinado na hora, sem saber se quem atende é o dono do guincho ou um intermediário. Numa decisão sob estresse, essa incerteza custa caro.",
    approach:
      "Ancoragem de preço logo no hero, selos de confiança específicos — guincho próprio, CNPJ regularizado, não genéricos — e tempo médio de chegada declarado, para reduzir a pergunta \"esse é confiável?\" antes que ela trave a ligação.",
    result:
      "Página de uma tela só, sem formulário, com ligação e WhatsApp como únicas ações — nenhuma etapa entre a decisão e o contato.",
  },
];

/** Quantos projetos aparecem por padrão na home antes do "Ver mais projetos".
 *  A ordem do array já reflete a curadoria (institucional/saúde primeiro,
 *  os dois mais recentes revelados sob demanda) — ver memory/pettlys-cloudflare-workers-projects.md. */
export const FEATURED_COUNT = 3;
