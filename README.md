# LeafCode — Portfolio de Lucas Fernandez

Landing page de portfolio construida con **Astro + Tailwind CSS**. Tema oscuro,
estética técnica/minimalista inspirada en el mockup "PRECISION ARCHIVE".

## 🚀 Comandos

Todos se ejecutan desde la raíz del proyecto en una terminal:

| Comando           | Acción                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Instala las dependencias                      |
| `npm run dev`     | Servidor local en `http://localhost:4321`     |
| `npm run build`   | Genera el sitio de producción en `./dist/`    |
| `npm run preview` | Previsualiza el build antes de publicar       |

## ✏️ Cómo editar tu contenido

Casi todo el texto vive en un solo archivo:

**`src/data/site.ts`** — edita aquí:

- `tagline` — la frase principal del hero.
- `email`, `social.github`, `social.linkedin` — tus datos de contacto.
- `technologies` — lista de tecnologías que se muestran.
- `projects` — **tus proyectos**. La lista está vacía y aparece un mensaje
  "Proyectos en camino". Para añadir uno, descomenta el ejemplo y rellénalo:

  ```ts
  {
    title: "Plataforma SaaS",
    description: "Aplicación web robusta para gestión de inventarios…",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://tu-proyecto.com", // opcional
  }
  ```

## 📬 Formulario de contacto

El formulario usa [FormSubmit](https://formsubmit.co) (sin backend). **La
primera vez** que alguien envíe el formulario, recibirás un email de FormSubmit
para confirmar tu dirección — confírmalo una sola vez y a partir de ahí los
mensajes llegarán a tu correo.

## 🌐 Publicar online (gratis)

El sitio es estático. Opciones recomendadas:

- **Netlify / Vercel / Cloudflare Pages**: conecta el repositorio de GitHub y
  publica automáticamente. Comando de build: `npm run build`, carpeta de
  salida: `dist`.
- **GitHub Pages**: sube `dist/` o usa la action oficial de Astro.

## 🗂️ Estructura

```text
src/
├── data/site.ts          ← tus datos (edita esto)
├── layouts/Layout.astro  ← <head>, fuentes, SEO
├── components/           ← Header, Hero, Projects, TechStack, Contact, Footer
├── pages/index.astro     ← ensambla la página
└── styles/global.css     ← paleta de colores y tema
```
