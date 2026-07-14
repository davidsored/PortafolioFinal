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
  /** Texto visible sobre el estado de la demo; solo se muestra si no hay demoUrl. */
  estadoDemo?: string;
  principal: boolean;
  imagenPortada?: string;
}

export interface StackCategoria {
  id: "backend" | "en-expansion" | "frontend" | "bases-de-datos" | "herramientas";
  titulo: string;
  tecnologias: string[];
  narrativa: string;
}

export interface PerfilInfo {
  nombre: string;
  titulo: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string;
}
