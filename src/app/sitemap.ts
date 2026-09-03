import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

// Mesma URL de metadataBase em layout.tsx — repetida aqui de propósito
// (só duas ocorrências, não vale criar uma camada de config só pra isso).
const BASE_URL = "https://portifolio-pi-nine-80.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${BASE_URL}/projetos/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
