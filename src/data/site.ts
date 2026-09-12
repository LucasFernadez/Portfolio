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

// Servicios que ofreces. Se muestran en la "rama" de la sección Servicios
// y alimentan el SEO.
// 'icon' referencia una silueta SVG definida en Services.astro (serviceIcons).
export type Service = {
  title: string;
  description: string;
  icon: "code" | "app" | "seo" | "maintenance";
  // Qué incluye el servicio: 3 puntos concretos (se muestran en la tarjeta).
  includes: string[];
};

export const services: Service[] = [
  {
    icon: "code",
    title: "Desarrollo web a medida",
    description:
      "Sitios y plataformas full-stack rápidos, escalables y mantenibles, construidos con tecnologías modernas y código limpio.",
    includes: [
      "Diseño y desarrollo propios, sin plantillas",
      "Optimizada para velocidad y Core Web Vitals",
      "Responsive y accesible en cualquier dispositivo",
    ],
  },
  {
    icon: "app",
    title: "Aplicaciones personalizadas",
    description:
      "Apps a medida adaptadas a tu negocio: desde herramientas internas hasta productos completos, diseñadas en torno a tus necesidades.",
    includes: [
      "Herramientas internas y paneles de gestión",
      "Apps instalables (PWA) que funcionan sin conexión",
      "Integración con tus sistemas y APIs",
    ],
  },
  {
    icon: "seo",
    title: "Posicionamiento SEO",
    description:
      "Optimización técnica y de contenido para que tu web posicione en Google: rendimiento, datos estructurados, sitemap y buenas prácticas.",
    includes: [
      "Auditoría técnica y corrección de errores",
      "Datos estructurados, sitemap y metadatos",
      "Contenido y rendimiento orientados a posicionar",
    ],
  },
  {
    icon: "maintenance",
    title: "Mantenimiento web",
    description:
      "Soporte continuo, mejoras de rendimiento, actualizaciones y nuevas funcionalidades para mantener tu producto al día.",
    includes: [
      "Actualizaciones y copias de seguridad",
      "Monitorización de seguridad y rendimiento",
      "Cambios y nuevas funcionalidades a demanda",
    ],
  },
];

// Proyectos: se muestran como casos de estudio en filas alternas.
// Para añadir uno nuevo basta con añadir un objeto a la lista (el orden
// de la lista es el orden en la web). Lista vacía = placeholder.
export type Project = {
  title: string;
  // Tipo de trabajo (se muestra como etiqueta sobre el título).
  category: string;
  description: string;
  // Qué se hizo en el proyecto: 2–4 puntos breves.
  highlights?: string[];
  tags: string[];
  link?: string;
  // Captura del proyecto (en /public), idealmente 16:10. Si falta, placeholder.
  image?: string;
  // Texto alternativo de la imagen (accesibilidad).
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    title: "Ribera9Trainer",
    category: "Web corporativa",
    description:
      "Web profesional para un entrenador online de fuerza especializado en powerlifting: presentación de servicios, metodología, atletas, blog y captación de clientes. Sitio rápido y optimizado para SEO.",
    highlights: [
      "Diseño y desarrollo completo del sitio",
      "Blog y formulario de captación de clientes",
      "Rendimiento y SEO técnico optimizados",
    ],
    tags: ["Astro", "Tailwind", "TypeScript", "SEO"],
    link: "https://www.ribera9trainer.com",
    image: "/proyectos/ribera9trainer.webp",
    imageAlt: "Página de inicio de Ribera9Trainer, web de entrenamiento de powerlifting",
  },
  {
    title: "Canji Studio",
    category: "Web corporativa",
    description:
      "Web para un estudio de desarrollo de producto de moda con sede en Barcelona: presentación del estudio, servicios, galería de colecciones y captación de nuevos proyectos. Diseño editorial y minimalista que deja todo el protagonismo a las prendas.",
    highlights: [
      "Diseño editorial minimalista y responsive",
      "Galería de trabajos con imágenes optimizadas",
      "Secciones de servicios y contacto orientadas a captar clientes",
    ],
    tags: ["Next.js", "React", "Tailwind"],
    link: "https://canji.studio",
    image: "/proyectos/canji.webp",
    imageAlt: "Sección de trabajos de Canji Studio con prendas de sus colecciones",
  },
  {
    title: "The Apartment",
    category: "Mantenimiento WordPress",
    description:
      "Gestión y mantenimiento continuo de un sitio WordPress: actualizaciones de núcleo, plugins y temas, copias de seguridad, mejoras de rendimiento y seguridad, resolución de incidencias y nuevas funcionalidades a demanda.",
    highlights: [
      "Actualizaciones y copias de seguridad",
      "Mejoras de rendimiento y seguridad",
      "Nuevas funcionalidades a demanda",
    ],
    tags: ["WordPress", "PHP", "Mantenimiento", "SEO"],
    link: "https://theapartment.es",
    image: "/proyectos/theapartment.webp",
    imageAlt: "Web de The Apartment, sitio WordPress en mantenimiento",
  },
  {
    title: "Entrenador Voleibol",
    category: "Aplicación web (PWA)",
    description:
      "Aplicación web instalable para entrenadores de voleibol: marcador en tiempo real, gestión de sets, estadísticas individuales por jugadora y resumen completo del partido. Datos persistentes en el dispositivo.",
    highlights: [
      "Marcador y gestión de sets en tiempo real",
      "Estadísticas individuales por jugadora",
      "Instalable y funciona sin conexión",
    ],
    tags: ["PWA", "JavaScript", "Service Worker", "LocalStorage"],
    image: "/proyectos/volei.webp",
    imageAlt: "Pantalla de la app Entrenador Voleibol para registrar jugadoras y estadísticas",
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
