import { Badge } from "@/components/ui/Badge";

export function TechBadgeList({ tecnologias }: { tecnologias: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tecnologias.map((tecnologia) => (
        <li key={tecnologia}>
          <Badge>{tecnologia}</Badge>
        </li>
      ))}
    </ul>
  );
}
