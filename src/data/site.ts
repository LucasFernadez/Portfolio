// Datos centralizados del portfolio. Edita aquí tu información real.

export const site = {
  brand: "LeafCode",
  name: "Lucas Fernandez",
  role: "Desarrollador Web Full-Stack",
  // URL pública del sitio (sin barra final). Usada para canonical y Open Graph.
  url: "https://leafcode.org",
  // El hero
  headline: ["Desarrollador", "Web", "y", "App", "Full-Stack"],
  // Palabras del headline que se resaltan (color de acento)
  highlight: ["App", "Full-Stack"],
  // Propuesta de valor / diferencial (eyebrow sobre el título)
  valueProp: "Convierto ideas en productos digitales que escalan",
  tagline:
    "Construyo aplicaciones a medida, escalables y de alto rendimiento. Desarrollo personalizado, mantenimiento web y posicionamiento SEO con tecnologías modernas y código limpio.",
  email: "Lucasfadev@gmail.com",
  // Palabras clave para SEO (meta keywords y referencia de contenido)
  keywords: [
    "desarrollador web full-stack",
    "desarrollo web a medida",
    "posicionamiento SEO",
    "mantenimiento web",
    "aplicaciones web escalables",
    "Lucas Fernandez",
  ],
  social: {
    github: "https://github.com/LucasFernadez",
    linkedin: "https://www.linkedin.com/in/lucas-fernandez-adalid-029a56362/",
  },
};

// Servicios que ofreces. Se muestran como tarjetas y alimentan el SEO.
export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Desarrollo web a medida",
    description:
      "Sitios y plataformas full-stack rápidos, escalables y mantenibles, construidos con tecnologías modernas y código limpio.",
  },
  {
    title: "Aplicaciones personalizadas",
    description:
      "Apps a medida adaptadas a tu negocio: desde herramientas internas hasta productos completos, diseñadas en torno a tus necesidades.",
  },
  {
    title: "Posicionamiento SEO",
    description:
      "Optimización técnica y de contenido para que tu web posicione en Google: rendimiento, datos estructurados, sitemap y buenas prácticas.",
  },
  {
    title: "Mantenimiento web",
    description:
      "Soporte continuo, mejoras de rendimiento, actualizaciones y nuevas funcionalidades para mantener tu producto al día.",
  },
];

// Proyectos: rellénalos más adelante. Deja la lista vacía y se muestra un placeholder.
export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  // Ruta a la captura del proyecto (en /public). Si falta, se muestra un placeholder.
  image?: string;
  // Texto alternativo de la imagen (accesibilidad).
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    title: "Ribera9Trainer",
    description:
      "Web profesional para un entrenador online de fuerza especializado en powerlifting: presentación de servicios, metodología, atletas, blog y captación de clientes. Sitio rápido y optimizado para SEO.",
    tags: ["Astro", "Tailwind", "TypeScript", "SEO"],
    link: "https://www.ribera9trainer.com",
    image: "/proyectos/ribera9trainer.webp",
    imageAlt: "Página de inicio de Ribera9Trainer, web de entrenamiento de powerlifting",
  },
  {
    title: "Mantenimiento web WordPress",
    description:
      "Gestión y mantenimiento continuo de un sitio WordPress: actualizaciones de núcleo, plugins y temas, copias de seguridad, mejoras de rendimiento y seguridad, resolución de incidencias y nuevas funcionalidades a demanda.",
    tags: ["WordPress", "PHP", "Mantenimiento", "SEO"],
    link: "https://theapartment.es",
    image: "/proyectos/theapartment.webp",
    imageAlt: "Web de The Apartment, sitio WordPress en mantenimiento",
  },
  {
    title: "Entrenador Voleibol",
    description:
      "Aplicación web (PWA instalable y offline) para entrenadores de voleibol: marcador en tiempo real, gestión de sets, estadísticas individuales por jugadora y resumen completo del partido. Datos persistentes en el dispositivo.",
    tags: ["PWA", "JavaScript", "Service Worker", "LocalStorage"],
    image: "/proyectos/volei.webp",
    imageAlt: "Pantalla de la app Entrenador Voleibol para registrar jugadoras y estadísticas",
  },
  {
    title: "Arise",
    description:
      "Aplicación web progresiva (PWA) de productividad gamificada: convierte tus tareas diarias en una experiencia de juego con XP, niveles y recompensas. Instalable, funciona offline y guarda tus datos de forma privada.",
    tags: ["PWA", "JavaScript", "Firebase", "Service Worker"],
    image: "/proyectos/arise.webp",
    imageAlt: "Pantalla de acceso de Arise, app de productividad gamificada",
  },
  {
    title: "Quedar",
    description:
      "Aplicación para coordinar quedadas entre amigos: cada persona marca sus días disponibles en un calendario compartido y la app encuentra las fechas en las que coincide todo el grupo.",
    tags: ["Node.js", "Express", "MongoDB", "JavaScript"],
    image: "/proyectos/quedar.webp",
    imageAlt: "Calendario compartido de la app Quedar para coordinar fechas",
  },
  {
    title: "Control de Horas",
    description:
      "Aplicación web para contabilizar las horas de trabajo de los empleados de una tienda: alta de trabajadores, registro de jornadas con entrada y salida, y cálculo automático de horas trabajadas.",
    tags: ["PWA", "JavaScript", "Service Worker", "LocalStorage"],
    image: "/proyectos/control-horas.webp",
    imageAlt: "Panel de Control de Horas de Trabajo para gestionar empleados y jornadas",
  },
];

export const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "PostgreSQL",
  "AWS",
  "Tailwind",
  "MongoDB",
  "Astro",
  "SEO",
];
