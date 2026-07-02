export interface Proyecto {
  slug: string;
  titulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  problema: string;
  solucion: string;
  tecnologias: string[];
  arquitectura?: string;
  funcionalidades: string[];
  decisionesTecnicas: string[];
  aprendizajes?: string;
  repoUrl: string;
  demoUrl?: string;
  principal: boolean;
  imagenPortada?: string;
}

export interface StackItem {
  categoria: "backend" | "frontend" | "bases-de-datos" | "herramientas";
  nombre: string;
  descripcionUso: string;
  proyectosRelacionados: string[];
}

export interface PerfilInfo {
  nombre: string;
  titulo: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
}
