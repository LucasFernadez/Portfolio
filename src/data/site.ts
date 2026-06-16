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
};

export const projects: Project[] = [
  // Ejemplo (borra o reemplaza con los tuyos reales):
  // {
  //   title: "Plataforma SaaS",
  //   description: "Aplicación web robusta para gestión de inventarios y análisis predictivo en tiempo real.",
  //   tags: ["React", "TypeScript", "Tailwind"],
  //   link: "https://...",
  // },
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
