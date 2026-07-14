import type { Proyecto } from "../types";

export const coworkingManager: Proyecto = {
  slug: "coworking-manager",
  titulo: "Coworking Manager",
  descripcionCorta:
    "Sistema de gestión integral para espacios de coworking: reservas de salas y puestos para usuarios, control total de recursos, tarifas y usuarios para administradores.",
  descripcionCompleta:
    "Aplicación web MVC construida como proyecto final de ciclo (Desarrollo de Aplicaciones Web), pensada para uso real: un cliente puede reservar una sala o puesto viendo disponibilidad en tiempo real, con cálculo automático de tarifa según duración y tipo de recurso; un administrador gestiona el catálogo de recursos, usuarios y tarifas desde un panel con operaciones CRUD completas.",
  problema:
    "Los espacios de coworking pequeños/medianos gestionan reservas y disponibilidad con hojas de cálculo o WhatsApp, lo que genera solapes, errores de tarifa y cero trazabilidad.",
  solucion:
    "Coworking Manager centraliza reservas, disponibilidad y facturación en un único sistema con roles diferenciados entre clientes y administradores.",
  tecnologias: [
    "ASP.NET Core 8 (MVC)",
    "Entity Framework Core",
    "MySQL",
    "Bootstrap 5",
    "jQuery",
    "BCrypt",
  ],
  arquitectura:
    "MVC monolítico: los controladores concentran el flujo de cada dominio (reservas, recursos, tarifas, usuarios) y acceden a los datos con EF Core sobre MySQL; el envío de correo está aislado tras una interfaz (IEmailService) registrada por inyección de dependencias. Autenticación basada en cookies con control de acceso por roles (RBAC): las vistas y acciones de administración están protegidas a nivel de controlador, no solo ocultas en la interfaz.",
  funcionalidades: [
    "Reservas con validación automática de disponibilidad (evita solapes)",
    "Cálculo dinámico de tarifas según recurso y duración",
    "Panel administrativo con CRUD completo de recursos, tarifas y usuarios",
    "Área de cliente con historial de reservas y gestión de perfil",
    "Envío real de correos de confirmación de reserva vía SMTP (Gmail), tras la interfaz IEmailService",
  ],
  decisionesTecnicas: [
    "Contraseñas con BCrypt en vez de hashing simple: decisión explícita de seguridad, no un checkbox de curso",
    "Soporte de EF Core en dos modos (Code First / Database First) para poder partir de un esquema MySQL ya existente en entornos reales",
    "RBAC aplicado en el controlador (no solo ocultando botones en la vista), para que una URL directa no salte el control de permisos",
  ],
  aprendizajes:
    "Diseñar un modelo de disponibilidad/solapes es más delicado de lo que parece a priori (bordes de intervalos, reservas que se solapan parcialmente); fue el primer sitio donde entendí por qué la validación de negocio no puede vivir solo en el frontend.",
  repoUrl: "https://github.com/davidsored/ProyectoWebCoworking",
  estadoDemo: "Demo en preparación",
  principal: true,
  imagenPortada: "/projects/coworking-manager/cover.png",
};
