import type { MetadataRoute } from "next";

import { proyectos } from "@/content/proyectos";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutasEstaticas: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sobre-mi`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/stack`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const rutasProyectos: MetadataRoute.Sitemap = proyectos.map((proyecto) => ({
    url: `${siteUrl}/proyectos/${proyecto.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: proyecto.principal ? 0.8 : 0.6,
  }));

  return [...rutasEstaticas, ...rutasProyectos];
}
