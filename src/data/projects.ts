export type Project = {
  plate: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  url: string;
  image: string;
  technologies: string[];
};

export const projects: Project[] = [
  {
    plate: "PRANCHA 01",
    slug: "elevadores",
    title: "Atlas Elevadores",
    category: "Institucional / Experiência Digital",
    description:
      "Presença digital para uma empresa de elevadores que foge do padrão genérico de engenharia — precisão, tecnologia e sofisticação em primeiro plano.",
    url: "https://pettlys01-elevadores.vercel.app",
    image: "/projects/elevadores.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    plate: "PRANCHA 02",
    slug: "odontologia",
    title: "Lumina Odontologia",
    category: "Saúde / Landing Page",
    description:
      "Landing page premium para uma clínica odontológica, construída para transmitir confiança através de composição e ritmo visual.",
    url: "https://lumina-tawny-six.vercel.app",
    image: "/projects/odontologia.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];
