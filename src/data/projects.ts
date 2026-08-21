export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
  role: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "elevadores",
    title: "Atlas Elevadores",
    category: "Institutional / Digital Experience",
    description:
      "Presença digital para uma empresa de elevadores que foge do padrão de engenharia genérico — precisão, tecnologia e sofisticação em primeiro plano.",
    image: "/projects/elevadores.jpg",
    url: "https://pettlys01-elevadores.vercel.app",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "Design & Development",
  },
  {
    number: "02",
    slug: "odontologia",
    title: "Lumina Odontologia",
    category: "Healthcare / Landing Page",
    description:
      "Landing page premium para uma clínica odontológica, construída para transmitir confiança e cuidado através de composição e ritmo visual.",
    image: "/projects/odontologia.jpg",
    url: "https://lumina-tawny-six.vercel.app",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "Design & Development",
  },
];
