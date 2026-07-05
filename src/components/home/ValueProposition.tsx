import { Card } from "@/components/ui/Card";

const PROPUESTAS = [
  {
    titulo: "Aplicaciones completas, no ejercicios.",
    descripcion:
      "De la base de datos a la interfaz: reservas, torneos en directo, catálogos con datos reales. Cada proyecto resuelve un problema concreto, no un tutorial.",
  },
  {
    titulo: "Buenas prácticas desde el primer commit.",
    descripcion:
      "Tests automatizados (165 en el proyecto más exigente), CI/CD, control de acceso por roles, arquitectura por capas.",
  },
  {
    titulo: "Aprendizaje activo, no una lista de tecnologías.",
    descripcion:
      "Python, Docker e integración de IA no están en el CV porque suena bien: están en proyectos reales que se pueden ver y ejecutar.",
  },
];

export function ValueProposition() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-3">
        {PROPUESTAS.map((propuesta) => (
          <Card key={propuesta.titulo}>
            <h3 className="font-display text-fg text-lg font-semibold">{propuesta.titulo}</h3>
            <p className="text-fg-muted mt-2 text-sm">{propuesta.descripcion}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
