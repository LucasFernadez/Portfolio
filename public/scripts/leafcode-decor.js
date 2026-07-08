/* =====================================================================
   leafcode-decor.js — Capa de decoración 3D para leafcode.org
   NO modifica CSS/HTML existente. Solo superpone:
     1) Hojas 3D cayendo por toda la página (canvas fijo al viewport)
     2) Tilt sutil en tarjetas (Servicios y Proyectos)
     3) Flotación/parallax de la imagen line-art del hero
   Solo desktop (≥1024px) + respeta prefers-reduced-motion.
   Si se elimina este script, la web se ve EXACTAMENTE igual que ahora.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     CONFIGURACIÓN
     Ajusta aquí la intensidad de cada efecto. Todos los selectores
     apuntan al DOM real del proyecto (Astro + Tailwind v4).
     --------------------------------------------------------------- */
  var CONFIG = {
    // 1) Hojas cayendo por TODA la página (canvas fijo al viewport)
    leaves: {
      enabled: true,
      count: 22, // nº de hojas (con toda la página cabe alguna más)
      // Verdes EXACTOS de la paleta (global.css @theme):
      //   #16a34a accent/Primary · #15803d accent-soft · #4b5d3f oliva
      colors: ["#16a34a", "#4b5d3f", "#8ba888"],
      opacity: 0.28, // opacidad de cada hoja
      size: 0.55, // escala base de la silueta
      speed: 0.45, // multiplicador de velocidad de caída
      // z-index del canvas fijo. -1 = detrás del contenido (secciones,
      // header, footer) y delante del fondo global (body::before/after,
      // también en -1, se pintan antes por orden del DOM). Así las hojas
      // NO tapan texto ni interfieren. Para traerlas delante: usar 0.
      zIndex: -1,
    },
    // 2) Tilt 3D en tarjetas existentes
    tilt: {
      enabled: true,
      // Tarjetas reales de Servicios y Proyectos.
      selector: "#servicios article, #proyectos article.marquee__item",
      maxDeg: 5, // inclinación máxima en grados
      scale: 1.015, // escala en hover
    },
    // 3) Flotación de la imagen line-art del hero
    heroImage: {
      enabled: true,
      // Retrato del hero (src="/profile-lineart.png").
      selector: 'img[src*="profile-lineart"]',
      amount: 10, // seguimiento del cursor en px (±)
      idleFloat: true, // balanceo idle continuo
    },

    // ============ FASE 2 ============
    // NOTA módulo 4 (reveals): la web ya tiene un sistema de reveals propio
    // ([data-reveal] en global.css + Layout.astro). En lugar de duplicarlo,
    // el "brote orgánico" (scale .96 + translateY) se añadió a ESE sistema
    // en global.css. Por eso aquí NO hay módulo de reveal en JS.

    // 5) Magnetismo en los iconos/chips de Tecnologías
    magnet: {
      enabled: true,
      // Sección real de tecnologías.
      sectionSelector: "#tecnologias",
      // Chips estáticos de la lista textual. NO la nube 3D (.tech-cloud__item),
      // que ya anima su propio transform y no debe pisarse.
      itemSelector: "li.tech-pill",
      radius: 120, // distancia (px) a la que empieza a atraer
      maxShift: 8, // desplazamiento máximo hacia el cursor (px)
      maxScale: 1.08, // escala máxima al estar el cursor encima
      lerp: 0.12, // suavizado del movimiento (0–1)
    },

    // 6) Germinación del formulario de contacto (al enviarse con éxito)
    bloom: {
      enabled: true,
      // El form envía por POST nativo a FormSubmit y vuelve con ?enviado=1.
      // El éxito real se detecta por ese parámetro en la URL (no hay fetch).
      formSelector: "#contacto form",
      buttonSelector: 'button[type="submit"]',
      successParam: "enviado", // parámetro de la URL que marca envío correcto
      leafColor: "#16a34a", // verde accent/Primary de la paleta
    },

    // ============ FASE 3 — barra de navegación ============
    nav: {
      // 7) Cristal reforzado al hacer scroll
      glass: {
        enabled: true,
        mobile: true, // el cristal sí actúa en móvil (no depende del ratón)
        // El nav vive dentro de un <header sticky> que YA tiene bg/blur base.
        // Aplicamos el refuerzo al <header>, no al <nav> interior.
        navSelector: "header",
        threshold: 40, // px de scroll para activar
        hysteresis: 10, // margen anti-parpadeo alrededor del umbral
        // Colores derivados de las variables del tema: así el cristal
        // se adapta solo al alternar entre modo claro y oscuro.
        bg: "color-mix(in srgb, var(--color-bg) 75%, transparent)",
        blur: "12px",
        border: "color-mix(in srgb, var(--color-accent) 22%, transparent)",
        compact: 0.75, // factor de padding vertical al compactar (sticky/fixed)
      },
      // 8) Enredadera scroll-spy bajo los enlaces
      vine: {
        enabled: true,
        // Contenedor de los enlaces centrales (el <ul>).
        linksContainer: "header nav ul.md\\:flex",
        linksSelector: 'header nav ul a[href^="#"]',
        // Secciones destino (todas existen en la página).
        sections: ["#proyectos", "#tecnologias", "#contacto"],
        color: "#16a34a", // verde de marca
        height: 2, // grosor del tallo (px)
        speed: 500, // duración de la animación del tallo (ms)
        clickLock: 800, // ms que se ignora el spy tras un click
      },
      // 9) Hojita del logo, viva
      logoLeaf: {
        enabled: true,
        // El icono del logo es un <img src="/favicon.svg"> (no SVG inline);
        // animamos la imagen completa con transform.
        selector: 'header nav a[href="#"] img',
        greetCooldown: 30000, // ms mínimo entre "saludos" al volver a la pestaña
      },
      // 10) Botón "Hablemos" magnético con brote
      ctaMagnet: {
        enabled: true,
        // El CTA es el <a href="#contacto"> del grupo de acciones del nav
        // (vive en un <div> junto al botón de tema; no el de la lista <ul>).
        selector: 'header nav > div > a[href="#contacto"]',
        radius: 80, // distancia (px) a la que empieza a atraer
        maxShift: 3, // desplazamiento máximo hacia el cursor (px)
        lerp: 0.15, // suavizado del movimiento
        leafColor: "#16a34a", // verde de la hojita del hover
      },
    },
  };

  /* ---------------------------------------------------------------
     GUARDAS: solo desktop y sin reduced-motion.
     En móvil/tablet o con reduced-motion el script no hace NADA
     (ni siquiera carga Three.js).
     --------------------------------------------------------------- */
  var isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Capturamos ?enviado=1 AHORA (evaluación síncrona del script), porque el
  // script de Contact.astro limpia ese parámetro de la URL con replaceState
  // al cargar. Si esperásemos a start(), podría haber desaparecido ya.
  var submittedOk =
    new URLSearchParams(window.location.search).get(
      CONFIG.bloom.successParam
    ) === "1";

  /* ---------- 7) CRISTAL AL HACER SCROLL ----------
     Debe funcionar en TODOS los tamaños (también móvil) y con reduced-motion
     (en ese caso, sin transición). Por eso se ejecuta ANTES de la guarda de
     desktop/movimiento. Refuerza el fondo translúcido y el blur del <header>
     al pasar el umbral de scroll; en reposo arriba queda idéntico al actual. */
  function initGlass() {
    var g = CONFIG.nav.glass;
    var nav = document.querySelector(g.navSelector);
    if (!nav) return;

    var pos = getComputedStyle(nav).position;
    var canCompact = pos === "fixed" || pos === "sticky";

    // Estilos inyectados, todos prefijados lc- para no colisionar con Tailwind.
    var css = document.createElement("style");
    css.id = "lc-nav-styles";
    // La transición solo si el usuario NO ha pedido reduce-motion.
    var trans = reduceMotion
      ? ""
      : g.navSelector +
        "{transition:background .35s,backdrop-filter .35s," +
        "-webkit-backdrop-filter .35s,border-color .35s,padding .35s;}";
    css.textContent =
      trans +
      ".lc-nav-scrolled{background:" +
      g.bg +
      "!important;-webkit-backdrop-filter:blur(" +
      g.blur +
      ");backdrop-filter:blur(" +
      g.blur +
      ");border-bottom-color:" +
      g.border +
      "!important;}" +
      // Fallback más opaco si el navegador no soporta backdrop-filter.
      "@supports not ((backdrop-filter:blur(1px)) or " +
      "(-webkit-backdrop-filter:blur(1px))){" +
      ".lc-nav-scrolled{background:var(--color-bg)!important;}}";
    document.head.appendChild(css);

    // Padding vertical original del <nav> interno (para compactar/restaurar).
    var navInner = nav.querySelector("nav") || nav;
    var basePadY = parseFloat(getComputedStyle(navInner).paddingTop) || 0;

    var on = false;
    function apply(scrolled) {
      nav.classList.toggle("lc-nav-scrolled", scrolled);
      if (canCompact) {
        var py = scrolled ? basePadY * g.compact : basePadY;
        navInner.style.paddingTop = py + "px";
        navInner.style.paddingBottom = py + "px";
      }
    }

    // Umbral con histéresis para que no parpadee en el punto exacto.
    function onScroll() {
      var y = window.scrollY,
        T = g.threshold,
        H = g.hysteresis;
      if (!on && y > T + H) {
        on = true;
        apply(true);
      } else if (on && y < T - H) {
        on = false;
        apply(false);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // estado correcto si la página carga ya desplazada
  }

  // El cristal corre siempre que su flag lo permita (incl. móvil).
  if (CONFIG.nav.glass.enabled && (isDesktop || CONFIG.nav.glass.mobile)) {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", initGlass);
    else initGlass();
  }

  if (!isDesktop || reduceMotion) return;

  /* Posición normalizada del ratón (-1..1) compartida por los efectos. */
  var mx = 0,
    my = 0;
  window.addEventListener(
    "mousemove",
    function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  /* Carga dinámica de Three.js r128 desde cdnjs (solo si hace falta). */
  function loadThree(cb) {
    if (window.THREE) return cb();
    var s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = cb;
    document.head.appendChild(s);
  }

  /* ---------- 1) HOJAS POR TODA LA PÁGINA ---------- */
  function initLeaves() {
    if (!window.THREE) return;

    // Canvas FIJO al viewport: cubre toda la página y se mantiene al
    // hacer scroll. Transparente e inerte a clics/selección.
    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;" +
      "pointer-events:none;z-index:" +
      CONFIG.leaves.zIndex +
      ";";
    document.body.appendChild(canvas);

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 10;
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    var dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(3, 5, 6);
    scene.add(dir);

    // Silueta de hoja (curvas Bézier), compartida por todas las hojas.
    var shape = new THREE.Shape();
    shape.moveTo(0, -0.5);
    shape.quadraticCurveTo(0.52, -0.1, 0, 0.55);
    shape.quadraticCurveTo(-0.52, -0.1, 0, -0.5);
    var leafGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSize: 0.02,
      bevelThickness: 0.02,
      bevelSegments: 1,
    });
    // Materiales compartidos (uno por color de la paleta).
    var mats = CONFIG.leaves.colors.map(function (c) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(c),
        roughness: 0.6,
        flatShading: true,
        transparent: true,
        opacity: CONFIG.leaves.opacity,
        side: THREE.DoubleSide,
      });
    });

    // Límites del volumen donde viven las hojas. Con la cámara a z=10 y
    // FOV 45º, la mitad de la altura visible a z=0 es ~4.1; ampliamos x
    // para cubrir viewports panorámicos (se recalcula en resize).
    var BOUNDS = { x: 12, y: 6, z: 4 };
    function fitBounds() {
      // Semi-altura visible a z=0 según la cámara; semi-anchura por aspect.
      var halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      BOUNDS.y = halfH + 1.5;
      BOUNDS.x = halfH * camera.aspect + 1.5;
    }
    function resize() {
      var w = window.innerWidth,
        h = window.innerHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      fitBounds(); // reajusta el volumen de hojas al nuevo aspect
    }
    resize(); // fija aspect y BOUNDS antes de repartir las hojas
    window.addEventListener("resize", resize);

    var leaves = [];
    for (var i = 0; i < CONFIG.leaves.count; i++) {
      var m = new THREE.Mesh(leafGeo, mats[i % mats.length]);
      m.position.set(
        (Math.random() - 0.5) * 2 * BOUNDS.x,
        (Math.random() - 0.5) * 2 * BOUNDS.y,
        -Math.random() * BOUNDS.z
      );
      m.scale.setScalar(CONFIG.leaves.size * (0.6 + Math.random() * 0.8));
      m.rotation.set(
        Math.random() * 6.28,
        Math.random() * 6.28,
        Math.random() * 6.28
      );
      m.userData = {
        fall: (0.2 + Math.random() * 0.5) * CONFIG.leaves.speed, // velocidad de caída
        swayF: 0.4 + Math.random() * 0.6, // frecuencia del balanceo
        rx: (Math.random() - 0.5) * 0.8, // giro propio X
        ry: (Math.random() - 0.5) * 0.8, // giro propio Y
        phase: Math.random() * 6.28, // desfase del balanceo
      };
      scene.add(m);
      leaves.push(m);
    }

    // Pausa el render cuando la pestaña no está visible (ahorro de CPU/GPU).
    var visible = !document.hidden;
    document.addEventListener("visibilitychange", function () {
      visible = !document.hidden;
    });

    var clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      if (!visible) return;
      var dt = Math.min(clock.getDelta(), 0.05),
        t = clock.getElapsedTime();
      for (var i = 0; i < leaves.length; i++) {
        var L = leaves[i],
          u = L.userData;
        L.position.y -= u.fall * dt; // caída
        L.position.x += Math.sin(t * u.swayF + u.phase) * 0.28 * dt; // balanceo
        L.rotation.x += u.rx * dt;
        L.rotation.y += u.ry * dt;
        // Reaparece arriba al salir por abajo.
        if (L.position.y < -BOUNDS.y - 1) {
          L.position.y = BOUNDS.y + 1;
          L.position.x = (Math.random() - 0.5) * 2 * BOUNDS.x;
        }
      }
      // Parallax muy leve de cámara con el ratón.
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    })();
  }

  /* ---------- 2) TILT EN TARJETAS ----------
     Las tarjetas reales ya usan transforms propios de Tailwind
     (hover:-translate-y en Servicios, y el marquee traslada el track
     en Proyectos). Para NO romperlos, no tocamos el <article>: creamos
     un wrapper interno que recibe el tilt y movemos su contenido dentro.
     Así los transforms/hover existentes del article siguen intactos. */
  function initTilt() {
    var cards = document.querySelectorAll(CONFIG.tilt.selector);
    var MAX = CONFIG.tilt.maxDeg,
      SC = CONFIG.tilt.scale;

    cards.forEach(function (card) {
      // Perspectiva en el propio article (no altera su layout ni su transform).
      if (!card.style.perspective) card.style.perspective = "1200px";

      // Wrapper interno que recibe la inclinación 3D.
      var inner = document.createElement("div");
      inner.style.transformStyle = "preserve-3d";
      inner.style.transition = "transform .18s ease-out";
      inner.style.willChange = "transform";
      // Mueve todos los hijos actuales dentro del wrapper.
      while (card.firstChild) inner.appendChild(card.firstChild);
      card.appendChild(inner);

      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        inner.style.transform =
          "rotateX(" +
          ((0.5 - py) * MAX).toFixed(2) +
          "deg) rotateY(" +
          ((px - 0.5) * MAX).toFixed(2) +
          "deg) scale(" +
          SC +
          ")";
      });
      card.addEventListener("mouseleave", function () {
        inner.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      });
    });
  }

  /* ---------- 3) FLOTACIÓN IMAGEN HERO ----------
     La <img> ya tiene una animación CSS propia (.hero-portrait → hero-float)
     sobre 'transform'. Para no pisarla, envolvemos la imagen en un wrapper
     y animamos ESE wrapper por JS. La animación CSS de la img sigue viva. */
  function initHeroImage() {
    var img = document.querySelector(CONFIG.heroImage.selector);
    if (!img || !img.parentElement) return;

    // Wrapper de parallax alrededor de la imagen.
    var wrap = document.createElement("div");
    wrap.style.display = "inline-block";
    wrap.style.willChange = "transform";
    img.parentElement.insertBefore(wrap, img);
    wrap.appendChild(img);

    var A = CONFIG.heroImage.amount,
      t0 = performance.now();
    (function loop(now) {
      requestAnimationFrame(loop);
      var t = (now - t0) / 1000;
      var idleY = CONFIG.heroImage.idleFloat ? Math.sin(t * 1.1) * 5 : 0;
      var idleR = CONFIG.heroImage.idleFloat ? Math.sin(t * 0.7) * 0.8 : 0;
      wrap.style.transform =
        "translate(" +
        (mx * A).toFixed(1) +
        "px," +
        (my * A * 0.6 + idleY).toFixed(1) +
        "px) rotate(" +
        idleR.toFixed(2) +
        "deg)";
    })(t0);
  }

  /* ---------- 5) MAGNETISMO EN TECNOLOGÍAS ----------
     Los chips de la lista (li.tech-pill) se desplazan y escalan sutilmente
     hacia el cursor cuando está cerca. Un ÚNICO rAF para toda la sección,
     activo solo mientras la sección está en viewport y el cursor dentro.
     Solo toca 'transform'; no interfiere con el hover de Tailwind (border). */
  function initMagnet() {
    var cfg = CONFIG.magnet;
    var section = document.querySelector(cfg.sectionSelector);
    if (!section) return;
    var items = section.querySelectorAll(cfg.itemSelector);
    if (!items.length) return;

    var state = [].map.call(items, function (el) {
      el.style.willChange = "transform";
      return { el: el, x: 0, y: 0, s: 1 };
    });

    var cx = -99999,
      cy = -99999; // posición del cursor (fuera por defecto)
    var inViewport = false,
      inside = false,
      running = false;

    section.addEventListener(
      "mousemove",
      function (e) {
        cx = e.clientX;
        cy = e.clientY;
        inside = true;
      },
      { passive: true }
    );
    section.addEventListener("mouseleave", function () {
      inside = false;
      cx = cy = -99999; // fuerza el retorno suave a origen
    });

    new IntersectionObserver(function (en) {
      inViewport = en[0].isIntersecting;
      if (inViewport) run();
    }).observe(section);

    function settled() {
      // ¿Todos los chips han vuelto prácticamente a su sitio?
      for (var i = 0; i < state.length; i++) {
        var s = state[i];
        if (
          Math.abs(s.x) > 0.05 ||
          Math.abs(s.y) > 0.05 ||
          Math.abs(s.s - 1) > 0.002
        )
          return false;
      }
      return true;
    }

    function run() {
      if (running) return;
      running = true;
      (function loop() {
        // Si la sección no está visible y ya todo está en reposo, paramos
        // el rAF por completo (cero trabajo). Se reanuda al reentrar.
        if (!inViewport && settled()) {
          running = false;
          return;
        }
        requestAnimationFrame(loop);
        var R = cfg.radius;
        for (var i = 0; i < state.length; i++) {
          var s = state[i];
          var tx = 0,
            ty = 0,
            ts = 1;
          if (inside && inViewport) {
            var r = s.el.getBoundingClientRect();
            var dx = cx - (r.left + r.width / 2);
            var dy = cy - (r.top + r.height / 2);
            var d = Math.hypot(dx, dy);
            var k = Math.max(0, 1 - d / R); // 0 lejos … 1 encima
            tx = (dx / (d || 1)) * cfg.maxShift * k;
            ty = (dy / (d || 1)) * cfg.maxShift * k;
            ts = 1 + (cfg.maxScale - 1) * k;
          }
          // Interpolación suave hacia el objetivo.
          s.x += (tx - s.x) * cfg.lerp;
          s.y += (ty - s.y) * cfg.lerp;
          s.s += (ts - s.s) * cfg.lerp;
          s.el.style.transform =
            "translate(" +
            s.x.toFixed(2) +
            "px," +
            s.y.toFixed(2) +
            "px) scale(" +
            s.s.toFixed(3) +
            ")";
        }
      })();
    }
  }

  /* ---------- 6) GERMINACIÓN DEL FORMULARIO ----------
     Al enviarse con éxito brota una hoja (SVG inline) sobre el botón, con
     un pulso sutil de escala. El SVG se inyecta y se elimina del DOM.
     Expuesta como window.leafcodeBloom(elemento) para uso manual futuro. */
  function bloom(target) {
    if (!target) return;
    if (getComputedStyle(target).position === "static")
      target.style.position = "relative";

    var leaf = document.createElement("span");
    leaf.setAttribute("aria-hidden", "true");
    leaf.innerHTML =
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none">' +
      '<path d="M12 3C8 7 6 10.5 6 13.5A6 6 0 0 0 12 20a6 6 0 0 0 6-6.5C18 10.5 16 7 12 3Z" fill="' +
      CONFIG.bloom.leafColor +
      '"/></svg>';
    leaf.style.cssText =
      "position:absolute;top:-14px;left:50%;pointer-events:none;z-index:5;" +
      "transform:translateX(-50%) scale(0) rotate(-30deg);" +
      "transform-origin:bottom center;" +
      "transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .4s;";
    target.appendChild(leaf);

    // Guardamos la transición previa del botón para restaurarla luego
    // (el botón usa 'transition-colors' de Tailwind; no lo perdemos).
    var prevTransition = target.style.transition;

    requestAnimationFrame(function () {
      leaf.style.transform = "translateX(-50%) scale(1) rotate(0deg)";
      target.style.transition = "transform .18s ease-out";
      target.style.transform = "scale(1.04)";
      setTimeout(function () {
        target.style.transform = "scale(1)";
      }, 180);
      setTimeout(function () {
        // Limpiamos los estilos inline del botón para no pisar su CSS.
        target.style.transition = prevTransition;
        target.style.transform = "";
      }, 420);
      setTimeout(function () {
        leaf.style.opacity = "0";
      }, 1700);
      setTimeout(function () {
        leaf.remove();
      }, 2200);
    });
  }
  window.leafcodeBloom = bloom;

  function initBloom() {
    var form = document.querySelector(CONFIG.bloom.formSelector);
    if (!form) return;
    var btn = form.querySelector(CONFIG.bloom.buttonSelector);
    if (!btn) return;

    // El formulario NO usa fetch: hace POST nativo a FormSubmit, que
    // redirige de vuelta con ?enviado=1. Ese parámetro en la URL ES la
    // señal de éxito real del envío (capturado arriba en 'submittedOk',
    // antes de que Contact.astro lo limpie de la URL).
    if (submittedOk) bloom(btn);
  }

  /* Utilidad: SVG de hoja pequeña (silueta simple) del color y tamaño dados. */
  function leafSVG(size, color) {
    return (
      '<svg width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" fill="none">' +
      '<path d="M12 3C8 7 6 10.5 6 13.5A6 6 0 0 0 12 20a6 6 0 0 0 6-6.5C18 10.5 16 7 12 3Z" fill="' +
      color +
      '"/></svg>'
    );
  }

  /* ---------- 8) ENREDADERA (scroll-spy) ----------
     Un tallo verde bajo los enlaces del nav marca la sección activa. Al
     cambiar, CRECE del enlace anterior al nuevo (extiende cubriendo ambos y
     luego se contrae al destino) y brota una hoja diminuta en su extremo.
     El click viaja directo, con un lock que evita rebotes del spy. */
  function initVine() {
    var cfg = CONFIG.nav.vine;
    var container = document.querySelector(cfg.linksContainer);
    var links = document.querySelectorAll(cfg.linksSelector);
    if (!container || !links.length) return;

    // El contenedor de enlaces necesita ser referencia de posicionamiento.
    if (getComputedStyle(container).position === "static")
      container.style.position = "relative";

    // Tallo (barra) + hoja en su extremo.
    var vine = document.createElement("span");
    vine.setAttribute("aria-hidden", "true");
    vine.style.cssText =
      "position:absolute;bottom:-8px;left:0;width:0;height:" +
      cfg.height +
      "px;background:" +
      cfg.color +
      ";border-radius:2px;opacity:0;pointer-events:none;" +
      "transition:left " +
      cfg.speed +
      "ms cubic-bezier(.22,1,.36,1),width " +
      cfg.speed +
      "ms cubic-bezier(.22,1,.36,1),opacity .3s;";
    var leaf = document.createElement("span");
    leaf.setAttribute("aria-hidden", "true");
    leaf.style.cssText =
      "position:absolute;right:-3px;top:50%;pointer-events:none;" +
      "transform:translate(50%,-50%) scale(0) rotate(-20deg);" +
      "transform-origin:center;transition:transform .4s cubic-bezier(.34,1.56,.64,1);";
    leaf.innerHTML = leafSVG(8, cfg.color);
    vine.appendChild(leaf);
    container.appendChild(vine);

    // Mapa sección -> enlace correspondiente.
    var map = {};
    cfg.sections.forEach(function (sec) {
      var link = document.querySelector(
        'header nav ul a[href="' + sec + '"]'
      );
      if (link) map[sec] = link;
    });

    var currentSec = null;
    var lockUntil = 0;

    // Coloca el tallo bajo un enlace concreto (relativo al contenedor).
    function rectIn(el) {
      var cr = container.getBoundingClientRect();
      var r = el.getBoundingClientRect();
      return { left: r.left - cr.left, width: r.width };
    }

    function popLeaf() {
      leaf.style.transform =
        "translate(50%,-50%) scale(1) rotate(0deg)";
      setTimeout(function () {
        leaf.style.transform =
          "translate(50%,-50%) scale(0) rotate(-20deg)";
      }, 900);
    }

    function goTo(sec, grow) {
      if (sec === currentSec) return;
      var link = map[sec];
      if (!link) return;
      var dst = rectIn(link);
      vine.style.opacity = "1";

      if (grow && currentSec && map[currentSec]) {
        // Animación en dos tiempos: extender cubriendo origen+destino…
        var src = rectIn(map[currentSec]);
        var l = Math.min(src.left, dst.left);
        var r = Math.max(src.left + src.width, dst.left + dst.width);
        vine.style.left = l + "px";
        vine.style.width = r - l + "px";
        // …y luego contraer hasta el destino.
        setTimeout(function () {
          vine.style.left = dst.left + "px";
          vine.style.width = dst.width + "px";
          popLeaf();
        }, cfg.speed * 0.5);
      } else {
        vine.style.left = dst.left + "px";
        vine.style.width = dst.width + "px";
        popLeaf();
      }
      currentSec = sec;
    }

    // Oculta el tallo (estado inicial, sin sección activa: hero arriba).
    function hideVine() {
      if (!currentSec) return;
      currentSec = null;
      vine.style.opacity = "0";
      vine.style.width = "0px";
    }

    // Altura del header sticky (para descontarla en la línea de detección).
    var header = document.querySelector(CONFIG.nav.glass.navSelector);
    var headerH = header ? Math.round(header.getBoundingClientRect().height) : 0;

    // Secciones que actualmente cruzan la franja de detección: id -> top.
    var active = {};

    // Scroll-spy: la sección cuyo inicio cruza la franja bajo el header.
    var io = new IntersectionObserver(
      function (entries) {
        // Mantenemos qué secciones cruzan la "línea de detección" (franja
        // fina bajo el header). Elegimos la que esté más arriba en pantalla:
        // es la sección que domina el viewport en ese momento.
        entries.forEach(function (en) {
          var id = "#" + en.target.id;
          if (en.isIntersecting) active[id] = en.boundingClientRect.top;
          else delete active[id];
        });
        if (Date.now() < lockUntil) return; // lock tras click

        var best = null,
          bestTop = Infinity;
        Object.keys(active).forEach(function (id) {
          if (map[id] && active[id] < bestTop) {
            bestTop = active[id];
            best = id;
          }
        });
        if (best) goTo(best, true);
        else hideVine(); // sin sección (hero arriba): tallo oculto
      },
      // Franja de detección: descuenta la altura del header arriba y deja
      // activa la sección cuyo inicio ha cruzado ese punto. El -55% inferior
      // estrecha la banda para que solo una sección la ocupe a la vez.
      {
        rootMargin: "-" + headerH + "px 0px -55% 0px",
        threshold: 0,
      }
    );
    cfg.sections.forEach(function (sec) {
      var el = document.querySelector(sec);
      if (el) io.observe(el);
    });

    // Click en un enlace: viaja directo y bloquea el spy un instante.
    Object.keys(map).forEach(function (sec) {
      map[sec].addEventListener("click", function () {
        lockUntil = Date.now() + cfg.clickLock;
        goTo(sec, true);
      });
    });

    // Recoloca el tallo si cambia el tamaño de la ventana.
    window.addEventListener(
      "resize",
      function () {
        if (currentSec && map[currentSec]) {
          var d = rectIn(map[currentSec]);
          vine.style.left = d.left + "px";
          vine.style.width = d.width + "px";
        }
      },
      { passive: true }
    );
  }

  /* ---------- 9) HOJITA DEL LOGO, VIVA ----------
     Micro-oscilación del icono al hover (una vez) y "saludo" al volver a la
     pestaña (con cooldown). Solo transform sobre el <img> del logo. */
  function initLogoLeaf() {
    var cfg = CONFIG.nav.logoLeaf;
    var icon = document.querySelector(cfg.selector);
    if (!icon) return;

    // Keyframes de la oscilación (inyectados una sola vez).
    var st = document.getElementById("lc-nav-styles") || document.createElement("style");
    if (!st.id) {
      st.id = "lc-nav-styles";
      document.head.appendChild(st);
    }
    st.textContent +=
      "@keyframes lc-wiggle{0%{transform:rotate(0)}25%{transform:rotate(8deg)}" +
      "55%{transform:rotate(-6deg)}80%{transform:rotate(3deg)}100%{transform:rotate(0)}}" +
      ".lc-wiggle{animation:lc-wiggle .6s ease-in-out;transform-origin:bottom center;}";

    function wiggle() {
      if (icon.classList.contains("lc-wiggle")) return; // no encadenar
      icon.classList.add("lc-wiggle");
    }
    icon.addEventListener("animationend", function () {
      icon.classList.remove("lc-wiggle");
    });

    // Oscilación al pasar el ratón por el logo (su enlace contenedor).
    var logo = icon.closest("a") || icon;
    logo.addEventListener("mouseenter", wiggle);

    // "Saludo" al volver a la pestaña, limitado por cooldown.
    var lastGreet = 0;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) return;
      var now = Date.now();
      if (now - lastGreet < cfg.greetCooldown) return;
      lastGreet = now;
      wiggle();
    });
  }

  /* ---------- 10) CTA "HABLEMOS" MAGNÉTICO + BROTE ----------
     El botón se desplaza levemente hacia el cursor (lerp+rAF) cuando está
     cerca, y brota una hojita en su esquina sup. derecha mientras dura el
     hover. Solo añade transform y un span; no toca el hover de Tailwind. */
  function initCtaMagnet() {
    var cfg = CONFIG.nav.ctaMagnet;
    var btn = document.querySelector(cfg.selector);
    if (!btn) return;
    btn.style.willChange = "transform";

    // --- Magnetismo ---
    var cx = -99999,
      cy = -99999,
      x = 0,
      y = 0,
      running = false;

    window.addEventListener(
      "mousemove",
      function (e) {
        cx = e.clientX;
        cy = e.clientY;
        if (!running) run();
      },
      { passive: true }
    );

    function run() {
      running = true;
      (function loop() {
        var r = btn.getBoundingClientRect();
        var dx = cx - (r.left + r.width / 2);
        var dy = cy - (r.top + r.height / 2);
        var d = Math.hypot(dx, dy);
        var tx = 0,
          ty = 0;
        if (d < cfg.radius) {
          var k = 1 - d / cfg.radius;
          tx = (dx / (d || 1)) * cfg.maxShift * k;
          ty = (dy / (d || 1)) * cfg.maxShift * k;
        }
        x += (tx - x) * cfg.lerp;
        y += (ty - y) * cfg.lerp;
        btn.style.transform =
          "translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px)";
        // Paramos el rAF cuando el botón ha vuelto a su sitio y el cursor
        // está lejos (ahorro); se reanuda con el próximo mousemove.
        if (
          d > cfg.radius &&
          Math.abs(x) < 0.05 &&
          Math.abs(y) < 0.05
        ) {
          btn.style.transform = "";
          running = false;
          return;
        }
        requestAnimationFrame(loop);
      })();
    }

    // --- Brote de hoja al hover ---
    if (getComputedStyle(btn).position === "static")
      btn.style.position = "relative";
    var leaf = null;
    btn.addEventListener("mouseenter", function () {
      if (leaf) return;
      leaf = document.createElement("span");
      leaf.setAttribute("aria-hidden", "true");
      leaf.innerHTML = leafSVG(10, cfg.leafColor);
      leaf.style.cssText =
        "position:absolute;top:-6px;right:-4px;pointer-events:none;z-index:5;" +
        "transform:scale(0) rotate(-25deg);transform-origin:bottom left;" +
        "transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .3s;";
      btn.appendChild(leaf);
      requestAnimationFrame(function () {
        if (leaf) leaf.style.transform = "scale(1) rotate(0deg)";
      });
    });
    btn.addEventListener("mouseleave", function () {
      if (!leaf) return;
      var l = leaf;
      leaf = null;
      l.style.opacity = "0";
      l.style.transform = "scale(0) rotate(-25deg)";
      setTimeout(function () {
        l.remove();
      }, 400);
    });
  }

  /* ---------- ARRANQUE ---------- */
  function start() {
    if (CONFIG.tilt.enabled) initTilt();
    if (CONFIG.heroImage.enabled) initHeroImage();
    if (CONFIG.leaves.enabled) loadThree(initLeaves);
    if (CONFIG.magnet.enabled) initMagnet();
    if (CONFIG.bloom.enabled) initBloom();
    // Fase 3 (solo desktop; el cristal ya se arrancó antes de la guarda).
    if (CONFIG.nav.vine.enabled) initVine();
    if (CONFIG.nav.logoLeaf.enabled) initLogoLeaf();
    if (CONFIG.nav.ctaMagnet.enabled) initCtaMagnet();
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
