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
    "Construyo aplicaciones a medida, escalables y de alto rendimiento. Desarrollo personalizado y mantenimiento web con tecnologías modernas y código limpio.",
  email: "Lucasfadev@gmail.com",
  social: {
    github: "https://github.com/LucasFernadez",
    linkedin: "https://www.linkedin.com/in/lucas-fernandez-adalid-029a56362/",
  },
};

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
];
