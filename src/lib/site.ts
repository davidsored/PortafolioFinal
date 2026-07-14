// Fallback a producción (no error) porque sitemap.ts/robots.ts se generan también
// en previews/build local donde NEXT_PUBLIC_SITE_URL puede no estar configurada.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dsor.es";
